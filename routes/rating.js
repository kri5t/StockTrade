/**
 * Created by Brian on 11-11-13.
 * This class contains all about getting ratings
 */

var db = require('./database');

/**
 *  Locates rating based on place id.
 * @param req
 * @param res
 */
exports.findRatingsForStockID = function(req, res){
    var sql = "SELECT user_id,description,stock_id,start_date,end_date FROM rating WHERE stock_id='" + req.params.id + "'";
    var errorMessage = "ERROR WHILE FINDING PLACE ID!!!";
    var noResultMessage = "No result for rating ID";
    var prefixResultMessage = "Ratings by place ID: ";

    db.queryDatabaseGet(res,sql,errorMessage,noResultMessage,prefixResultMessage);
};

/**
 * Locates rating based on the given user id.
 * @param req
 * @param res
 */
exports.findRatingsByUserID = function(req, res) {
    var sql = "SELECT user_id,description,stock_id FROM rating WHERE user_id='" + req.params.id + "'";
    var errorMessage = "ERROR WHILE FINDING USER ID!!!";
    var noResultMessage = "No result ratings specified user";
    var prefixResultMessage = "Ratings by user ID: ";

    db.queryDatabaseGet(res,sql,errorMessage,noResultMessage,prefixResultMessage);
};

/**
 * Add rating for the given place id.
 * @param req
 * @param res
 */
exports.addRatingForPlaceID = function(req, res){
    var rating_id = req.body.rating_id;
    var stock_id = req.body.stock_id;
    var user_id = req.body.user_id;
    var rating = req.body.rating;
    var description = req.body.description;
    var reference = req.body.reference;
    var start_date = req.body.start_date;
    var end_date = req.body.end_date;

    var sql = "INSERT INTO rating (rating_id,stock_id,user_id,rating,description,reference,start_date,end_date) VALUES ?";
    var values = [
        [rating_id,stock_id,user_id,rating,description,reference,start_date,end_date]
    ];

    var errorMessage = "ERROR WHILE ADDING RATING FOR place: " + stock_id;
    var successMessage = "Successfully added rating to place: " + stock_id;

    db.queryDatabasePost(res,sql,values,errorMessage,successMessage);
};