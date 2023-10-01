import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid,
  Container,
} from "@mui/material";
import { getOrderDetails, submitOrder } from "../api/order";

const OrderDetails = () => {
  const { order_id } = useParams();
  const [orderData, setOrderData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await getOrderDetails(token, order_id);
        if (response.status === 200) {
          setOrderData(response.data);
          console.log("orderData", orderData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrderDetails();
  }, []);
  const handleSubmitOrder = async ()=>{
    try {
      const token = localStorage.getItem("token");
        const response = await submitOrder(token, order_id);
        if (response.status === 200) {
          const file_url = response.data.file_url; // Assuming filePath is returned by API
          openFileInNewTab(file_url);
          navigate("/product")
        }
    } catch (error) {
      console.log(error);
    }

  }
  const openFileInNewTab = (filePath) => {
    window.open(filePath, '_blank');
  };
  

  const downloadFile = (filePath) => {
    const link = document.createElement("a");
    link.href = filePath;
    link.download = "downloaded_file"; // You can set the name of the downloaded file here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderData.map((item) => (
              <TableRow key={item._id}>
                <TableCell component="th" scope="row">
                  {item.product_name}
                </TableCell>
                <TableCell align="right">{item.price}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid item xs={15} style={{ textAlign: "center", marginTop: "10px" }}>
        <Button variant="contained" color="primary" type="submit" onClick={handleSubmitOrder}>
          Submit
        </Button>
      </Grid>
    </Container>
  );
};

export default OrderDetails;
