const express = require("express");
const Router = express.Router();
const connection = require("../conection");

Router.get('/get', (req, res) => {
    console.log("Seleccionar todos los mobiliarios")

    const queryString = `SELECT i.descripcion,i.centro,i.fecha_vencimiento,
    e.tipo_unidad,i.fecha_entrada,i.cantidad_entrada,i.fecha_salida,i.cantidad_salida,
    i.uso FROM inventario_medicinas i INNER JOIN tipo_inv_medicinas e on i.idtipo_unidad = e.idtipo`
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

//inmobiliaio x centro
Router.get('/get/:id', (req, res) => {
    console.log("Seleccionar mobiliario : "+ req.params.id)

    const centro= req.params.id
    const queryString = `SELECT i.descripcion,i.centro,i.fecha_vencimiento,
    e.tipo_unidad,i.fecha_entrada,i.cantidad_entrada,i.fecha_salida,i.cantidad_salida,
    i.uso FROM inventario_medicinas i INNER JOIN tipo_inv_medicinas e 
    on i.idtipo_unidad = e.idtipo WHERE centro = ?`
    connection.query(queryString, [centro],(err, rows, fields) => {
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
    console.log("Seleccionar medicinas segun los filtros")

    let mes = req.body.mes;
    let anio = req.body.anio;
    let centro = req.body.centro;

    //Definicion de filtros condicionales
    var centrof= "";
    var filtros_sql = [ anio,mes];


    //si matricula no esta vacio se agrega el filtro_alumno
     if (centro != "") {
         centrof =  "and centro = ?";
         filtros_sql.push(centro);
    
    }

    //Filtroos condicionales se adicionan al query, si estan vacios no afectan el resultado
    const queryString = ` 
            SELECT i.descripcion,i.centro,i.fecha_vencimiento,
            e.tipo_unidad,i.fecha_entrada,i.cantidad_entrada,i.fecha_salida,i.cantidad_salida,
            i.uso FROM inventario_medicinas i INNER JOIN tipo_inv_medicinas e 
            on i.idtipo_unidad = e.idtipo where anio=? and mes = ?
            ${centrof}
            `

    console.log(queryString)
    console.log(filtros_sql)
    connection.query( queryString,filtros_sql,(err, rows, fields) => {
        if(err){
            console.log("No hay medicionas " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("medicinas Seleccionadas")
        res.json(rows)
    })
});



Router.post('/add', (req, res) =>{

    console.log("Tratando de agregar mobiliario..")
    console.log("mobiliario: "+ req.body.descripcion)
    console.log("Centro: "+ req.body.centro)
    console.log("Fecha vencimiento: "+ req.body.fecha_vencimiento)
    console.log("Fecha entrada: "+ req.body.fecha_entrada)
    console.log("Tipo unidad: "+ req.body.idtipo_unidad)
    console.log("Cantidad entrada: "+ req.body.cantidad_entrada)
   
    const descripcion = req.body.descripcion
    const centro = req.body.centro
    const fecha_vencimiento = req.body.fecha_vencimiento
    const idtipo_unidad = req.body.idtipo_unidad
    const fecha_entrada = req.body.fecha_entrada
    const cantidad_entrada = req.body.cantidad_entrada
    const fecha_salida = req.body.fecha_salida
    const cantidad_salida = req.body.cantidad_salida
    const uso = req.body.uso

    const queryString = "INSERT INTO inventario_medicinas (descripcion,centro,fecha_vencimiento,idtipo_unidad,fecha_entrada,cantidad_entrada,fecha_salida,cantidad_salida,uso)  VALUES  (?,?,?,(SELECT idtipo FROM tipo_inv_medicinas WHERE tipo_unidad = ? ),?,?,?,?,?)"
    connection.query(queryString, [descripcion,centro,fecha_vencimiento,idtipo_unidad,fecha_entrada,cantidad_entrada,fecha_salida,cantidad_salida,uso], (err, results, fields) =>{
        if (err){
            console.log("Error medicina: "+ err)
            res.sendStatus(500)
            return
        }

        console.log("Se agrego medicina con id: ", results.insertId);
        res.end() 
        
    } )
});

Router.put('/edit/:id', (req, res) =>{

    console.log("Tratando de editar un mobiliario..")
    console.log("mobiliario: "+ req.body.id)
   
    const idinventario = req.params.id
    const descripcion = req.body.descripcion
    const centro = req.body.centro
    const fecha_vencimiento = req.body.fecha_vencimiento
    const idtipo_unidad = req.body.idtipo_unidad
    const fecha_entrada = req.body.fecha_entrada
    const cantidad_entrada = req.body.cantidad_entrada
    const fecha_salida = req.body.fecha_salida
    const cantidad_salida = req.body.cantidad_salida
    const uso = req.body.uso

    console.log(idinventario)
    const queryString = `UPDATE inventario_medicinas 
    SET descripcion =?
    ,centro=?
    ,fecha_vencimiento=?
    ,idtipo_unidad=(SELECT idtipo FROM tipo_inv_medicinas WHERE tipo_unidad = ? )
    ,fecha_entrada=?
    ,cantidad_entrada=?
    ,fecha_salida=?
    ,cantidad_salida=?
    ,uso=?
      where idinventario=?`;
      
    connection.query(queryString, [descripcion,centro,fecha_vencimiento,idtipo_unidad,fecha_entrada,cantidad_entrada,fecha_salida,cantidad_salida,uso,idinventario], (err, results, fields) =>{
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

    const idinventario = req.params.id
    const queryString = "DELETE FROM inventario_medicinas  WHERE idinventario =?"
    connection.query(queryString, [idinventario],(err, rows, fields) => {
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
