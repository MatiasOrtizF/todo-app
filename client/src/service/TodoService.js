import axios from "axios";

const TODO_BASE = "http://192.168.0.6:8080/api/todo";


class TodoService {
    getAllTodo(token) {//modificar para que solo muestre en login el usuario
        const config = {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }
        return axios.get(TODO_BASE, config);
    }
    getTodo(todoId, token) {
        const config = {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }
        return axios.get(TODO_BASE + "/" + todoId, config);
    }
    addTodo(todoData, token) {
        const config = {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }
        return axios.post(TODO_BASE, todoData, config);
    }
    updateTodo(todoId, token) {
        const config = {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }
        return axios.put(TODO_BASE + "/" + todoId, null, config)
    }
    deleteTodo(todoId, token) {
        const config = {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }
        return axios.delete(TODO_BASE + "/" + todoId, config)
    }
    deleteCompletedTodos(token) {
        const config = {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }
        return axios.delete(TODO_BASE + "/completed", config)
    }
}

export default new TodoService;