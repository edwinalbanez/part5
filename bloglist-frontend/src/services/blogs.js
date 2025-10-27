import axios from 'axios'
const baseUrl = '/api/blogs'
let token;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blog) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const { data } = await axios.post(baseUrl, blog, config);
  return data
}

const like = async (blogId) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const { data } = await axios.put(`${baseUrl}/${blogId}`, null, config);
  return data;
}

export default {
  getAll,
  create,
  setToken,
  like
}