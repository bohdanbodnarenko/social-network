const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator'),
    cookieParser = require('cookie-parser'),
    userRoutes = require('./routes/user');

//Config env
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());

// handle jwt error
app.use((err, req, res, next) => {
    console.log(123)
    console.log(err)
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({
            error: 'Invalid token'
        });
    }
});

//db
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('DB Connected'));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});

//routes
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');

app.use('/', postRoutes);
app.use('/', authRoutes);
app.use('/', userRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Api is listening on port: ${port}`));