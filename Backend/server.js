require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

const cors = require("cors");
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

//routes
const restaurantRoutes = require("./routes/restaurants");
const dishRoutes = require("./routes/dishs");
const uploadRouter = require("./routes/upload");
const categoryRouter = require("./routes/categories");
const orderRouter = require("./routes/orders");
const userRouter = require("./routes/users");

const orderSocketRoutes = require("./routes/ordersSocketIo")(io);

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/restaurants", restaurantRoutes);
app.use("/api/dishs", dishRoutes);
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/upload-img", uploadRouter);
app.use("/api/orders", orderRouter);
app.use("/api/socket-io-orders", orderSocketRoutes);

io.on("connection", (socket) => {
  // console.log(socket.id);
  const clientId = socket.handshake.query.id;
  if (!clientId) {
    return;
  }
  console.log(clientId);
  socket.join(clientId);
});

mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log("connected to db & listeneing on port ", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
