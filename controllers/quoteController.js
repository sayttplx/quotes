const Quote = require('../models/quote');

const quote_index = (req, res) => {
    Quote.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { quotes: result, title: 'All quotes' });
        })
        .catch(err => {
            console.log(err);
        });
}

const quote_details = (req, res) => {
    const id = req.params.id;
    Quote.findById(id)
        .then(result => {
            res.render('details', { quote: result, title: 'Quote Details' });
        })
        .catch(err => {
            console.log(err);
            res.render('404', { title: 'Quote not found' });
        });
}

const quote_create_get = (req, res) => {
    res.render('create', { title: 'Create a new quote' });
}

const quote_create_post = (req, res) => {
    const quote = new Quote(req.body);
    quote.save()
        .then(result => {
            res.redirect('/quotes');
        })
        .catch(err => {
            console.log(err);
        });
}

const quote_delete = (req, res) => {
    const id = req.params.id;
    Quote.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/quotes' });
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = {
    quote_index,
    quote_details,
    quote_create_get,
    quote_create_post,
    quote_delete
}