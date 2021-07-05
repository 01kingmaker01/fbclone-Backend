import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts";
import compression from "compression";

const app = express();
app.use(compression());

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const dbUrl = process.env.DB_URL,
  PORT = process.env.PORT || 3333;
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server Connected on PORT : ${PORT}`))
  )
  .catch((e) => console.log(e));

app.get("/", (req, res) => {
  res.send("FB BackEnd");
});

app.use("/posts", postRoutes);

app.all("*", (req, res, next) => {
  next(new AppError("Not Found!!", 404));
});
