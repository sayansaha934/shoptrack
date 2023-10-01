import React, { useState, useEffect } from "react";
import { Button, Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProductTable from "./ProductTable";
import { getAllProduct } from "../api/product";
import { createOrder } from "../api/order";
const Product = () => {
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [counters, setCounters] = useState({});

  const triggerRefresh = () => {
    setRefresh(true);
  };

  const navigate = useNavigate();
  const handleAddProduct = () => {
    navigate("/product-add-form");
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await getAllProduct(token);
      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOrderSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log('token', token)
      const response = await createOrder(token, counters);
      if (response.status === 200) {
        const order_id = response.data.order_id
        navigate(`/order/${order_id}`)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  return (
    <Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          style={{ marginRight: "8px" }}
        />
        <Button
          variant="contained"
          style={{ height: "50px", width: "170px", textTransform: "none" }}
          onClick={handleAddProduct}
        >
          Add Product/Service
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ height: "50px", width: "170px", textTransform: "none" }}
          onClick={handleOrderSubmit}
        >
          Create Order
        </Button>
      </Box>

      <Box style={{ marginTop: "30px" }}>
        <ProductTable
          products={products}
          triggerRefresh={triggerRefresh}
          setCounters={setCounters}
          counters={counters}
        />
      </Box>
    </Box>
  );
};

export default Product;
