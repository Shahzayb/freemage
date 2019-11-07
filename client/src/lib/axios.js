import axios from 'axios';

export default axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? 'http://localhost:5000/' : '',
  timeout: 2 * 60 * 1000 // 2 min
});
