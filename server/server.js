const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const upload = require('./middleware/upload');
const contactRoute = require('./routes/contact');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));


app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/contact', contactRoute);
app.get('/', (req, res) => res.send('API Running'));
app.listen(5000, () => console.log('Server started on port 5000'));

app.post('/api/upload', upload.single('image'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      res.status(200).json({ imageUrl: `/uploads/${req.file.filename}` });
    } catch (err) {
      console.error('Upload error:', err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
  