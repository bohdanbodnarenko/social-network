const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  expressValidator = require("express-validator"),
  cookieParser = require("cookie-parser"),
  userRoutes = require("./routes/user"),
  channelRoutes = require("./routes/channel"),
  fs = require("fs"),
  cors = require("cors"),
  http = require("http").Server(app),
  io = require("socket.io")(http),
  { socketManager, userConnected } = require("./sockets/SocketManager");

app.io = io;
//Config env
const dotenv = require("dotenv");
dotenv.config();

app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  fs.readFile("docs/apiDocs.json", (error, data) => {
    if (error) {
      res.status(400).json({
        error
      });
    }
    const docs = JSON.parse(data);
    res.json(docs);
  });
});

//db
mongoose.connect(process.env.MONGO_URI).then(() => console.log("DB Connected"));

mongoose.connection.on("error", err => {
  console.log(`DB connection error: ${err.message}`);
});

//routes
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");

app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", channelRoutes);

io.on("connection", socketManager);
io.on("user_connected", userConnected);

const port = process.env.PORT || 8080;

http.listen(port, () => console.log(`Api is listening on port: ${port}`));
