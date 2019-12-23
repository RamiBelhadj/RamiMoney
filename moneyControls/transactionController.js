const TransactionState = require('./transactionModel')

exports.getTransaction = (req, res) => {
    TransactionState.find({}, function(err, data) {
        if (err) {
            console.log('An error occured in getting Transactions', err);
        }
        if (data.length == 0) {
            console.log('data length equal to 0');
            res.status(200).json();
        } else {
            console.log(data);
            res.status(200).json(data);
            res.end();
        }
    })
}
exports.getTransactionByID = (request, result) => {
    TransactionState.findById(request.params.id, function(err, data) {

        if (err) {
            console.log('An error occured in getting this id', err);
            return null;
        } else {
            result.setHeader('Content-Type', 'application/json');
            //console.log(returneddata)
            result.status(200).json(data);

        }
    })
}

exports.getTransactionsByOne = (request, result) => {
    TransactionState.findOne(request.body, function(err, data) {

        if (err) {
            console.log('An error occured in getting this id', err);
            return null;
        } else {
            result.setHeader('Content-Type', 'application/json');
            //console.log(returneddata)
            result.status(200).json(data);

        }
    })
}


exports.postTransaction = (req, res) => {
    new TransactionState({
        shopping_item: req.body.shopping_item,
        price_per_unit: req.body.price_per_unit,
        date: new Date(req.body.date),
        Quantity: req.body.Quantity,
        Place: req.body.Place,
        price_buy: req.body.price_buy
    }).save(function(err, x) {
        if (err) { console.log('An error occurred in postTransaction', err) }
        res.status(200).send('posted boardState' + x)
    })
    console.log(req.body)
}

exports.deleteTranscation = (req, res) => {
    TransactionState.remove({}, () => {
        res.status(200).send('Removed Transaction');
    })
}

exports.deleteTranscationByID = (req, res) => {
    TransactionState.findByIdAndRemove(req.params.id, (err, todo) => {
        if (err) {
            //                console.log('ID not exist ')
            return res.status(500).send(err);
        }
        if (todo != null) {
            const response = {
                message: "Todo successfully deleted",
                id: todo._id
            };
            return res.status(200).send(response);
        } else
            return res.status(200).send('ID not exist')
    })
}

exports.findTransactionandDelete = (req, res) => {
    TransactionState.findOneAndDelete(req.body, (err) => {
        console.log(req.body)
        if (err) {
            //                console.log('ID not exist ')
            return res.status(500).send(err);
        }

        const response = {
            message: "Todo successfully deleted",
            // id: todo._id
        };
        return res.status(200).send(response);
    })
}

exports.updateTransaction = (req, res) => {
    TransactionState.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, data) => {
        console.log(req.body)
        if (err) return res.status(500).send(err);
        if (data != null)
            return res.status(200).send(data);
        return res.status(200).send('ID not exist')
    })
}

exports.findTransactionandUpdate = (req, res) => {
    TransactionState.findOneAndUpdate(req.body.conditions, req.body.update, { new: true }, (err, data) => {
        console.log(req.body)
        if (err) return res.status(500).send(err);
        if (data != null)
            return res.status(200).send(data);
        return res.status(200).send('ID not exist')
    })
}



//useFindAndModify