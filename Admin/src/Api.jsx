import axios from "axios";
const url = "http://localhost:3000";
// const url = "https://shopkart-backend-mcrs.onrender.com"

const authUrl = axios.create({
  baseURL: `${url}/auth`,
  withCredentials: true,
});

const adminUrl = axios.create({
  baseURL: `${url}/admin`,
  withCredentials: true,
});

export {url, adminUrl, authUrl };
