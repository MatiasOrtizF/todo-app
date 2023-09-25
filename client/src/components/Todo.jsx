import { TouchableOpacity, Text, View, Image } from 'react-native';
import { useRef } from 'react';
import styles from './Styles';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Modal from './Modal';

export default function Todo ({ todo, deleteTodo, updateTodo }) {
    const bottomSheetModalRef = useRef(null);
    const snapPoints = ["25%", "48%", "75%"];

    function handlePresentModal() {
        bottomSheetModalRef.current?.present();
    }

    return(
        <>
            <View style={styles.list}>
                <View style={{flexDirection:"row" , flex:0.85 , marginRight:"5%"}}>
                    <TouchableOpacity onPress={()=> updateTodo(todo.id)}>
                        {todo.completed ? 
                            <Image source={require('../images/check.png')}
                                style={[styles.img, {marginRight:5}]} 
                            />
                            :
                            <Image source={require('../images/circle.png')}
                                style={[styles.img, {marginRight:5}]} 
                            />
                        }
                    </TouchableOpacity>
                    <Text style={todo.completed && styles.complet}>
                        {todo.task}
                    </Text>
                </View>
                <View style={{flex:0.15, flexDirection: "row"}}>
                    {/* agregar una alerta para eliminar */}
                    <TouchableOpacity onPress={handlePresentModal}>
                        <Image source={require('../images/add-user.png')}
                            style={styles.img}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> deleteTodo(todo.id)}>
                        <Image source={require('../images/cross.png')}
                            style={[styles.img, {marginLeft:10}]} 
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={2}
                snapPoints={snapPoints}
                backgroundStyle={{ borderRadius: 50, borderWidth: 4 }}
            >
                <Modal todo={todo}/>
            </BottomSheetModal>
            </>
    )
}