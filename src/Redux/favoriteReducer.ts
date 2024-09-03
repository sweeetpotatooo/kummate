import { createSlice } from '@reduxjs/toolkit'
import { fetchFavorites } from '../components/Favorite/favoritesThunk'

// favorites 슬라이스 정의
const favoritesSlice = createSlice({
  name: 'favorites',      // 슬라이스 이름
  initialState: [],       // 초기 상태: 빈 배열
  reducers: {},           // 동기 액션은 없음
  extraReducers: builder => {
    // fetchFavorites 비동기 작업이 성공적으로 완료된 경우
    builder.addCase(fetchFavorites.fulfilled, (_state, action) => {
      return action.payload  // 응답된 데이터를 상태로 설정
    })
  }
})

// 슬라이스 리듀서 내보내기
export default favoritesSlice.reducer
