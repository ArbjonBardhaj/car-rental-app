const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

const carRoutes = require("./routes/carRoutes");

const app = express();

dotenv.config();
app.use(
  cors({
    origin: "*",
  })
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/cars", carRoutes);




const PORT = process.env.PORT || 8800;

const mongourl = process.env.MONGO_URL;

// Routes
// app.use("/controllers/")

mongoose
  .connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`your app is running on ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
