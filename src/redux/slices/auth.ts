import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { UserType } from '@/types/index';

type UserType = {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    photo:string | null;
    status:string;
    role:string;
  
  }

interface AuthState {
  isAuthenticated: boolean;
  user: null | UserType | any; // Adjust UserType based on your user structure
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<UserType | any>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
