const express = require("express");
const Router = express.Router();
const connection = require("../conection");

Router.get('/get', (req, res) => {
    console.log("Seleccionar todos los periodos")

    const queryString = "SELECT * FROM periodo"
    connection.query(queryString,(err, rows, fields) => {
        if(err){
            console.log("No hay periodos " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("periodos Seleccionados")
        res.json(rows)
    })
});

//periodo x ID
Router.get('/get/:id', (req, res) => {
    console.log("Seleccionar periodo con id: "+ req.params.id)

    const idperiodo= req.params.id
    const queryString = "SELECT * FROM periodo WHERE idperiodo = ?"
    connection.query(queryString, [idperiodo],(err, rows, fields) => {
        if(err){
            console.log("No existe periodo " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("periodo Seleccionada")
        res.json(rows)
    })
});

Router.post('/add', (req, res) =>{

    console.log("Tratando de agregar periodo..")
    console.log("periodo: "+ req.body.periodo)
    console.log("Descripcion: "+ req.body.descripcion)
   
    const periodo = req.body.periodo
    const descripcion = req.body.descripcion

    const queryString = "INSERT INTO periodo (periodo, descripcion)  VALUES  (?,?)"
    connection.query(queryString, [periodo, descripcion], (err, results, fields) =>{
        if (err){
            console.log("Error el periodo: "+ err)
            res.sendStatus(500)
            return
        }

        console.log("Se agrego periodo con id: ", results.insertId);
        res.end() 
        
    } )
});

Router.put('/edit/:id', (req, res) =>{

    console.log("Tratando de editar un periodo..")
    console.log("periodo: "+ req.body.periodo)
    console.log("Descripcion: "+ req.body.descripcion)
   
    const idperiodo = req.params.id
    const periodo = req.body.periodo
    const descripcion = req.body.descripcion

    console.log(idperiodo)
    const queryString = "UPDATE periodo SET periodo = ?, descripcion = ? WHERE idperiodo = ?"
    connection.query(queryString, [periodo, descripcion, idperiodo], (err, results, fields) =>{
        if (err){
            console.log("Error al editar periodo: "+ err)
            res.sendStatus(400)
            return
        }

        console.log("Se edito periodo con id: ", results.affectedRows);
        res.end() 
        
    } )
});

Router.delete('/delete/:id', (req, res) => {
    console.log("Eliminar periodo con id: "+ req.params.id)

    const idperiodo = req.params.id
    const queryString = "DELETE FROM periodo WHERE idperiodo =?"
    connection.query(queryString, [idperiodo],(err, rows, fields) => {
        if(err){
            console.log("No existe periodo " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("periodo Eliminado")
        res.json(rows)
    })
});

module.exports = Router;