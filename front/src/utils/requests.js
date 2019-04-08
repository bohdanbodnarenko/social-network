import httpService from "./httpService/httpService";

export const getUserById = async id => {
  const res = await httpService.get(`user/${id}`);
  if (res) {
    return res.data;
  }
};

export const getPostsByUser = async id => {
  const res = await httpService.get(`posts/${id}`);
  if (res) {
    return res.data;
  }
};

export const getUsers = async id => {
  const res = await httpService.get(`users`);
  if (res) {
    return res.data;
  }
};

export const confirmPassword = async password => {
  const res = await httpService.post("user/confirm", {
    password
  });
  if (res) {
    return res.data;
  }
};

export const deleteAccount = async id => {
  const res = await httpService.delete(`user/${id}`);
  if (res) {
    return res.data;
  }
};

export const updateAccount = async (id, user) => {
  const res = await httpService.put(`user/${id}`, user);
  if (res) {
    return res.data;
  }
};

export const getLinkToUserAvatar = id => {
  return `http://localhost:8080/user/photo/${id}`;
};

export const getLinkToPostImage = id => {
  return `http://localhost:8080/post/photo/${id}`;
};

export const deletePost = async id => httpService.delete(`/posts/${id}`);

export const followToUser = async (followId, userId) => {
  const res = await httpService.put("user/follow", {
    userId,
    followId
  });
  return res;
};

export const unfollowFromUser = async (followId, userId) => {
  const res = await httpService.put("user/unfollow", {
    userId,
    followId
  });
  return res;
};

export const createPost = async userdata => httpService.post("/post", userdata);
export const getPost = async id => httpService.get(`/post/${id}`);
export const likePost = async (postId, userId) =>
  httpService.put("/post/like", {
    postId,
    userId
  });
export const unlikePost = async (postId, userId) =>
  httpService.put("/post/unlike", {
    postId,
    userId
  });
export const addComment = async (text, postId, userId) =>
  httpService.put("/post/comment", {
    comment: {
      text
    },
    postId,
    userId
  });
export const getAllPosts = async () => httpService.get("/posts");
export const getFollowingPosts = async () => httpService.get("/posts/following");