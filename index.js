import express from "express";
import dotenv from "dotenv";
import productRoute from "./routes/product.routes.js";
import customerRoute from "./routes/customer.routes.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/v1", productRoute);
app.use("/api/v1", customerRoute);

app.listen(PORT, () => {
  console.log("App is running on PORT " + PORT);
});
