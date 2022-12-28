import {combineReducers, applyMiddleware} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import {User} from './User';
import {Content} from './Content';
import logger from 'redux-logger';
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'
import { persistReducer, persistStore } from 'redux-persist';

const rootReducer = combineReducers({
  content: Content,
  user: User
})

const persistConfig = {
  key: 'root',
  storage: storageSession,
  blacklist: ['content'],
  whitelist:['user']
 };

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
        reducer : persistedReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger).concat(thunk)
      })

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)



