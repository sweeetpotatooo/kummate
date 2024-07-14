import React, { useState } from 'react';
import ArticleCard from './ArticleCard';
import Modal from './ArticleModal';
import PostForm from './PostForm';
import styles from './RoommateArticle.module.css';
import Info from './Info.json';
import Profiles from './profile.json';

interface Post {
  Title: string;
  Dormtype: string;
  Now_Num: number;
  Max_Num: number;
  Gender: string;
  Date: string;
  tags: string[];
  Content: string;
  Author: string;
}

interface Profile {
  age: number;
  major: string;
  mbti: string;
  smoker: boolean;
  snorer: boolean;
  teethGrinder: boolean;
}

interface ProfilesType {
  [key: string]: Profile;
}

const RoommateArticle: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(Object.values(Info) as Post[]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const postsPerPage = 12;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const openModal = (post: Post) => {
    setSelectedPost(post);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPost(null);
  };

  const handleNewPost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  const renderPosts = () => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const selectedPosts = posts.slice(startIndex, startIndex + postsPerPage);
    return selectedPosts.map((post, index) => (
      <div key={index} className={styles['post-card']} onClick={() => openModal(post)}>
        <ArticleCard Info={post} />
      </div>
    ));
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return (
      <div className={styles.pagination}>
        {pageNumbers.map(number => (
          <span
            key={number}
            className={`${styles['page-number']} ${currentPage === number ? styles.active : ''}`}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className={styles['roommate-article']}>
      <h1>룸메이트 구해요</h1>
      <PostForm onSubmit={handleNewPost} />
      <div className={styles['posts-grid']}>{renderPosts()}</div>
      {renderPagination()}
      {selectedPost && (
        <Modal
          isOpen={modalIsOpen}
          onClose={closeModal}
          status="진행"
          title={selectedPost.Title}
          profile={(Profiles as ProfilesType)[selectedPost.Author]}
          content={selectedPost.Content}
        />
      )}
    </div>
  );
};

export default RoommateArticle;
