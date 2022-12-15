import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import navBarSlice from "./navBarSlice";
import orderSlice from "./orderSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


// import { createStore } from 'redux'

// const initialState = {
//   sidebarShow: true,
// }

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest }
//     default:
//       return state
//   }
// }
// export const store1 = createStore(changeState)




const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
const rootReducer = combineReducers({ auth: authReducer, users: userSlice, cart: cartSlice, product: productSlice, navBarState: navBarSlice, order: orderSlice })
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)
