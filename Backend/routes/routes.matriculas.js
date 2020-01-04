const express = require("express");
const Router = express.Router();
const connection = require("../conecction");

Router.post('/filter', (req, res) => {
    console.log("Seleccionar matriculas por filtro");

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

//matriculas x ID
Router.get('/get/:id', (req, res) => {
    console.log("Seleccionar matricula con id: "+ req.params.id)

    const idmatricula= req.params.id
    const queryString = "SELECT * FROM matricula WHERE idmatricula = ?"
    connection.query(queryString, [idmatricula],(err, rows, fields) => {
        if(err){
            console.log("No existe matricula " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("Matricula Seleccionado")
        res.json(rows)
    })
});


Router.post('/add', (req, res) =>{

    console.log("Tratando de agregar matricula..")
    console.log("fecha_matricula: "+ req.body.fecha_matricula)
    console.log("nombre_alumno: "+ req.body.nombre_alumno)
    console.log("fecha_nacimiento: "+ req.body.fecha_nacimiento)
    console.log("lugar_nacimiento: "+ req.body.lugar_nacimiento)
    console.log("edad: "+ req.body.edad)
    console.log("identidad: "+ req.body.identidad)
    console.log("tipo_sangre: "+ req.body.tipo_sangre)
    console.log("enfermedades: "+ req.body.enfermedades)
    console.log("vacunas: "+ req.body.vacunas)
    console.log("otros: "+ req.body.otros)
    console.log("operaciones: "+ req.body.operaciones)
    console.log("fracturas: "+ req.body.fracturas)
    console.log("dif_conducta: "+ req.body.dif_conducta)
    console.log("grado: "+ req.body.grado)
    console.log("tipo_ingreso: "+ req.body.tipo_ingreso)
    console.log("repitente: "+ req.body.repitente)
    console.log("escuela_ant: "+ req.body.escuela_ant)
    console.log("nombre_padre: "+ req.body.nombre_padre)
    console.log("padre_id: "+ req.body.padre_id)
    console.log("padre_edad: "+ req.body.padre_edad)
    console.log("padre_academ: "+ req.body.padre_academ)
    console.log("padre_trabajo: "+ req.body.padre_trabajo)
    console.log("padre_trabajo_tel: "+ req.body.padre_trabajo_tel)
    console.log("padre_tel: "+ req.body.padre_tel)
    console.log("nombre_madre: "+ req.body.nombre_madre)
    console.log("madre_id: "+ req.body.madre_id)
    console.log("madre_edad: "+ req.body.madre_edad)
    console.log("madre_academ: "+ req.body.madre_academ)
    console.log("madre_trabajo: "+ req.body.madre_trabajo)
    console.log("madre_trabajo_tel: "+ req.body.madre_trabajo_tel)
    console.log("madre_tel: "+ req.body.madre_tel)
    console.log("responsable: "+ req.body.responsable)
    console.log("direccion_resp: "+ req.body.direccion_resp)
    console.log("tel_resp: "+ req.body.tel_resp)
    console.log("familiar: "+ req.body.familiar)
    console.log("tel_familiar: "+ req.body.tel_familiar)
    console.log("amigo: "+ req.body.amigo)
    console.log("tel_amigo: "+ req.body.tel_amigo)
    console.log("vecino: "+ req.body.vecino)
    console.log("tel_vecino: "+ req.body.tel_vecino)

   
    const fecha_matricula = req.body.fecha_matricula
    const nombre_alumno = req.body.nombre_alumno
    const fecha_nacimiento = req.body.fecha_nacimiento
    const lugar_nacimiento = req.body.lugar_nacimiento
    const edad = req.body.edad
    const identidad = req.body.identidad
    const tipo_sangre = req.body.tipo_sangre
    const alergias = req.body.alergias
    const enfermedades = req.body.enfermedades
    const vacunas = req.body.vacunas
    const otros = req.body.otros
    const operaciones = req.body.operaciones
    const fracturas = req.body.fracturas
    const dif_conducta = req.body.dif_conducta
    const grado = req.body.grado
    const tipo_ingreso = req.body.tipo_ingreso
    const repitente = req.body.repitente
    const escuela_ant = req.body.escuela_ant
    const nombre_padre = req.body.nombre_padre
    const padre_id = req.body.padre_id
    const padre_edad = req.body.padre_edad
    const padre_academ = req.body.padre_academ
    const padre_trabajo = req.body.padre_trabajo
    const padre_trabajo_tel = req.body.padre_trabajo_tel
    const padre_tel = req.body.padre_tel
    const nombre_madre = req.body.nombre_madre
    const madre_id = req.body.madre_id
    const madre_edad = req.body.madre_edad
    const madre_academ = req.body.madre_academ
    const madre_trabajo = req.body.madre_trabajo
    const madre_trabajo_tel = req.body.madre_trabajo_tel
    const madre_tel = req.body.madre_tel
    const responsable = req.body.responsable
    const direccion_resp = req.body.direccion_resp
    const tel_resp = req.body.tel_resp
    const familiar = req.body.familiar
    const tel_familiar = req.body.tel_familiar
    const amigo = req.body.amigo
    const tel_amigo = req.body.tel_amigo
    const vecino = req.body.vecino
    const tel_vecino = req.body.tel_vecino


    const queryString = "INSERT INTO matricula (fecha_matricula, nombre_alumno, fecha_nacimiento, lugar_nacimiento, edad, identidad, tipo_sangre, alergias, enfermedades, vacunas, otros, operaciones, fracturas, dif_conducta, grado, tipo_ingreso, repitente, escuela_ant, nombre_padre, padre_id, padre_edad, padre_academ, padre_trabajo, padre_trabajo_tel, padre_tel, nombre_madre, madre_id, madre_edad, madre_academ, madre_trabajo, madre_trabajo_tel, madre_tel, responsable, direccion_resp, tel_resp, familiar, tel_familiar, amigo, tel_amigo, vecino, tel_vecino )  VALUES  (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    connection.query(queryString, [fecha_matricula, nombre_alumno, fecha_nacimiento, lugar_nacimiento, edad, identidad, tipo_sangre, alergias, enfermedades, vacunas, otros, operaciones, fracturas, dif_conducta, grado, tipo_ingreso, repitente, escuela_ant, nombre_padre, padre_id, padre_edad, padre_academ, padre_trabajo, padre_trabajo_tel, padre_tel, nombre_madre, madre_id, madre_edad, madre_academ, madre_trabajo, madre_trabajo_tel, madre_tel, responsable, direccion_resp, tel_resp, familiar, tel_familiar, amigo, tel_amigo, vecino, tel_vecino], (err, results, fields) =>{
        if (err){
            console.log("Error el matricula: "+ err)
            res.sendStatus(500)
            return
        }

        console.log("Se agrego matricula con id: ", results.insertId);
        res.end() 
        
    } )
});

Router.put('/edit/:id', (req, res) =>{

    console.log("Tratando de editar un matricula..")
    console.log("fecha_matricula: "+ req.body.fecha_matricula)
    console.log("nombre_alumno: "+ req.body.nombre_alumno)
    console.log("fecha_nacimiento: "+ req.body.fecha_nacimiento)
    console.log("lugar_nacimiento: "+ req.body.lugar_nacimiento)
    console.log("edad: "+ req.body.edad)
    console.log("identidad: "+ req.body.identidad)
    console.log("tipo_sangre: "+ req.body.tipo_sangre)
    console.log("enfermedades: "+ req.body.enfermedades)
    console.log("vacunas: "+ req.body.vacunas)
    console.log("otros: "+ req.body.otros)
    console.log("operaciones: "+ req.body.operaciones)
    console.log("fracturas: "+ req.body.fracturas)
    console.log("dif_conducta: "+ req.body.dif_conducta)
    console.log("grado: "+ req.body.grado)
    console.log("tipo_ingreso: "+ req.body.tipo_ingreso)
    console.log("repitente: "+ req.body.repitente)
    console.log("escuela_ant: "+ req.body.escuela_ant)
    console.log("nombre_padre: "+ req.body.nombre_padre)
    console.log("padre_id: "+ req.body.padre_id)
    console.log("padre_edad: "+ req.body.padre_edad)
    console.log("padre_academ: "+ req.body.padre_academ)
    console.log("padre_trabajo: "+ req.body.padre_trabajo)
    console.log("padre_trabajo_tel: "+ req.body.padre_trabajo_tel)
    console.log("padre_tel: "+ req.body.padre_tel)
    console.log("nombre_madre: "+ req.body.nombre_madre)
    console.log("madre_id: "+ req.body.madre_id)
    console.log("madre_edad: "+ req.body.madre_edad)
    console.log("madre_academ: "+ req.body.madre_academ)
    console.log("madre_trabajo: "+ req.body.madre_trabajo)
    console.log("madre_trabajo_tel: "+ req.body.madre_trabajo_tel)
    console.log("madre_tel: "+ req.body.madre_tel)
    console.log("responsable: "+ req.body.responsable)
    console.log("direccion_resp: "+ req.body.direccion_resp)
    console.log("tel_resp: "+ req.body.tel_resp)
    console.log("familiar: "+ req.body.familiar)
    console.log("tel_familiar: "+ req.body.tel_familiar)
    console.log("amigo: "+ req.body.amigo)
    console.log("tel_amigo: "+ req.body.tel_amigo)
    console.log("vecino: "+ req.body.vecino)
    console.log("tel_vecino: "+ req.body.tel_vecino)
   
    const idmatricula = req.params.id
    const fecha_matricula = req.body.fecha_matricula
    const nombre_alumno = req.body.nombre_alumno
    const fecha_nacimiento = req.body.fecha_nacimiento
    const lugar_nacimiento = req.body.lugar_nacimiento
    const edad = req.body.edad
    const identidad = req.body.identidad
    const tipo_sangre = req.body.tipo_sangre
    const alergias = req.body.alergias
    const enfermedades = req.body.enfermedades
    const vacunas = req.body.vacunas
    const otros = req.body.otros
    const operaciones = req.body.operaciones
    const fracturas = req.body.fracturas
    const dif_conducta = req.body.dif_conducta
    const grado = req.body.grado
    const tipo_ingreso = req.body.tipo_ingreso
    const repitente = req.body.repitente
    const escuela_ant = req.body.escuela_ant
    const nombre_padre = req.body.nombre_padre
    const padre_id = req.body.padre_id
    const padre_edad = req.body.padre_edad
    const padre_academ = req.body.padre_academ
    const padre_trabajo = req.body.padre_trabajo
    const padre_trabajo_tel = req.body.padre_trabajo_tel
    const padre_tel = req.body.padre_tel
    const nombre_madre = req.body.nombre_madre
    const madre_id = req.body.madre_id
    const madre_edad = req.body.madre_edad
    const madre_academ = req.body.madre_academ
    const madre_trabajo = req.body.madre_trabajo
    const madre_trabajo_tel = req.body.madre_trabajo_tel
    const madre_tel = req.body.madre_tel
    const responsable = req.body.responsable
    const direccion_resp = req.body.direccion_resp
    const tel_resp = req.body.tel_resp
    const familiar = req.body.familiar
    const tel_familiar = req.body.tel_familiar
    const amigo = req.body.amigo
    const tel_amigo = req.body.tel_amigo
    const vecino = req.body.vecino
    const tel_vecino = req.body.tel_vecino

    console.log(idmatricula)
    const queryString = "UPDATE matricula SET fecha_matricula = ?, nombre_alumno = ?, fecha_nacimiento = ?, lugar_nacimiento = ?, edad = ?, identidad = ?, tipo_sangre = ?, alergias = ?, enfermedades = ?, vacunas = ?, otros = ?, operaciones = ?, fracturas = ?, dif_conducta = ?, grado = ?, tipo_ingreso = ?, repitente = ?, escuela_ant = ?, nombre_padre = ?, padre_id = ?, padre_edad = ?, padre_academ = ?, padre_trabajo = ?, padre_trabajo_tel = ?, padre_tel = ?, nombre_madre = ?, madre_id = ?, madre_edad = ?, madre_academ = ?, madre_trabajo = ?, madre_trabajo_tel = ?, madre_tel = ?, responsable = ?, direccion_resp = ?, tel_resp = ?, familiar = ?, tel_familiar = ?, amigo = ?, tel_amigo = ?, vecino = ?, tel_vecino = ? WHERE idmatricula = ?"
    connection.query(queryString, [fecha_matricula, nombre_alumno, fecha_nacimiento, lugar_nacimiento, edad, identidad, tipo_sangre, alergias, enfermedades, vacunas, otros, operaciones, fracturas, dif_conducta, grado, tipo_ingreso, repitente, escuela_ant, nombre_padre, padre_id, padre_edad, padre_academ, padre_trabajo, padre_trabajo_tel, padre_tel, nombre_madre, madre_id, madre_edad, madre_academ, madre_trabajo, madre_trabajo_tel, madre_tel, responsable, direccion_resp, tel_resp, familiar, tel_familiar, amigo, tel_amigo, vecino, tel_vecino, idmatricula], (err, results, fields) =>{
        if (err){
            console.log("Error al editar matricula: "+ err)
            res.sendStatus(400)
            return
        }

        console.log("Se edito Matricula con id: ", results.affectedRows);
        res.end() 
        
    } )
});

Router.delete('/delete/:id', (req, res) => {
    console.log("Eliminar matricula con id: "+ req.params.id)

    const idmatricula = req.params.id
    const queryString = "DELETE FROM matricula WHERE idmatricula =?"
    connection.query(queryString, [idmatricula],(err, rows, fields) => {
        if(err){
            console.log("No existe matricula " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("matricula Eliminado")
        res.json(rows)
    })
});

module.exports = Router;
