import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  token: string | null; // token 속성을 정의합니다.
}

const initialState: UserState = {
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    clearToken(state) {
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = userSlice.actions;

export default userSlice.reducer;
