import APIService from "../APIService";
const apiService = new APIService();


export const getOrderListApi = async (inputData) => await apiService.get(`/order/get/list?limit=${inputData?.limit}&offset=${inputData?.offset}`);
export const getAllOrderApi = async () => await apiService.get('/order/get/all');
export const addOrderApi = async (inputData) => await apiService.post('/order/add', inputData);
export const updateOrderApi = async (inputData) => await apiService.put('/order/update', inputData);
export const deleteOrderApi = async (itemId) => await apiService.delete(`/order/delete?id=${itemId}`);


