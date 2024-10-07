//src/Redux/favoriteReducer.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../interface/interface';
import { fetchFavorites, addFavorite, removeFavorite } from '../components/Favorite/favoritesThunk';

interface FavoritesState {
  items: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: FavoritesState = {
  items: [],
  status: 'idle',
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchFavorites
      .addCase(fetchFavorites.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action: PayloadAction<Post[]>) => {
        console.log('Fetched favorites:', action.payload);
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // addFavorite
      .addCase(addFavorite.fulfilled, (state, action: PayloadAction<Post>) => {
        state.items.push(action.payload);
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // removeFavorite
      .addCase(removeFavorite.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((post) => post.id !== action.payload);
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default favoritesSlice.reducer;
