import axios from "axios";

const url = '/api/login';

const login = async (credentials) => {
  const { data } = await axios.post(url, credentials);
  return data;
}

export default {
  login
}