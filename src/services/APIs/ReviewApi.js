import APIService from "../APIService";
const apiService = new APIService();


export const getReviewByIdApi = async (inputData) => await apiService.get(`/review/get?productId=${inputData}`);
// export const getAllProductApi = async () => await apiService.get('/product/get/all');
// export const getProductApi = async (itemId) => await apiService.get(`/product/get?id=${itemId}`);
export const addReviewApi = async (inputData) => await apiService.post('/review/add/review', inputData);
export const updateReviewApi = async (inputData) => await apiService.put('/review/update/review', inputData);
export const deleteReviewApi = async (itemId) => await apiService.delete(`/review/delete?id=${itemId}`);
export const getReviewByReviewIdApi = async (inputData) => await apiService.get(`/review/get-review?id=${inputData}`);