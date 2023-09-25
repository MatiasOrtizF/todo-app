import axios from "axios";

const TODO_BASE = "http://192.168.0.9:8080/api/todo_shared";

class TodoSharedService {
    addTodoShared(email, todoData, token) {
        const config = {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }
        return axios.post(TODO_BASE + "?userEmail=" + email, todoData, config);
    }
    deleteTodoShared(todoId, userId, token) {
        const config = {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            params: {
                userId: userId,
                todoId: todoId
            }
        }
        return axios.delete(TODO_BASE, config)
    }
    getTodoInShared(todoId, token) {
        const config = {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }
        return axios.get(TODO_BASE + "/all/" + todoId, config)
    }
}

export default new TodoSharedService;