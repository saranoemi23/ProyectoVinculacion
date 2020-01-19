const express = require("express");
const Router = express.Router();
const connection = require("../conection");

Router.get('/get', (req, res) => {
    console.log("Seleccionar todos los Asignatura_Detalles")

    
    const queryString = "SELECT ad.idasignatura_detalle AS idasignatura_detalle, a.asignatura AS asignatura, g.grado AS grado, j.jornada, s.seccion, p.periodo FROM asignatura_detalle as ad INNER JOIN asignatura as a ON ad.idasignatura = a.idasignatura INNER JOIN grado AS g ON ad.idgrado = g.idgrado INNER JOIN jornada AS j ON g.idjornada = j.idjornada INNER JOIN seccion AS s ON g.idseccion = s.idseccion INNER JOIN periodo AS p ON g.idperiodo = p.idperiodo"
    connection.query(queryString,(err, rows, fields) => {
        if(err){
            console.log("No hay Asignatura_Detalles " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Asignatura_Detalles Seleccionados")
        res.json(rows)
    })
});

//Asignatura_Detalles x ID
Router.get('/get/:id', (req, res) => {
    console.log("Seleccionar Asignatura_Detalleso con id: "+ req.params.id)

    const idasignatura_detalle= req.params.id
    const queryString = "SELECT ad.idasignatura_detalle AS idasignatura_detalle, a.asignatura AS asignatura, g.grado AS grado, j.jornada, s.seccion, p.periodo FROM asignatura_detalle as ad INNER JOIN asignatura as a ON ad.idasignatura = a.idasignatura INNER JOIN grado AS g ON ad.idgrado = g.idgrado INNER JOIN jornada AS j ON g.idjornada = j.idjornada INNER JOIN seccion AS s ON g.idseccion = s.idseccion INNER JOIN periodo AS p ON g.idperiodo = p.idperiodo WHERE ad.idasignatura_detalle = ?"
    connection.query(queryString, [idasignatura_detalle],(err, rows, fields) => {
        if(err){
            console.log("No existe Asignatura_Detalles " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Asignatura_Detalles Seleccionado")
        res.json(rows)
    })
});

Router.post('/add', (req, res) =>{

    console.log("Tratando de agregar Asignatura_Detalles..")
    console.log("IdAsignatura: "+ req.body.idasignatura)
    console.log("idgrado: "+ req.body.idgrado)
   
    const idasignatura = req.body.idasignatura
    const idgrado = req.body.idgrado

    const queryString = "INSERT INTO asignatura_detalle (idasignatura, idgrado)  VALUES  ((SELECT idasignatura FROM asignatura WHERE asignatura = ?) ,(SELECT idgrado FROM grado WHERE grado = ?))"
    connection.query(queryString, [idasignatura, idgrado], (err, results, fields) =>{
        if (err){
            console.log("Error el Asignatura_Detalles: "+ err)
            res.sendStatus(500)
            return
        }

        console.log("Se agrego Asignatura_Detalles con id: ", results.insertId);
        res.end() 
        
    } )
});

Router.put('/edit/:id', (req, res) =>{

    console.log("Tratando de editar un Asignatura_Detalles..")
    console.log("IdAsignatura: "+ req.body.idasignatura)
    console.log("idgrado: "+ req.body.idgrado)
   
    const idasignatura_detalle = req.params.id
    const idasignatura = req.body.idasignatura
    const idgrado = req.body.idgrado

    console.log(idasignatura_detalle)
    const queryString = "UPDATE asignatura_detalle SET idasignatura = (SELECT idasignatura FROM asignatura WHERE asignatura = ?), idgrado = (SELECT idgrado FROM grado WHERE grado = ?) WHERE idasignatura_detalle = ?"
    connection.query(queryString, [idasignatura, idgrado, idasignatura_detalle], (err, results, fields) =>{
        if (err){
            console.log("Error al editar Asignatura_Detalles: "+ err)
            res.sendStatus(400)
            return
        }

        console.log("Se edito Asignatura_Detalles con id: ", results.affectedRows);
        res.end() 
        
    } )
});

Router.delete('/delete/:id', (req, res) => {
    console.log("Eliminar Asignatura_Detalles con id: "+ req.params.id)

    const idasignatura_detalle = req.params.id
    const queryString = "DELETE FROM asignatura_detalle WHERE idasignatura_detalle =?"
    connection.query(queryString, [idasignatura_detalle],(err, rows, fields) => {
        if(err){
            console.log("No existe Asignatura_Detalles " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Asignatura_Detalles Eliminado")
        res.json(rows)
    })
});

module.exports = Router;