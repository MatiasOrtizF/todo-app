import { TouchableWithoutFeedback, Text, View } from 'react-native';
import styles from './Styles';

export default function Filter ({changeFilter}) {

    const handleCompleted = (value) => {
        changeFilter(value)
    }

    const filters = [
        {name: "All", value: "all"},
        {name: "Actived", value: false},
        {name: "Completed", value: true}
    ]

    return(
        //onPress={}
        <View style={styles.btns}>
            {filters.map((filter, index)=> (
            <TouchableWithoutFeedback onPress={()=> handleCompleted(filter.value)} key={index}>
                <Text style={{marginHorizontal: 10 , fontWeight: 'bold' , color:"#5b6e7d"}}>{filter.name}</Text>
            </TouchableWithoutFeedback>
            ))}
        </View>
    )
}