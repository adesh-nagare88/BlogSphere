import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axios';
import { useSelector } from 'react-redux';
import './CreatePost.css';

const EditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const { token } = useSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/posts/${id}`).then(res => {
      setPost(res.data);
      setTitle(res.data.title);
      setContent(res.data.content);
      setCategory(res.data.category);
    }).catch(err => {
      alert("Failed to load post.");
      console.error(err);
    });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('category', category);
      if (image) {
        formData.append('image', image);
      }

      await axios.put(`/posts/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert("Post updated!");
      navigate(`/post/${id}`);
    } catch (err) {
      alert("Failed to update post.");
      console.error(err);
    }
  };

  if (!post) return <p className="loading-text">Loading post...</p>;

  return (
    <div className="create-post-container">
      <form className="create-post-form" onSubmit={handleUpdate}>
        <h2>Edit Post</h2>

        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Update your content..."
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

        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
