import axios from "axios";
import { useData } from "../hooks/dataContext";

const TODO_BASE = "http://192.168.0.9:8080/api/todo_shared";

const {token} = useData();

const config = {
    headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
    }
}

class TodoSharedService {
    addTodoShared(todoData) {
        return axios.post(TODO_BASE, todoData, config);
    }
    deleteTodoShared(todoId, todoData) {
        return axios.delete(TODO_BASE + "/" + todoId, todoData, config)
    }
    getTodoInShared(todoId) {
        return axios.get("http://192.168.0.9:8080/api/todo_in_shared" + "/" + todoId, config)
    }
}

export default new TodoSharedService;