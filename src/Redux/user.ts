// src/Redux/user.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';

// 사용자 상태에 대한 초기값 정의
interface UserState {
  data: {
    token: string | null;
    username: string | null;
  };
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: {
    token: null,
    username: null,
  },
  loading: false,
  error: null,
};

// 사용자 로그아웃을 위한 비동기 Thunk 함수
export const logOutUser = createAsyncThunk(
  'user/logOutUser',
  async (payload: { userToken: string }, thunkAPI) => {
    try {
      // 여기서 API 호출을 통해 사용자 로그아웃을 처리할 수 있습니다.
      // 예: await api.post('/logout', { token: payload.userToken });
      return {}; // 성공 시 API가 빈 객체를 반환한다고 가정
    } catch (error) {
      return thunkAPI.rejectWithValue('로그아웃 실패');
    }
  }
);

// 사용자 슬라이스 정의
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 사용자 데이터를 설정하는 리듀서 (보통 로그인 시 사용)
    setUser: (state, action) => {
      state.data.token = action.payload.token;
      state.data.username = action.payload.username;
    },
    // 사용자 데이터를 초기화하는 리듀서 (로그아웃 시 사용 가능)
    clearUser: (state) => {
      state.data.token = null;
      state.data.username = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(logOutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.loading = false;
        state.data.token = null;
        state.data.username = null;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
