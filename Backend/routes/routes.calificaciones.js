const express = require("express");
const Router = express.Router();
const connection = require("../conection");

Router.get('/get', (req, res) => {
    console.log("Seleccionar todas las calificaiones")

    const queryString = `
    select 
    c.idcalificaciones, c.Acumulado,c.Examen,c.Total,
    a.idasignatura, a.asignatura as asignatura,
    g.idgrado, g.grado as grado,
    p.idperiodo,p.periodo as periodo,
    s.idseccion, s.seccion as seccion,
    al.idmatricula, al.nombre_alumno as matricula

    from calificaciones c 
    inner join asignatura a on c.id_asignatura = a.idasignatura
    inner join grado g on c.id_grado = g.idgrado
    inner join periodo p on c.id_periodo = p.idperiodo
    inner join seccion s on c.id_seccion = s.idseccion
    inner join matricula al on c.id_alumno = al.idmatricula
    `;
    connection.query(queryString,(err, rows, fields) => {
        if(err){
            console.log("No hay calificaciones " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("calificaiones seleccionadas ")
        res.json(rows)
    })
});

//Probando el filtro
Router.post('/filtercali', (req, res) => {
    console.log("Seleccionar Calificacion");

    let filtros = req.body.filtros;
    let params = [];
    let strFiltros = [];

    for (var n = 0; n < filtros.length; n++) {
        let fil = filtros[n];

        params.push(fil.valor);

        if (fil.col == 'm.nombre_alumno') {
            strFiltros.push(fil.col + ' like ?');
        } else {
            strFiltros.push(fil.col + ' = ?');
        }
    }

    let filtro = strFiltros.join(' and ');
    if (filtro.length > 0) {
        filtro = ' where ' + filtro;
    }

    console.log('filtro', filtro);

    const queryString = `
        SELECT m.*, g.grado as nombre_grado FROM matricula m
        inner join grado g on m.grado = g.idgrado
    ` + filtro;
    console.log(queryString, params);

    connection.query(queryString, params, (err, rows, fields) => {
        if(err){
            console.log("No hay matriculas " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Matriculas Seleccionados")
        res.json(rows)
    })
});

//Calificacion x ID
Router.get('/get/:id', (req, res) => {
    console.log("Seleccionar calificaion con id: "+ req.params.id)

    const idCalificaiones= req.params.id
    const queryString = `
    select 
    c.idcalificaciones, c.Acumulado,c.Examen,c.Total,
    a.idasignatura, a.asignatura as asignatura,
    g.idgrado, g.grado as grado,
    p.idperiodo,p.periodo as periodo,
    s.idseccion, s.seccion as seccion,
    al.idmatricula, al.nombre_alumno as matricula

    from calificaciones c 
    inner join asignatura a on c.id_asignatura = a.idasignatura
    inner join grado g on c.id_grado = g.idgrado
    inner join periodo p on c.id_periodo = p.idperiodo
    inner join seccion s on c.id_seccion = s.idseccion
    inner join matricula al on c.id_alumno = al.idmatricula
    WHERE idCalificaciones = ?
    `;
    connection.query(queryString, [idCalificaiones],(err, rows, fields) => {
        if(err){
            console.log("No existe la calificacion " + err)
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
    console.log("Acumulado: "+ req.body.Acumulado)
    console.log("Examen: "+ req.body.Examen)
    console.log("Total: "+ req.body.Total)
    console.log("idasignatura: "+ req.body.id_asignatura)
    console.log("idgrado: "+ req.body.id_grado) 
    console.log("idperiodo "+ req.body.id_periodo) 
    console.log("idseccion: "+ req.body.id_seccion) 
    console.log("idalumno: "+ req.body.id_alumno) 
   
    const Acumulado = req.body.Acumulado
    const Examen = req.body.Examen
    const Total = req.body.Total
    const id_asignatura = req.body.id_asignatura
    const id_grado = req.body.id_grado
    const id_periodo = req.body.id_periodo
    const id_seccion = req.body.id_seccion
    const id_alumno = req.body.id_alumno

    const queryString = "INSERT INTO calificaciones (Acumulado, Examen, Total, id_asignatura, id_grado,id_periodo,id_seccion,id_alumno)  VALUES  (?,?,?,(SELECT idasignatura FROM asignatura WHERE asignatura=?),(SELECT idgrado FROM grado WHERE grado=?),(SELECT idperiodo FROM periodo WHERE periodo=?),(SELECT idseccion FROM seccion WHERE seccion=?),(SELECT idmatricula FROM matricula WHERE nombre_alumno=?))"
    connection.query(queryString, [Acumulado, Examen,Total,id_asignatura,id_grado,id_periodo,id_seccion,id_alumno], (err, results, fields) =>{
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

    console.log("Tratando de editar un calificaion..")
    console.log("Acumulado "+ req.body.Acumulado)
    console.log("Examen: "+ req.body.Examen)
   
    const idCalificaciones = req.body.id
    const Acumulado = req.body.Acumulado
    const Examen = req.body.Examen
    const Total = req.body.Total
    const id_asignatura = req.body.id_asignatura
    const id_grado = req.body.id_grado
    const id_periodo = req.body.id_periodo
    const id_seccion = req.body.id_seccion
    const id_alumno = req.body.id_alumno

    console.log(idjornada)
    const queryString = `UPDATE 
    calificaciones 
    SET Acumulado = ?, Examen = ?,
        Total=?,
        id_asignatura=?, id_grado=?,
        id_periodo=?,id_seccion=?,
        id_alumno WHERE idCalificaciones = ?`

    connection.query(queryString, [idCalificaciones,Acumulado, Examen,Total,id_asignatura,id_grado,id_periodo,id_seccion,id_alumno], (err, results, fields) =>{
        if (err){
            console.log("Error al editar jornada: "+ err)
            res.sendStatus(400)
            return
        }

        console.log("Se edito jornada con id: ", results.affectedRows);
        res.end() 
        
    } )
});

Router.delete('/delete/:id', (req, res) => {
    console.log("Eliminar jornada con id: "+ req.params.id)

    const idCalificaciones = req.params.id
    const queryString = "DELETE FROM calificaiones WHERE idcalificaciones =?"
    connection.query(queryString, [idCalificaciones],(err, rows, fields) => {
        if(err){
            console.log("No existe calificacion " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("calificacion Eliminada")
        res.json(rows)
    })
});

//Probando nuevos gets

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



