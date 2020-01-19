const express = require("express");
const Router = express.Router();
const connection = require("../conection");

Router.get('/get', (req, res) => {
    console.log("Seleccionar todas las asignaturas")

    const queryString = "SELECT * FROM asignatura"
    connection.query(queryString,(err, rows, fields) => {
        if(err){
            console.log("No hay asignaturas " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Asignaturas Seleccionadas")
        res.json(rows)
    })
});

//asignatura x ID
Router.get('/get/:id', (req, res) => {
    console.log("Seleccionar asignatura con id: "+ req.params.id)

    const idasignatura= req.params.id
    const queryString = "SELECT * FROM asignatura WHERE idasignatura = ?"
    connection.query(queryString, [idasignatura],(err, rows, fields) => {
        if(err){
            console.log("No existe asignatura " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("asignatura Seleccionada")
        res.json(rows)
    })
});

Router.post('/add', (req, res) =>{

    console.log("Tratando de agregar asignatura..")
    console.log("asignatura: "+ req.body.asignatura)
    console.log("Descripcion: "+ req.body.descripcion)
   
    const asignatura = req.body.asignatura
    const descripcion = req.body.descripcion

    const queryString = "INSERT INTO asignatura (asignatura, descripcion)  VALUES  (?,?)"
    connection.query(queryString, [asignatura, descripcion], (err, results, fields) =>{
        if (err){
            console.log("Error el asignatura: "+ err)
            res.sendStatus(500)
            return
        }

        console.log("Se agrego asignatura con id: ", results.insertId);
        res.end() 
        
    } )
});

Router.put('/edit/:id', (req, res) =>{

    console.log("Tratando de editar un asignatura..")
    console.log("asignatura: "+ req.body.asignatura)
    console.log("Descripcion: "+ req.body.descripcion)
   
    const idasignatura = req.params.id
    const asignatura = req.body.asignatura
    const descripcion = req.body.descripcion

    console.log(idasignatura)
    const queryString = "UPDATE asignatura SET asignatura = ?, descripcion = ? WHERE idasignatura = ?"
    connection.query(queryString, [asignatura, descripcion, idasignatura], (err, results, fields) =>{
        if (err){
            console.log("Error al editar asignatura: "+ err)
            res.sendStatus(400)
            return
        }

        console.log("Se edito asignatura con id: ", results.affectedRows);
        res.end() 
        
    } )
});

Router.delete('/delete/:id', (req, res) => {
    console.log("Eliminar asignatura con id: "+ req.params.id)

    const idasignatura = req.params.id
    const queryString = "DELETE FROM asignatura WHERE idasignatura =?"
    connection.query(queryString, [idasignatura],(err, rows, fields) => {
        if(err){
            console.log("No existe asignatura " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("asignatura Eliminado")
        res.json(rows)
    })
});

module.exports = Router;