var connection = require("../config/connection.js");

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

function objToSql(ob) {
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
  all: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  create: function(table, cols, vals, cb) {
    var qString = "INSERT INTO " + table;

    qString += " (";
    qString += cols.toString();
    qString += ") ";
    qString += "VALUES (";
    qString += printQuestionMarks(vals.length);
    qString += ") ";

    console.log(qString);

    connection.query(qString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  update: function(table, objColVals, condition, cb) {
    var qString = "UPDATE " + table;

    qString += " SET ";
    qString += objToSql(objColVals);
    qString += " WHERE ";
    qString += condition;

    console.log(qString);
    connection.query(qString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

module.exports = orm;
