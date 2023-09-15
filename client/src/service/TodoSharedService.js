import axios from "axios";

const TODO_BASE = "http://192.168.0.9:8080/api/todo_shared";

class TodoSharedService {
    getAllTodoShared() {//modificar para que solo muestre en login el usuario
        return axios.get(TODO_BASE);
    }
    getTodoShared(todoId) {
        return axios.get(TODO_BASE + "/" + todoId);
    }
    addTodoShared(todoData) {
        return axios.post(TODO_BASE, todoData);
    }
    /*updateTodoShared(todoId, todoData) {
        return axios.put(TODO_BASE + "/" + todoId, todoData)
    }*/
    deleteTodoShared(todoId, todoData) {
        return axios.delete(TODO_BASE + "/" + todoId, todoData)
    }
}

export default new TodoSharedService;