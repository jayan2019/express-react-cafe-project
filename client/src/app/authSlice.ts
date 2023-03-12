import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IUser {
  email: string;
  cafeId: number;
}

interface IAuthState {
  token: string;
  user?: IUser;
}

const initialState: IAuthState = {
  token: '',
  user: undefined
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addToken(state: IAuthState, action: PayloadAction<IAuthState>) {
      state.token = action.payload.token;
      state.user = action.payload?.user;
    },
    logout(state) {
      state = initialState;
    }
  }
});

export const { addToken, logout } = authSlice.actions;
export default authSlice.reducer;
