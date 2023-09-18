import { ScrollView, TouchableOpacity, TouchableWithoutFeedback, Text, View, ImageBackground, TextInput, Alert, BackHandler } from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Styles';
import Filter from './Filter';
import TodoService from '../service/TodoService';
import { StatusBar } from 'expo-status-bar';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Modal from './Modal';
import Todo from '../components/Todo'

export default function Main () {
    const [filter, setFilter] = useState("all");
    const [todos, setTodos] = useState([]);
    const [dataTodo, setDataTodo] = useState({
        task: "",
        completed: false,
        user: {
            id: 1
        }
    })
    const [todoModal, setTodoModal] = useState([]);
    const sheetRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const snapPoints = ["40%"];

    const handleSnapPress = useCallback((index, todo) => {
        sheetRef.current?.snapToIndex(index);
        setIsOpen(true);
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
        TodoService.getAllTodo().then(response=> {
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
        console.log("clear complete")
    }

    const deleteTodo = (todoId) => {
        Alert.alert('delete todo', 'Are you sure you want to deleted this todo?',[
            { text:'cancel' },
            {
                text: 'yes',
                onPress: ()=> {
                    TodoService.deleteTodo(todoId).then(response=> {
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

    const complet = (todoId) => {
        TodoService.updateTodo(todoId).then(response=> {
            listTodos();
        }).catch(error=> {
            console.log(error);
        })
    }

    const addTodo = () => {
        if(dataTodo.task.trim()) {
            TodoService.addTodo(dataTodo).then(response=> {
                listTodos();
            }).catch(error=> {
                console.log(error)
            })
        }
    }

    return(
        <View style={styles.container}>
            <StatusBar style="light"/>
            <ScrollView>
                <View style={styles.bg}>
                    <ImageBackground style={{width: "100%", height: "107%"}} source={require('../images/bg-image.jpg')}>
                    <View style={styles.header}>
                        <View style={{flexDirection:"row", justifyContent: "space-between", alignItems: "center"}}>
                            <Text style={styles.headerText}>TODO</Text>
                            <TouchableOpacity style={{backgroundColor: "#000", paddingVertical: 5, paddingHorizontal: 10 , borderRadius: 7}}>
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
                                <Todo key={index} todo={todo} deleteTodo={deleteTodo} handleSnapPress={handleSnapPress} complet={complet} />
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
            <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                onClose={()=> setIsOpen(false)}
                backgroundStyle={{ borderRadius: 50, borderWidth: 4 }}
            >
                <BottomSheetView>
                    <Modal todoModal={todoModal}/>
                </BottomSheetView>
            </BottomSheet>
        </View>
    )
}