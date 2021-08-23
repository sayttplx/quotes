const express = require('express');

// express app
const app = express();

// listen for requests
app.listen(3000);

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

app.get('/', (req, res) => {
  const quotes = [
    {title: 'Carl Sagan', snippet: `“If you wish to make an apple pie from scratch, you must first invent the universe.”`},
    {title: 'Carl Sagan', snippet: `“Extraordinary claims require extraordinary evidence.”`},
    {title: 'Carl Sagan', snippet: `“I don't want to believe. I want to know.”`},
  ];
  res.render('index', { title: 'Home', quotes });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/quotes/create', (req, res) => {
  res.render('create', { title: 'Create a new quote' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});