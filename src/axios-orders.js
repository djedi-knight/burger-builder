import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burgerbuilder-2eedd.firebaseio.com/'
});

export default instance;