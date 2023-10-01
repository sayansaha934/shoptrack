import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles"; // Import ThemeProvider and createTheme

import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  SignUp,
  Login,
  Dashboard,
  AllModule,
  Home,
  Product,
  ProductAddForm,
  ProductEditForm,
  OrderDetails
} from "./components/index";
const theme = createTheme();
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />

          <Route path="/" element={<AllModule />}>
            <Route index path="/home" element={<Home />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/product" element={<Product />} />
            <Route exact path="/product-add-form" element={<ProductAddForm />} />
            <Route exact path="/product-edit-form/:id" element={<ProductEditForm />} />
            <Route exact path="/order/:order_id" element={<OrderDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
