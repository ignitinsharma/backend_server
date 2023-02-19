const express = require("express");
const { connect } = require("./Config/db");
const { authenticate } = require("./Middleware/auth.middlware");

require("dotenv").config();
const server = express();
const cors = require("cors");
const { userRouter } = require("./Routes/users.routes");
const { noteRouter } = require("./Routes/notes.routes");
server.use(cors());

server.use("/", (req, res) => {
  res.send("Home page");
});
server.use(express.json());
server.use("/user", userRouter);
server.use(authenticate);
server.use("/note", noteRouter);

server.listen(process.env.port, async () => {
  try {
    await connect;
    console.log("Connected to successfully.");
  } catch (error) {
    console.log(`something went wrong ${error.message}`);
  }

  console.log(`Server is running on the port ${process.env.port}`);
});
