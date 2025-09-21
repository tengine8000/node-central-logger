const express = require("express");
require("dotenv").config();
const api = require("./routes/api");

const app = express();
app.use("/api", api);

const port = process.env.PORT || 5005;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
