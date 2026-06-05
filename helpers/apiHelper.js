const axios = require('axios');
const config = require('../config/config');

const api = {
  get: (endpoint) => axios.get(`${config.BASE_URL}${endpoint}`),
  post: (endpoint, body) => axios.post(`${config.BASE_URL}${endpoint}`, body),
  put: (endpoint, body) => axios.put(`${config.BASE_URL}${endpoint}`, body),
  patch: (endpoint, body) => axios.patch(`${config.BASE_URL}${endpoint}`, body),
  delete: (endpoint) => axios.delete(`${config.BASE_URL}${endpoint}`)
};

module.exports = api;