const jwt = require("jsonwebtoken");
const { Order, OrderItems } = require("../models/order");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

function getUserIdFromToken(token) {
  const SECRET_KEY = "a whole story";

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    return decodedToken.id;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}

async function generatepdf(order_id) {
  const order_items = await OrderItems.find({ order_id: order_id });
  const doc = new PDFDocument();
  const pdfName = `order_summary_${order_id}.pdf`;

  const pdfPath = `static/${pdfName}`;
  const file_url = `http://localhost:5000/${pdfPath}`
  // Pipe the PDF content to a file
  const output = fs.createWriteStream(pdfPath);
  doc.pipe(output);

  // Define the content of the PDF
  doc.fontSize(16).text("Order Summary", { align: "center" });

  order_items.forEach((item) => {
    doc
      .fontSize(12)
      .text(
        `Product Name: ${item.product_name}, Quantity: ${
          item.quantity
        }, Price: INR${item.price.toFixed(2)}`
      );
    doc.moveDown();
  });

  doc.end();

  console.log("PDF generated successfully!");
  return file_url
}

module.exports = { getUserIdFromToken, generatepdf };
