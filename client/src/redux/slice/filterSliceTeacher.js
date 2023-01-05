
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredTeachers: [],
};

const filterSliceTeacher = createSlice({
  name: "filtertec",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      const { teachers, search } = action.payload;
      const tempTeachers = teachers.filter(
        (teacher) =>
          teacher.name.toLowerCase().includes(search.toLowerCase()) ||
          teacher.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredTeachers = tempTeachers;
    },
    SORT_TEACHERS(state, action) {
      const { teachers, sort } = action.payload;
      let tempTeachers = [];
      if (sort === "latest") {
        tempTeachers =teachers;
      }

      if (sort === "lowest-price") {
        tempTeachers = teachers.slice().sort((a, b) => {
          return a.price - b.price;
        });
      }

      if (sort === "highest-price") {
        tempTeachers = teachers.slice().sort((a, b) => {
          return b.price - a.price;
        });
      }

      if (sort === "a-z") {
        tempTeachers = teachers.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "z-a") {
        tempTeachers = teachers.slice().sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }

      state.filteredTeachers = tempTeachers;
    },
    FILTER_BY_CATEGORY(state, action) {
      const { teachers, category } = action.payload;
      let tempTeachers = [];
      if (category === "All") {
        tempTeachers = teachers;
      } else {
        tempTeachers = teachers.filter((teacher) => teacher.category === category);
      }
      state.filteredTeachers = tempTeachers;
    },
    FILTER_BY_BRAND(state, action) {
      const { teachers, brand } = action.payload;
      let tempTeachers = [];
      if (brand === "All") {
        tempTeachers = teachers;
      } else {
        tempTeachers = teachers.filter((teacher) => teacher.brand === brand);
      }
      state.filteredTeachers = tempTeachers;
    },
    FILTER_BY_PRICE(state, action) {
      const { teachers, price } = action.payload;
      let tempTeachers = [];
      tempTeachers = teachers.filter((teacher) => teacher.price <= price);

      state.filteredTeachers = tempTeachers;
    },
  },
});

export const {
  FILTER_BY_SEARCH,
  SORT_TEACHERS,
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
} = filterSliceTeacher.actions;

export const selectFilteredTeachers = (state) => state.filtertec.filteredTeachers;

export default filterSliceTeacher.reducer;
