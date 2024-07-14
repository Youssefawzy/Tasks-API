const express = require("express");
const Path = require("path");
const morgan = require("morgan");
const userRouter = require("./routes/userRoute");
const categoryRouter = require("./routes/categoryRoute");
const taskRouter = require("./routes/taskRoute");
const { specs, swaggerUi } = require("./swagger");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/categories", categoryRouter);

module.exports = app;
