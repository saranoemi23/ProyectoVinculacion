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

    console.log("Tratando de agregar calificacion..")
    console.log("Acumulado: "+ req.body.Acumulado)
    console.log("Examen: "+ req.body.Examen)
    console.log("Total: "+ req.body.Total)
    console.log("id_asignatura: "+ req.body.idasignatura)
    console.log("idgrado_detalle: "+ req.body.idgrado_detalle)

   
    const Acumulado = req.body.Acumulado
    const Examen = req.body.Examen
    const Total = req.body.Total
    const idasignatura = req.body.idasignatura
    const idgrado_detalle = req.body.idgrado_detalle

    const queryString = "INSERT INTO notas (Acumulado, Examen, Total, idasignatura,idgrado_detalle)  VALUES  (?,?,?,(SELECT idasignatura FROM asignatura WHERE asignatura=?),(SELECT idgrado_detalle FROM grado_detalle WHERE idalumno=?))"
    connection.query(queryString, [Acumulado, Examen,Total,idasignatura,idgrado_detalle], (err, results, fields) =>{
        if (err){
            console.log("Error en calificacion: "+ err)
            res.sendStatus(500)
            return
        }

        console.log("Se agrego jornada con id: ", results.insertId);
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

////Notas x grado & periodo & seccion
Router.get('/filtro_c/:grado/:periodo/:seccion', (req, res) => {
    console.log("Seleccionar asignatura con grado: "+ req.params.grado)
    console.log("Seleccionar asignatura con periodo: "+ req.params.periodo)
    console.log("Seleccionar asignatura con seccion: "+ req.params.seccion)

    const grado= req.params.grado
    const periodo = req.params.periodo
    const seccion = req.params.seccion

    const queryString = "SELECT CONCAT_WS(' ', a.nombres, a.apellidos) AS alumno, asi.asignatura, n.acumulado, n.examen, n.total FROM notas AS n INNER JOIN grado_detalle AS gd ON n.idgrado_detalle = gd.idgrado_detalle INNER JOIN asignatura AS asi ON n.idasignatura = asi.idasignatura INNER JOIN alumno AS a ON gd.idalumno = a.idalumno INNER JOIN grado AS g ON gd.idgrado = g.idgrado INNER JOIN periodo AS p ON p.idperiodo = g.idperiodo INNER JOIN seccion AS s ON g.idseccion = s.idseccion WHERE g.grado = ? AND p.periodo = ? AND s.seccion = ?;"
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

////Notas x grado & periodo & seccion & alumno
Router.get('/filtro_a/:grado/:periodo/:seccion/:nombres/:apellidos', (req, res) => {
    console.log("Seleccionar asignatura con grado: "+ req.params.grado)
    console.log("Seleccionar asignatura con periodo: "+ req.params.periodo)
    console.log("Seleccionar asignatura con seccion: "+ req.params.seccion)
    console.log("Seleccionar asignatura con nombres: "+ req.params.nombres)
    console.log("Seleccionar asignatura con apellidos: "+ req.params.apellidos)

    const grado= req.params.grado
    const periodo = req.params.periodo
    const seccion = req.params.seccion
    const nombres = req.params.nombres
    const apellidos = req.params.apellidos

    const queryString = "SELECT CONCAT_WS(' ', a.nombres, a.apellidos) AS alumno, asi.asignatura, n.acumulado, n.examen, n.total FROM notas AS n INNER JOIN grado_detalle AS gd ON n.idgrado_detalle = gd.idgrado_detalle INNER JOIN asignatura AS asi ON n.idasignatura = asi.idasignatura INNER JOIN alumno AS a ON gd.idalumno = a.idalumno INNER JOIN grado AS g ON gd.idgrado = g.idgrado INNER JOIN periodo AS p ON p.idperiodo = g.idperiodo INNER JOIN seccion AS s ON g.idseccion = s.idseccion WHERE g.grado = ? AND p.periodo = ? AND s.seccion = ? AND a.nombres LIKE ? AND a.apellidos = ?;"
    connection.query(queryString, [grado, periodo, seccion, nombres, apellidos],(err, rows, fields) => {
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