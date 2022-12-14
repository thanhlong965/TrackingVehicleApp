import axios from 'axios';
import {BASE_API_URL} from '../../utils/Consts';

const url = BASE_API_URL;
const factories = {
  addOrder: data => {
    return axios({
      method: 'POST',
      url: `${url}/api/Order/add-order`,
      data: data,
    });
  },
};

export default factories;
