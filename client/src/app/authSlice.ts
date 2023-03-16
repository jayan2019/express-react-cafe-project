import { themeConfig } from '../config/theme';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IUser {
  id: number;
  email: string;
  cafe_id: number;
  last_name?: string;
  first_name?: string;
  refresh_token?: string;
}

interface ILoginResponse {
  token: string;
  user?: IUser;
}

interface IAuthState extends ILoginResponse {
  theme: string;
}

const initialState: IAuthState = {
  token: '',
  user: undefined,
  theme: themeConfig.DARK
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addToken(state: IAuthState, action: PayloadAction<ILoginResponse>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout(state) {
      state = initialState;
    },
    changeTheme(state, action: PayloadAction<string>) {
      state.theme = action.payload;
    }
  }
});

export const { addToken, logout, changeTheme } = authSlice.actions;
export default authSlice.reducer;
