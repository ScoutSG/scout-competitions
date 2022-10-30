import axios from "axios";

export const client = axios.create({
  baseURL: `/api`,
  timeout: 30000,
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
});

const clientApi = {
  get: client.get,
  delete: client.delete,
  post: client.post,
  put: client.put,
  patch: client.patch,
};

Object.freeze(clientApi);

export default clientApi;
