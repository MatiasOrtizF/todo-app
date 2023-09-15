import axios from "axios";

const TODO_BASE = "http://192.168.0.9:8080/api/todo";

class TodoService {
    getAllTodo() {//modificar para que solo muestre en login el usuario
        return axios.get(TODO_BASE);
    }
    getTodo(todoId) {
        return axios.get(TODO_BASE + "/" + todoId);
    }
    addTodo(todoData) {
        return axios.post(TODO_BASE, todoData);
    }
    updateTodo(todoId, todoData) {
        return axios.put(TODO_BASE + "/" + todoId)
    }
    deleteTodo(todoId) {
        return axios.delete(TODO_BASE + "/" + todoId)
    }
}

export default new TodoService;