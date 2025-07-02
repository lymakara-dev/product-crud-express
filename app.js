const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

let requestCount = 0;
app.use((req, res, next) => {
  requestCount++;
  console.log(`Request count: ${requestCount}`);
  next();
});

app.get("/", (req, res) => {
  console.log("HELLO");
  res.send("HI 123 is called " + requestCount + " times");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
