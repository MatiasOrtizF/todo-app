import axios from "axios";
import { useData } from "../hooks/dataContext";

const TODO_BASE = "http://192.168.0.9:8080/api/todo";

const {token} = useData();

const config = {
    headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
    }
}

class TodoService {
    getAllTodo() {//modificar para que solo muestre en login el usuario
        return axios.get(TODO_BASE, config);
    }
    getTodo(todoId) {
        return axios.get(TODO_BASE + "/" + todoId, config);
    }
    addTodo(todoData) {
        return axios.post(TODO_BASE, todoData, config);
    }
    updateTodo(todoId) {
        return axios.put(TODO_BASE + "/" + todoId, config)
    }
    deleteTodo(todoId) {
        return axios.delete(TODO_BASE + "/" + todoId, config)
    }
}

export default new TodoService;