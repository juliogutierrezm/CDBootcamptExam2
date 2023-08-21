const express = require("express");
const cors = require("cors");
const app = express();
require("./config/mongo.config");

app.use(cors());
app.use(express.json()); // This is new
app.use(express.urlencoded({ extended: true })); // This is new

require("./routes/item.routes")(app); // Changed to item.routes
app.listen(8000, () => {
  console.log("Listening at Port 8000");
});
