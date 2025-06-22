import React, { useState } from 'react';
import axios from '../axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Technical');
  const [image, setImage] = useState(null);
  const { token } = useSelector(state => state.user);
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('category', category);
      if (image) formData.append('image', image);

      await axios.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
        
      });

      navigate('/');
    } catch (err) {
      alert("Error creating post: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="create-post-container">
      <form className="create-post-form" onSubmit={handleCreate}>
        <h2>Create New Post</h2>

        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Write your content here..."
          value={content}
          onChange={e => setContent(e.target.value)}
          rows="10"
          required
        />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        >
          <option value="Technical">Technical</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={e => setImage(e.target.files[0])}
        />

        <button type="submit">Publish</button>
      </form>
    </div>
  );
};

export default CreatePost;
