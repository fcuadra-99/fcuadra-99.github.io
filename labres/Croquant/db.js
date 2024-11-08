var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "croquant",
});

export default function seeProdd() {
  con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM products", function (err, result, fields) {
      if (err) throw err;
      let stresult = JSON.stringify(result);
      console.log(result);
    });
  });
}

seeProdd();