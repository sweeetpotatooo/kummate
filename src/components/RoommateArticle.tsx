import React, { useState } from 'react';
import Modal from 'react-modal';
import './App.css';

Modal.setAppElement('#root');

interface Post {
  id: number;
  title: string;
  content: string;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const postsPerPage = 12;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const openModal = (post: Post) => {
    setSelectedPost(post);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPost(null);
  };

  const handleWritePost = () => {
    const newPost: Post = {
      id: posts.length + 1,
      title: `Post ${posts.length + 1}`,
      content: `This is the content of post ${posts.length + 1}.`,
    };
    setPosts([...posts, newPost]);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPosts = () => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

    return currentPosts.map((post) => (
      <div key={post.id} className="post" onClick={() => openModal(post)}>
        <h3>{post.title}</h3>
      </div>
    ));
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button key={i} onClick={() => handlePageChange(i)} disabled={currentPage === i}>
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="App">
      <button onClick={handleWritePost}>글쓰기</button>
      <div className="post-grid">{renderPosts()}</div>
      <div className="pagination">{renderPagination()}</div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Post Modal">
        {selectedPost && (
          <div>
            <h2>{selectedPost.title}</h2>
            <p>{selectedPost.content}</p>
            <button onClick={closeModal}>닫기</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default App;
