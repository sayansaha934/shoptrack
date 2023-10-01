require("dotenv").config();
const express = require("express");
var cors = require("cors");
const connectToMongoDB = require("./db");
const path = require('path');

const PORT = process.env.PORT;
connectToMongoDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", require("./routers/user"));
app.use("/product", require("./routers/product"))
app.use("/order", require("./routers/order"))
app.use('/static', express.static(path.join(__dirname, 'static')));

app.listen(PORT, () => {
  console.log(`Shop Track app listening on port ${PORT}`);
});
