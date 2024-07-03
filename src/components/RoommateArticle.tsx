import React, { useState } from 'react';
import ArticleCard from './ArticleCard';
import Modal from './ArticleModal';
import styles from './RoommateArticle.module.css';
import Info from './Info.json';

interface Post {
  Title: string;
  Dormtype: string;
  Now_Num: number;
  Max_Num: number;
  Gender: string;
  Date: string;
  tags: string[];
  Content: string;
}

const RoommateArticle: React.FC = () => {
  const [posts] = useState<Post[]>(Object.values(Info) as Post[]);
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
      <div className={styles['posts-grid']}>{renderPosts()}</div>
      {renderPagination()}
      {selectedPost && (
        <Modal
          isOpen={modalIsOpen}
          onClose={closeModal}
          status="진행"  // or '종료', as per your logic
          title={selectedPost.Title}
          profile={{
            age: 25, // Replace with actual data
            major: '컴퓨터공학', // Replace with actual data
            mbti: 'INTJ', // Replace with actual data
            smoker: false, // Replace with actual data
            snorer: true, // Replace with actual data
            teethGrinder: false, // Replace with actual data
          }}
          content={selectedPost.Content}
        />
      )}
    </div>
  );
};

export default RoommateArticle;
