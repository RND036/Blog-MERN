//we cant use multiple reducers in redux so we have to combine them in one store for that we have to import combine reducer
import { configureStore ,combineReducers} from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeReducer from './theme/themeSlice';


//to create root reducer
const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,// dark mode functionality 
});
//to create persist config
const persistConfig = {
  key:'root',
  storage,
  version: 1,
}

//use root reducer to create presist reducer
const persistedReducer = persistReducer(persistConfig,rootReducer);


//create a redux store
export const store = configureStore({
  //use the persisted reducer without using lots of reducers
  reducer: persistedReducer,

  //middleware to prevent errors
  middleware: getDefaultMiddleware =>getDefaultMiddleware({
    serializableCheck: false,
  })

})