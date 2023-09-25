import { TouchableOpacity, Text, View, TextInput } from 'react-native';
import { useState } from 'react';
import styles from '../components/Styles';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import LoginService from '../service/LoginService';
import { useData } from '../hooks/dataContext';

export default function Login () {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {setToken, setUserId} = useData();

    const authenticationUser = () => {
        const userData = {email, password}
        LoginService.login(userData).then((response)=> {
            setToken(response.data.token);
            setUserId(response.data.user.id);
            navigation.navigate('Main')
        }).catch(error=> {
            if (error.response && error.response.status === 400) {
                alert(error.response.data);
            } else {
                console.error("Error:", error);
            }
        })
    }

    return(
        <View style={styles.loginContainer}>
            <StatusBar style="dark"/>
            <Text style={{fontWeight:800, fontSize: 35}}>Login</Text>
            <Text style={{color: "#787878"}}>Please sign in to continue.</Text>
            <View style={{marginVertical: 25}}>
                <TextInput
                    style={styles.inputText}
                    placeholder='email'
                    autoCapitalize='none'
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.inputText}
                    placeholder='password'
                    secureTextEntry={true}
                    autoCapitalize='none'
                    onChangeText={setPassword}
                />
            </View>
            <TouchableOpacity onPress={()=> authenticationUser()} style={styles.btn}>
                <Text style={{color: "white"}}>LOGIN</Text>
            </TouchableOpacity>
        </View>
    )
}