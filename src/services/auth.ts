import axios, { AxiosResponse } from 'axios';
// import { UserType } from '@/types/index';
import { API_URL } from '@/utils/constant';
// import axiosInstance from 'axiosInterceptor';



interface UserData {
  // Define the structure of user data for registration
  email: string;
  password: string;
  firstName:string;
  lastName:string;
}

interface Credentials {
  // Define the structure of credentials for login
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: any; 
}

const authService = {
  register: async (userData: UserData): Promise<AuthResponse> => {
    // console.log(process.env.NEXT_PUBLIC_API_URL)
    const response: AxiosResponse<AuthResponse> = await axios.post(`${API_URL}/auth/email/register`, userData);
    return response.data;
  },

  login: async (credentials: Credentials): Promise<AuthResponse> => {
    // console.log(API_URL)
    const response: AxiosResponse<AuthResponse> = await axios.post(`${API_URL}/auth/email/login`, credentials);
    return response.data;
  },
};

export default authService;
