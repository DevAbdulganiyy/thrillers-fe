import  { AxiosResponse } from 'axios';
import { API_URL } from '@/utils/constant';
import axiosInstance from '@/axiosInterceptor';


const userService = {

    getUser :async ({ queryKey }:any) => {
        const [_, userId] = queryKey
        const { data } = await axiosInstance.get(`${API_URL}/users/${userId}`)
        return data
    },
    getAllUsers: async (): Promise<any> => {
        const response: AxiosResponse<any> = await axiosInstance.get(`${API_URL}/users`)
        return response.data;
      },
};

export default userService;
