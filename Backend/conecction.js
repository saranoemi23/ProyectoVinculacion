const mysql = require("mysql");

var connection = mysql.createConnection({
    host: '127.0.0.1', 
    user: 'root',
    password: 'rootroot',
    database: 'enecstar_matricula',
    multipleStatements: true
    // host: 'gator4113.hostgator.com', 
    // user: 'enecstar_matricu',
    // password: 'Matricula123',
    // database: 'enecstar_matricula',
    // multipleStatements: true
})

connection.connect((err) =>{
    if(!err){
        console.log("Connected!!")
    }
    else{
        console.log("Connection Failed!!")
    }

})

module.exports = connection;