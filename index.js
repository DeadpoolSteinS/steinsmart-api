const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const accountRouter = require("./routes/accountRoutes");
const productRouter = require("./routes/productRoutes");

const app = express();
const port = process.env.PORT || 3000;
const db =
  "mongodb+srv://root:WJeWtPR8f!ZG935@cluster0.hbvkk08.mongodb.net/steinsmart?retryWrites=true&w=majority";

app.use(cors());
app.use(express.json());
app.use(accountRouter);
app.use(productRouter);

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(port, () => {
  console.log("Server started on port 3000");
});
