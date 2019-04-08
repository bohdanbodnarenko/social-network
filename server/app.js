const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  expressValidator = require("express-validator"),
  cookieParser = require("cookie-parser"),
  userRoutes = require("./routes/user"),
  fs = require("fs"),
  cors = require("cors"),
  http = require('http').Server(app),
  io = require('socket.io')(http);

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

// io.on('connection', (client) => {
//   console.log(client)
//   client.on('like', data => {
//     console.log(data)
//   });
// });

io.emit('like', 'data from server');

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Api is listening on port: ${port}`));