import { Routes, Route, BrowserRouter } from "react-router-dom";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import CustomersPage from "./pages/CustomersPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";

import { Provider } from "react-redux";
import store from "./store/index.js";
import ProductsPage from "./pages/ProductsPage.js";

const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
      <Navbar />
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/products" element={<ProductsPage/>}/>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
