import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  styled,
  IconButton,
  Menu,
  MenuItem,
  Button,
  colors,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { deleteProduct } from "../api/product";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  "&:first-child": {
    paddingLeft: theme.spacing(2),
  },
  "&:last-child": {
    paddingRight: theme.spacing(2),
  },
}));

const ProductTable = ({ products, triggerRefresh, counters, setCounters }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (productId) => {
    console.log(`Edit product with ID: ${productId}`);
    handleClose();
    navigate(`/product-edit-form/${productId}`);
  };

  const handleDelete = async (productId) => {
    console.log(`Delete product with ID: ${productId}`);
    handleClose();
    try {
      const token = localStorage.getItem("token");
      const response = await deleteProduct(productId, token);
      if (response.status === 200) {
        triggerRefresh();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAdd = (productId) => {
    setCounters((prevCounters) => {
      const prevCounter = prevCounters[productId] || 0;
      const newCounter = prevCounter + 1;
      return {
        ...prevCounters,
        [productId]: newCounter > 0 ? newCounter : 0,
      };
    });
  };

  const handleSubtract = (productId) => {
    setCounters((prevCounters) => {
      const prevCounter = prevCounters[productId] || 0;
      const newCounter = prevCounter - 1;
      return {
        ...prevCounters,
        [productId]: newCounter > 0 ? newCounter : undefined,
      };
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table style={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <StyledTableCell style={{ width: "20%" }}>
              <Typography variant="h7">
                <b>Name</b>
              </Typography>
            </StyledTableCell>
            <StyledTableCell style={{ width: "20%" }}>
              <Typography variant="h7">
                <b>Description</b>
              </Typography>
            </StyledTableCell>
            <StyledTableCell style={{ width: "20%" }}>
              <Typography variant="h7">
                <b>Price</b>
              </Typography>
            </StyledTableCell>
            <StyledTableCell style={{ width: "20%" }}>
              <Typography variant="h7">
                <b>Quantity</b>
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="h7"></Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="h7"></Typography>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.quantity}</TableCell>

              <TableCell>
                {counters[product._id] !== undefined ? (
                  <div>
                    <IconButton
                      style={{
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                        backgroundColor: "#1876D1",
                        color: "white",
                      }}
                      onClick={() => handleSubtract(product._id)}
                    >
                      -
                    </IconButton>
                    <span
                      style={{
                        width: "50px",
                        display: "inline-block",
                        textAlign: "center",
                      }}
                    >
                      {counters[product._id]}
                    </span>
                    <IconButton
                      style={{
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                        backgroundColor: "#1876D1",
                        color: "white",
                      }}
                      onClick={() => handleAdd(product._id)}
                    >
                      +
                    </IconButton>
                  </div>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAdd(product._id)}
                  >
                    + ADD
                  </Button>
                )}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  aria-controls="menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => handleEdit(product._id)}>
                    Edit
                  </MenuItem>
                  <MenuItem onClick={() => handleDelete(product._id)}>
                    Delete
                  </MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
