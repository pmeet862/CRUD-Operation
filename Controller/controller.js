const axios = require("axios");

exports.home = (req, res) => {
  axios
    .get("http://localhost:5000/products")
    .then(function (response) {
      res.render("index", { products: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.add_product = (req, res) => {
  res.render("add_product");
};

exports.update_product = (req, res) => {
  //console.log(req.query);
  axios
    .get(`http://localhost:5000/products/${req.query.id}`)
    .then(function (productdata) {
      //console.log(productdata);
      res.render("update_product", { product: productdata.data });
    })
    .catch((err) => {
      res.send(err);
    });
};
