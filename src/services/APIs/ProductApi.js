import APIService from "../APIService";
const apiService = new APIService();


export const getProductListApi = async (inputData) => await apiService.get(`/product/get/list?limit=${inputData?.limit}&offset=${inputData?.offset}`);
export const getAllProductApi = async () => await apiService.get('/product/get/all');
export const addProductApi = async (inputData) => await apiService.post('/product/add', inputData);
export const updateProductApi = async (inputData) => await apiService.post('/product/update', inputData);
export const deleteProductApi = async (itemId) => await apiService.delete(`/product/delete?id=${itemId}`);
