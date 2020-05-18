const mysql=require('mysql');
exports.database_config = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ticket"
  });

 