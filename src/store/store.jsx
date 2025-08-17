import { configureStore } from '@reduxjs/toolkit'
 import  movieReducer from './reducers/Movieslice.js'
 import  tvReducer from './reducers/tvSlice.js'
 import  personReducer   from './reducers/personSlice.js'

export const store = configureStore({
  reducer: {
      tv: tvReducer,
    movie  : movieReducer,
    person: personReducer
  },
})

export default store;