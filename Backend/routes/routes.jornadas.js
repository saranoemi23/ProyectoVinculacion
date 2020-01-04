const express = require("express");
const Router = express.Router();
const connection = require("../conecction");

Router.get('/get', (req, res) => {
    console.log("Seleccionar todos los jornadas")

    const queryString = "SELECT * FROM jornada"
    connection.query(queryString,(err, rows, fields) => {
        if(err){
            console.log("No hay jornadas " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Jornadas Seleccionados")
        res.json(rows)
    })
});

//Jornada x ID
Router.get('/get/:id', (req, res) => {
    console.log("Seleccionar jornada con id: "+ req.params.id)

    const idjornada= req.params.id
    const queryString = "SELECT * FROM jornada WHERE idjornada = ?"
    connection.query(queryString, [idjornada],(err, rows, fields) => {
        if(err){
            console.log("No existe jornada " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("jornada Seleccionada")
        res.json(rows)
    })
});

Router.post('/add', (req, res) =>{

    console.log("Tratando de agregar jornada..")
    console.log("jornada: "+ req.body.jornada)
    console.log("Descripcion: "+ req.body.descripcion)
   
    const jornada = req.body.jornada
    const descripcion = req.body.descripcion

    const queryString = "INSERT INTO jornada (jornada, descripcion)  VALUES  (?,?)"
    connection.query(queryString, [jornada, descripcion], (err, results, fields) =>{
        if (err){
            console.log("Error el jornada: "+ err)
            res.sendStatus(500)
            return
        }

        console.log("Se agrego jornada con id: ", results.insertId);
        res.end() 
        
    } )
});

Router.put('/edit/:id', (req, res) =>{

    console.log("Tratando de editar un jornada..")
    console.log("jornada: "+ req.body.jornada)
    console.log("Descripcion: "+ req.body.descripcion)
   
    const idjornada = req.params.id
    const jornada = req.body.jornada
    const descripcion = req.body.descripcion

    console.log(idjornada)
    const queryString = "UPDATE jornada SET jornada = ?, descripcion = ? WHERE idjornada = ?"
    connection.query(queryString, [jornada, descripcion, idjornada], (err, results, fields) =>{
        if (err){
            console.log("Error al editar jornada: "+ err)
            res.sendStatus(400)
            return
        }

        console.log("Se edito jornada con id: ", results.affectedRows);
        res.end() 
        
    } )
});

Router.delete('/delete/:id', (req, res) => {
    console.log("Eliminar jornada con id: "+ req.params.id)

    const idjornada = req.params.id
    const queryString = "DELETE FROM jornada WHERE idjornada =?"
    connection.query(queryString, [idjornada],(err, rows, fields) => {
        if(err){
            console.log("No existe jornada " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("jornada Eliminado")
        res.json(rows)
    })
});

module.exports = Router;



