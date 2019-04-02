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

export const confirmPassword = async password => {
  const res = await httpService.post('user/confirm', {
    password
  });
  if (res) {
    return res.data
  }
}

export const deleteAccount = async id => {
  const res = await httpService.delete(`user/${id}`)
  if (res) {
    return res.data
  }
}

export const updateAccount = async (id, user) => {
  const res = await httpService.put(`user/${id}`, user)
  if (res) {
    return res.data
  }
}