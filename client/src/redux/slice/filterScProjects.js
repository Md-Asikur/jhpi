import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProjects: [],
};

const filterSliceProject = createSlice({
  name: "filterprojects",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      const { projects, search } = action.payload;
      const tempProjects = projects.filter(
        (project) =>
          project.name.toLowerCase().includes(search.toLowerCase()) ||
          project.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredProjects = tempProjects;
    },
    SORT_PROJECTS(state, action) {
      const { projects, sort } = action.payload;
      let tempProjects = [];
      if (sort === "latest") {
        tempProjects = projects;
      }

      if (sort === "lowest-price") {
        tempProjects = projects.slice().sort((a, b) => {
          return a.price - b.price;
        });
      }

      if (sort === "highest-price") {
        tempProjects = projects.slice().sort((a, b) => {
          return b.price - a.price;
        });
      }

      if (sort === "a-z") {
        tempProjects = projects.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "z-a") {
        tempProjects = projects.slice().sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }

      state.filteredProjects = tempProjects;
    },
    FILTER_BY_CATEGORY(state, action) {
      const { projects, category } = action.payload;
      let tempProjects = [];
      if (category === "All") {
        tempProjects = projects;
      } else {
        tempProjects = projects.filter((project) => project.category === category);
      }
      state.filteredProjects = tempProjects;
    },
    FILTER_BY_BRAND(state, action) {
      const { projects, brand } = action.payload;
      let tempProjects = [];
      if (brand === "All") {
        tempProjects = projects;
      } else {
        tempProjects = projects.filter((project) => project.brand === brand);
      }
      state.filteredProjects = tempProjects;
    },
    FILTER_BY_PRICE(state, action) {
      const { projects, price } = action.payload;
      let tempProjects = [];
      tempProjects = projects.filter((project) => project.price <= price);

      state.filteredProjects = tempProjects;
    },
  },
});

export const {
  FILTER_BY_SEARCH,
  SORT_PROJECTS,
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
} = filterSliceProject.actions;

export const selectFilteredProjects = (state) => state.filterprojects.filteredProjects;

export default filterSliceProject.reducer;
