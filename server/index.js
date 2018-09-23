require('dotenv').config();
const http = require("http");
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

const static = path.resolve(__dirname, "static");
const index = path.resolve(static, "index.html");

app.use(express.static(static));
app.get("*", (_, res) => res.sendfile(index));

http.createServer(app).listen(port, () => {
    console.log(`listeningn on ${port}`);
});