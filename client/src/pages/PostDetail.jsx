import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axios';
import { useSelector } from 'react-redux';
import './PostDetail.css';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const { token, user } = useSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => {
        console.error("Error loading post:", err);
        setPost(null);
      });
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        navigate('/');
      } catch (err) {
        alert("Delete error: " + (err.response?.data?.error || err.message));
      }
    }
  };

  const handleEdit = () => {
    navigate(`/edit-post/${id}`);
  };

  const handleComment = async () => {
    try {
      await axios.post(`/comments/${id}`, { text: commentText }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCommentText('');
      alert("Comment added!");
    } catch (err) {
      alert("Failed to comment");
    }
  };

  if (!post) return <p className="loading-text">Loading...</p>;

  const isAuthor = user && post?.author?._id === user._id;
  console.log("Logged-in user ID:", user?._id);
  console.log("Post author ID:", post?.author?._id);
  console.log("Is author?", isAuthor);

  return (
    <div className="post-detail-container">
      <div className="post-card-detail">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <p className="post-author"><b>Author:</b> {post.author?.username}</p>

        {isAuthor && (
  <div className="post-actions">
    <button onClick={handleEdit}>Edit</button>
    <button onClick={handleDelete}>Delete</button>
  </div>
)}

    </div>

      <div className="comment-section">
        <h3>Leave a Comment</h3>
        {user ? (
          <>
            <textarea
              className="comment-input"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={4}
              placeholder="Write your comment here..."
            />
            <br />
            <button className="comment-button" onClick={handleComment}>Submit</button>
          </>
        ) : (
          <p className="login-reminder">Please login to comment.</p>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
