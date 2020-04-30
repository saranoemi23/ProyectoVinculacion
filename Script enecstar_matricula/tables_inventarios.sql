CREATE TABLE `estado_inv_mobiliario` (
  `idestado` int(11) NOT NULL AUTO_INCREMENT,
  `estado` varchar(5) NOT NULL,
  PRIMARY KEY (`idestado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='	';

CREATE TABLE `inventario_mobiliario` (
  `idIventario` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad_inicial` int(11) DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `serie` varchar(45) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL,
  `fecha_salida` date DEFAULT NULL,
  `cantidad_salida` int(11) DEFAULT NULL,
  `recibido` varchar(45) DEFAULT NULL,
  `total_existencia` int(11) GENERATED ALWAYS AS ((`cantidad_inicial` - `cantidad_salida`)) VIRTUAL,
  `destino` varchar(45) DEFAULT NULL,
  `Observaciones` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idIventario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `inventario_alimentos` (
  `idinventario` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_entrada` date DEFAULT NULL,
  `cantidad_entrada` int(11) DEFAULT NULL,
  `num_factura` varchar(10) DEFAULT NULL,
  `origen_compra` varchar(35) DEFAULT NULL,
  `producto` varchar(35) DEFAULT NULL,
  `idtipo_medicion` int(11) DEFAULT NULL,
  `area_destino` varchar(45) DEFAULT NULL,
  `fecha_salida` date DEFAULT NULL,
  `cantidad_salida` int(11) DEFAULT NULL,
  `total_existencia` int(11) GENERATED ALWAYS AS ((`cantidad_entrada` - `cantidad_salida`)) VIRTUAL,
  PRIMARY KEY (`idinventario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `inventario_medicinas` (
  `idinventario` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) DEFAULT NULL,
  `centro` varchar (45)  DEFAULT NULL,
  `fecha_vencimiento` date DEFAULT NULL,
  `idtipo_unidad` int(11) DEFAULT NULL,
  `fecha_entrada` date DEFAULT NULL,
  `cantidad_entrada` int(11) DEFAULT NULL,
  `fecha_salida` date DEFAULT NULL,
  `cantidad_salida` int(11) DEFAULT NULL,
  `total_existencia` int(11) GENERATED ALWAYS AS ((`cantidad_entrada` - `cantidad_salida`)) VIRTUAL,
  `uso` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`idinventario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tipo_inv_alimentos` (
  `idtipo` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_medicion` varchar(25) NOT NULL,
  PRIMARY KEY (`idtipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tipo_inv_medicinas` (
  `idtipo` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_unidad` varchar(15) NOT NULL,
  PRIMARY KEY (`idtipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;




