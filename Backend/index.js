const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./conection");
var cors = require('cors');

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

var app = express();

app.use(bodyParser.json());
app.use(cors());

//Usar rutas
app.use("/jornadas", JornadasRoutes);
app.use("/roles", RolesRoutes);
app.use("/alumnos", AlumnosRoutes);
app.use("/asignaturas", AsignaturasRoutes);
app.use("/grados", GradosRoutes);
app.use("/secciones", SeccionesRoutes);
app.use("/periodos", PeriodosRoutes);
app.use("/parciales", ParcialesRoutes);
app.use("/asignatura_detalles", Asignatura_DetallesRoutes);
app.use("/usuarios", UsuariosRoutes);
app.use("/grado_detalles", Grado_DetalleRoutes);
app.use("/matriculas", MatriculaRoutes);

app.listen(3000, () =>{
    console.log('Server on port 3000');
});
