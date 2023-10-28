import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8080",
  headers: { "Content-type": "application/json" },
});

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // console.log("requset start", config);
    return config;
  },
  function (error) {
    // Do something with request error
    // console.log("requset error", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // console.log("get response", response);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // console.log("response error", error);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default api;
