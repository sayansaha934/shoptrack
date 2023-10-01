import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Container, Typography, Link } from "@mui/material";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";


import {signup} from '../api/auth'
const theme = createTheme();

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signup(formData);
      if (response.status === 200) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error)
      alert('Email already exsist')
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" style={{ marginTop: "50px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Signup
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "16px",
            }}
          >
            <Button variant="contained" color="primary" type="submit">
              Sign Up
            </Button>
          </div>
        </form>
        <Typography
          variant="body1"
          align="center"
          style={{ marginTop: "16px" }}
        >
          Already have an account?{" "}
          <Link component={RouterLink} to="/" color="primary">
            Login
          </Link>
        </Typography>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
