const express = require("express");
// const products = require("./data/products");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const Colors = require("colors");
const productRoutes = require("./routes/productRoutes");
const { notFound } = require("./middleware/errorMiddleware");
const { errorHandler } = require("./middleware/errorMiddleware");
dotenv.config();
connectDB();

const app = express();

const Port = process.env.PORT || 6000;

app.use(cors());
app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send(`API is running`);
});

app.listen(5000, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${Port}`.green
      .bold
  );
});
