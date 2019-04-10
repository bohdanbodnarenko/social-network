import {
    SET_POSTS,
    SET_SELECTED_POST,
} from "./types";
import httpService from "../../utils/httpService/httpService";

export const getAllPosts = () => async dispatch => {
    const {
        data
    } = await httpService.get('posts');
    if (data) {
        dispatch(setPosts(data.posts))
    }
}

export const getPostsByUserId = (id) => async dispatch => {
    if (id) {
        const {
            data
        } = await httpService.get(`posts/${id}`);
        if (data) {
            dispatch(setPosts(data))
        }
    }
}

export const getPostsFollowing = () => async dispatch => {
    const {
        data
    } = await httpService.get("/posts/following");
    if (data) {
        dispatch(setPosts(data.posts))
    }
}

export const getPostById = (id) => async dispatch => {
    if (id) {
        const {
            data
        } = await httpService.get(`post/${id}`);
        if (data) {
            dispatch(setSelectedPost(data.post))
        }
    } else {
        console.error('Id of post is empty')
    }
}

export const setPosts = posts => ({
    type: SET_POSTS,
    payload: posts
})

export const setSelectedPost = post => ({
    type: SET_SELECTED_POST,
    payload: post
})