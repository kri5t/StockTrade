/**
 * Created by Brian on 11-11-13.
 */
var db = require('./database');

/**
 * Find place based on the place_name.
 * @param req
 * @param res
 */
exports.findStockByID = function(req, res){
    var sql = "SELECT stock_id,name FROM stock WHERE stock_id LIKE '%" +  req.params.id + "%'";
    var errorMessage = "ERROR WHILE FINDING PLACE ID!!!";
    var noResultMessage = "No result for place ID";
    var prefixResultMessage = "Places by place ID: ";

    db.queryDatabaseGet(res,sql,errorMessage,noResultMessage,prefixResultMessage);
};

/**
 * Find place based on the place_name.
 * @param req
 * @param res
 */
exports.findAllStocks = function(req, res){
    var sql = "SELECT stock_id,name FROM stock";
    var errorMessage = "ERROR WHILE FINDING PLACE ID!!!";
    var noResultMessage = "No result for place ID";
    var prefixResultMessage = "Places by place ID: ";

    db.queryDatabaseGet(res,sql,errorMessage,noResultMessage,prefixResultMessage);
};

/**
 * Adds place to the database.
 * @param req
 * @param res
 */
exports.addStock = function(req, res){
    var name = req.body.name;
    var stock_id = req.body.stock_id;

    var sql = "INSERT INTO stock (stock_id,name) VALUES ?";
    var values = [
        [stock_id,name]
    ];

    var errorMessage = "ERROR WHILE ADDING PLACE: " + name;
    var successMessage = "Successfully added place with name: " + name;

    db.queryDatabasePost(res,sql,values,errorMessage,successMessage);
};