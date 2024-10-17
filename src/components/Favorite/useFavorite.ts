// src/components/Favorite/useFavorite.ts

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../../Redux/store";
import { API_URL, userFavorite } from '../../api';
import { fetchFavorites } from './favoritesThunk';
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

const useFavorite = (postId: number) => {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const favorites = useSelector((state: RootState) => state.favorites);
  const userToken = useSelector((state: RootState) => state.user.data.token);

  // 현재 포스트가 찜 목록에 있는지 확인
  const isFavorite = favorites.some((favorite) => favorite.id === postId);

  // 찜하기, 취소하기
  const toggleFavorite = async () => {
    try {
      const response = await fetch(`${API_URL}/api/${userFavorite}/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken.atk}`,
        },
      });

      if (!response.ok) {
        throw new Error("찜하기를 처리하는데 실패했습니다.");
      }

      // 찜 목록을 다시 불러옵니다.
      dispatch(fetchFavorites());
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return [isFavorite, toggleFavorite] as const;
};

export default useFavorite;
