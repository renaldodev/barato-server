import "dotenv/config";
import express from "express";
import productRouter from "./service/product/router";
import baysRouter from "./service/bays/router";
import userRouter from "./service/user/router";
import bodyParser from "body-parser";
import connection from "./database";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/v1/product",productRouter);
app.use("/api/v1/bays",baysRouter);
app.use("/api/v1/user",userRouter);

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
  connection();
});
