import { useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import TodoSharedService from '../service/TodoSharedService';
import AuthService from '../service/AuthService';

export default function Modal ({todo}) {
    const [email, setEmail] = useState("");
    const [users, setUsers] = useState([]);
    useEffect(()=> {
        listUsers();
    },[])

    const listUsers = () => {
        TodoSharedService.getTodoInShared(todo.id).then(response=> {
            const usersNames = response.data.map((data)=> data.name).filter(Boolean);
            setUsers(usersNames);
        }).catch(error=> {
            console.log(error);
        })
    }

    const checkUser = () => {
        AuthService.checkUser(email).then(response=> {
            if(response.data) {
                Alert.alert("The user was added successfully")
                // verificar si ya esta agregado el usuario.
                // agregar el todo a todo_shared
            } else {
                Alert.alert("Email is incorrect")
            }
        })
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
                    onChangeText={setEmail}
                />
            </View>
            <TouchableOpacity onPress={()=> checkUser()} style={{marginVertical: 10}}>
                <Text style={[styles.fontSizeText, {fontWeight: 600, color: email.length > 0 ?  "blue" : "#D4D4D4"}]}>Share</Text>
            </TouchableOpacity>
            <Text style={[styles.title, {fontWeight: "800", marginTop: 15, marginBottom: 5}]}>Participants:</Text>
            <View style={{flexDirection:"row"}}>
                {users.map((user, index)=>(
                    <Text key={index} style={[styles.text, {backgroundColor: "red"}]}>{user}</Text>
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
        paddingHorizontal: 10, 
        paddingVertical:5, 
        borderRadius: 15, 
        marginTop: 2
    }
})