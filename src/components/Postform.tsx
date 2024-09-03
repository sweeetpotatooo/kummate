import React, { useState } from 'react';
import styles from './PostForm.module.css';

interface Post {
  Title: string;
  Dormtype: string;
  Content: string;
  CustomDormType?: string; // "기타"를 선택할 때 추가로 입력하는 필드
}

interface PostFormProps {
  onSubmit: (newPost: Post) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
  const [newPost, setNewPost] = useState<Post>({
    Title: '',
    Dormtype: '',
    Content: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newPost);
    setNewPost({
      Title: '',
      Dormtype: '',
      Content: '',
      CustomDormType: '',
    });
  };

  return (
    <div className={styles.container}>
      <form className={styles['post-form']} onSubmit={handleSubmit}>
        <input type="text" name="Title" placeholder="Title" value={newPost.Title} onChange={handleChange} required />
        
        <select name="Dormtype" value={newPost.Dormtype} onChange={handleChange} required>
          <option value="" disabled>기숙사 형태를 선택하세요</option>
          <option value="모시래 4인실">모시래 4인실</option>
          <option value="모시래 3인실">모시래 3인실</option>
          <option value="해오름 3인실">해오름 3인실</option>
          <option value="해오름 2인실">해오름 2인실</option>
          <option value="기타">기타</option>
        </select>

        {newPost.Dormtype === '기타' && (
          <input
            type="text"
            name="CustomDormType"
            placeholder="기타 기숙사 유형 입력"
            value={newPost.CustomDormType || ''}
            onChange={handleChange}
            required
          />
        )}

        <textarea name="Content" placeholder="Content" value={newPost.Content} onChange={handleChange} required />
        <button type="submit">작성</button>
      </form>
    </div>
  );
};

export default PostForm;
