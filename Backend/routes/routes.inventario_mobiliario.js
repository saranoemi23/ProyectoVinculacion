const express = require("express");
const Router = express.Router();
const connection = require("../conection");

Router.get('/get', (req, res) => {
    console.log("Seleccionar todos los mobiliarios")

    const queryString = `SELECT c.cantidad_inicial, c.fecha_entrada, c.descripcion, c.serie,
                                e.estado, c.fecha_salida, c.cantidad_salida,
                                c.recibido, c.total_existencia, c.destino, c.observaciones, c.idbodega
                        FROM    inventario_mobiliario c INNER JOIN estadomobiliario e on c.idestado=e.idestado`
    connection.query(queryString,(err, rows, fields) => {
        if(err){
            console.log("No hay mobiliarios " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Mobiliarios seleccionados")
        res.json(rows)
    })
});

Router.post('/add', (req, res) =>{

    console.log("Tratando de agregar mobiliario..")
    console.log("cantidad_inicial: "+ req.body.cantidad_inicial)
    console.log("fecha_entrada: "+ req.body.fecha_entrada)
    console.log("descripcion: "+ req.body.descripcion)
    console.log("serie: "+ req.body.serie)
    console.log("idestado: "+ req.body.idestado)
    console.log("fecha_salida: "+ req.body.fecha_salida)
    console.log("cantidad_salida: "+ req.body.cantidad_salida)
    console.log("recibido: "+ req.body.recibido)
    console.log("destino: "+ req.body.destino)
    console.log("observaciones: "+ req.body.observaciones)
    console.log("idbodega: "+ req.body.idbodega)
   
    const cantidad_inicial = req.body.cantidad_inicial
    const fecha_entrada = req.body.fecha_entrada
    const descripcion = req.body.descripcion
    const serie = req.body.serie
    const idestado = req.body.idestado
    const fecha_salida = req.body.fecha_salida
    const cantidad_salida = req.body.cantidad_salida
    const recibido = req.body.recibido
    const destino = req.body.destino
    const observaciones = req.body.observaciones
    const idbodega = req.body.idbodega

    const queryString = `INSERT INTO enecstar_matricula.inventario_mobiliario
                                    (cantidad_inicial, fecha_entrada, descripcion, serie, idestado, 
                                    fecha_salida, cantidad_salida, recibido, destino, 
                                    observaciones, idbodega)
                        VALUES 		(?,?,?,?,?,?,?,?,?,?,?)
                        `
    connection.query(queryString, [cantidad_inicial, fecha_entrada, descripcion, serie, idestado, fecha_salida,cantidad_salida,recibido,destino,observaciones, idbodega], (err, results, fields) =>{
        if (err){
            console.log("Error el mobiliario: "+ err)
            res.sendStatus(500)
            return
        }

        console.log("Se agregó mobiliario con id: ", results.insertId);
        res.end() 
        
    } )
});

Router.post('/edit/:id', (req, res) =>{
    const connection = req.app.get('connection');

    console.log("Tratando de agregar mobiliario..")
    console.log("id: "+ req.body.id)
    console.log("cantidad_inicial: "+ req.body.cantidad_inicial)
    console.log("fecha_entrada: "+ req.body.fecha_entrada)
    console.log("descripcion: "+ req.body.descripcion)
    console.log("serie: "+ req.body.serie)
    console.log("idestado: "+ req.body.idestado)
    console.log("fecha_salida: "+ req.body.fecha_salida)
    console.log("cantidad_salida: "+ req.body.cantidad_salida)
    console.log("recibido: "+ req.body.recibido)
    console.log("destino: "+ req.body.destino)
    console.log("observaciones: "+ req.body.observaciones)
    console.log("idbodega: "+ req.body.idbodega)
   
    const cantidad_inicial = req.body.cantidad_inicial
    const fecha_entrada = req.body.fecha_entrada
    const descripcion = req.body.descripcion
    const serie = req.body.serie
    const idestado = req.body.idestado
    const fecha_salida = req.body.fecha_salida
    const cantidad_salida = req.body.cantidad_salida
    const recibido = req.body.recibido
    const destino = req.body.destino
    const observaciones = req.body.observaciones
    const idbodega = req.body.idbodega

    console.log(id)
    const queryString = `UPDATE enecstar_matricula.inventario_mobiliario
                         SET    cantidad_inicial = ?, fecha_entrada =? descripcion = ?, serie = ?,
                                idestado = ?, fecha_salida = ?, cantidad_salida = ?, recibido = ?, 
                                destino = ?, observaciones = ?, idbodega = ?, 
                        WHERE id = ?`
      
    connection.query(queryString, [cantidad_inicial,fecha_entrada, descripcion,serie,idestado,fecha_salida,cantidad_salida,recibido,destino,observaciones,idbodega,id], (err, results, fields) =>{
        if (err){
            console.log("Error al editar mobiliarip: "+ err)
            res.sendStatus(400)
            return
        }

        console.log("Se editó mobiliario con id: ", results.affectedRows);
        res.end() 
        
    } )
});

Router.delete('/delete/:id', (req, res) => {
    console.log("Eliminar mobiliario con id: "+ req.params.id) 

    const idInventario = req.params.id
    const queryString = "DELETE FROM inventario_mobiliario  WHERE id =?"
    connection.query(queryString, [idInventario],(err, rows, fields) => {
        if(err){
            console.log("No existe mobiliario " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Mobiliario Eliminado")
        res.json(rows)
    })
});

module.exports = Router;
