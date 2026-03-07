import axios from "axios";
const url = "http://localhost:3000";

const authUrl = axios.create({
  baseURL: `${url}/auth`,
  withCredentials: true,
});
const addressUrl = axios.create({
  baseURL: `${url}/address`,
  withCredentials: true,
});

const productUrl = axios.create({
  baseURL: `${url}/products`,
  withCredentials: true,
});

const orderUrl = axios.create({
  baseURL: `${url}/orders`,
  withCredentials: true,
});

const cartUrl = axios.create({
  baseURL: `${url}/cart`,
  withCredentials: true,
});

const orderItemUrl = axios.create({
  baseURL: `${url}/order-item`,
  withCredentials: true,
});

const reviewUrl = axios.create({
  baseURL: `${url}/review`,
  withCredentials: true,
});

export {
  url,
  authUrl,
  addressUrl,
  productUrl,
  orderUrl,
  cartUrl,
  orderItemUrl,
  reviewUrl,
};
