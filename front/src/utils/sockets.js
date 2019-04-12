import io from "socket.io-client";
import store from '../store/store'
import {
    setSelectedPost,
    setPosts
} from "../store/posts/actions";
import {
    setSelectedUser,
    setUsers
} from "../store/users/actions";
const socket = io.connect("ws://localhost:8080");


socket.on('post_updated', post => {
    const state = store.getState().posts;
    if (state.selectedPost && state.selectedPost._id === post._id) {
        store.dispatch(setSelectedPost(post))
    } else {
        const index = state.posts.findIndex(el => post._id === el._id)
        if (index > -1) {
            const newPosts = [...state.posts];
            newPosts[index] = post;
            store.dispatch(setPosts(newPosts))
        }
    }
})

socket.on('user_updated', user => {
    const state = store.getState().users;
    if (state.selectedUser && state.selectedUser._id === user._id) {
        store.dispatch(setSelectedUser(user))
    } else {
        const index = state.users.findIndex(el => user._id === el._id)
        if (index > -1) {
            const newUsers = [...state.users];
            newUsers[index] = user;
            store.dispatch(setUsers(newUsers))
        }
    }
})

export default socket;