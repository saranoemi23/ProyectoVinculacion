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



///INSERTAR CALIFICACION
Router.post('/add', (req, res) =>{

    console.log("Tratando de agregar calificacion..")
    console.log("Acumulado: "+ req.body.Acumulado)
    console.log("Examen: "+ req.body.Examen)
    console.log("Total: "+ req.body.Total)
    console.log("id_asignatura: "+ req.body.id_asignatura)
    console.log("idgrado_detalle: "+ req.body.id_grado_detalle)

   
    const Acumulado = req.body.Acumulado
    const Examen = req.body.Examen
    const Total = req.body.Total
    const id_asignatura = req.body.id_asignatura
    const idgrado_detalle = req.body.id_grado_detalle

    const queryString = "INSERT INTO calificaciones (Acumulado, Examen, id_asignatura, id_grado_detalle)  VALUES  (?, ?, (SELECT idasignatura FROM asignatura WHERE asignatura= ?), (SELECT idgrado_detalle FROM grado_detalle WHERE idalumno = (SELECT idalumno FROM alumno WHERE nombrec = ?)))"
    connection.query(queryString, [Acumulado, Examen,id_asignatura,idgrado_detalle], (err, results, fields) =>{
        if (err){
            console.log("Error en calificacion: "+ err)
            res.sendStatus(500)
            return
        }

        console.log("Se agrego jornada con id: ", results.insertId);
        res.end() 
    } )
});


Router.delete('/delete/:id', (req, res) => {
    console.log("Eliminar calificaciones con id: "+ req.params.id)

    const idCalificaciones = req.params.id
    const queryString = "DELETE FROM calificaciones WHERE idCalificaciones =?"
    connection.query(queryString, [idCalificaciones],(err, rows, fields) => {
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

////Calificaciones x grado & periodo & seccion
Router.get('/filtro_c/:grado/:periodo/:seccion', (req, res) => {
    console.log("Seleccionar asignatura con grado: "+ req.params.grado)
    console.log("Seleccionar asignatura con periodo: "+ req.params.periodo)
    console.log("Seleccionar asignatura con seccion: "+ req.params.seccion)

    const grado= req.params.grado
    const periodo = req.params.periodo
    const seccion = req.params.seccion

    

    const queryString = "SELECT a.nombrec, asi.asignatura, n.acumulado, n.examen, n.total FROM calificaciones AS n INNER JOIN grado_detalle AS gd ON n.id_grado_detalle = gd.idgrado_detalle INNER JOIN asignatura AS asi ON n.id_asignatura = asi.idasignatura INNER JOIN alumno AS a ON gd.idalumno = a.idalumno INNER JOIN grado AS g ON gd.idgrado = g.idgrado INNER JOIN periodo AS p ON p.idperiodo = g.idperiodo INNER JOIN seccion AS s ON g.idseccion = s.idseccion WHERE g.grado = ? AND p.periodo = ? AND s.seccion = ? "
    connection.query(queryString, [grado, periodo, seccion],(err, rows, fields) => {
        if(err){
            console.log("No existe notas " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Notas Seleccionada")
        res.json(rows)
    })
});

////Calificaciones x grado & periodo & seccion & alumno
Router.get('/filtro_a/:grado/:periodo/:seccion/:nombrec', (req, res) => {
    console.log("Seleccionar asignatura con grado: "+ req.params.grado)
    console.log("Seleccionar asignatura con periodo: "+ req.params.periodo)
    console.log("Seleccionar asignatura con seccion: "+ req.params.seccion)
    console.log("Seleccionar asignatura con nombres: "+ req.params.nombrec)
    console.log("Seleccionar asignatura con apellidos: "+ req.params.apellidos)

    const grado= req.params.grado
    const periodo = req.params.periodo
    const seccion = req.params.seccion
    const nombrec = req.params.nombrec
    

    const queryString = "SELECT asi.asignatura, n.acumulado, n.examen, n.total FROM calificaciones AS n INNER JOIN grado_detalle AS gd ON n.id_grado_detalle = gd.idgrado_detalle INNER JOIN asignatura AS asi ON n.id_asignatura = asi.idasignatura INNER JOIN alumno AS a ON gd.idalumno = a.idalumno INNER JOIN grado AS g ON gd.idgrado = g.idgrado INNER JOIN periodo AS p ON p.idperiodo = g.idperiodo INNER JOIN seccion AS s ON g.idseccion = s.idseccion WHERE g.grado = ? AND p.periodo = ? AND s.seccion = ? AND a.nombrec = ?"
    connection.query(queryString, [grado, periodo, seccion, nombrec],(err, rows, fields) => {
        if(err){
            console.log("No existe notas " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Notas Seleccionada")
        res.json(rows)
    })
});


///FILTRO NOMBRE ALUMNOS X SECCION, GRADO Y GRADO

Router.get('/alumnos/:grado/:periodo/:seccion', (req, res) => {
    console.log("Seleccionar alumnos por grado: "+ req.params.grado)
    console.log("Seleccionar alumnos por seccion: "+ req.params.seccion)
    console.log("Seleccionar asignatura con periodo: "+ req.params.periodo)

    const grado= req.params.grado
    const seccion = req.params.seccion
    const periodo = req.params.periodo

    const queryString = "SELECT a.nombrec FROM alumno AS a INNER JOIN grado_detalle AS gd ON gd.idalumno = a.idalumno INNER JOIN grado AS g ON g.idgrado = gd.idgrado INNER JOIN periodo AS p ON g.idperiodo = p.idperiodo INNER JOIN seccion AS s ON g.idseccion = s.idseccion WHERE g.grado = ? AND p.periodo = ? AND s.seccion = ?;"
    connection.query(queryString, [grado, periodo, seccion],(err, rows, fields) => {
        if(err){
            console.log("No existe notas " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Notas Seleccionada")
        res.json(rows)
    })
});




module.exports = Router;