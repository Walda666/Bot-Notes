const mysql = require('mysql')
const db = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database : "semestre2_4_2021"
 
  });
  db.connect(function(err) {
    if (err) throw err;

});

module.exports = db