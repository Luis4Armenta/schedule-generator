import { configureStore } from "@reduxjs/toolkit";
import formReducer from './slices/form/formSlice'

export const store = configureStore({
  reducer: {
    form: formReducer
  },
})
