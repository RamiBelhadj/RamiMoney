const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const TransactionSchema = new Schema({
    //_id: { type: Number },
    shopping_item: { type: String, required: true },
    price_per_unit: { type: Number, required: true },
    date: { type: Date, required: true },
    Quantity: { type: Number, required: true },
    Place: { type: String, required: true },
    price_buy: { type: Number },
    State: { type: Number, default: 0 }
    // state 0 ==> in process
    // state 1 ==> bought
    // state 2 ==> reported 
    // state 3 ==> deleted 
})
var connection = mongoose.createConnection("mongodb://localhost/money");

autoIncrement.initialize(connection);
TransactionSchema.plugin(autoIncrement.plugin, 'Transaction');
var Transaction = connection.model('Transaction', TransactionSchema);

module.exports = mongoose.model('TransactionState', TransactionSchema)