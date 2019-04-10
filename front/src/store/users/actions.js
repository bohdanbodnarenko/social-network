import {
    SET_USERS,
    SET_SELECTED_USER
} from "./types";
import httpService from "../../utils/httpService/httpService";

export const getAllUsers = () => async dispatch => {
    const {
        data
    } = await httpService.get('users');
    if (data) {
        dispatch(setUsers(data.users))
    }
}

export const getUserById = (id) => async dispatch => {
    if (id) {
        const {
            data
        } = await httpService.get(`user/${id}`);
        if (data) {
            dispatch(setSelectedUser(data))
        }
    }
}

export const setUsers = users => ({
    type: SET_USERS,
    payload: users
})

export const setSelectedUser = user => ({
    type: SET_SELECTED_USER,
    payload: user
})