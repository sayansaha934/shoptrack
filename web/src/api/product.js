import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
export function addProduct(formData, token) {
  return axios.post(`${API_URL}product`, formData, {
    headers: {
      Authorization: `${token}`,
    },
  });
}

export function getAllProduct(token) {
  return axios.get(`${API_URL}product`, {
    headers: {
      Authorization: `${token}`,
    },
  });
}


export function getProduct(id, token) {
  return axios.get(`${API_URL}product/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
}

export function editProduct(id, formData, token) {
  return axios.put(`${API_URL}product/${id}`, formData, {
    headers: {
      Authorization: `${token}`,
    },
  });
}

export function deleteProduct(id, token) {
  return axios.delete(`${API_URL}product/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
}