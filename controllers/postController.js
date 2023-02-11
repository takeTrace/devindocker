const Post = require("../models/postModel")

exports.getAllPosts = async (req, res, next) => {
  try {
    console.log('收到请求......');
    const posts = await Post.find();
    res.status(200).json({
      status: 'success',
      length: posts.length,
      data: posts,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    })
  }
}

exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    })
  }
}

exports.createPost = async (req, res, next) => {
  try {
    console.log(req.session);
    console.log(req.body);
    const post = await Post.create(req.body);
    res.status(200).json({
      status: 'success',
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    })
  }
}

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    })
  }
}

exports.deletePost = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    })
  }
}
