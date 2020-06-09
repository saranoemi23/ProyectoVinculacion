const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors');
const Path = require("path");

//Rutas
const JornadasRoutes = require("./routes/routes.jornadas");
const RolesRoutes = require("./routes/routes.roles");
const AlumnosRoutes = require("./routes/routes.alumnos");
const AsignaturasRoutes = require("./routes/routes.asignaturas");
const GradosRoutes = require("./routes/routes.grados");
const SeccionesRoutes = require("./routes/routes.secciones");
const PeriodosRoutes = require("./routes/routes.periodos");
const ParcialesRoutes = require("./routes/routes.parciales");
const Asignatura_DetallesRoutes = require("./routes/routes.asignatura_detalles");
const UsuariosRoutes = require("./routes/routes.usuarios");
const Grado_DetalleRoutes = require("./routes/routes.grado_detalles");
const MatriculaRoutes = require("./routes/routes.matriculas");
const CalificacionRotues = require("./routes/routes.calificacion");
const Inventario_mobiliarioRotues = require("./routes/routes.inventario_mobiliario");
const inventario_medicinas = require("./routes/routes.inventario_medicina");
const inventario_alimentos = require("./routes/routes.inventario_alimentos");

var app = express();

let frontend = Path.join(__dirname,"../Frontend/dist"); //ruta de los archivos que compile angular
console.log(frontend);
app.use(express.static(frontend));

app.use(bodyParser.json());
app.use(cors());

//Usar rutas
app.use("/api/jornadas", JornadasRoutes);
app.use("/api/roles", RolesRoutes);
app.use("/api/alumnos", AlumnosRoutes);
app.use("/api/asignaturas", AsignaturasRoutes);
app.use("/api/grados", GradosRoutes);
app.use("/api/secciones", SeccionesRoutes);
app.use("/api/periodos", PeriodosRoutes);
app.use("/api/parciales", ParcialesRoutes);
app.use("/api/asignatura_detalles", Asignatura_DetallesRoutes);
app.use("/api/usuarios", UsuariosRoutes);
app.use("/api/grado_detalles", Grado_DetalleRoutes);
app.use("/api/matriculas", MatriculaRoutes);
app.use("/api/calificacion", CalificacionRotues);
app.use("/api/inventario_mobiliario", Inventario_mobiliarioRotues);
app.use("/api/inventario_medicina", inventario_medicinas);
app.use("/api/inventario_alimentos", inventario_alimentos);

//si la ruta actual no esta configurada, se ejecuta por default ésta 
app.get("/*", function(req, res){
    res.sendFile(frontend+"/index.html")
});

app.listen(3001, () =>{
    console.log('Server on port 3001');
});
