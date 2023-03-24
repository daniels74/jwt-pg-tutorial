const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

//Routes//
app.use("/auth", require("./routes/jwtAuth"));

app.use("/dashboard", require("./routes/dashboard"));

app.listen(80, () => {
    console.log("Server is running on port 80");
})