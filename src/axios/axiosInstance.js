import axios from 'axios'

export const axiosInstance = axios.create({
	baseURL: 'http://localhost:5173/',
	timeout: 1000,
});

export const getAllergies = async () => {
	const response = await axiosInstance.get('/allergies');
	return response.data;
}

export const getUsers = async () => {
	const response = await axiosInstance.get('/users');
	return response.data;
}

export const getUserById = async (id) => {
	const response = await axiosInstance.get(`/users/${id}`);
	return response.data;
}

export const addUser = async (user) => {
	const response = await axiosInstance.post('/addUser', user);
	return response.data;
}

export const updateUserEmail = async (id, payload) => {
	const response = await axiosInstance.put(`/updateUserEmail/${id}`, payload);
	return response.data;
}

export const updateUserPhone = async (id, payload) => {
	const response = await axiosInstance.put(`/updateUserPhone/${id}`, payload);
	return response.data;
}

export const updateUserAllergies = async (id, payload) => {
	const response = await axiosInstance.put(`/updateUserAllergies/${id}`, payload);
	return response.data;
}