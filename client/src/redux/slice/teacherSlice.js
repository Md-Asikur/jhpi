import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teachers: [],
  minPrice: null,
  maxPrice: null,
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    STORE_TEACHERS(state, action) {
         console.log(action.payload);
      state.teachers = action.payload.teachers;
    },
    GET_PRICE_RANGE(state, action) {
      const { teachers } = action.payload;
      const array = [];
      teachers.map((teacher) => {
        const price = teacher.price;
        return array.push(price);
      });
      const max = Math.max(...array);
      const min = Math.min(...array);

      state.minPrice = min;
      state.maxPrice = max;
    },
  },
});

export const { STORE_TEACHERS, GET_PRICE_RANGE } = teacherSlice.actions;

export const selectTeachers = (state) => state.teacher.teachers;
export const selectMinPrice = (state) => state.teacher.minPrice;
export const selectMaxPrice = (state) => state.teacher.maxPrice;

export default teacherSlice.reducer;
