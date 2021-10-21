const express = require("express");
const router = express.Router();

const customers = [{ id: 1, firstName: "Arif", lastName: "Osman", age: 25 }];

router.get("/", function (req, res, next) {
  res.send("API is working properly");
});

router.get("/api/customers", (req, res) => {
  res.json(customers);
});

router.post("/api/customers", (req, res) => {
  const customer = {
    id: customers.length + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
  };
  customers.push(customer);
  res.json(customer);
});

router.get("/api/customers/:id", (req, res) => {
  const find = customers.find((x) => x.id === parseInt(req.params.id));
  if (!find) res.status(404).send("Cannot find customer");
  else res.json(find);
});

router.put("/api/customers/:id", (req, res) => {
  const customer = customers.find((x) => x.id === parseInt(req.params.id));
  if (!customer) res.status(404).send("Cannot find customer");
  else {
    customer
      .filter((x) => x.id === parseInt(req.params.id))
      .map((x) => ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
      }));
    res.json(customer);
  }
});

router.delete("/api/customers/:id", (req, res) => {
  console.log("req", req.params);
  const customer = customers.find((x) => x.id === parseInt(req.params.id));
  if (!customer) res.status(404).send("Cannot find customer");

  const index = customers.indexOf(customer);
  customers.splice(index, 1);

  res.send(customer);
});

module.exports = router;
