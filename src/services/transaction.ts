import { AxiosResponse } from 'axios';
import { API_URL } from '@/utils/constant';
import axiosInstance from '@/axiosInterceptor';


const transactionService = {
  create: async (data:any): Promise<any> => {
    const response: AxiosResponse<any> = await axiosInstance.post(`${API_URL}/transactions`, data);
    return response.data;
  },

  getUserTransactions: async (): Promise<any> => {
    const response: AxiosResponse<any> = await axiosInstance.get(`${API_URL}/transactions/user`);
    return response.data;
  },
};

export default transactionService;
