import React, { useState } from 'react';
import './RoommateArticle.module.css'; // 스타일을 위한 CSS 파일 임포트

interface Post {
  title: string;
  date: string;
  participants: string;
  tags: string[];
}

const RoommateArticle: React.FC = () => {
  const [posts] = useState<Post[]>([
    { title: 'TITLE', date: '2023-10-10', participants: '2/4', tags: ['실내형', '흡연'] },
    // 12개의 게시물을 배열로 추가
    { title: 'TITLE', date: '2023-10-10', participants: '2/4', tags: ['실내형', '흡연'] },
    { title: 'TITLE', date: '2023-10-10', participants: '2/4', tags: ['실내형', '흡연'] },
    { title: 'TITLE', date: '2023-10-10', participants: '2/4', tags: ['실내형', '흡연'] },
    { title: 'TITLE', date: '2023-10-10', participants: '2/4', tags: ['실내형', '흡연'] },
    { title: 'TITLE', date: '2023-10-10', participants: '2/4', tags: ['실내형', '흡연'] },
    { title: 'TITLE', date: '2023-10-10', participants: '2/4', tags: ['실내형', '흡연'] },
    { title: 'TITLE', date: '2023-10-10', participants: '2/4', tags: ['실내형', '흡연'] },
    { title: 'TITLE', date: '2023-10-10', participants: '2/4', tags: ['실내형', '흡연'] },
    { title: 'TITLE', date: '2023-10-10', participants: '2/4', tags: ['실내형', '흡연'] },
    { title: 'TITLE', date: '2023-10-10', participants: '2/4', tags: ['실내형', '흡연'] },
    { title: 'TITLE', date: '2023-10-10', participants: '2/4', tags: ['실내형', '흡연'] },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPosts = () => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const selectedPosts = posts.slice(startIndex, startIndex + postsPerPage);
    return selectedPosts.map((post, index) => (
      <div key={index} className="post-card">
        <div className="post-header">모시러 4인</div>
        <div className="post-title">{post.title}</div>
        <div className="post-date">{post.date}</div>
        <div className="post-participants">{post.participants}</div>
        <div className="post-tags">
          {post.tags.map((tag, tagIndex) => (
            <span key={tagIndex} className="post-tag">{tag}</span>
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
      <div className="pagination">
        {pageNumbers.map(number => (
          <span
            key={number}
            className={`page-number ${currentPage === number ? 'active' : ''}`}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="roommate-article">
      <h1>룸메이트 구해요</h1>
      <div className="posts-grid">{renderPosts()}</div>
      {renderPagination()}
      <div className="footer">FOOTER</div>
    </div>
  );
};

export default RoommateArticle;
