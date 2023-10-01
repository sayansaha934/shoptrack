import React from "react";
import { Button, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const itemList = ["Home", "Product", "Dashboard"];
const SideBar = () => {
  return (
    <div style={{ width: "200px", background: "#13274F", height: "100vh" }}>
      {itemList.map((item, index) => (
        <Button
          key={index}
          fullWidth
          variant="text"
          color="primary"
          style={{
            marginTop: "8px",
            color: "white",
            fontWeight: "bold",
            fontSize: '17px',
            textTransform: "none",
          }}
          component={RouterLink}
          to={`/${item.toLowerCase()}`}
        >
          {item}
        </Button>
      ))}
    </div>
  );
};

export default SideBar;
