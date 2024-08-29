import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.route";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use(cors());
app.get("/", (_, res) => {
  res.send("user service - bytewaveForum");
});

mongoose
  .connect(process.env.DB_URI as string)
  .then(() => console.log("db connection success"))
  .catch((error) => {
    console.log("db connection failed", error);
  });

app.listen(process.env.PORT, () => {
  console.log(`server listens to port:${process.env.PORT}`);
});
