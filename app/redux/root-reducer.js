import {combineReducers} from 'redux';
import AuthReducer from './auth/reducer';
import CartReducer from './cart/reducer';
import CategoryReducer from './category/reducer';
import OrderReducer from './order/reducer';
const rootReducer = combineReducers({
  auth: AuthReducer,
  category: CategoryReducer,
  cart: CartReducer,
  order: OrderReducer,
});

export default rootReducer;
