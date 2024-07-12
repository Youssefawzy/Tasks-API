const express = require("express");
const Path = require("path");
const morgan = require("morgan");
const userRouter = require("./routes/userRoute");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());

app.use(
  cookieSession({
    name: "session",
    keys: ["asdfasdf"],

    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(cookieParser());

app.use("/api/v1/users", userRouter);

module.exports = app;
