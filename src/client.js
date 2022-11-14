import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://164.92.156.222',
  headers: {'X-Custom-Header': 'foobar'}
});

export default instance