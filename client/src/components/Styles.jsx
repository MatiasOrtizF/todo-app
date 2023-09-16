import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#d4dce6",
        width: "100%",
    },
    bg: {
        flex: 0.3
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
    }
});

export default styles;