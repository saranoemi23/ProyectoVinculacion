const express = require("express");
const Router = express.Router();
const connection = require("../conecction");

Router.get('/get', (req, res) => {
    console.log("Seleccionar todos los grados")

    const queryString = `
    select 
    g.idgrado, g.grado,
    j.idjornada, j.descripcion as jornada,
    s.idseccion, s.descripcion as seccion
    from grado g 
    inner join jornada j on g.idjornada = j.idjornada
    inner join seccion s on g.idseccion = s.idseccion
    `;

    connection.query(queryString,(err, rows, fields) => {
        if(err){
            console.log("No hay grados " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("grados Seleccionados")
        res.json(rows)
    })
});

//grado x ID
Router.get('/get/:id', (req, res) => {
    console.log("Seleccionar grado con id: "+ req.params.id)

    const idgrado= req.params.id
    const queryString = `
        select 
        g.idgrado, g.grado,
        j.idjornada, j.descripcion as jornada,
        s.idseccion, s.descripcion as seccion
        from grado g 
        inner join jornada j on g.idjornada = j.idjornada
        inner join seccion s on g.idseccion = s.idseccion
        where idgrado = ?
    `;

    connection.query(queryString, [idgrado],(err, rows, fields) => {
        if(err){
            console.log("No existe grado " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("grado Seleccionado")
        res.json(rows)
    })
});

//Alumnos por Grado, Jornada, seccion y periodo
Router.get('/alumnos/:id', (req, res) => {
    console.log("Seleccionar Alumnos por Grado: "+ req.params.id)

    const idgrado= req.params.id

    const queryString = "SELECT CONCAT( CONCAT(a.nombres,' '), a.apellidos) AS alumno FROM grado_detalle AS gd INNER JOIN alumno AS a ON a.idalumno = gd.idalumno INNER JOIN grado AS g ON gd.idgrado = g.idgrado WHERE g.idgrado = ?"
    connection.query(queryString, [idgrado],(err, rows, fields) => {
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

    console.log("Tratando de agregar grado..")
    console.log("grado: "+ req.body.grado)
    console.log("idjornada: "+ req.body.idjornada)
    console.log("idseccion: "+ req.body.idseccion)
    console.log("idperiodo: "+ req.body.idperiodo)
   
    const grado = req.body.grado
    const idjornada = req.body.idjornada
    const idseccion = req.body.idseccion
    const idperiodo = req.body.idperiodo

    const queryString = "INSERT INTO grado (grado, idjornada, idseccion, idperiodo)  VALUES  (?,?,?,?)"
    connection.query(queryString, [grado, idjornada, idseccion, idperiodo], (err, results, fields) =>{
        if (err){
            console.log("Error el grado: "+ err)
            res.sendStatus(500)
            return
        }

        console.log("Se agrego grado con id: ", results.insertId);
        res.end() 
        
    } )
});

Router.put('/edit/:id', (req, res) =>{

    console.log("Tratando de editar un grado..")
    console.log("grado: "+ req.body.grado)
    console.log("idjornada: "+ req.body.idjornada)
    console.log("idseccion: "+ req.body.idseccion)
    console.log("idperiodo: "+ req.body.idperiodo)
   
    const idgrado = req.params.id
    const grado = req.body.grado
    const idjornada = req.body.idjornada
    const idseccion = req.body.idseccion
    const idperiodo = req.body.idperiodo

    console.log(idgrado)
    const queryString = `
        UPDATE grado 
        SET grado = ?, 
        idjornada = ?, 
        idseccion = ?, 
        idperiodo = ? 
        WHERE idgrado = ?
    `;
    connection.query(queryString, [grado, idjornada, idseccion, idperiodo, idgrado], (err, results, fields) =>{
        if (err){
            console.log("Error al editar grado: "+ err)
            res.sendStatus(400)
            return
        }

        console.log("Se edito grado con id: ", results.affectedRows);
        res.end() 
        
    } )
});

Router.delete('/delete/:id', (req, res) => {
    console.log("Eliminar grado con id: "+ req.params.id)

    const idgrado = req.params.id
    const queryString = "DELETE FROM grado WHERE idgrado =?"
    connection.query(queryString, [idgrado],(err, rows, fields) => {
        if(err){
            console.log("No existe grado " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("grado Eliminado")
        res.json(rows)
    })
});

module.exports = Router;