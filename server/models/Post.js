const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title:     { type: String, required: true },
  content:   { type: String, required: true },
  image:     { type: String },
  category:  {
    type: String,
    enum: ['Technical', 'Food', 'Travel', 'Lifestyle'],
    required: true
  },
  author:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);

