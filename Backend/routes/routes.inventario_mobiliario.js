const express = require("express");
const Router = express.Router();
const connection = require("../conection");

Router.get('/get', (req, res) => {
    console.log("Seleccionar todos los mobiliarios")

    const queryString = `SELECT c.descripcion,c.cantidad_inicial,c.serie,
    e.estado,c.fecha_salida,c.cantidad_salida,
    c.recibido,c.destino,c.Observaciones
     FROM inventario_mobiliario c INNER JOIN estado_inv_mobiliario e on c.estado=e.idestado`
    connection.query(queryString,(err, rows, fields) => {
        if(err){
            console.log("No hay mobiliarios " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("mobiliarios Seleccionados")
        res.json(rows)
    })
});

//inmobiliaio x descripcion
Router.get('/get/:id', (req, res) => {
    console.log("Seleccionar mobiliario : "+ req.params.id)

    const descripcion= req.params.id
    const queryString = `SELECT c.descripcion,c.cantidad_inicial,c.serie,
    e.estado,c.fecha_salida,c.cantidad_salida,
    c.recibido,c.destino,c.Observaciones FROM inventario_mobiliario c 
    INNER JOIN estado_inv_mobiliario e on c.estado=e.idestado WHERE descripcion = ?`
    connection.query(queryString, [descripcion],(err, rows, fields) => {
        if(err){
            console.log("No existe jornada " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Mobiliario Seleccionada")
        res.json(rows)
    })
});

Router.post('/add', (req, res) =>{

    console.log("Tratando de agregar mobiliario..")
    console.log("mobiliario: "+ req.body.descripcion)
    console.log("cantidad Entrada: "+ req.body.cantidad_inicial)
    console.log("Estado de mobiliario: "+ req.body.estado)
   
    const descripcion = req.body.descripcion
    const cantidad_inicial = req.body.cantidad_inicial
    const serie = req.body.serie
    const estado = req.body.estado
    const fecha_salida = req.body.fecha_salida
    const cantidad_salida = req.body.cantidad_salida
    const recibido = req.body.recibido
    const destino = req.body.destino
    const Observaciones = req.body.Observaciones

    const queryString = "INSERT INTO inventario_mobiliario (cantidad_inicial, descripcion,serie,estado,fecha_salida,cantidad_salida,recibido,destino,Observaciones)  VALUES  (?,?,?,(SELECT idestado FROM estado_inv_mobiliario WHERE estado = ? ),?,?,?,?,?)"
    connection.query(queryString, [cantidad_inicial, descripcion,serie,estado,fecha_salida,cantidad_salida,recibido,destino,Observaciones], (err, results, fields) =>{
        if (err){
            console.log("Error el mobiliario: "+ err)
            res.sendStatus(500)
            return
        }

        console.log("Se agrego mobiliario con id: ", results.insertId);
        res.end() 
        
    } )
});

Router.put('/edit/:id', (req, res) =>{

    console.log("Tratando de editar un mobiliario..")
    console.log("mobiliario: "+ req.body.id)
   
    const idInventario = req.params.id
    const descripcion = req.body.descripcion
    const cantidad_inicial = req.body.cantidad_inicial
    const serie = req.body.serie
    const estado = req.body.estado
    const fecha_salida = req.body.fecha_salida
    const cantidad_salida = req.body.cantidad_salida
    const recibido = req.body.recibido
    const destino = req.body.destino
    const Observaciones = req.body.Observaciones

    console.log(idInventario)
    const queryString = `UPDATE inventario_mobiliario 
    SET cantidad_inicial=?
    ,descripcion =?
    ,serie=?
    ,estado=(SELECT idestado FROM estado_inv_mobiliario WHERE estado = ? )
    ,fecha_salida=?
    ,cantidad_salida=?
    ,recibido=?
    ,destino=?
    ,Observaciones=?
      where idInventario=?`;
      
    connection.query(queryString, [cantidad_inicial, descripcion,serie,estado,fecha_salida,cantidad_salida,recibido,destino,Observaciones,idInventario], (err, results, fields) =>{
        if (err){
            console.log("Error al editar mobiliarip: "+ err)
            res.sendStatus(400)
            return
        }

        console.log("Se edito mobiliario con id: ", results.affectedRows);
        res.end() 
        
    } )
});

Router.delete('/delete/:id', (req, res) => {
    console.log("Eliminar mobiliario con id: "+ req.params.id) 

    const idInventario = req.params.id
    const queryString = "DELETE FROM inventario_mobiliario  WHERE idInventario =?"
    connection.query(queryString, [idInventario],(err, rows, fields) => {
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
