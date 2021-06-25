const express = require("express");
const path = require("path");
const logger = require("morgan");
const sockets = require("./helpers/sockets");

require("dotenv").config();
require("./config/database");

const app = express();
const server = require("http").createServer(app);

sockets.configure(server);

app.use(express.json());
app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "build")));

//API routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/replies", require("./routes/api/replies"));
app.use("/api/items", require("./routes/api/items"));

//Catch all route
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});


const port = process.env.PORT || 3001;

server.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});
