import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axios';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Technical', 'Food', 'Travel', 'Lifestyle'];

  useEffect(() => {
    axios.get('/posts')
      .then(res => {
        setPosts(res.data);
        setFilteredPosts(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.category === category));
    }
  };

  return (
    <div className="container">
      <h2 className="page-title">Explore Here</h2>

      <div className="category-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="posts-grid">
        {filteredPosts.map(post => (
          <div className="post-card" key={post._id}>
            <h3 style={{ textAlign: 'center' }}>{post.title}</h3>
            {selectedCategory === 'All' && (
              <p className="post-meta">{selectedCategory === 'All' ? post.category : ''}</p>
            )}
            {post.image && (
              <img src={post.image ? (post.image.startsWith('http') ? post.image : `http://localhost:5000/uploads/${post.image}`) : '/placeholder.jpg'}
              alt="Blog"
              className="post-image"
              />
            )}<br></br>
            <p>{post.content.slice(0, 100)}...</p>
            <Link to={`/post/${post._id}`}>Read More</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
