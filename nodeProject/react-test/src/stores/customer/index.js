import { createSlice } from '@reduxjs/toolkit'

const customer = createSlice({
  name: 'customer',
  initialState: {
    customerDetail: {
      id: '',
      contacts: '',
      dataSourceName: '',
    },
  },
  reducers: {
    addCustomer(state, params) {
      console.log('addCustomer被执行', params)
      const { payload } = params
      state.customerDetail = payload
    },
  },
})
export const getInitialState = customer.getInitialState
export const { addCustomer } = customer.actions
export default customer.reducer
