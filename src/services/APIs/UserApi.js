import APIService from "../APIService";
const apiService = new APIService();


export const loginApi = async (inputData) => await apiService.post('/user/login', inputData);
