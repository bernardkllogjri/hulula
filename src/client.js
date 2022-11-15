import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://huladtla.com',
  headers: {'X-Custom-Header': 'foobar'}
});

export default instance