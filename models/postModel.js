const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Post must have title'],
  },
  body: {
    type: String,
    required: [true, 'Post must have content'],
  },
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

