const express = require('express');
const app = express();
const db=require('./config/mongoose-connection');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const ownerRouter = require('./routes/ownerRouter');
const indexRouter = require('./routes/index');
const expresssession = require('express-session');
const flash = require('connect-flash');

const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

app.use(expresssession({
    secret: process.env.EXPRESS_SESSION_SECRET || "secretkey",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use("/owners", ownerRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/", indexRouter);


app.listen(3000);