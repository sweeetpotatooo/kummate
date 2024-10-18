//src/Redux/favoriteReducer.ts
import { createSlice } from '@reduxjs/toolkit'
import { fetchFavorites } from '../components/Favorite/favoritesThunk'
import { Post } from '../interface/interface';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [] as Post[], // 배열로 초기화
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFavorites.fulfilled, (_state, action) => {
      return action.payload; // 배열로 상태 업데이트
    });
  },
});

export default favoritesSlice.reducer;