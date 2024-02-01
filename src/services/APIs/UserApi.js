import APIService from "../APIService";
const apiService = new APIService();


export const loginApi = async (inputData) => await apiService.post("/user/login", inputData);
export const registerApi = async (inputData) => await apiService.post("/user/add", inputData);
export const getUserApi = async (inputData) => await apiService.get("/user/getuser", inputData);
export const getUsersByUserIdApi = async (inputData) => await apiService.post('/user/getusers',inputData);
export const applyAsSellerApi = async (inputData) => await apiService.post("/user/updateUserToSeller", inputData);
export const deleteAccountApi = async (inputData) => await apiService.delete("/user/deleteAccount", inputData);

