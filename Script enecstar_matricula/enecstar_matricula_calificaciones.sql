CREATE TABLE `calificaciones` (
  `idCalificaciones` int(11) NOT NULL AUTO_INCREMENT,
  `Acumulado` double NOT NULL,
  `Examen` double NOT NULL,
  `Total` double GENERATED ALWAYS AS ((`Acumulado` + `Examen`)) VIRTUAL,
  `id_asignatura` int(11) NOT NULL,
  `id_grado_detalle` int(11) NOT NULL,
  PRIMARY KEY (`idCalificaciones`),
  KEY `id_asigantura_idx` (`id_asignatura`),
  KEY `Id_grado_idx` (`id_grado_detalle`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;
