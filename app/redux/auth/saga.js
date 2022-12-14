import {all, call, fork, put, takeEvery} from 'redux-saga/effects';
import AppConfig from '../../utils/AppConfig';
import {BASE_API_URL} from '../../utils/Consts';
import AuthActions from './action';
import factories from './factory';
export function* signIn() {
  yield takeEvery(AuthActions.SIGN_IN, function* (payload) {
    const {data, onSuccess, onError} = payload;
    try {
      console.log('sign in');
      console.log(data);
      const response = yield call(() => factories.requestSignIn(data));
      console.log(response);
      if (response?.data?.result?.results?.Success) {
        const token = response.data?.result?.results?.Token;
        AppConfig.ACCESS_TOKEN = token;
        onSuccess && onSuccess();
      } else {
        onError && onError();
      }
    } catch (error) {
      console.log(error);
      onError();
    }
  });
}
export function* register() {
  yield takeEvery(AuthActions.REGISTER, function* (payload) {
    const {data, onSuccess, onError} = payload;
    try {
      console.log('register');
      const response = yield call(() => factories.requestRegister(data));
      if (response?.data?.results?.Success) {
        onSuccess && onSuccess();
      } else {
        onError && onError();
      }
    } catch (error) {
      onError && onError();
      console.log(error);
    }
  });
}

export default function* rootSaga() {
  yield all([fork(signIn), fork(register)]);
}
