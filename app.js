const express = require("express");
const Path = require("path");
const morgan = require("morgan");
const userRouter = require("./routes/userRoute");
const categoryRouter = require("./routes/categoryRoute");

const app = express();
app.use(morgan())
app.use(express.json())

app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);

module.exports = app;
