import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Pages
import { Home, Contact, Register, Reset, Admin,TecAdmin,TecHome,NoticeAdmin } from "./pages";
// Components
import { Header, Footer } from "./components";
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
import ProductDetails from "./components/product/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import Checkout from "./pages/checkout/Checkout";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import OrderHistory from "./pages/orderHistory/orderHistory";
import OrderDetails from "./pages/orderDetails/OrderDetails";
import ReviewProducts from "./components/reviewProducts/ReviewProducts";
import AddProduct from "./components/admin/addProduct/AddProduct";
import Login from "./com_1/components/user/Login";
import Dashboard from "./pages copy/dashboard/Dashboard";
import Notification from "./com_1/components/Notification";
import About from "./components1/About/About";
import PrincipalInfo from "./components1/About/PrincipalInfo";
import Gallery from "./Gallery/Gallery";
import Product from "./components/product/Product";


import AddTeacher from "./components/admin/addProduct/AddTeacher";
import {Helmet} from "react-helmet"
import TeacherAL from "./components/product/TeacherAL";
import NoticeAL from "./components/product/NoticeAL";
import TeacherDetails from "./components/product/productDetails/TeacherDetails";
import NoticeDetails from "./components/product/productDetails/NoticeDetails";


function App() {
  return (
    <>
      <div style={{ padding: "0px 4px" }}>
        <BrowserRouter>
          <Notification />
          <ToastContainer />
          <Login />
          <Header />

          <Routes>
            <Route path="/teachers" element={<TeacherAL />} />
            <Route path="/notices" element={<NoticeAL />} />

            <Route path="/" element={<Home />} />
            <Route path="dashboard/*" element={<Dashboard />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
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
            <Route path="/product-details/:id" element={<ProductDetails />} />
            <Route path="/teachers-details/:id" element={<TeacherDetails />} />
            <Route path="/notices-details/:id" element={<NoticeDetails/>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout-details" element={<CheckoutDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/order-details/:id" element={<OrderDetails />} />
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
