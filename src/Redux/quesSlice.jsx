import { createSlice } from '@reduxjs/toolkit'

export const quesSlice = createSlice({
  name: 'question',
  initialState: {
    value: '',
  },
  reducers: {
    setQues: (state, action) => {
      state.value = action.payload;
    },
    delQues: (state) => {
        state.value = '';
    },
  },
})

// Action creators are generated for each case reducer function
export const { setQues, delQues } = quesSlice.actions
export const data = (state) => state.counter.value;

export default quesSlice.reducer