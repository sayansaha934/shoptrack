import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Grid } from "@mui/material";
import { editProduct, getProduct } from "../api/product";
import { useNavigate, useParams } from "react-router-dom";

const ProductEditForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await getProduct(id, token);
        if (response.status === 200) {
          const productData = response.data;
          setFormData({
            name: productData.name,
            description: productData.description,
            price: productData.price,
            quantity: productData.quantity,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const token = localStorage.getItem("token");
      const response = await editProduct(id, formData, token);
      if (response.status === 200) {
        navigate("/product");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required={true}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Price"
              variant="outlined"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required={true}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Quantity"
              variant="outlined"
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required={true}
            />
          </Grid>
          <Grid item xs={15} style={{ textAlign: "center", marginTop: "10px" }}>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ProductEditForm;
