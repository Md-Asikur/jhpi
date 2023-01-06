import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  minPrice: null,
  maxPrice: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    STORE_PROJECTS(state, action) {
      //   console.log(action.payload);
      state.projects = action.payload.projects;
    },
    GET_PRICE_RANGE(state, action) {
      const { projects } = action.payload;
      const array = [];
      projects.map((project) => {
        const price = project.price;
        return array.push(price);
      });
      const max = Math.max(...array);
      const min = Math.min(...array);

      state.minPrice = min;
      state.maxPrice = max;
    },
  },
});

export const { STORE_PROJECTS, GET_PRICE_RANGE } = projectSlice.actions;

export const selectProjects = (state) => state.project.projects;
export const selectMinPrice = (state) => state.project.minPrice;
export const selectMaxPrice = (state) => state.project.maxPrice;

export default projectSlice.reducer;
