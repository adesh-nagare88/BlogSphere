import React, { useState } from 'react';
import axios from '../axios';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/contact', form);
      setStatus('Thank you for your feedback!');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('Something went wrong.');
    }
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>We'd love to hear your thoughts, suggestions, or feedback!</p>
      <form onSubmit={handleSubmit} className="contact-form">
        <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
        <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} rows={5} required />
        <button type="submit">Send Message</button>
      </form>
      {status && <p className="status-msg">{status}</p>}
    </div>
  );
};

export default Contact;
