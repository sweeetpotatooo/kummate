// src/pages/MyPage/Favorites/Favorite.tsx

import { useEffect, useState } from 'react';
import MyPage from '../myPage';
import styles from './favorite.module.css';
import { Post } from '../../../interface/interface';
import PostModal from '../../../components/PostModal/postModal';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../Redux/store';
import { fetchFavorites } from '../../../components/Favorite/favoritesThunk';
import PostCard from '../../../components/PostCard/postCard';

const Favorite = () => {
  const dispatch: AppDispatch = useDispatch();
  const { items: favorites, status, error } = useSelector((state: RootState) => state.favorites);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleCloseModal = () => {
    setSelectedPost(null);
  };
  useEffect(() => {
    console.log('Selected Post:', selectedPost);
  }, [selectedPost]);

  useEffect(() => {
    console.log('Favorites state:', favorites);
  }, [favorites]);
  
  // 찜한 목록 가져오기
  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>; // 로딩 상태 표시
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>; // 에러 상태 표시
  }

  return (
    <>
      <MyPage />
      <div className={styles.favoriteContainer}>
        {favorites.length === 0 ? (
          <div className={styles.emptyFavorites}>
            관심 있는 게시글이 없습니다
          </div>
        ) : (
          <div className={styles.cardGrid}>
            <PostCard posts={favorites} onPostClick={setSelectedPost} />
          </div>
        )}
        {selectedPost && (
          <PostModal
            post={selectedPost}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </>
  );
};

export default Favorite;
