//src/Redux/store.ts
import { Action, ThunkAction, ThunkDispatch, configureStore } from "@reduxjs/toolkit"
import { useDispatch as useReduxDispatch } from 'react-redux'
import userReducer from "./user"
import { saveToLocalStorage } from "./localStorage"
import savedReducer from './savedReducer'
import favoriteReducer from "./favoriteReducer"
import applicantReducer from './applicantReducer'
import applyReducer from "./applyReducer"
import applySavedReducer from "./applySavedReducer"

// Redux 스토어 구성
export const store = configureStore({
  reducer: {
    user: userReducer,         // 사용자 관련 상태
    saved: savedReducer,       // 저장된 항목 관련 상태
    favorites: favoriteReducer, // 즐겨찾기 관련 상태
    apply: applyReducer,       // 신청 관련 상태
    applySaved: applySavedReducer, // 신청 저장 관련 상태
    applicant: applicantReducer // 신청자 관련 상태
  },
})

// 스토어 상태 변화 감지 시 사용자 상태를 로컬 스토리지에 저장
store.subscribe(() => saveToLocalStorage(store.getState().user))

// RootState 및 Dispatch 타입 정의
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

// ThunkDispatch를 확장한 ModifiedDispatch 타입 정의
export type ModifiedDispatch = ThunkDispatch<RootState, unknown, Action<string>>

// useDispatch 훅에 ModifiedDispatch 타입 적용
export const useDispatch = () => useReduxDispatch<ModifiedDispatch>()
