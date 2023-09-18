import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function Modal ({todoModal}) {
    const [email, setEmail] = useState("");
    return(
        <View style={{paddingHorizontal: 15}}>
            <Text>{"Hello " + todoModal?.user?.name + " " + todoModal.user?.lastName + " share your todo"} </Text>
            <Text>{todoModal.task}</Text>
            <Text>Enter the email of the user you want to share your todo with. Share a todo with someone and stay in sync with your goals everyday.</Text>
            <TextInput
                    style={{backgroundColor: "#D4D4D4", color:"#787878", paddingHorizontal: 10, paddingVertical: 5, marginVertical: 10, shadowColor: '#000', elevation: 5, borderRadius: 8}}
                    placeholder='email'
                    autoCapitalize='none'
                    onChangeText={setEmail}
            />
            <TouchableOpacity>
                <Text>Share</Text>
            </TouchableOpacity>
        </View>
    )
}