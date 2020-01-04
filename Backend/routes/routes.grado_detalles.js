const express = require("express");
const Router = express.Router();
const connection = require("../conecction");

Router.get('/get', (req, res) => {
    console.log("Seleccionar todos los Grado_Detalles")

    const queryString = "SELECT CONCAT( CONCAT(a.nombres,' '), a.apellidos) AS alumno, g.grado AS grado, j.jornada, s.seccion, p.periodo FROM grado_detalle as gd INNER JOIN grado AS g ON gd.idgrado = g.idgrado INNER JOIN jornada AS j ON g.idjornada = j.idjornada INNER JOIN seccion AS s ON g.idseccion = s.idseccion INNER JOIN periodo AS p ON g.idperiodo = p.idperiodo INNER JOIN alumno AS a ON a.idalumno = gd.idalumno "
    connection.query(queryString,(err, rows, fields) => {
        if(err){
            console.log("No hay Grado_Detalles " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Grado_Detalles Seleccionados")
        res.json(rows)
    })
});

//Grado_Detalles x ID
Router.get('/get/:id', (req, res) => {
    console.log("Seleccionar Asignatura_Detalleso con id: "+ req.params.id)

    const idgrado_detalles= req.params.id
    const queryString = "SELECT CONCAT( CONCAT(a.nombres,' '), a.apellidos) AS alumno, g.grado AS grado, j.jornada, s.seccion, p.periodo FROM grado_detalle as gd INNER JOIN grado AS g ON gd.idgrado = g.idgrado INNER JOIN jornada AS j ON g.idjornada = j.idjornada INNER JOIN seccion AS s ON g.idseccion = s.idseccion INNER JOIN periodo AS p ON g.idperiodo = p.idperiodo INNER JOIN alumno AS a ON a.idalumno = gd.idalumno WHERE ad.idgrado_detalles = ?"
    connection.query(queryString, [idgrado_detalles],(err, rows, fields) => {
        if(err){
            console.log("No existe Grado_Detalles " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Grado_Detalles Seleccionado")
        res.json(rows)
    })
});

Router.post('/add', (req, res) =>{

    console.log("Tratando de agregar Grado_Detalles..")
    console.log("IdAlumno: "+ req.body.idalumno)
    console.log("idgrado: "+ req.body.idgrado)
    console.log("idusuario: "+ req.body.idusuario)
   
    const idalumno = req.body.idalumno
    const idgrado = req.body.idgrado
    const idusuario = req.body.idusuario

    const queryString = "INSERT INTO grado_detalle (idgrado, idalumno, idusuario)  VALUES  ((SELECT idgrado FROM grado WHERE grado = ?), (SELECT idalumno FROM alumno WHERE identidad = ?), (SELECT idusuario FROM usuario WHERE usuario = ?))"
    connection.query(queryString, [idgrado, idalumno, idusuario], (err, results, fields) =>{
        if (err){
            console.log("Error el Grado_Detalles: "+ err)
            res.sendStatus(500)
            return
        }

        console.log("Se agrego Grado_Detalles con id: ", results.insertId);
        res.end() 
        
    } )
});

Router.put('/edit/:id', (req, res) =>{

    console.log("Tratando de editar un Grado_Detalles..")
    console.log("IdGrado_Detalle: "+ req.params.id)
    console.log("IdAlumno: "+ req.body.idalumno)
    console.log("idgrado: "+ req.body.idgrado)
    console.log("idusuario: "+ req.body.idusuario)
   
    const idgrado_detalles = req.params.id
    const idalumno = req.body.idalumno
    const idgrado = req.body.idgrado
    const idusuario = req.body.idusuario

    console.log(idgrado_detalles)
    const queryString = "UPDATE grado_detalle SET idgrado = (SELECT idgrado FROM grado WHERE grado = ?), idalumno = (SELECT idalumno FROM alumno WHERE identidad = ?), idusuario = (SELECT idusuario FROM usuario WHERE usuario = ?) WHERE idgrado_detalle = ?"
    connection.query(queryString, [idgrado, idalumno, idusuario, idgrado_detalles], (err, results, fields) =>{
        if (err){
            console.log("Error al editar Grado_Detalles: "+ err)
            res.sendStatus(400)
            return
        }

        console.log("Se edito Grado_Detalles con id: ", results.affectedRows);
        res.end() 
        
    } )
});

Router.delete('/delete/:id', (req, res) => {
    console.log("Eliminar Grado_Detalles con id: "+ req.params.id)

    const idgrado_detalles = req.params.id
    const queryString = "DELETE FROM asignatura_detalle WHERE idgrado_detalles =?"
    connection.query(queryString, [idgrado_detalles],(err, rows, fields) => {
        if(err){
            console.log("No existe Grado_Detalles " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Grado_Detalles Eliminado")
        res.json(rows)
    })
});

module.exports = Router;