import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredNotices: [],
};

const filterSliceNotice = createSlice({
  name: "filternotices",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      const { notices, search } = action.payload;
      const tempNotices = notices.filter(
        (notice) =>
          notice.name.toLowerCase().includes(search.toLowerCase()) ||
          notice.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredNotices = tempNotices;
    },
    SORT_NOTICES(state, action) {
      const { notices, sort } = action.payload;
      let tempNotices = [];
      if (sort === "latest") {
        tempNotices = notices;
      }

      if (sort === "lowest-price") {
        tempNotices = notices.slice().sort((a, b) => {
          return a.price - b.price;
        });
      }

      if (sort === "highest-price") {
        tempNotices = notices.slice().sort((a, b) => {
          return b.price - a.price;
        });
      }

      if (sort === "a-z") {
        tempNotices = notices.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "z-a") {
        tempNotices = notices.slice().sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }

      state.filteredNotices = tempNotices;
    },
    FILTER_BY_CATEGORY(state, action) {
      const { notices, category } = action.payload;
      let tempNotices = [];
      if (category === "All") {
        tempNotices = notices;
      } else {
        tempNotices = notices.filter((notice) => notice.category === category);
      }
      state.filteredNotices = tempNotices;
    },
    FILTER_BY_BRAND(state, action) {
      const { notices, brand } = action.payload;
      let tempNotices = [];
      if (brand === "All") {
        tempNotices = notices;
      } else {
        tempNotices = notices.filter((notice) => notice.brand === brand);
      }
      state.filteredNotices = tempNotices;
    },
    FILTER_BY_PRICE(state, action) {
      const { notices, price } = action.payload;
      let tempNotices = [];
      tempNotices = notices.filter((notice) => notice.price <= price);

      state.filteredNotices = tempNotices;
    },
  },
});

export const {
  FILTER_BY_SEARCH,
  SORT_NOTICES,
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
} = filterSliceNotice.actions;

export const selectFilteredNotices = (state) => state.filternotices.filteredNotices;

export default filterSliceNotice.reducer;
