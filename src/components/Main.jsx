import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { StyleSheet, Text, View , Image, ImageBackground, TextInput} from 'react-native';
import Cross from '../images/icon-cross.svg';
import Check from '../images/icon-check.svg';
import { useState } from 'react';

export default function Main () {

    const [all , setAll] = useState([]);
    const [input, setInput] = useState("");
    const [allFilter, setAllFilter] = useState([]);

    const result = () => {
        if(input.trim()) {
            const hola = {
                tarea: input,
                completed: false,
            }
            const newAll = [hola, ...all];
            setAll(newAll);
            setAllFilter(newAll);
        }
    }

    const complet = (index) => {
        const newAll = [...all];
        newAll[index];
        newAll[index].completed = !newAll[index].completed
        setAll(newAll);
    }

    const borrar = (index) => {
        const newAll = [...all];
        newAll.splice(index,1);
        setAll(newAll);
        setAllFilter(newAll);
    }

    const filterAll = () => {
        const newAll = [...all];
        setAllFilter(newAll);
        console.log("mostrar todos")
    }

    const filterActive = () => {
        const newAll = [...all];
        const newActive = [];
        newAll.forEach(tarea => {
            if(!tarea.completed) {
                newActive.push(tarea);
            }
            setAllFilter(newActive);
        })
        console.log("mostrar activados");
    }

    const filterCompleted = () => {
        const newAll = [...all];
        const newActive = [];
        newAll.forEach(tarea => {
            if(tarea.completed) {
                newActive.push(tarea);
            }
            setAllFilter(newActive);
        })
        console.log("mostrar completados");
    }

    const clearCompleted = () => {
        const newAll = [...all];
        const hola = newAll.filter(function(num) {
            return num.completed==false;
        })
        setAll(hola);
        setAllFilter(hola);
    }

    return(
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.bg}>
                    <ImageBackground source={require('../images/bg-mobile-light.jpg')}
                                    style={{width: "100%", height: "107%"}} 
                    >
                    <View style={styles.header}>
                        <Text style={styles.headerText}>TODO</Text>
                            <TextInput onChangeText={setInput} 
                                style={styles.headerInput} 
                                placeholder="Create a new todo..."
                                onSubmitEditing={result}
                                >
                            </TextInput>
                    </View>
                    </ImageBackground>
                </View>
                <View style={styles.todo} >

                    <View style={styles.lists}>

                        {/* <View style={styles.list}>
                            <View style={{flexDirection:"row" , flex:0.95 , marginRight:"5%"}}>
                                <Image source={require('../images/circle.png')}
                                            style={{width: 20, height: 20 , marginRight:5}} 
                                />
                                <Text>
                                    10 minutes meditation
                                </Text>
                            </View>
                            <View style={{flex:0.05}}>
                                <Image source={require('../images/cross.png')}
                                            style={{width: 20, height: 20}} 
                                />
                            </View>
                        </View>
                        <View style={styles.list}>
                            <View style={{flexDirection:"row" , flex:0.95 , marginRight:"5%"}}>
                                <Image source={require('../images/check.png')}
                                            style={{width: 20, height: 20 , marginRight:5}} 
                                />
                                <Text>
                                    10 minutes meditation
                                </Text>
                            </View>
                            <View style={{flex:0.05}}>
                                <Image source={require('../images/cross.png')}
                                            style={{width: 20, height: 20}} 
                                />
                            </View>
                        </View> */}
                        
                        {allFilter.length==0?
                        <View style={styles.listEmpty}>
                            <Text style={{fontSize:17 , fontWeight:'bold' , color:"#242424"}}>Your list is empty</Text>
                        </View>
                        :
                        allFilter.map((tarea , index) =>
                            <View style={styles.list}>
                                <View style={{flexDirection:"row" , flex:0.95 , marginRight:"5%"}}>
                                    <TouchableOpacity onPress={()=> complet(index)}>
                                        {tarea.completed ? 
                                            <Image source={require('../images/check.png')}
                                                style={{width: 20, height: 20 , marginRight:5}} 
                                                />
                                            :
                                            <Image source={require('../images/circle.png')}
                                            style={{width: 20, height: 20 , marginRight:5}} 
                                            />
                                        }
                                    </TouchableOpacity>
                                    <Text style={tarea.completed && styles.tachar}>
                                        {tarea.tarea}
                                    </Text>
                                </View>
                                <View style={{flex:0.05}}>
                                    <TouchableOpacity onPress={()=> borrar(index)}>
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
                                <Text style={{color:"#5b6e7d"}}>{allFilter.length} items left</Text>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={clearCompleted}>
                                <Text style={{color:"#5b6e7d"}} >Clear Completed</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>

                    <View style={styles.btns}>
                        <TouchableWithoutFeedback onPress={filterAll} >
                            <Text style={{marginHorizontal: 10 , fontWeight: 'bold' , color:"#5b6e7d"}}>All</Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={filterActive} >
                            <Text style={{marginHorizontal: 10 , fontWeight: 'bold' , color:"#5b6e7d"}}>Active</Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={filterCompleted}>
                            <Text style={{marginHorizontal: 10 , fontWeight: 'bold' , color:"#5b6e7d"}}>Completed</Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View style={{flex:0.2 , alignItems:"center" , marginVertical:"5%"}}>
                        <Text style={{color:"#5b6e7d"}}>Drag and drop to reorder list</Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#d4dce6",
        width: "100%",
    },
    bg: {
        flex: 0.3
    },
    header: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    headerText: {
        color: "#fff",
        fontSize: 35,
        letterSpacing: 10,
        fontWeight: "bold"
    },
    headerInput: {
        marginTop: "10%",
        backgroundColor: '#fff',
        borderRadius: 7,
        borderColor: 'gray',
        padding: 10,
        color: 'black',
    },
    todo: {
        flex: 0.5,
        paddingHorizontal: 20
    },
    lists: {
        marginBottom: 15,
        borderRadius: 7,
        overflow: "hidden"
    },
    list: {
        padding: 15,
        justifyContent: 'space-between',
        flexDirection: "row",
        backgroundColor: "white",
        marginBottom: 1,
    },
    listEmpty: {
        padding: 18,
        justifyContent: 'space-between',
        flexDirection: "row",
        backgroundColor: "white",
        marginBottom: 1,
        justifyContent:'center'
    },
    emptyText: {

    },
    check: {
        flex:0.1, 
        padding: 1,
        backgroundColor:"red",
        width: "100%",
        justifyContent:"center",
        alignItems:"center",
        borderRadius: "100%"
    },
    tachar: {
        textDecorationLine: 'line-through'
    },
    listText: {

    },
    btns: {
        flexDirection: "row",
        justifyContent: 'center',
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 7,
    }
});