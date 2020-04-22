const express = require("express");
const Router = express.Router();
const connection = require("../conection");

Router.get('/get', (req, res) => {
    console.log("Seleccionar todas las calificaciones")

    const queryString = `
    select c.Acumulado, c.Examen, c.Total, a.nombrec, g.grado, p.periodo
    from calificaciones c 
    inner join alumno a on c.id_alumno = a.idalumno
    inner join grado g on g.idgrado = c.id_grado
    inner join periodo p on p.idperiodo = c.id_periodo;
    `
    connection.query(queryString,(err, rows, fields) => {
        if(err){
            console.log("No hay calificaciones " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Calificaciones Seleccionadas")
        res.json(rows)
    })
});

Router.post('/get', (req, res) => {
    console.log("Seleccionar calificaciones segun los filtros")

    let grado = req.body.grado;
    let anio = req.body.anio;
    let matricula = req.body.matricula;
    let asignatura = req.body.asignatura;
    let periodo = req.body.periodo;

    //Definicion de filtros condicionales
    var filtro_alumno= "";
    var filtro_asignatura="";
    var filtro_periodo = "";
    var filtros_sql = [anio, grado];


    //si matricula no esta vacio se agrega el filtro_alumno
    if (matricula != "") {
        filtro_alumno =  "and id_alumno = ?";
        filtros_sql.push(matricula);
    
    }

    if (asignatura != "") {
        filtro_asignatura =  "and id_asignatura = ?";
        filtros_sql.push(asignatura);
    
    }

    if (periodo != "") {
        filtro_periodo=  "and id_periodo = ?";
        filtros_sql.push(periodo);
    
    }

    //Filtroos condicionales se adicionan al query, si estan vacios no afectan el resultado
    const queryString = `
    select c.Acumulado, c.Examen, c.Total, m.nombre_alumno, g.grado, p.periodo
    from calificaciones c 
    inner join matricula m on c.id_alumno = m.idmatricula
    inner join grado g on g.idgrado = c.id_grado
    inner join periodo p on p.idperiodo = c.id_periodo
    where anio = ?
    and id_grado = ?
    ${filtro_alumno}
    ${filtro_asignatura}
    ${filtro_periodo}
    `

    console.log(queryString)
    console.log(filtros_sql)
    connection.query(queryString, filtros_sql,(err, rows, fields) => {
        if(err){
            console.log("No hay calificaciones " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Calificaciones Seleccionadas")
        res.json(rows)
    })
});


Router.post('/cargar-alumnos', (req, res) => {

    console.log("grado: " + req.body.grado);
    console.log("año: " + req.body.anio);

    let grado = req.body.grado;
    let anio = req.body.anio;

    // Carga los alumnos para un grado y año en especifico
    const queryString = `
        SELECT idmatricula, nombre_alumno FROM matricula m
        where grado = ?
        and year(fecha_matricula) = ?
        order by nombre_alumno
    `;
    connection.query(queryString, [grado, anio],(err, rows, fields) => {
        if(err){
            console.log("No existen Alumnos en ese grado " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Alumnos Seleccionada")
        res.json(rows)
    })
})

//calificaciones x ID
Router.get('/get/:id', (req, res) => {
    console.log("Seleccionar calificacion con id: "+ req.params.id)

    const idCalificaciones = req.params.id
    const queryString = "SELECT * FROM calificaciones WHERE idCalificaciones = ?"
    connection.query(queryString, [idCalificaciones],(err, rows, fields) => {
        if(err){
            console.log("No existe calificacion " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Calificacion Seleccionada")
        res.json(rows)
    })
});

Router.post('/add', (req, res) =>{

    console.log("Tratando de agregar calificacion..")
    console.log("idCalificaciones" + req.body.idCalificaciones)
    console.log("Acumulado: "+ req.body.Acumulado)
    console.log("Examen: "+ req.body.Examen)
    console.log("Total: " + req.body.Total)
    console.log("id_asignatura: " + req.body.id_asignatura)
    console.log("id_asignatura: "+ req.body.id_asignatura)
    console.log("id_alumno: " + req.body.id_alumno)
    console.log("id_periodo: " + req.body.id_periodo)
    console.log("anio: " + req.body.anio) 
   
    const idCalificaciones = idCalificaciones
    const Acumulado = req.body.Acumulado
    const Examen = req.body.Examen
    const Total = req.body.Total
    const id_asignatura = req.body.id_asignatura
    const id_alumno = req.body.id_alumno
    const id_periodo = req.body.id_periodo
    const anio = req.body.anio

    const queryString = "INSERT INTO asignatura ('idCalificaciones','Acumulado','Examen','id_asignatura','id_grado_detalle','id_alumno','id_periodo','anio')  VALUES  (?,?,?,?,?,?,?,?)"
    connection.query(queryString, [idCalificaciones,Acumulado,Examen,id_asignatura,id_asignatura,id_alumno,id_periodo,anio], (err, results, fields) =>{
        if (err){
            console.log("Error el calificacion: "+ err)
            res.sendStatus(500)
            return
        }

        console.log("Se agrego calificacion con id: ", results.insertId);
        res.end() 
        
    } )
});

Router.put('/edit/:id', (req, res) =>{

    console.log("Tratando de agregar calificacion..")
    console.log("Acumulado: "+ req.body.Acumulado)
    console.log("Examen: "+ req.body.Examen)
    console.log("Total: " + req.body.Total)
    console.log("id_asignatura: " + req.body.id_asignatura)
    console.log("id_asignatura: "+ req.body.id_asignatura)
    console.log("id_alumno: " + req.body.id_alumno)
    console.log("id_periodo: " + req.body.id_periodo)
    console.log("anio: " + req.body.anio) 
   
    const idCalificaciones = idCalificaciones
    const Acumulado = req.body.Acumulado
    const Examen = req.body.Examen
    const Total = req.body.Total
    const id_asignatura = req.body.id_asignatura
    const id_alumno = req.body.id_alumno
    const id_periodo = req.body.id_periodo
    const anio = req.body.anio


    console.log(idCalificaciones)
    const queryString = "UPDATE asignatura SET Acumulado = ?,Examen = ?,Total = ?,id_asignatura = ?,id_grado_detalle = ?,id_alumno = ?,id_periodo = ?,anio = ? WHERE dCalificaciones = ?"
    connection.query(queryString, [idCalificaciones,Acumulado,Examen,Total,id_asignatura,id_asignatura,id_alumno,id_periodo,anio], (err, results, fields) =>{
        if (err){
            console.log("Error al editar calificacion: "+ err)
            res.sendStatus(400)
            return
        }

        console.log("Se edito calificacion con id: ", results.affectedRows);
        res.end() 
        
    } )
});

Router.delete('/delete/:id', (req, res) => {
    console.log("Eliminar calificacion con id: "+ req.params.id)

    const idasignatura = req.params.id
    const queryString = "DELETE FROM calificaciones WHERE idCalificaciones =?"
    connection.query(queryString, [idCalificaciones],(err, rows, fields) => {
        if(err){
            console.log("No existe calificacion " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Calificacion Eliminada")
        res.json(rows)
    })
});

module.exports = Router;