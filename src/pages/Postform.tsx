import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PostFormPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNewPost = (newPost: Post) => {
    // 새로운 포스트 처리 로직
    navigate('/article');
  };

  return (
    <div>
      <Header />
      <PostForm onSubmit={handleNewPost} />
      <Footer />
    </div>
  );
};

export default PostFormPage;
