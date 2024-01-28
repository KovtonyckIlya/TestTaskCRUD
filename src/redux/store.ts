import { configureStore } from '@reduxjs/toolkit'
import {PostsReducer} from "./reducers/reducer"
import createSagaMiddleware from 'redux-saga'
import mySaga from './sagas/sagas'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
// import userReducer from './slices/userSlice'
const sagaMiddleware = createSagaMiddleware()
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
export const store = configureStore({
  reducer: {
    root:persistReducer(persistConfig, PostsReducer),
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      
    }).concat(sagaMiddleware),

})
sagaMiddleware.run(mySaga)
export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch