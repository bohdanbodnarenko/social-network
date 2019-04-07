const express = require("express");
const {
  getPosts,
  createPost,
  postsByUser,
  postById,
  deletePost,
  isPoster,
  postPhoto,
  updatePost,
  getPostById,
  like,
  unlike,
  comment,
  uncomment
} = require("../controllers/post");
const { requireSignin } = require("../controllers/auth");
const { crearePostValidator } = require("../validator/index");
const { userById } = require("../controllers/user");

const router = express.Router();

router.put("/post/like", requireSignin, like);
router.put("/post/unlike", requireSignin, unlike);

router.put("/post/comment", requireSignin, comment);
router.put("/post/uncomment", requireSignin, uncomment);

router.put("/posts/:postId", requireSignin, isPoster, updatePost);
router.get("/post/photo/:postId", postPhoto);
router.get("/posts", requireSignin, getPosts);
router.get("/posts/:userId", requireSignin, postsByUser);
router.get("/post/:postId", requireSignin, getPostById);
router.post("/post", requireSignin, crearePostValidator, createPost);
router.delete("/posts/:postId", requireSignin, isPoster, deletePost);

router.param("userId", userById);

router.param("postId", postById);

module.exports = router;
