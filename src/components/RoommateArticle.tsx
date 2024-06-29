import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './RoommateArticle.module.css';

Modal.setAppElement('#root'); // ReactModal의 접근성을 위한 설정

interface Post {
  title: string;
  date: string;
  participants: string;
  tags: string[];
  content: string;
}

const RoommateArticle: React.FC = () => {
  const [posts] = useState<Post[]>([
    { title: 'TITLE', date: '2023-10-10', participants: '2/4', tags: ['실내형', '흡연'], content: 'This is the content of the post.' },
    { title: 'TITLE', date: '2023-10-10', participants: '2/4', tags: ['실내형', '흡연'], content: 'This is the content of the post.' },
    { title: 'TITLE', date: '2023-10-10', participants: '2/4', tags: ['실내형', '흡연'], content: 'This is the content of the post.' },
    { title: 'TITLE', date: '2023-10-10', participants: '2/4', tags: ['실내형', '흡연'], content: 'This is the content of the post.' },
    { title: 'TITLE', date: '2023-10-10', participants: '2/4', tags: ['실내형', '흡연'], content: 'This is the content of the post.' },
    { title: 'TITLE', date: '2023-10-10', participants: '2/4', tags: ['실내형', '흡연'], content: 'This is the content of the post.' },
    { title: 'TITLE', date: '2023-10-10', participants: '2/4', tags: ['실내형', '흡연'], content: 'This is the content of the post.' },
    { title: 'TITLE', date: '2023-10-10', participants: '2/4', tags: ['실내형', '흡연'], content: 'This is the content of the post.' },
    { title: 'TITLE', date: '2023-10-10', participants: '2/4', tags: ['실내형', '흡연'], content: 'This is the content of the post.' },
    { title: 'TITLE', date: '2023-10-10', participants: '2/4', tags: ['실내형', '흡연'], content: 'This is the content of the post.' },
    { title: 'TITLE', date: '2023-10-10', participants: '2/4', tags: ['실내형', '흡연'], content: 'This is the content of the post.' },
    { title: 'TITLE', date: '2023-10-10', participants: '2/4', tags: ['실내형', '흡연'], content: 'This is the content of the post.' },
    { title: 'TITLE', date: '2023-10-10', participants: '2/4', tags: ['실내형', '흡연'], content: 'This is the content of the post.' },
    { title: 'TITLE', date: '2023-10-10', participants: '2/4', tags: ['실내형', '흡연'], content: 'This is the content of the post.' },
    { title: 'TITLE', date: '2023-10-10', participants: '2/4', tags: ['실내형', '흡연'], content: 'This is the content of the post.' },
    { title: 'TITLE', date: '2023-10-10', participants: '2/4', tags: ['실내형', '흡연'], content: 'This is the content of the post.' },
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
        <div className={styles['post-header']}>모시래 4인</div>
        <div className={styles['post-title']}>{post.title}</div>
        <div className={styles['post-date']}>{post.date}</div>
        <div className={styles['post-participants']}>{post.participants}</div>
        <div className={styles['post-tags']}>
          {post.tags.map((tag, tagIndex) => (
            <span key={tagIndex} className={styles['post-tag']}>{tag}</span>
          ))}
        </div>
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
            <h2>{selectedPost.title}</h2>
            <p>{selectedPost.content}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RoommateArticle;
