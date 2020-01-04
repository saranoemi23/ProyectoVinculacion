const express = require("express");
const Router = express.Router();
const connection = require("../conecction");

Router.get('/get', (req, res) => {
    console.log("Seleccionar todos los secciones")

    const queryString = "SELECT * FROM seccion"
    connection.query(queryString,(err, rows, fields) => {
        if(err){
            console.log("No hay secciones " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("secciones Seleccionados")
        res.json(rows)
    })
});

//seccion x ID
Router.get('/get/:id', (req, res) => {
    console.log("Seleccionar seccion con id: "+ req.params.id)

    const idseccion= req.params.id
    const queryString = "SELECT * FROM seccion WHERE idseccion = ?"
    connection.query(queryString, [idseccion],(err, rows, fields) => {
        if(err){
            console.log("No existe seccion " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("seccion Seleccionada")
        res.json(rows)
    })
});

Router.post('/add', (req, res) =>{

    console.log("Tratando de agregar seccion..")
    console.log("seccion: "+ req.body.seccion)
    console.log("Descripcion: "+ req.body.descripcion)
   
    const seccion = req.body.seccion
    const descripcion = req.body.descripcion

    const queryString = "INSERT INTO seccion (seccion, descripcion)  VALUES  (?,?)"
    connection.query(queryString, [seccion, descripcion], (err, results, fields) =>{
        if (err){
            console.log("Error el seccion: "+ err)
            res.sendStatus(500)
            return
        }

        console.log("Se agrego seccion con id: ", results.insertId);
        res.end() 
        
    } )
});

Router.put('/edit/:id', (req, res) =>{

    console.log("Tratando de editar un seccion..")
    console.log("seccion: "+ req.body.seccion)
    console.log("Descripcion: "+ req.body.descripcion)
   
    const idseccion = req.params.id
    const seccion = req.body.seccion
    const descripcion = req.body.descripcion

    console.log(idseccion)
    const queryString = "UPDATE seccion SET seccion = ?, descripcion = ? WHERE idseccion = ?"
    connection.query(queryString, [seccion, descripcion, idseccion], (err, results, fields) =>{
        if (err){
            console.log("Error al editar seccion: "+ err)
            res.sendStatus(400)
            return
        }

        console.log("Se edito seccion con id: ", results.affectedRows);
        res.end() 
        
    } )
});

Router.delete('/delete/:id', (req, res) => {
    console.log("Eliminar seccion con id: "+ req.params.id)

    const idseccion = req.params.id
    const queryString = "DELETE FROM seccion WHERE idseccion =?"
    connection.query(queryString, [idseccion],(err, rows, fields) => {
        if(err){
            console.log("No existe seccion " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("seccion Eliminado")
        res.json(rows)
    })
});

module.exports = Router;