import { call, put } from 'redux-saga/effects'
import { requestGetFiles } from '../requests/file'
import { setFiles } from '../../file';

export function* handleGetFiles(action) {
  try {
    const response = yield call(requestGetFiles, action.payload);
    const { data } = response
    yield put(setFiles({ ...data }))
  } catch(err) {
    console.log(err)
  }
}