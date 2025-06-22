const router = require('express').Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const newPost = new Post({
      title,
      content,
      category,
      image: req.file ? req.file.filename : null,
      author: req.user.id
    });

    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const posts = await Post.find(filter).populate('author', 'username');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json("Post not found");

    if (post.author.toString() !== req.user.id && !req.user.isAdmin)
      return res.status(403).json("Not authorized");

    const updatedData = {
      title: req.body.title,
      content: req.body.content,
      category: req.body.category
    };
    if (req.file) updatedData.image = req.file.filename;

    const updated = await Post.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json("Post not found");

    if (post.author.toString() !== req.user.id && !req.user.isAdmin)
      return res.status(403).json("Not authorized");

    await Post.findByIdAndDelete(req.params.id);
    res.json("Post deleted");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
