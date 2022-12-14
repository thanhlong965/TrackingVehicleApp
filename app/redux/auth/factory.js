import axios from 'axios';
import {BASE_API_URL} from '../../utils/Consts';

const url = BASE_API_URL;
const factories = {
  requestSignIn: data => {
    return axios({
      method: 'POST',
      url: `${url}/api/Identity/login`,
      data: data,
    });
  },
  requestAuthMe: () => {
    return axios({
      method: 'GET',
      url: `${url}/api/Identity/get-user`,
    });
  },
  requestRegister: data => {
    return axios({
      method: 'POST',
      url: `${url}/api/Identity/register`,
      data: data,
    });
  },
};

export default factories;
