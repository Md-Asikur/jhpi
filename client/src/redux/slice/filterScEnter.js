import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredEntertainments: [],
};

const filterSliceEntertainment = createSlice({
  name: "filterentertainments",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      const { entertainments, search } = action.payload;
      const tempEntertainment = entertainments.filter(
        (entertainment) =>
          entertainment.name.toLowerCase().includes(search.toLowerCase()) ||
          entertainment.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredEntertainments = tempEntertainment;
    },
    SORT_ENTERTAINMENT(state, action) {
      const { entertainments, sort } = action.payload;
      let tempEntertainment = [];
      if (sort === "latest") {
        tempEntertainment = entertainments;
      }

      if (sort === "lowest-price") {
        tempEntertainment = entertainments.slice().sort((a, b) => {
          return a.price - b.price;
        });
      }

      if (sort === "highest-price") {
        tempEntertainment = entertainments.slice().sort((a, b) => {
          return b.price - a.price;
        });
      }

      if (sort === "a-z") {
        tempEntertainment = entertainments.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "z-a") {
        tempEntertainment = entertainments.slice().sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }

      state.filteredEntertainments = tempEntertainment;
    },
    FILTER_BY_CATEGORY(state, action) {
      const { entertainments, category } = action.payload;
      let tempEntertainment = [];
      if (category === "All") {
        tempEntertainment = entertainments;
      } else {
        tempEntertainment = entertainments.filter((entertainment) => entertainment.category === category);
      }
      state.filteredEntertainments = tempEntertainment;
    },
    FILTER_BY_BRAND(state, action) {
      const { entertainments, brand } = action.payload;
      let tempEntertainment = [];
      if (brand === "All") {
        tempEntertainment = entertainments;
      } else {
        tempEntertainment = entertainments.filter((entertainment) => entertainment.brand === brand);
      }
      state.filteredEntertainments = tempEntertainment;
    },
    FILTER_BY_PRICE(state, action) {
      const { entertainments, price } = action.payload;
      let tempEntertainment = [];
      tempEntertainment = entertainments.filter((entertainment) => entertainment.price <= price);

      state.filteredEntertainments = tempEntertainment;
    },
  },
});

export const {
  FILTER_BY_SEARCH,
  SORT_ENTERTAINMENT,
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
} = filterSliceEntertainment.actions;

export const selectFilteredEntertainment = (state) =>
  state.filterentertainments.filteredEntertainments;

export default filterSliceEntertainment.reducer;
