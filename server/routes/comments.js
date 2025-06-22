const router = require('express').Router();
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

router.post('/:postId', auth, async (req, res) => {
  const comment = new Comment({
    text: req.body.text,
    post: req.params.postId,
    user: req.user.id
  });
  await comment.save();

  await Post.findByIdAndUpdate(req.params.postId, { $push: { comments: comment._id } });
  res.status(201).json(comment);
});

module.exports = router;
