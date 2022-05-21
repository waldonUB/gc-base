import { configureStore } from '@reduxjs/toolkit'
import customerReducer from './customer/index'

export default configureStore({
  reducer: customerReducer,
})
