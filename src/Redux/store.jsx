import { configureStore } from '@reduxjs/toolkit'
import quesSlice from './quesSlice';

export default configureStore({
  reducer: {
    counter: quesSlice,
  },
})