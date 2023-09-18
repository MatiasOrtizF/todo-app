import { ScrollView, TouchableOpacity, TouchableWithoutFeedback, Text, View, Image, ImageBackground, TextInput, Alert, BackHandler } from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Styles';
import Filter from './Filter';
import TodoService from '../service/TodoService';
import { StatusBar } from 'expo-status-bar';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Modal from './Modal';
import { FlatList } from 'react-native-gesture-handler';

export default function Todo ({ todo, deleteTodo, handleSnapPress, complet }) {
    return(
            <View style={styles.list}>
                <View style={{flexDirection:"row" , flex:0.85 , marginRight:"5%"}}>
                    <TouchableOpacity onPress={()=> complet(todo.id)}>
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
                    <TouchableOpacity onPress={()=> handleSnapPress(0, todo)}>
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
    )
}