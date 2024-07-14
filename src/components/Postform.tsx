import React, { useState } from 'react';
import styles from './PostForm.module.css';

interface PostFormProps {
  onSubmit: (newPost: Post) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
  const [newPost, setNewPost] = useState<Post>({
    Title: '',
    Dormtype: '',
    Now_Num: 0,
    Max_Num: 0,
    Gender: '',
    Date: '',
    tags: [],
    Content: '',
    Author: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newPost);
    setNewPost({
      Title: '',
      Dormtype: '',
      Now_Num: 0,
      Max_Num: 0,
      Gender: '',
      Date: '',
      tags: [],
      Content: '',
      Author: '',
    });
  };

  return (
    <form className={styles['post-form']} onSubmit={handleSubmit}>
      <input type="text" name="Title" placeholder="Title" value={newPost.Title} onChange={handleChange} required />
      <input type="text" name="Dormtype" placeholder="Dorm Type" value={newPost.Dormtype} onChange={handleChange} required />
      <input type="number" name="Now_Num" placeholder="Now Number" value={newPost.Now_Num} onChange={handleChange} required />
      <input type="number" name="Max_Num" placeholder="Max Number" value={newPost.Max_Num} onChange={handleChange} required />
      <input type="text" name="Gender" placeholder="Gender" value={newPost.Gender} onChange={handleChange} required />
      <input type="date" name="Date" placeholder="Date" value={newPost.Date} onChange={handleChange} required />
      <input type="text" name="tags" placeholder="Tags (comma separated)" value={newPost.tags.join(', ')} onChange={handleChange} required />
      <textarea name="Content" placeholder="Content" value={newPost.Content} onChange={handleChange} required />
      <input type="text" name="Author" placeholder="Author" value={newPost.Author} onChange={handleChange} required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
