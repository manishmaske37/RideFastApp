import axios from "axios";

const API_BASE_URL = "https://api.zenevo.in/support-service/users";

class UserService {
    // Fetch all users
    async getAllUsers() {
        try {
            const response = await axios.get(API_BASE_URL);
            return response.data; // return the user list
        } catch (error) {
            console.error("Error fetching all users:", error);
            throw error;
        }
    }
}

export default new UserService();