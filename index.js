const express = require("express");
const mongoose = require("mongoose");
const createError = require("http-errors");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const path = require("path");

const app = express();
dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

app.use(bodyparser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use("/css", express.static(path.resolve(__dirname, "asset/css")));
app.use("/img", express.static(path.resolve(__dirname, "asset/img")));
app.use("/js", express.static(path.resolve(__dirname, "asset/js")));

app.use(express.json());

mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => console.log(err.message));

app.all("/test", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});
const Route = require("./Routes/route");
app.use("/", Route);

const ProductRoute = require("./Routes/Product.route");
app.use("/products", ProductRoute);

app.use((req, res, next) => {
  // const err = new Error('Not Found');
  // err.status = 404;
  // next(err);
  next(createError(404, "Not Found"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`server is started on http://localhost:${PORT}`);
});
