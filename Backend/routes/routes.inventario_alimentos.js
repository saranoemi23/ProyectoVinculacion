const express = require("express");
const Router = express.Router();
const connection = require("../conection");

Router.get('/get', (req, res) => {
    console.log("Seleccionar todos los mobiliarios")

    const queryString = `SELECT i.fecha_entrada,i.cantidad_entrada,
    i.num_factura,i.origen_compra,i.producto,m.tipo_medicion,
    i.area_destino,i.fecha_salida,i.cantidad_salida,i.total_existencia
     FROM inventario_alimentos i INNER JOIN tipo_inv_alimentos m on i.idtipo_medicion = m.idtipo`
    connection.query(queryString,(err, rows, fields) => {
        if(err){
            console.log("No hay alimentos " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("alimentos Seleccionados")
        res.json(rows)
    })
});

//inmobiliaio x centro
Router.get('/get/:id', (req, res) => {
    console.log("Seleccionar alimento : "+ req.params.id)

    const producto= req.params.id
    const queryString = `SELECT i.fecha_entrada,i.cantidad_entrada,
    i.num_factura,i.origen_compra,i.producto,m.tipo_medicion,
    i.area_destino,i.fecha_salida,i.cantidad_salida,i.total_existencia
     FROM inventario_alimentos i INNER JOIN tipo_inv_alimentos m on i.idtipo_medicion = m.idtipo WHERE producto = ?`
    connection.query(queryString, [producto],(err, rows, fields) => {
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

// get segun filtros
Router.post('/get2', (req, res) => {
    console.log("Seleccionar alimentos segun los filtros")

    let fecha_entrada = req.body.fecha_entrada;
    let fecha_salida = req.body.fecha_salida;
    let producto = req.body.producto;
    let origen_compra = req.body.origen_compra;

    //Definicion de filtros condicionales
    var fecha_entradaf= "";
    var fecha_salidaf ="";
    var productof ="";
    var origen_compraf ="";
    var filtros_sql = [];

    //si matricula no esta vacio se agrega el filtro_alumno
     if (fecha_entrada != "") {
         fecha_entradaf =  "and fecha_entrada = ?";
         filtros_sql.push(fecha_entrada);
    }
    if (fecha_salida != "") {
        fecha_salidaf =  "and fecha_salida = ?";
        filtros_sql.push(fecha_salida);
   }  
   if (producto != "") {
    productof =  "and producto = ?";
    filtros_sql.push(producto);
    }
   if (origen_compra != "") {
    origen_compraf =  "and origen_compra = ?";
    filtros_sql.push(origen_compra);
    }

    //Filtroos condicionales se adicionan al query, si estan vacios no afectan el resultado
    const queryString = ` 
    SELECT i.fecha_entrada,i.cantidad_entrada,
    i.num_factura,i.origen_compra,i.producto,m.tipo_medicion,
    i.area_destino,i.fecha_salida,i.cantidad_salida,i.total_existencia
     FROM inventario_alimentos i INNER JOIN tipo_inv_alimentos m on i.idtipo_medicion = m.idtipo
    ${fecha_entradaf}
    ${fecha_salidaf}
    ${productof}
    ${origen_compraf}
            `

    console.log(queryString)
    console.log(filtros_sql)
    connection.query( queryString,filtros_sql,(err, rows, fields) => {
        if(err){
            console.log("No hay medicamentos " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("medicamentos Seleccionadas")
        res.json(rows)
    })
});

Router.post('/add', (req, res) =>{
    console.log("Tratando de agregar medicamento..")
    console.log("medicamento: "+ req.body.producto)
    console.log("Cantidad entrada: "+ req.body.cantidad_entrada)
   
    const fecha_entrada = req.body.fecha_entrada
    const cantidad_entrada = req.body.cantidad_entrada
    const num_factura = req.body.num_factura
    const origen_compra = req.body.origen_compra
    const producto = req.body.producto
    const idtipo_medicion = req.body.idtipo_medicion
    const area_destino = req.body.area_destino
    const fecha_salida = req.body.fecha_salida
    const cantidad_salida = req.body.cantidad_salida

    const queryString = "INSERT INTO inventario_alimentos (fecha_entrada,cantidad_entrada,num_factura,origen_compra,producto,idtipo_medicion,area_destino,fecha_salida,cantidad_salida)  VALUES  (?,?,?,?,?,(SELECT idtipo FROM tipo_inv_alimentos WHERE tipo_medicion = ? ),?,?,?)"
    connection.query(queryString, [fecha_entrada,cantidad_entrada,num_factura,origen_compra,producto,idtipo_medicion,area_destino,fecha_salida,cantidad_salida], (err, results, fields) =>{
        if (err){
            console.log("Error medicamento: "+ err)
            res.sendStatus(500)
            return
        }
        console.log("Se agrego medicamento con id: ", results.insertId);
        res.end() 
    } )
});

Router.put('/edit/:id', (req, res) =>{

    console.log("Tratando de editar un mobiliario..")
    console.log("mobiliario: "+ req.body.id)
   
    const idinventario = req.params.id
    const fecha_entrada = req.body.fecha_entrada
    const cantidad_entrada = req.body.cantidad_entrada
    const num_factura = req.body.num_factura
    const origen_compra = req.body.origen_compra
    const producto = req.body.producto
    const idtipo_medicion = req.body.idtipo_medicion
    const area_destino = req.body.area_destino
    const fecha_salida = req.body.fecha_salida
    const cantidad_salida = req.body.cantidad_salida

    console.log(idinventario)
    const queryString = `UPDATE inventario_alimentos 
    SET fecha_entrada =?
    ,cantidad_entrada=?
    ,num_factura=?
    ,origen_compra=?
    ,producto=?
    ,idtipo_medicion=(SELECT idtipo FROM tipo_inv_alimentos WHERE tipo_medicion = ? )
    ,area_destino=?
    ,fecha_salida=?
    ,cantidad_salida=?
    where idinventario=?`;
      
    connection.query(queryString, [fecha_entrada,cantidad_entrada,num_factura,origen_compra,producto,idtipo_medicion,area_destino,fecha_salida,cantidad_salida,idinventario], (err, results, fields) =>{
        if (err){
            console.log("Error al editar medicamento: "+ err)
            res.sendStatus(400)
            return
        }

        console.log("Se edito medicamento con id: ", results.affectedRows);
        res.end() 
        
    } )
});

Router.delete('/delete/:id', (req, res) => {
    console.log("Eliminar medicamento con id: "+ req.params.id) 

    const idinventario = req.params.id
    const queryString = "DELETE FROM inventario_alimentos  WHERE idinventario =?"
    connection.query(queryString, [idinventario],(err, rows, fields) => {
        if(err){
            console.log("No existe grado " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Medicamento Eliminado")
        res.json(rows)
    })
});

module.exports = Router;
