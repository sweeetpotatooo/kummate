/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/Favorite/favoritesThunk.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../Redux/store';
import { API_URL } from '../../api';
import { Post } from '../../interface/interface';

// Favorite 타입 정의 (필요에 따라 조정)
interface Favorite {
  id: number;
  created_at: string;
  user_id: number;
  article_id: number;
  article: Post; // Favorite 객체에 관련된 Article(Post) 정보 포함
}

// 즐겨찾기 목록 가져오기
export const fetchFavorites = createAsyncThunk<
  Post[], // 반환 타입
  void,    // 인자 타입
  { state: RootState }
>(
  'favorites/fetchFavorites',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().user.data.token;
    try {
      const response = await axios.get(`${API_URL}/api/favorites`, {
        headers: {
          Authorization: `Bearer ${token.atk}`, // atk는 access token으로 가정
        },
      });
      console.log('API Response:', response.data); // 응답 데이터 확인
      const favorites: Favorite[] = response.data.data; // ApiResponse<Favorite[]> 형태로 가정
      const posts: Post[] = favorites.map(fav => fav.article);
      console.log('Mapped posts:', posts); // 매핑된 게시글 확인
      return posts;
    } catch (error: any) {
      console.error('Fetch Favorites Error:', error); // 에러 로그 추가
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch favorites');
    }
  }
);


// 즐겨찾기 추가
export const addFavorite = createAsyncThunk<
  Post,    // 반환 타입 (추가된 Post 객체)
  number,  // 인자 타입 (articleId)
  { state: RootState }
>(
  'favorites/addFavorite',
  async (article_id, { getState, rejectWithValue }) => {
    const token = getState().user.data.token;
    try {
      const response = await axios.post(
        `${API_URL}/api/favorites`,
        { article_id },
        {
          headers: {
            Authorization: `Bearer ${token.atk}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const favorite: Favorite = response.data.data; // ApiResponse<Favorite> 형태로 가정
      return favorite.article; // Favorite 객체에서 Post 객체 추출
    } catch (error: any) {
      if (error.response?.status === 409) {
        // 중복 즐겨찾기인 경우 처리 (예: 자동으로 제거)
        return rejectWithValue('이미 즐겨찾기한 게시글입니다.');
      }
      return rejectWithValue(error.response?.data?.message || 'Failed to add favorite');
    }
  }
);

// 즐겨찾기 제거
export const removeFavorite = createAsyncThunk<
  number,  // 반환 타입 (제거된 articleId)
  number,  // 인자 타입 (articleId)
  { state: RootState }
>(
  'favorites/removeFavorite',
  async (article_id, { getState, rejectWithValue }) => {
    const token = getState().user.data.token;
    try {
      await axios.delete(`${API_URL}/api/favorites`, {
        data: { article_id },
        headers: {
          Authorization: `Bearer ${token.atk}`,
          'Content-Type': 'application/json',
        },
      });
      return article_id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove favorite');
    }
  }
);
