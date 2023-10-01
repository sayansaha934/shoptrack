import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL


export function createOrder(token, items) {
  return axios.post(`${API_URL}order`, items, {
    headers: {
      Authorization: `${token}`,
    },
  });
}


export function getOrderDetails(token, order_id) {
  return axios.get(`${API_URL}order/${order_id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
}

export function submitOrder(token, order_id) {
  return axios.patch(`${API_URL}order/submit/${order_id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
}