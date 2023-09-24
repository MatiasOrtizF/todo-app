import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
    bg: {
        flex: 0.3
    },
    img: {
        width: 20, 
        height: 20
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
    listEmptyText: {
        fontSize:17, 
        fontWeight:'bold', 
        color:"#242424"
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
    complet: {
        textDecorationLine: 'line-through'
    },
    btns: {
        flexDirection: "row",
        justifyContent: 'center',
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 7,
    },
    /*Login*/
    loginContainer: {
        flex:1,
        justifyContent: "center",
        padding: 35
    },
    inputText: {
        backgroundColor: "#D4D4D4", 
        color:"#787878", 
        paddingHorizontal: 10, 
        paddingVertical: 5, 
        marginVertical: 10, 
        shadowColor: '#000', 
        elevation: 5, 
        borderRadius: 8
    },
    btn: {
        backgroundColor: "orange", 
        alignSelf: 'flex-end', 
        paddingVertical: 10, 
        paddingHorizontal:25, 
        borderRadius: 30
    }
});

export default styles;