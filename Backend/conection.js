const mysql = require("mysql");

const password = process.env.MATRICULA_DB_PASSWORD || 'rootroot';

const options = {
    host: 'localhost',
    user: 'root',
    password: password,
    database: 'enecstar_matricula',
    multipleStatements: true
};

var connection = mysql.createConnection(options)
connection.connect((err) =>{
    if(!err){
        console.log("Connected!!")
    }
    else{
        console.log("Connection Failed!!")
    }

})

module.exports = connection;