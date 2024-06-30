import React, { useState } from 'react';
import Modal from 'react-modal';
import Group from './Group'; // Group 컴포넌트 경로를 맞게 수정하세요
import styles from './RoommateArticle.module.css';

Modal.setAppElement('#root'); // ReactModal의 접근성을 위한 설정

interface Post {
  Title: string;
  Dormtype: string;
  Now_Num: number;
  Max_Num: number;
  Gender: string;
  Date: string;
  Tag1: string;
  Tag2: string;
  Content: string;
}

const RoommateArticle: React.FC = () => {
  const [posts] = useState<Post[]>([
    {
      Title: 'TITLE',
      Dormtype: '모시러 4인',
      Now_Num: 2,
      Max_Num: 4,
      Gender: '남성',
      Date: '2023-10-10',
      Tag1: '실내형',
      Tag2: '흡연',
      Content: 'This is the content of the post.'
    },
    {
      Title: 'TITLE',
      Dormtype: '모시러 4인',
      Now_Num: 2,
      Max_Num: 4,
      Gender: '남성',
      Date: '2023-10-10',
      Tag1: '실내형',
      Tag2: '흡연',
      Content: 'This is the content of the post.'
    },
    // ... 나머지 게시물들
  ]);
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
        <Group Info={post} />
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Post Modal"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        {selectedPost && (
          <div>
            <h2>{selectedPost.Title}</h2>
            <p>{selectedPost.Content}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
      <div className={styles.footer}>FOOTER</div>
    </div>
  );
};

export default RoommateArticle;
