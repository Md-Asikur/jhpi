import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entertainments: [],
  minPrice: null,
  maxPrice: null,
};

const entertainmentSlice = createSlice({
  name: "entertainment",
  initialState,
  reducers: {
    STORE_ENTERTAINMENTS(state, action) {
      //   console.log(action.payload);
      state.entertainments = action.payload.entertainments;
    },
    GET_PRICE_RANGE(state, action) {
      const { entertainments } = action.payload;
      const array = [];
      entertainments.map((entertainment) => {
        const price = entertainment.price;
        return array.push(price);
      });
      const max = Math.max(...array);
      const min = Math.min(...array);

      state.minPrice = min;
      state.maxPrice = max;
    },
  },
});

export const { STORE_ENTERTAINMENTS, GET_PRICE_RANGE } = entertainmentSlice.actions;

export const selectEntertainments = (state) => state.entertainment.entertainments;
export const selectMinPrice = (state) => state.entertainment.minPrice;
export const selectMaxPrice = (state) => state.entertainment.maxPrice;

export default entertainmentSlice.reducer;
