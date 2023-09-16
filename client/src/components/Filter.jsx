import { TouchableWithoutFeedback, Text, View } from 'react-native';
import styles from './Styles';

export default function Filter ({changeFilter}) {

    const filter = () => {
        changeFilter(prevState=> ({
            ...prevState,
        }))
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
            <TouchableWithoutFeedback key={index}>
                <Text style={{marginHorizontal: 10 , fontWeight: 'bold' , color:"#5b6e7d"}}>{filter.name}</Text>
            </TouchableWithoutFeedback>
            ))}
        </View>
    )
}