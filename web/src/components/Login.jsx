import React, { useState } from "react";
import { Button, TextField, Container, Typography, Link } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { login } from "../api/auth";
const theme = createTheme();

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
      const response = await login(formData);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      alert("Invalid Credentials");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
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
              Login
            </Button>
          </div>
        </form>
        <Typography
          variant="body1"
          align="center"
          style={{ marginTop: "16px" }}
        >
          Don't have an account?{" "}
          <Link component={RouterLink} to="/signup" color="primary">
            SignUp
          </Link>
        </Typography>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
