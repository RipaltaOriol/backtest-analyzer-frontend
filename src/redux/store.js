import {
  configureStore,
  combineReducers,
  getDefaultMiddleware
} from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import { watcherSaga } from './sagas/rootSaga';

import authReducer from './auth'
import fileReucer from './file'

const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
  key: 'root',
  version: 1,
  storage
}

const authPersistedReducer = persistReducer(persistConfig, authReducer)
const filePersistedReducer = persistReducer(persistConfig, fileReucer)

const reducer = combineReducers({
  auth: authPersistedReducer,
  file: filePersistedReducer
})

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(watcherSaga)
