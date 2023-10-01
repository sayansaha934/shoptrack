

import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL

export function signup(formData) {
  return axios.post(`${API_URL}auth/signup`, formData)
}


export function login(formData) {
  return axios.post(`${API_URL}auth/login`, formData)
}

