import httpService from "./httpService/httpService";

export const getUserById = async id => {
  const res = await httpService.get(`user/${id}`);
  console.log(res);
  return res;
};
