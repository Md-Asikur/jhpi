import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notices: [],
  minPrice: null,
  maxPrice: null,
};

const noticeSlice = createSlice({
  name: "notice",
  initialState,
  reducers: {
    STORE_NOTICES(state, action) {
      console.log(action.payload);
      state.notices = action.payload.notices;
    },
    GET_PRICE_RANGE(state, action) {
      const { notices } = action.payload;
      const array = [];
      notices.map((notice) => {
        const price = notice.price;
        return array.push(price);
      });
      const max = Math.max(...array);
      const min = Math.min(...array);

      state.minPrice = min;
      state.maxPrice = max;
    },
  },
});

export const { STORE_NOTICES, GET_PRICE_RANGE } =noticeSlice.actions;

export const selectNotices = (state) => state.notices.notices;
export const selectMinPrice = (state) => state.notices.minPrice;
export const selectMaxPrice = (state) => state.notices.maxPrice;

export default noticeSlice.reducer;
