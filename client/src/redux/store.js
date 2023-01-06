import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import productReducer from "./slice/productSlice";
import filterReducer from "./slice/filterSlice";
import cartReducer from "./slice/cartSlice";
import checkoutReducer from "./slice/checkoutSlice";
import orderReducer from "./slice/orderSlice";
import teacherReducer from "./slice/teacherSlice";
import filterSliceReducer from "./slice/filterSliceTeacher";
import filterSliceNotice from "./slice/filterSliceNotice";
import noticeSlice from "./slice/noticeSlice";
import projectSlice from "./slice/projectSlice";
import filterScProjects from "./slice/filterScProjects";
import EnterSlice from "./slice/EnterSlice";
import filterScEnter from "./slice/filterScEnter";



const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  filter: filterReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  orders: orderReducer,
  teacher: teacherReducer,
  filtertec: filterSliceReducer, //
  notices: noticeSlice,
  filternotices: filterSliceNotice,
  project: projectSlice,
  filterprojects: filterScProjects,
  entertainment: EnterSlice,
  filterentertainments:filterScEnter
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
