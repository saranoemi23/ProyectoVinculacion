CREATE TABLE `calificaciones` (
  `idCalificaciones` int(11) NOT NULL AUTO_INCREMENT,
  `Acumulado` double DEFAULT NULL,
  `Examen` double DEFAULT NULL,
  `Total` double GENERATED ALWAYS AS ((`Acumulado` + `Examen`)) VIRTUAL,
  `id_asignatura` int(11) DEFAULT NULL,
  `id_grado_detalle` int(11) DEFAULT NULL,
  PRIMARY KEY (`idCalificaciones`));

CREATE TABLE `alumno` (
  `idalumno` int(11) NOT NULL AUTO_INCREMENT,
  `nombres` varchar(45) DEFAULT NULL,
  `apellidos` varchar(45) DEFAULT NULL,
  `identidad` varchar(20) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `tel_acudiente` varchar(10) DEFAULT NULL,
  `nombrec` varchar(100) GENERATED ALWAYS AS (concat(`nombres`,_utf8mb4' ',`apellidos`)) VIRTUAL,
  PRIMARY KEY (`idalumno`)
);
