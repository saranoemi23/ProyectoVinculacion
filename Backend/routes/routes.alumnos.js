const express = require("express");
const Router = express.Router();
const connection = require("../conecction");

Router.get('/get', (req, res) => {
    console.log("Seleccionar todos los alumnos")

    const queryString = "SELECT * FROM alumno"
    connection.query(queryString,(err, rows, fields) => {
        if(err){
            console.log("No hay alumnos " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Alumnos Seleccionados")
        res.json(rows)
    })
});

//alumno x ID
Router.get('/get/:id', (req, res) => {
    console.log("Seleccionar alumno con id: "+ req.params.id)

    const idalumno= req.params.id
    const queryString = "SELECT * FROM alumno WHERE idalumno = ?"
    connection.query(queryString, [idalumno],(err, rows, fields) => {
        if(err){
            console.log("No existe alumno " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Alumno Seleccionado")
        res.json(rows)
    })
});

Router.post('/add', (req, res) =>{

    console.log("Tratando de agregar alumno..")
    console.log("Nombres: "+ req.body.nombres)
    console.log("Apellidos: "+ req.body.apellidos)
    console.log("Identidad: "+ req.body.identidad)
    console.log("Fecha Nacimiento: "+ req.body.fecha_nacimiento)
    console.log("Direccion: "+ req.body.direccion)
    console.log("Telefono Acudiente: "+ req.body.tel_acudiente)
   
    const nombres = req.body.nombres
    const apellidos = req.body.apellidos
    const identidad = req.body.identidad
    const fecha_nacimiento = req.body.fecha_nacimiento
    const direccion = req.body.direccion
    const tel_acudiente = req.body.tel_acudiente

    const queryString = "INSERT INTO alumno (nombres, apellidos, identidad, fecha_nacimiento, direccion, tel_acudiente)  VALUES  (?,?,?,?,?,?)"
    connection.query(queryString, [nombres, apellidos, identidad, fecha_nacimiento, direccion, tel_acudiente], (err, results, fields) =>{
        if (err){
            console.log("Error el alumno: "+ err)
            res.sendStatus(500)
            return
        }

        console.log("Se agrego alumno con id: ", results.insertId);
        res.end() 
        
    } )
});

Router.put('/edit/:id', (req, res) =>{

    console.log("Tratando de editar un alumno..")
    console.log("Nombres: "+ req.body.nombres)
    console.log("Apellidos: "+ req.body.apellidos)
    console.log("Identidad: "+ req.body.identidad)
    console.log("Fecha Nacimiento: "+ req.body.fecha_nacimiento)
    console.log("Direccion: "+ req.body.direccion)
    console.log("Telefono Acudiente: "+ req.body.tel_acudiente)
   
    const idalumno = req.params.id
    const nombres = req.body.nombres
    const apellidos = req.body.apellidos
    const identidad = req.body.identidad
    const fecha_nacimiento = req.body.fecha_nacimiento
    const direccion = req.body.direccion
    const tel_acudiente = req.body.tel_acudiente

    console.log(idalumno)
    const queryString = "UPDATE alumno SET nombres = ?, apellidos = ?, identidad = ?, fecha_nacimiento = ?, direccion = ?, tel_acudiente = ? WHERE idalumno = ?"
    connection.query(queryString, [nombres, apellidos, identidad, fecha_nacimiento, direccion, tel_acudiente, idalumno], (err, results, fields) =>{
        if (err){
            console.log("Error al editar alumno: "+ err)
            res.sendStatus(400)
            return
        }

        console.log("Se edito alumno con id: ", results.affectedRows);
        res.end() 
        
    } )
});

Router.delete('/delete/:id', (req, res) => {
    console.log("Eliminar alumno con id: "+ req.params.id)

    const idalumno = req.params.id
    const queryString = "DELETE FROM alumno WHERE idalumno =?"
    connection.query(queryString, [idalumno],(err, rows, fields) => {
        if(err){
            console.log("No existe alumno " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("alumno Eliminado")
        res.json(rows)
    })
});

module.exports = Router;