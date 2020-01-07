CREATE DATABASE  IF NOT EXISTS `enecstar_matricula` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `enecstar_matricula`;
-- MySQL dump 10.13  Distrib 8.0.17, for macos10.14 (x86_64)
--
-- Host: localhost    Database: enecstar_matricula
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `matricula`
--

DROP TABLE IF EXISTS `matricula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matricula` (
  `idmatricula` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_matricula` date NOT NULL,
  `nombre_alumno` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `lugar_nacimiento` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `edad` int(11) NOT NULL,
  `identidad` varchar(35) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `tipo_sangre` varchar(4) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `alergias` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `enfermedades` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `vacunas` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `otros` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `operaciones` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `fracturas` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `dif_conducta` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `grado` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `tipo_ingreso` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `repitente` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `escuela_ant` varchar(65) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `nombre_padre` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `padre_id` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `padre_edad` int(11) DEFAULT NULL,
  `padre_academ` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `padre_trabajo` varchar(65) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `padre_trabajo_tel` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `padre_tel` varchar(25) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `nombre_madre` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `madre_id` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `madre_edad` int(11) NOT NULL,
  `madre_academ` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `madre_trabajo` varchar(65) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `madre_trabajo_tel` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `madre_tel` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `responsable` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `direccion_resp` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `tel_resp` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `familiar` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `tel_familiar` varchar(25) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `amigo` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `tel_amigo` varchar(25) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `vecino` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `tel_vecino` varchar(25) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idmatricula`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matricula`
--

LOCK TABLES `matricula` WRITE;
/*!40000 ALTER TABLE `matricula` DISABLE KEYS */;
INSERT INTO `matricula` VALUES (1,'2019-12-19','Sara Noemi','2019-12-19','S',12,'S','O -','S','S','S',NULL,'S','S','SS','13','Primer Ingreso','Si','S','S','S',30,'Secundaria Completa','S','S','S','SS','S',30,'Secundaria Incompleta','S','S','','S','S','SSS','S','S','S','SS','S','S'),(2,'2019-12-27','Josue Noe','2019-12-13','',2,'2','O -','2','e','e',NULL,'e','e','e','14','Reingreso','Si','e','e','e',2,'Primaria Completa','e','e','e','','',0,'','','','','e','e','e','e','2','e','2','e','2');
/*!40000 ALTER TABLE `matricula` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-06 17:32:24
