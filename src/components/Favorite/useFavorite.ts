// src/components/Favorite/useFavorite.ts

import { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../Redux/store";
import { addFavorite, removeFavorite } from "../../components/Favorite/favoritesThunk";
import { toast } from "react-toastify";
import { API_URL } from '../../api';

const useFavorite = (postId: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.user.data.token);
  const [isFavorite, setIsFavorite] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/favorites/${postId}`, {
          headers: {
            Authorization: `Bearer ${token.atk}`,
          },
        });
        setIsFavorite(response.data.data); // Assuming the API returns a boolean
      } catch (error) {
        console.error('Failed to fetch favorite status:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFavoriteStatus();
  }, [postId, token]);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await dispatch(removeFavorite(postId)).unwrap();
        toast.info("즐겨찾기가 해제되었습니다.");
        setIsFavorite(false);
      } else {
        await dispatch(addFavorite(postId)).unwrap();
        toast.success("즐겨찾기에 추가되었습니다.");
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
      toast.error("즐겨찾기 처리에 실패했습니다.");
    }
  };

  return [isFavorite, toggleFavorite, loading] as const;
};

export default useFavorite;
