import axios from "axios";

const TODO_BASE = "http://192.168.0.6:8080/api/login";

class LoginService {
    login(userData) {
        return axios.post(TODO_BASE, userData);
    }
}

export default new LoginService;