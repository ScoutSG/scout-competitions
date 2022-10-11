import axios, { AxiosRequestConfig } from "axios";
import { useSession } from "next-auth/react";
// import { getAccessToken } from "../localStorage/auth";

export const BASE_URL = "";


const client = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: 30000,
  headers: {
    Accept: "application/json",
  },
  withCredentials: true
});

// client.interceptors.request.use((config: AxiosRequestConfig) => {
//   // const accessToken = null; // getAccessToken
//   // if (config.headers) {
//   //   config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";
//   // }
//   return config;
// });

const clientApi = {
  get: client.get,
  delete: client.delete,
  post: client.post,
  put: client.put,
  patch: client.patch,
};

Object.freeze(clientApi);

export default clientApi;
