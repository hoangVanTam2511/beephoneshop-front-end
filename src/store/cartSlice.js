import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const addToCart = createAsyncThunk('cart/addToCart', async data => {
  let user = localStorage.getItem('user')
  user = JSON.parse(user)
  let quantity = 0
  if (data !== 0) {
    await axios
      .get(
        `http://localhost:8080/client/cart-detail/count-of-cart-detail?id_customer=${user.id}`
      )
      .then(res => {
        if (res.status === 200) {
          quantity = res.data
        }
      })
      .catch(res => console.log(res))
  }
  localStorage.setItem('quantity', quantity)
  return quantity
})

export const SetNote = createAsyncThunk('cart/SetNote', async data => {
  localStorage.setItem('note', data)
  return data
})

export const SetSelectedCart = createAsyncThunk('cart/SetSelectedCart', async data => {
  localStorage.setItem('selectedCart', data)
  return data
})

export const ResetSelectedCart = createAsyncThunk('cart/ResetSelectedCart', async () => {
  localStorage.setItem('selectedCart', 0)
  return 0
})

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    quantity: 0,
    note: "",
    selectedCart:0,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.quantity = action.payload
    })
    .addCase(SetNote.fulfilled, (state, action) => {
      state.note = action.payload
    })
    .addCase(SetSelectedCart.fulfilled, (state, action) => {
      state.selectedCart = action.payload
    })
    .addCase(ResetSelectedCart.fulfilled, (state, action) => {
      state.selectedCart = action.payload
    })
  }
})

export default cartSlice.reducer
