import axios from 'axios';

//const API_URL = `${import.meta.env.VITE_API_URL}/auth`;
const API_URL = `https://localhost:7208/api/auth`;

export const login = async (username, password) => {
    console.log('auth service login');
    try {
        console.log('API_URL', API_URL);

        const response = await axios.post(`${API_URL}/login`, { username, password });
        localStorage.setItem('token', response.data.token);
        return response.data.token;
    } catch (error) {
        console.error("Error logging in", error);
        throw error;
    }
};

export const getUserDetails = async () => {
    try {
        console.log('API_URL', API_URL);

        const response = await axios.get(`${API_URL}/userDetails`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Add your token if required
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
};

export const register = async (email,password,confirmPassword) => {
    try {
        await axios.post(`${API_URL}/register`, { email, password, confirmPassword });
    } catch (error) {
        console.error("Error logging in", error);
        throw error;
    }
};

export const getAuthToken = () => {
    console.log('API_URL', API_URL);

    return localStorage.getItem('token');
};

export const isAuthenticated = () => {
    return !!getAuthToken();
};

export const logout = () => {
    localStorage.removeItem('token');
};
