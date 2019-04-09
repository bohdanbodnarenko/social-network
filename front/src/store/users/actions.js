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
        dispatch({
            type: SET_USERS,
            payload: data.users
        })
    }
}

export const getUserById = (id) => async dispatch => {
    if (id) {
        const {
            data
        } = await httpService.get(`user/${id}`);
        if (data) {
            dispatch({
                type: SET_SELECTED_USER,
                payload: data
            })
        }
    }
}