import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("ok");
});

app.listen(process.env.PORT, () => {
  console.log(`server listens to port:${process.env.PORT}`);
});

mongoose
  .connect(process.env.DB_URI as string)
  .then(() => console.log("db connection success"));
