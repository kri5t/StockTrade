/**
 * Created by Brian on 13-11-13.
 */

var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    port : 3306,
    database: 'stocks',
    user     : 'root',
    password : 'kristian1'
});

/**
 * The function returns a query result based on the sql statement.
 * @param res
 * @param sql
 * @param errorMessage
 * @param noResultMessage
 * @param prefixResultMessage
 */
exports.queryDatabaseGet = function(res, sql, errorMessage, noResultMessage, prefixResultMessage){
    var queryResult = connection.query(sql, function(err,results) {
        if (err) {
            res.json(false);
        }
        if (results != null && results.length  > 0) {
            res.json({results: results});
        } else {
            res.json(false);
        }
    });
};

/**
 * The function inserts into the database whatever contained in the given sql statement.
 * @param res
 * @param sql
 * @param values
 * @param errorMessage
 * @param successMessage
 */
exports.queryDatabasePost = function(res, sql, values, errorMessage, successMessage){
    var queryResult = connection.query(sql, [values], function(err) {
        if (err) {
            res.send(errorMessage + ": " + err);
        } else {
            res.send(successMessage);
        }
    });
};