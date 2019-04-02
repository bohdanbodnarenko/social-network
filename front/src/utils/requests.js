import httpService from "./httpService/httpService";

export const getUserById = async id => {
  const res = await httpService.get(`user/${id}`);
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
