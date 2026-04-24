const express = require("express");
const cors = require("cors");
const { v4: uuid } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

let expenses = [];

function calc(e) {
  return {
    ...e,
    id: uuid(),
    purchase_total: e.amount_installment * e.installments_total,
    final_amount: e.amount_installment - e.discount
  };
}

app.get("/", (req, res) => {
  res.send("API ONLINE 🚀");
});

app.post("/expenses", (req, res) => {
  const exp = calc(req.body);
  expenses.push(exp);
  res.json(exp);
});

app.get("/expenses", (req, res) => {
  res.json(expenses);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("rodando"));
