import axios from "axios";
const url = "http://localhost:3000";

const authUrl = axios.create({
  baseURL: `${url}/auth`,
  withCredentials: true,
});

const sellerUrl = axios.create({
  baseURL: `${url}/seller`,
  withCredentials: true,
});
const addressUrl = axios.create({
  baseURL: `${url}/address`,
  withCredentials: true,
});

export { url, sellerUrl, authUrl, addressUrl };
