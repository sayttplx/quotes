require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const quoteRoutes = require('./routes/quoteRoutes');

// express app
const app = express();

// connect to mongodb & listen for requests
mongoose.connect(process.env.MONGO_URI, {})
  .then(result => app.listen(8080))
  .then(console.log('Server is running at port 8080'))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/quotes');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// quote routes
app.use('/quotes', quoteRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});