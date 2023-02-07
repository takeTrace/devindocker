const express = require("express");
const {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const { authLogin } = require("../middleware/authMiddleware");

const router = express.Router();

// const postController = require('../controllers/postController');

router.route("/").get(getAllPosts).post(authLogin, createPost);

router.route("/:id").get(getPost).patch(authLogin, updatePost).delete(authLogin, deletePost);

module.exports = router;
