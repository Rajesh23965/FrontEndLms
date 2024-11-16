import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from "./reducers/authReducers"
import departmentReducer  from './reducers/departmentReducer';
import  categoryReducer  from './reducers/categoryReducer';
import batchReducers from './reducers/batchReducers';
import bookReducer from './reducers/bookReducer';

// Persist config
const persistConfig = {
  key: 'root',
  storage,
};

// Root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  department: departmentReducer,
  batch: batchReducers,
  book:bookReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


// Store configuration
export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
