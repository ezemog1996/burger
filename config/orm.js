var connection = require("../config/connection.js");

function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

function objTosql(ob) {
    var arr = [];

    for (var key in ob) {
        var value = ob[key];

        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }

    return arr.toString();
}

var orm = {
    selectAll: function(table, cb) {
        connection.query("SELECT * FROM " + table + ";", function(err, res) {
            if (err) throw err;
            cb(res);
        })
    },
    insertOne: function(table, columns, values, cb) {
        connection.query("INSERT INTO " + table + " (" + columns.toString() + ") VALUES (" + printQuestionMarks(values.length) + ")", values, function(err, res) {
            if (err) throw err;
            cb(res);
        })
    },
    updateOne: function(table, columnValues, condition, cb) {
        connection.query("UPDATE " + table + " SET " + objTosql(columnValues) + " WHERE " + condition, function(err, res) {
            if (err) throw err;
            cb(res);
        })
    }
};

module.exports = orm;