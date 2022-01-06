import { takeLatest } from 'redux-saga/effects'
import { handleGetAuth } from './handlers/auth'
import { handleGetFiles } from './handlers/file'
import { getAuth } from '../auth'
import { getFiles } from '../file'


export function* watcherSaga() {
  yield takeLatest(getAuth.type, handleGetAuth)
}