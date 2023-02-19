const express = require("express");
const { connect } = require("./Config/db");
const { auth } = require("./Middleware/auth.middlware");
const { noteRouter } = require("./Routes/notes.routes");
const { userRouter } = require("./Routes/users.routes");
const { cors } = require("cors");
require("dotenv").config();

const server = express();
server.use(
  cors({
    origin: "*",
  })
);

server.use("/", (req, res) => {
  res.send("Home page");
});
server.use(express.json());
server.use("/users", userRouter);
server.use(auth);
server.use("/notes", noteRouter);

server.listen(process.env.port, async () => {
  try {
    await connect;
    console.log("Connected to successfully.");
  } catch (error) {
    console.log(`something went wrong ${error.message}`);
  }

  console.log(`Server is running on the port ${process.env.port}`);
});
