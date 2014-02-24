
/*
 * GET users listing.
 */

var db = require('./database');

/**
 * This function lists the users of the system.
 * @param req
 * @param res
 */
exports.list = function(req, res){
    var sql = "SELECT user_name, user_id FROM user";
    var errorMessage = "ERROR WHILE FINDING USERS !!!";
    var noResultMessage = "No users";
    var prefixResultMessage = "Users: ";

    db.queryDatabaseGet(res,sql,errorMessage,noResultMessage,prefixResultMessage);
};

/**
 * Simply adds a user.
 * @param req
 * @param res
 */
exports.addUser = function(req, res){
    var user_id = req.body.user_id;
    var user_name = req.body.user_name;
    var ancienity = req.body.ancienity;
    var address = req.body.address;
    var country = req.body.country;
    var city = req.body.city;

    var sql = "INSERT INTO user (user_id,user_name,ancienity,address,city,country) VALUES ?";
    var values = [
        [user_id,user_name,ancienity,address,country,city]
    ];

    var errorMessage = "ERROR WHILE ADDING USER: " + user_name;
    var successMessage = "Successfully added user with name : " + user_name;

    db.queryDatabasePost(res,sql,values,errorMessage,successMessage);
};

/**
 * Returns user based on the given ID.
 * @param req
 * @param res
 */
exports.getUserByID = function(req, res){
    var sql = "SELECT user_name,user_id FROM user WHERE user_id='" + req.params.id + "'";
    var errorMessage = "ERROR WHILE FINDING User ID!!!!";
    var noResultMessage = "No result for user ID";
    var prefixResultMessage = "User by User ID: ";

    db.queryDatabaseGet(res,sql,errorMessage,noResultMessage,prefixResultMessage);
};

/**
 * Returns user based on the given ID.
 * @param req
 * @param res
 */
exports.getUserByFacebookID = function(facebookID, name, country,city,dbSuccessCallback){
    var sqlGetUser = "SELECT user_name,user_id FROM user WHERE user_id='" + facebookID + "'";

    var sqlAddUser = "INSERT INTO user (user_id,user_name,country,city) VALUES ?";
    var values = [
        [facebookID,name,country,city]
    ];
    db.queryDatabaseGetAndAddUser(sqlGetUser, sqlAddUser, values,dbSuccessCallback);
};

/**
* Returns user based on the given ID.
* @param req
* @param res
*/
exports.getUserByFacebookID_TEST = function(facebookID, name,dbSuccessCallback){
    var sqlGetUser = "SELECT user_name,user_id FROM user WHERE user_id='" + facebookID + "'";

    db.queryDatabaseGetFacebook(sqlGetUser,dbSuccessCallback);
};

/**
 * Simply adds a user.
 * @param req
 * @param res
 */
exports.addUserByFacebookID = function(facebookID, name, address,callback) {
    var sqlAddUser = "INSERT INTO user (user_id,user_name,address) VALUES ?";
    var values = [
        [facebookID,name,address]
    ];

    var result = db.queryDatabaseFacebookPost(sqlAddUser, values,callback);
};
