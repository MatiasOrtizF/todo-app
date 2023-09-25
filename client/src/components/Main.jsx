import { ScrollView, TouchableOpacity, TouchableWithoutFeedback, Text, View, ImageBackground, TextInput, Alert, BackHandler } from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Styles';
import Filter from './Filter';
import TodoService from '../service/TodoService';
import { StatusBar } from 'expo-status-bar';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Todo from '../components/Todo'
import { useNavigation } from '@react-navigation/native';
import { useData } from '../hooks/dataContext';

export default function Main () {
    const {setToken, token, userId} = useData();

    const navigation = useNavigation();
    const [filter, setFilter] = useState("all");
    const [todos, setTodos] = useState([]);
    const [dataTodo, setDataTodo] = useState({
        task: "",
        completed: false,
        user: {
            id: userId
        }
    })
    const [todoModal, setTodoModal] = useState([]);
    const sheetRef = useRef(null);
    // const [isOpen, setIsOpen] = useState(false);
    const snapPoints = ["40%"];

    const handleSnapPress = useCallback((index, todo) => {
        sheetRef.current?.snapToIndex(index);
        // setIsOpen(true);
        setTodoModal(todo);
    }, []);


    useEffect(()=> {
        blockBack();
        listTodos();
        return () => {
            //deslogear
            //cleanup();
        }
    },[])

    const blockBack = () => {
        const backAction = () => {
            BackHandler.exitApp();
            return true;
        };
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }

    const listTodos = () => {
        TodoService.getAllTodo(token).then(response=> {
            setTodos(response.data);
        }).catch(error=> {
            console.log(error);
        })
    }

    const filtersTodos = (todos) => {
        return todos.filter(todo=> {
            return(
                filter === "all" || todo.completed == filter
            )
        })
    }

    const filteredTodo = filtersTodos(todos);

    const clearCompleted = () => {
        Alert.alert('Delete completed Todos', 'Are you sure you want to deleted all the completed todos?', [
            { text: 'cancel' },
            {
                text: 'yes',
                onPress: ()=> {
                    TodoService.deleteCompletedTodos(token).then(response=> {
                        listTodos();
                    }).catch(error=> {
                        console.log(error);
                    })
                }
            }
        ]);
    }

    const deleteTodo = (todoId) => {
        Alert.alert('Delete todo', 'Are you sure you want to deleted this todo?',[
            { text: 'cancel' },
            {
                text: 'yes',
                onPress: ()=> {
                    TodoService.deleteTodo(todoId, token).then(response=> {
                        listTodos();
                    }).catch(error=> {
                        console.log(error);
                    })
                }
            }
        ]);
    }

    const handleChangeText = (task, value) => {
        setDataTodo({...dataTodo, [task]: value})
    }

    const updateTodo = (todoId) => {
        TodoService.updateTodo(todoId, token).then(response=> {
            listTodos();
        }).catch(error=> {
            console.log(error);
        })
    }

    const addTodo = () => {
        if(dataTodo.task.trim()) {
            TodoService.addTodo(dataTodo, token).then(response=> {
                listTodos();
            }).catch(error=> {
                console.log(error)
            })
        }
    }

    const logOut = () => {
        setToken('')
        navigation.navigate('Login')
    }

    return(
        <BottomSheetModalProvider>
            <View style={styles.container}>
                <StatusBar style="light"/>
                <ScrollView>
                    <View style={styles.bg}>
                        <ImageBackground style={{width: "100%", height: "107%"}} source={require('../images/bg-image.jpg')}>
                        <View style={styles.header}>
                            <View style={{flexDirection:"row", justifyContent: "space-between", alignItems: "center"}}>
                                <Text style={styles.headerText}>TODO</Text>
                                <TouchableOpacity onPress={()=> logOut()} style={{backgroundColor: "transparent", borderWidth: 3, paddingVertical: 5, paddingHorizontal: 10 , borderRadius: 100}}>
                                    <Text style={{color: "#fff", fontSize: 17, fontWeight: "bold"}}>Log Out</Text>
                                </TouchableOpacity>
                            </View>
                            <TextInput 
                                onChangeText={(value)=> handleChangeText('task', value)} 
                                style={styles.headerInput} 
                                placeholder="Create a new todo..."
                                onSubmitEditing={addTodo}
                            />
                        </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.todo} >
                        <View style={styles.lists}>
                            {todos.length===0?
                                <View style={styles.listEmpty}>
                                    <Text style={styles.listEmptyText}>Your list is empty</Text>
                                </View>
                            :
                                filteredTodo?.map((todo, index)=> (
                                    <Todo key={index} todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo}/>
                                ))
                            }
                            <View style={styles.list}>
                                <TouchableWithoutFeedback>
                                    <Text style={{color:"#5b6e7d"}}>{todos.length} items left</Text>
                                </TouchableWithoutFeedback>
                                        {/* agregar una alerta para eliminar todos */}
                                <TouchableWithoutFeedback onPress={clearCompleted}>
                                    <Text style={{color:"#5b6e7d"}} >Clear Completed</Text>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        <Filter changeFilter={setFilter}/>
                    </View>
                </ScrollView>
            </View>
        </BottomSheetModalProvider>
    )
}