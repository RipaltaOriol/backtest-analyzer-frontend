import { call, put } from 'redux-saga/effects'
import { requestGetAuth } from '../requests/auth'
import { setAuth } from '../../auth';

export function* handleGetAuth(action) {
  try {
    const response = yield call(requestGetAuth, action.payload);
    const { data } = response
    yield put(setAuth({ ...data }))
  } catch(err) {
    console.log(err)
  }
}