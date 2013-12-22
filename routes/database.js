/**
 * Created by Brian on 13-11-13.
 */

var mysql = require('mysql');

var db_config = {
    host     : 'localhost',
    port : 3306,
    database: 'stocks',
    user     : 'root',
    password : '',
    connectionLimit : 500,
    waitForConnections : true,
    queueLimit : 0
};

var pool;

function handleDisconnect() {
    pool  = mysql.createPool(db_config);

    pool.getConnection(function(err) {              // The server is either down
        if(err) {                                     // or restarting (takes a while sometimes).
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
}

handleDisconnect();

/**
 * The function returns a query result based on the sql statement.
 * @param res
 * @param sql
 * @param errorMessage
 * @param noResultMessage
 * @param prefixResultMessage
 */
exports.queryDatabaseGet = function(res, sql, errorMessage, noResultMessage, prefixResultMessage){
    pool.getConnection(function(err, connection) {
        connection.query(sql, function(err,results) {
            if (err) {
                res.json(false);
            }
            if (results != null && results.length  > 0) {
                res.json({results: results});
            } else {
                res.json(false);
            }
        });
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
    pool.getConnection(function(err, connection) {
        connection.query(sql, [values], function(err) {
            if (err) {
                res.send(errorMessage + ": " + err);
            } else {
                res.send(successMessage);
            }
        });
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
exports.queryDatabaseFacebookPost = function(sql, values,callback){
    pool.getConnection(function(err, connection) {
        connection.query(sql, [values], function(err,results) {
            if (err) {
                callback(err);
            } else {
                callback(true);
            }
        });
    });
};

/**
 * The function returns a query result based on the sql statement.
 * @param sql
 */
exports.queryDatabaseGetFacebook = function(sql, callback){
    pool.getConnection(function(err, connection) {
        connection.query(sql, function(err,results) {
            if (err) {
                callback(false);
            }
            if (results != null && results.length  > 0) {
                callback(true);
            } else {
                callback(false);
            }
            connection.release();
        });
    });
};