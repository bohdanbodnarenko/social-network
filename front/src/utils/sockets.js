import io from "socket.io-client";
import store from "../store/store";
import { setSelectedPost, setPosts } from "../store/posts/actions";
import { setSelectedUser, setUsers } from "../store/users/actions";
import {
  setSelectedChannel,
  addMessageToSelectedChannel
} from "../store/channels/actions";
const socketConnection = "ws://localhost:8080";
const socket = io.connect(socketConnection);

socket.on("post_updated", post => {
  const state = store.getState().posts;
  if (state.selectedPost && state.selectedPost._id === post._id) {
    store.dispatch(setSelectedPost(post));
  } else {
    const index = state.posts.findIndex(el => post._id === el._id);
    if (index > -1) {
      const newPosts = [...state.posts];
      newPosts[index] = post;
      store.dispatch(setPosts(newPosts));
    }
  }
});

socket.on("user_updated", user => {
  const state = store.getState();
  const usersState = state.users;
  if (usersState.selectedUser && usersState.selectedUser._id === user._id) {
    store.dispatch(setSelectedUser(user));
  } else {
    const index = usersState.users.findIndex(el => user._id === el._id);
    if (index > -1) {
      const newUsers = [...usersState.users];
      newUsers[index] = user;
      store.dispatch(setUsers(newUsers));
    }
  }
});

socket.on("user_status_changed", user => {
  console.log(user);
  const state = store.getState();
  if (state.users.selectedUser && state.users.selectedUser._id === user._id) {
    const newUser = { ...state.users.selectedUser };
    newUser.online = user.online;
    store.dispatch(setSelectedUser(newUser));
  }
  if (state.channels.selectedChannel) {
    const index = state.channels.selectedChannel.participants.findIndex(
      el => user._id === el._id
    );
    if (index >= 0) {
      const newChannel = { ...state.channels.selectedChannel };
      newChannel.participants[index].online = user.online;
      store.dispatch(setSelectedChannel(newChannel));
    }
  }
});

socket.on("channel_updated", channel => {
  const newMessage = channel.messages[channel.messages.length - 1];
  console.log(newMessage);
  store.dispatch(addMessageToSelectedChannel(newMessage));
});

export default socket;
