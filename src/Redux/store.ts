// src/Redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Redux/user';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  // 추가적으로 미들웨어를 설정할 수 있습니다.
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware(),
  // Redux DevTools 설정 (프로덕션에서는 비활성화하는 것이 일반적입니다)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
