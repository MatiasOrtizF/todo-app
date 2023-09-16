import { ScrollView, TouchableOpacity, TouchableWithoutFeedback, Text, View, Image, ImageBackground, TextInput, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import styles from '../components/Styles';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

export default function Login () {
    const navigation = useNavigation();

    return(
        <View style={styles.loginContainer}>
            <StatusBar style="dark"/>
            <Text style={{fontWeight:800, fontSize: 35}}>Login</Text>
            <Text style={{color: "#787878"}}>Please sign in to continue.</Text>
            <View style={{marginVertical: 25}}>
                <TextInput
                    style={{backgroundColor: "#D4D4D4", color:"#787878", paddingHorizontal: 10, paddingVertical: 5, marginVertical: 10, shadowColor: '#000', elevation: 5, borderRadius: 8}}
                    placeholder='email'
                    autoCapitalize='none'
                />
                <TextInput
                    style={{backgroundColor: "#D4D4D4", color:"#787878", paddingHorizontal: 10, paddingVertical: 5, marginVertical: 10, shadowColor: '#000', elevation: 5, borderRadius: 8}}
                    placeholder='password'
                    secureTextEntry={true}
                    autoCapitalize='none'
                />
            </View>
            <TouchableOpacity onPress={()=> navigation.navigate('Main')} style={{backgroundColor: "orange", alignSelf: 'flex-end', paddingVertical: 10, paddingHorizontal:25, borderRadius: 30}}>
                <Text style={{color: "white"}}>LOGIN</Text>
            </TouchableOpacity>
        </View>
    )
}