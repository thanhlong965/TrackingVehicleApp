import {all, call, fork, put, takeEvery} from 'redux-saga/effects';
import AppConfig from '../../utils/AppConfig';
import {BASE_API_URL} from '../../utils/Consts';
import factories from './factory';
import OrderActions from './action';
import CartActions from '../cart/action';
export function* addOrder() {
  yield takeEvery(OrderActions.ADD_ORDER, function* (payload) {
    const {data, onSuccess, onFailed} = payload;
    try {
      const response = yield call(() => factories.addOrder(data));
      if (response?.data?.code === 'ok') {
        onSuccess && onSuccess();
      } else {
        onFailed && onFailed();
      }
    } catch (error) {
      console.log(error);
      onFailed && onFailed();
    }
  });
}

export default function* rootSaga() {
  yield all([fork(addOrder)]);
}
