const express = require("express");
const {
  getPosts,
  createPost,
  postsByUser,
  postById,
  deletePost,
  isPoster,
  updatePost
} = require("../controllers/post");
const { requireSignin } = require("../controllers/auth");
const { crearePostValidator } = require("../validator/index");
const { userById } = require("../controllers/user");

const router = express.Router();

router.get("/posts", requireSignin, getPosts);
router.get("/posts/:userId", requireSignin, postsByUser);
router.post("/posts", requireSignin, crearePostValidator, createPost);
router.put("/posts/:postId", requireSignin, isPoster, updatePost);
router.delete("/posts/:postId", requireSignin, isPoster, deletePost);

router.param("userId", userById);

router.param("postId", postById);

module.exports = router;
