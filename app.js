const express = require("express");
const Path = require("path");
const morgan = require("morgan");
const userRouter = require("./routes/userRoute");

const app = express();
app.use(morgan())
app.use(express.json())

app.use("/api/v1/users", userRouter);

module.exports = app;
