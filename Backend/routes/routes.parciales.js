const express = require("express");
const Router = express.Router();
const connection = require("../conection");

Router.get('/get', (req, res) => {
    console.log("Seleccionar todos los parciales")

    const queryString = "SELECT * FROM parcial"
    connection.query(queryString,(err, rows, fields) => {
        if(err){
            console.log("No hay parciales " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("parciales Seleccionados")
        res.json(rows)
    })
});

//parcial x ID
Router.get('/get/:id', (req, res) => {
    console.log("Seleccionar parcial con id: "+ req.params.id)

    const idparcial= req.params.id
    const queryString = "SELECT * FROM parcial WHERE idparcial = ?"
    connection.query(queryString, [idparcial],(err, rows, fields) => {
        if(err){
            console.log("No existe parcial " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("parcial Seleccionada")
        res.json(rows)
    })
});

Router.post('/add', (req, res) =>{

    console.log("Tratando de agregar parcial..")
    console.log("parcial: "+ req.body.parcial)
    console.log("Descripcion: "+ req.body.descripcion)
   
    const parcial = req.body.parcial
    const descripcion = req.body.descripcion

    const queryString = "INSERT INTO parcial (parcial, descripcion)  VALUES  (?,?)"
    connection.query(queryString, [parcial, descripcion], (err, results, fields) =>{
        if (err){
            console.log("Error el parcial: "+ err)
            res.sendStatus(500)
            return
        }

        console.log("Se agrego parcial con id: ", results.insertId);
        res.end() 
        
    } )
});

Router.put('/edit/:id', (req, res) =>{

    console.log("Tratando de editar un parcial..")
    console.log("parcial: "+ req.body.parcial)
    console.log("Descripcion: "+ req.body.descripcion)
   
    const idparcial = req.params.id
    const parcial = req.body.parcial
    const descripcion = req.body.descripcion

    console.log(idparcial)
    const queryString = "UPDATE parcial SET parcial = ?, descripcion = ? WHERE idparcial = ?"
    connection.query(queryString, [parcial, descripcion, idparcial], (err, results, fields) =>{
        if (err){
            console.log("Error al editar parcial: "+ err)
            res.sendStatus(400)
            return
        }

        console.log("Se edito parcial con id: ", results.affectedRows);
        res.end() 
        
    } )
});

Router.delete('/delete/:id', (req, res) => {
    console.log("Eliminar parcial con id: "+ req.params.id)

    const idparcial = req.params.id
    const queryString = "DELETE FROM parcial WHERE idparcial =?"
    connection.query(queryString, [idparcial],(err, rows, fields) => {
        if(err){
            console.log("No existe parcial " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("parcial Eliminado")
        res.json(rows)
    })
});

module.exports = Router;



