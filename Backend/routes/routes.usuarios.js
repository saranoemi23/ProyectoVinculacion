const express = require("express");
const Router = express.Router({mergeParams: true/*, strict: true*/});
const connection = require("../conection");

Router.get('/get', (req, res) => {
    console.log("Seleccionar todos los usuarios")

    //res.json(req.query);

    const queryString = "SELECT u.nombres AS nombres, u.apellidos AS apellidos, u.identidad AS identidad, u.correo AS correo, u.direccion AS direccion, u.usuario AS usuario, r.rol AS rol FROM usuario AS u INNER JOIN rol AS r ON u.idrol = r.idrol"
    connection.query(queryString,(err, rows, fields) => {
        if(err){
            console.log("No hay usuarios " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("usuarios Seleccionados")
        res.json(rows)
    })
});

//usuario x ID
Router.get('/get/:id', (req, res) => {
    console.log("Seleccionar usuario con id: "+ req.params.id)

    const idusuario= req.params.id
    const queryString = "SELECT u.nombres AS nombres, u.apellidos AS apellidos, u.identidad AS identidad, u.correo AS correo, u.direccion AS direccion, u.usuario AS usuario, r.rol AS rol FROM usuario AS u INNER JOIN rol AS r ON u.idrol = r.idrol WHERE u.idusuario = ?"
    connection.query(queryString, [idusuario],(err, rows, fields) => {
        if(err){
            console.log("No existe usuario " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("usuario Seleccionado")
        res.json(rows)
    })
});


//usuario x nombre de usuario y clave
Router.get('/get/:usuario/:clave', (req, res) => {
    console.log("Seleccionar usuario con usuario: "+ req.params.usuario)

    const usuario= req.params.usuario
    const contraseña = req.params.clave
    const queryString = "SELECT u.nombres AS nombres, u.apellidos AS apellidos, u.identidad AS identidad, u.correo AS correo, u.direccion AS direccion, u.usuario AS usuario, r.rol AS rol FROM usuario AS u INNER JOIN rol AS r ON u.idrol = r.idrol WHERE u.usuario = ? AND u.contraseña = ?"
    connection.query(queryString, [usuario, contraseña],(err, rows, fields) => {
        if(err){
            console.log("No existe usuario " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("usuario Seleccionado")
        res.json({status: 'ok'})
    })
});

Router.post('/add', (req, res) =>{

    console.log("Tratando de agregar usuario..")
    console.log("Nombres: "+ req.body.nombres)
    console.log("Apellidos: "+ req.body.apellidos)
    console.log("Identidad: "+ req.body.identidad)
    console.log("Correo: "+ req.body.correo)
    console.log("Direccion: "+ req.body.direccion)
    console.log("Usuario: "+ req.body.usuario)
    console.log("Contraseña: "+ req.body.contraseña)
    console.log("IdRol: "+ req.body.idrol)

   
    const nombres = req.body.nombres
    const apellidos = req.body.apellidos
    const identidad = req.body.identidad
    const correo = req.body.correo
    const direccion = req.body.direccion
    const usuario = req.body.usuario
    const contraseña = req.body.contraseña
    const idrol = req.body.idrol

    const queryString = "INSERT INTO usuario (nombres, apellidos, identidad, correo, direccion, usuario, contraseña, idrol) VALUES (?,?,?,?,?,?,?,(SELECT idrol FROM rol WHERE idrol = ?)) "
    connection.query(queryString, [nombres, apellidos, identidad, correo, direccion, usuario, contraseña, idrol], (err, results, fields) =>{
        if (err){
            console.log("Error el usuario: "+ err)
            res.sendStatus(500)
            return
        }

        console.log("Se agrego usuario con id: ", results.insertId);
        res.end() 
        
    } )
});

Router.put('/edit/:id', (req, res) =>{

    console.log("Tratando de editar un usuario..")
    console.log("Nombres: "+ req.body.nombres)
    console.log("Apellidos: "+ req.body.apellidos)
    console.log("Identidad: "+ req.body.identidad)
    console.log("Correo: "+ req.body.correo)
    console.log("Direccion: "+ req.body.direccion)
    console.log("Usuario: "+ req.body.usuario)
    console.log("Contraseña: "+ req.body.contraseña)
    console.log("IdRol: "+ req.body.idrol)
   
    const idusuario = req.params.id
    const nombres = req.body.nombres
    const apellidos = req.body.apellidos
    const identidad = req.body.identidad
    const correo = req.body.correo
    const direccion = req.body.direccion
    const usuario = req.body.usuario
    const contraseña = req.body.contraseña
    const idrol = req.body.idrol

    console.log(idusuario)
    const queryString = "UPDATE usuario SET nombres = ?, apellidos = ?, identidad = ?, correo = ?, direccion = ?, usuario = ?, contraseña =?, idrol = (SELECT idrol FROM rol WHERE rol = ?)  WHERE idusuario = ?"
    connection.query(queryString, [nombres, apellidos, identidad, correo, direccion, usuario, contraseña, idrol, idusuario], (err, results, fields) =>{
        if (err){
            console.log("Error al editar usuario: "+ err)
            res.sendStatus(400)
            return
        }

        console.log("Se edito usuario con id: ", results.affectedRows);
        res.end() 
        
    } )
});

Router.delete('/delete/:id', (req, res) => {
    console.log("Eliminar usuario con id: "+ req.params.id)

    const idusuario = req.params.id
    const queryString = "DELETE FROM usuario WHERE idusuario =?"
    connection.query(queryString, [idusuario],(err, rows, fields) => {
        if(err){
            console.log("No existe usuario " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("usuario Eliminado")
        res.json(rows)
    })
});

module.exports = Router;