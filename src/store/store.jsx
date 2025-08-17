import { configureStore } from '@reduxjs/toolkit'
import Tv from '../Components/Sidebarpages/Tv'
 import  movieReducer  from './reducers/Movieslice'
 import  tvReducer from './reducers/tvSlice'
 import  personReducer  from './reducers/personSlice'

export const store = configureStore({
  reducer: {
      tv: tvReducer,
    movie  : movieReducer,
    person: personReducer
  },
})

export default store;