import axios from "axios";

const TODO_BASE = "http://192.168.0.9:8080/api/check_user";

class AuthService {
    checkUser(email) {
        return axios.post(TODO_BASE,null, {
            params: {email: email},
        });
    }
}

export default new AuthService;