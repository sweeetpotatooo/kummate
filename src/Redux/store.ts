import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import userReducer from './userSlice';

// Redux store 설정
const store = configureStore({
  reducer: {
    // 리듀서 등록
    user: userReducer,
  },
  // 필요한 미들웨어 추가 (예: thunk)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// RootState 타입 및 AppDispatch 타입 정의
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// useDispatch를 사용할 때 타입을 지정해 주기 위한 커스텀 훅
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
