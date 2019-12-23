var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");

var transactionHandler = require('./moneyControls/transactionController')
var app = express();
mongoose.connect('mongodb://localhost/money')
    // use router to do the route to the file 
    //app.use('/', require('/routes/index'))
    //body parser is used to get the body when applying the post or ... 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//get the sentence when opening the first page
app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('I am in the first page ');
});


app.get('/my_money', function(req, res) {
        res.setHeader('Content-Type', 'text/plain')
        res.send('get my money')
    })
    //showing all the transaction

app.prefix = function(path, configure) {
    var router = express.Router();
    this.use(path, router);
    configure(router);
    return router;
};

app.prefix('/transaction', function(transaction) {

    transaction.route('/all').get(transactionHandler.getTransaction)
    transaction.route('/:id').get(transactionHandler.getTransactionByID)
    transaction.route('/one').get(transactionHandler.getTransactionsByOne)
    transaction.route('/').post(transactionHandler.postTransaction)
    transaction.route('/all').delete(transactionHandler.deleteTranscation)
    transaction.route('/:id').delete(transactionHandler.deleteTranscationByID)
    transaction.route('/one').delete(transactionHandler.findTransactionandDelete)
    transaction.route('/:id').put(transactionHandler.updateTransaction)
    transaction.route('/one').put(transactionHandler.findTransactionandUpdate)
})

/*
app.get('/transactions', transactionHandler.getTransaction);
app.get('/transaction/:id', function(req, res) {
    transactionHandler.getTransactionByID(req, res)
});
app.get('/transaction', transactionHandler.getTransactionsByOne)


app.post('/transaction', transactionHandler.postTransaction);


app.delete('/transactions', transactionHandler.deleteTranscation);
app.delete('/transaction/:id', transactionHandler.deleteTranscationByID)
app.delete('/transaction', transactionHandler.findTransactionandDelete)


app.put('/transaction/:id', transactionHandler.updateTransaction)
app.put('/transaction', transactionHandler.findTrnasactionandUpdate)*/
//app.use(express.static(__dirname +"/public"));
//create the server at port 3000
app.listen(3000);

console.log("server running on port 3000");