const express = require("express");
const Path = require("path");
const morgan = require("morgan");

const app = express();
app.use(express.json());

module.exports = app;
