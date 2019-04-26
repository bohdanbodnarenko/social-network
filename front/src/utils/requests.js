import httpService from "./httpService/httpService";

export const signout = async () => httpService.get("signout");
export const signin = async dataToSend => httpService.get("signin", dataToSend);

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

export const getLinkToPrivateChannel = async userId => {
  const res = await httpService.post("/channels/private", {
    userId
  });
  console.log(res);
  if (res) {
    return res.data;
  }
};

export const sendMessage = (channelId, content) => {
  httpService.put("/channels/message", {
    channelId,
    content
  });
};

export const getMessagesByChannelId = async (id, offset = 0, limit = 50) =>
  httpService.get(
    `channels/${id}?offset=${offset}&limit=${limit}&onlyMessages=true`
  );

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
