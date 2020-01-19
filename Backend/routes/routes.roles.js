const express = require("express");
const Router = express.Router();
const connection = require("../conection");

Router.get('/get', (req, res) => {
    console.log("Seleccionar todos los roles")

    const queryString = "SELECT * FROM rol"
    connection.query(queryString,(err, rows, fields) => {
        if(err){
            console.log("No hay roles " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("roles Seleccionados")
        res.json(rows)
    })
});

//Rol x ID
Router.get('/get/:id', (req, res) => {
    console.log("Seleccionar rol con id: "+ req.params.id)

    const idrol= req.params.id
    const queryString = "SELECT * FROM rol WHERE idrol = ?"
    connection.query(queryString, [idrol],(err, rows, fields) => {
        if(err){
            console.log("No existe rol " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Rol Seleccionada")
        res.json(rows)
    })
});

Router.post('/add', (req, res) =>{

    console.log("Tratando de agregar rol..")
    console.log("Rol: "+ req.body.rol)
    console.log("Descripcion: "+ req.body.descripcion)
   
    const rol = req.body.rol
    const descripcion = req.body.descripcion

    const queryString = "INSERT INTO rol (rol, descripcion)  VALUES  (?,?)"
    connection.query(queryString, [rol, descripcion], (err, results, fields) =>{
        if (err){
            console.log("Error el rol: "+ err)
            res.sendStatus(500)
            return
        }

        console.log("Se agrego rol con id: ", results.insertId);
        res.end() 
        
    } )
});

Router.put('/edit/:id', (req, res) =>{

    console.log("Tratando de editar un rol..")
    console.log("Rol: "+ req.body.rol)
    console.log("Descripcion: "+ req.body.descripcion)
   
    const idrol = req.params.id
    const rol = req.body.rol
    const descripcion = req.body.descripcion

    console.log(idrol)
    const queryString = "UPDATE rol SET rol = ?, descripcion = ? WHERE idrol = ?"
    connection.query(queryString, [rol, descripcion, idrol], (err, results, fields) =>{
        if (err){
            console.log("Error al editar rol: "+ err)
            res.sendStatus(400)
            return
        }

        console.log("Se edito rol con id: ", results.affectedRows);
        res.end() 
        
    } )
});

Router.delete('/delete/:id', (req, res) => {
    console.log("Eliminar rol con id: "+ req.params.id)

    const idrol = req.params.id
    const queryString = "DELETE FROM rol WHERE idrol =?"
    connection.query(queryString, [idrol],(err, rows, fields) => {
        if(err){
            console.log("No existe rol " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Rol Eliminado")
        res.json(rows)
    })
});

module.exports = Router;