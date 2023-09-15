import { ScrollView, TouchableOpacity, TouchableWithoutFeedback, Text, View, Image, ImageBackground, TextInput, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import styles from './Styles';
import Filter from './Filter';
import TodoService from '../service/TodoService';

export default function Main () {

    const [all , setAll] = useState([]);
    const [input, setInput] = useState("");
    const [allFilter, setAllFilter] = useState([]);
    const [filter, setFilter] = useState("");
    const [todo, setTodo] = useState([]);
    const [dataTodo, setDataTodo] = useState({
        task: "",
        completed: false,
        user: {
            id: 1
        }
    })


    useEffect(()=> {
        listTodo();
    },[])

    const listTodo = () => {
        TodoService.getAllTodo().then(response=> {
            setTodo(response.data);
        }).catch(error=> {
            console.log(error);
        })
    }

    /*const filterAll = () => {
        const newAll = [...all];
        setAllFilter(newAll);
    }

    const filterActive = () => {
        const newAll = [...all];
        const newActive = [];
        newAll.forEach(task => {
            if(!task.completed) {
                newActive.push(task);
            }
            setAllFilter(newActive);
        })
    }

    const filterCompleted = () => {
        const newAll = [...all];
        const newActive = [];
        newAll.forEach(task => {
            if(task.completed) {
                newActive.push(task);
            }
            setAllFilter(newActive);
        })
    }*/

    const filtersTodo = (todo) => {
        return todo.filter(todo=> {
            return(
                todo.completed === filter
            )
        })
    }

    const filteredTodo = filtersTodo(todo);

    const clearCompleted = () => {
        const newAll = [...all];
        const hola = newAll.filter(function(num) {
            return num.completed==false;
        })
        setAll(hola);
        setAllFilter(hola);
    }

    const deleteTodo = (todoId) => {
        Alert.alert('delete todo', 'Are you sure you want to deleted this todo?',[
            { text:'cancel' },
            {
                text: 'yes',
                onPress: ()=> {
                    TodoService.deleteTodo(todoId).then(response=> {
                        listTodo();
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
            listTodo();
        }).catch(error=> {
            console.log(error);
        })
    }

    const addTodo = () => {
        if(dataTodo.task.trim()) {
            TodoService.addTodo(dataTodo).then(response=> {
                listTodo();
            }).catch(error=> {
                console.log(error)
            })
        }
    }

    return(
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.bg}>
                    <ImageBackground style={{width: "100%", height: "107%"}} source={require('../images/bg-image.jpg')}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>TODO</Text>
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
                        {todo.length===0?
                            <View style={styles.listEmpty}>
                                <Text style={{fontSize:17 , fontWeight:'bold' , color:"#242424"}}>Your list is empty</Text>
                            </View>
                        :
                            todo.map((todo , index) =>
                                <View key={index} style={styles.list}>
                                    <View style={{flexDirection:"row" , flex:0.95 , marginRight:"5%"}}>
                                        <TouchableOpacity onPress={()=> complet(todo.id)}>
                                            {todo.completed ? 
                                                <Image source={require('../images/check.png')}
                                                    style={{width: 20, height: 20 , marginRight:5}} 
                                                />
                                                :
                                                <Image source={require('../images/circle.png')}
                                                    style={{width: 20, height: 20 , marginRight:5}} 
                                                />
                                            }
                                        </TouchableOpacity>
                                        <Text style={todo.completed && styles.complet}>
                                            {todo.task}
                                        </Text>
                                    </View>
                                    <View style={{flex:0.05}}>
                                        {/* agregar una alerta para eliminar */}
                                        <TouchableOpacity onPress={()=> deleteTodo(todo.id)}>
                                            <Image source={require('../images/cross.png')}
                                                style={{width: 20, height: 20}} 
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }
                        <View style={styles.list}>
                            <TouchableWithoutFeedback>
                                <Text style={{color:"#5b6e7d"}}>{todo.length} items left</Text>
                            </TouchableWithoutFeedback>
                                    {/* agregar una alerta para eliminar todos */}
                            <TouchableWithoutFeedback onPress={clearCompleted}>
                                <Text style={{color:"#5b6e7d"}} >Clear Completed</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <Filter changeFiltes={setFilter}/>
                </View>
            </ScrollView>
        </View>
    )
}