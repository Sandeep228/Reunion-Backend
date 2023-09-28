const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 8080;
const router = require("./routes/routes");
const { configDotenv } = require("dotenv");
configDotenv();
require("./db-connection");

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
