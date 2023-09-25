import { useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import TodoSharedService from '../service/TodoSharedService';
import AuthService from '../service/AuthService';
import { useData } from '../hooks/dataContext';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default function Modal ({todo}) {
    const {token} = useData();

    const [email, setEmail] = useState("");
    const [users, setUsers] = useState([]);
    useEffect(()=> {
        listUsers();
    },[])

    const listUsers = () => {
        TodoSharedService.getTodoInShared(todo.id, token).then(response=> {
            console.log(response.data);
            const usersNames = response.data.map(data=> ({
                id: data.id,
                userName: data.name
            }));
            setUsers(usersNames);
        }).catch(error=> {
            console.log(error);
        })
    }

    /*const checkUser = () => {
        AuthService.checkUser(email).then(response=> {
            if(response.data) {
                Alert.alert("The user was added successfully")
                // verificar si ya esta agregado el usuario.
                // agregar el todo a todo_shared
            } else {
                Alert.alert("Email is incorrect")
            }
        })
    }*/

    const addTodoShared = () => {
        TodoSharedService.addTodoShared(email, todo, token).then(response=> {
            listUsers();
            setEmail("");
        }).catch(error=> {
            if (error.response && error.response.status === 400) {
                alert(error.response.data);
            } else {
                console.log(error);
            }
        })
    }

    const deleteUserFromShared = (userId) => {
        Alert.alert('Delete user', 'Are you sure you want to delete user from shared ?', [
            {text: 'cancel'},
            {
                text: 'Yes',
                onPress: () => {
                    TodoSharedService.deleteTodoShared(todo.id, userId, token).then(response=> {
                        listUsers();
                    }).catch(error=> {  
                        console.log(error);
                    })
                }
            }
        ])
    }

    return(
        <View style={{paddingHorizontal: 15, alignItems:"center"}}>
            <Text style={[styles.fontSizeText, {fontWeight: "bold"}]}>{"Hello " + todo.user?.name + " " + todo.user?.lastName + " share your todo"} </Text>
            <Text style={[styles.fontSizeText, {fontWeight: "800", marginVertical: 10}]}>"{todo.task}"</Text>
            <View style={{width: "100%"}}>
                <Text style={{fontWeight:500}}>Enter the email of the user you want to share your todo with. Share a todo with someone and stay in sync with your goals everyday.</Text>
                <TextInput
                    style={{backgroundColor: "#D4D4D4", color:"black", paddingHorizontal: 10, paddingVertical: 5, marginVertical: 10, shadowColor: '#000', elevation: 5, borderRadius: 8}}
                    placeholder='Enter your contact email'
                    autoCapitalize='none'
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <TouchableOpacity onPress={()=> addTodoShared()} style={{marginVertical: 10}}>
                <Text style={[styles.fontSizeText, {fontWeight: 600, color: email.length > 0 ?  "blue" : "#D4D4D4"}]}>Share</Text>
            </TouchableOpacity>
            <Text style={[styles.title, {fontWeight: "800", marginTop: 15, marginBottom: 5}]}>Participants:</Text>
            <View style={{flexDirection:"row"}}>
                    <Text style={[styles.text, styles.button, {backgroundColor: "green"}]}>You</Text>
                {users.map((user, index)=>(
                    <TouchableHighlight style={[styles.button, {backgroundColor: "red"}]} key={index} onLongPress={()=>deleteUserFromShared(user.id)}>
                        <Text style={[styles.text,]}>{user.userName}</Text>
                    </TouchableHighlight>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    fontSizeText: {
        fontSize: 17
    },
    title: {
        fontSize: 17,
        fontWeight: "800"
    },
    text: {
        fontWeight: "700",
        color: "#fff",
    },
    button: {
        paddingHorizontal: 10, 
        paddingVertical:5, 
        borderRadius: 15, 
        marginTop: 2,
        marginHorizontal: 3
    }
})