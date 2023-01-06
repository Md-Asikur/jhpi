import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Pages
import { Home, Reset, Admin, TecAdmin, NoticeAdmin } from "./pages";
// Components
import { Header, Footer } from "./components";
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
import ProductDetails from "./components/product/productDetails/ProductDetails";

import ReviewProducts from "./components/reviewProducts/ReviewProducts";

import Login from "./com_1/components/user/Login";
import Dashboard from "./pages copy/dashboard/Dashboard";
import Notification from "./com_1/components/Notification";
import About from "./components1/About/About";
import PrincipalInfo from "./components1/About/PrincipalInfo";
import Gallery from "./Gallery/Gallery";
import Product from "./components/product/Product";

import TeacherAL from "./components/product/TeacherAL";
import NoticeAL from "./components/product/NoticeAL";
import TeacherDetails from "./components/product/productDetails/TeacherDetails";
import NoticeDetails from "./components/product/productDetails/NoticeDetails";
import Loading from "./com_1/components/Loading";

function App() {
  return (
    <>
      <div className="appp">
        <BrowserRouter>
          <Header />
          <Loading />
          <Notification />
          <ToastContainer />
          <Login />

          <Routes>
            <Route path="/teachers" element={<TeacherAL />} />
            <Route path="/notices" element={<NoticeAL />} />

            <Route path="/" element={<Home />} />
            <Route path="dashboard/*" element={<Dashboard />} />

            <Route path="/reset" element={<Reset />} />

            <Route
              path="/teacher/*"
              element={
                <AdminOnlyRoute>
                  <TecAdmin />
                </AdminOnlyRoute>
              }
            />
            <Route
              path="/admin/*"
              element={
                <AdminOnlyRoute>
                  <Admin />
                </AdminOnlyRoute>
              }
            />
            <Route
              path="/notice/*"
              element={
                <AdminOnlyRoute>
                  <NoticeAdmin />
                </AdminOnlyRoute>
              }
            />
            <Route path="/student-details/:id" element={<ProductDetails />} />
            <Route path="/teachers-details/:id" element={<TeacherDetails />} />
            <Route path="/notices-details/:id" element={<NoticeDetails />} />

            <Route path="/review-product/:id" element={<ReviewProducts />} />
            {/*  */}
            <Route path="/about" element={<About />} />
            <Route path="/principal" element={<PrincipalInfo />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/students" element={<Product />} />

            {/* Teacher Routes */}
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
