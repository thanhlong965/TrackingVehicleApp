import axios from 'axios';
import {BASE_API_URL} from '../../utils/Consts';

const url = BASE_API_URL;
const productFactory = {
  requestListProductById: id => {
    return axios({
      method: 'GET',
      url: `${url}/api/Product/get-list-product-by-id-category?idCategory=${id}`,
    });
  },
};

export default productFactory;
