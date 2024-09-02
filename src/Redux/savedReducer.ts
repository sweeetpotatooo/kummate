import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// SavedState 타입 정의: postId를 키로 하고, 저장 상태를 boolean으로 가지는 Record 타입
type SavedState = Record<string, boolean>

// 초기 상태 정의: 빈 객체
const initialState: SavedState = {}

// savedFavorite 슬라이스 정의
const savedFavoriteSlice = createSlice({
  name: 'saved',          // 슬라이스 이름
  initialState,           // 초기 상태 설정
  reducers: {
    // 저장 상태를 설정하는 액션
    setSaved(state, action: PayloadAction<{ postId: number, isSaved: boolean }>) {
      const { postId, isSaved } = action.payload
      state[postId] = isSaved   // postId를 키로 하여 저장 상태를 업데이트
    },
  },
})

// 액션 생성자 및 리듀서 내보내기
export const { setSaved } = savedFavoriteSlice.actions
export default savedFavoriteSlice.reducer
