CREATE DATABASE IF NOT EXISTS `Gym-Time`;
USE `Gym-Time`;

-- MySQL dump 10.13  Distrib 9.4.0, for macos15 (arm64)
--
-- Host: localhost    Database: Gym-Time
-- ------------------------------------------------------
-- Server version	9.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `AdminInfo`
--

DROP TABLE IF EXISTS `AdminInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AdminInfo` (
  `admin_ID` varchar(10) NOT NULL,
  `admin_fname` varchar(50) DEFAULT NULL,
  `admin_lname` varchar(50) DEFAULT NULL,
  `admin_email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`admin_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AdminInfo`
--

LOCK TABLES `AdminInfo` WRITE;
/*!40000 ALTER TABLE `AdminInfo` DISABLE KEYS */;
INSERT INTO `AdminInfo` VALUES ('ADM001','Somchai','Jaidee','somchai@gymtime.com'),('ADM002','Nattaporn','Srisuk','nattaporn@gymtime.com'),('ADM003','Piyawat','Kongsri','piyawat@gymtime.com'),('ADM004','Warisa','Thongdee','warisa@gymtime.com'),('ADM005','Chaiwat','Bumrung','chaiwat@gymtime.com'),('ADM006','Lalida','Siriporn','lalida@gymtime.com'),('ADM007','Teerawat','Phakdee','teerawat@gymtime.com'),('ADM008','Monrudee','Rattana','monrudee@gymtime.com'),('ADM009','Kittipong','Yodsai','kittipong@gymtime.com'),('ADM010','Supansa','Nakorn','supansa@gymtime.com');
/*!40000 ALTER TABLE `AdminInfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Image`
--

DROP TABLE IF EXISTS `Image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Image` (
  `image_ID` varchar(10) NOT NULL,
  `description` text,
  `url` varchar(255) DEFAULT NULL,
  `product_ID` varchar(10) NOT NULL,
  PRIMARY KEY (`image_ID`),
  KEY `product_ID` (`product_ID`),
  CONSTRAINT `image_ibfk_1` FOREIGN KEY (`product_ID`) REFERENCES `Product` (`product_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Image`
--

LOCK TABLES `Image` WRITE;
/*!40000 ALTER TABLE `Image` DISABLE KEYS */;
INSERT INTO `Image` VALUES ('IMG001','Raven Compression','/images/MenRavenCompression.png','PRD001'),('IMG002','Raven Hoodie','/images/MenRavenHoodie.png','PRD002'),('IMG003','Raven Pant Men','/images/MenRavenPant.png','PRD003'),('IMG004','Raven Bra','/images/WomenRavenBra.png','PRD004'),('IMG005','Raven Pant Women','/images/WomenRavenPant.png','PRD005'),('IMG006','Raven Sport Women','/images/WomenRavenSport.png','PRD006'),('IMG007','Shoes Copper','/images/ShoesCopper.png','PRD007'),('IMG008','Shoes Gold','/images/ShoesGold.png','PRD008'),('IMG009','Shoes Silver','/images/ShoesSilver.png','PRD009'),('IMG010','Raven Sport Set','/images/RavenWomenSport.png','PRD010'),('IMG011','Hercules Gym Bag','/images/HerculesBag.png','PRD011'),('IMG012','Hercules Tee Black','/images/HerculesBlack.png','PRD012'),('IMG013','Hercules Flask','/images/HerculesFlask.png','PRD013'),('IMG014','Hercules Tee White','/images/HerculesWhite.png','PRD014'),('IMG015','Raven Dress Sport','/images/WomenPreviewDress.png','PRD015'),('IMG016','Hercules Tee Black-White','/images/HerculesBlackWhite.png','PRD016'),('IMG017','Raven Gym Bag','/images/RavenBag.png','PRD017'),('IMG018','Raven Stealth Flask','/images/RavenFlask.png','PRD018'),('IMG019','Raven Training Gloves','/images/RavenGlove.png','PRD019');
/*!40000 ALTER TABLE `Image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logInInformation`
--

DROP TABLE IF EXISTS `logInInformation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logInInformation` (
  `login_email` varchar(50) NOT NULL,
  `login_password` varchar(50) NOT NULL,
  `role` varchar(50) DEFAULT NULL,
  `admin_ID` varchar(10) NOT NULL,
  PRIMARY KEY (`login_email`,`login_password`,`admin_ID`),
  KEY `admin_ID` (`admin_ID`),
  CONSTRAINT `logininformation_ibfk_1` FOREIGN KEY (`admin_ID`) REFERENCES `AdminInfo` (`admin_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logInInformation`
--

LOCK TABLES `logInInformation` WRITE;
/*!40000 ALTER TABLE `logInInformation` DISABLE KEYS */;
INSERT INTO `logInInformation` VALUES ('chaiwat@gymtime.com','hashed_pw_005','admin','ADM005'),('kittipong@gymtime.com','hashed_pw_009','admin','ADM009'),('lalida@gymtime.com','hashed_pw_006','admin','ADM006'),('monrudee@gymtime.com','hashed_pw_008','admin','ADM008'),('nattaporn@gymtime.com','hashed_pw_002','admin','ADM002'),('piyawat@gymtime.com','hashed_pw_003','admin','ADM003'),('somchai@gymtime.com','hashed_pw_001','superadmin','ADM001'),('supansa@gymtime.com','hashed_pw_010','admin','ADM010'),('teerawat@gymtime.com','hashed_pw_007','admin','ADM007'),('warisa@gymtime.com','hashed_pw_004','admin','ADM004');
/*!40000 ALTER TABLE `logInInformation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Modify`
--

DROP TABLE IF EXISTS `Modify`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Modify` (
  `product_ID` varchar(10) NOT NULL,
  `login_password` varchar(50) NOT NULL,
  `login_email` varchar(50) NOT NULL,
  `admin_ID` varchar(10) NOT NULL,
  `operation` varchar(10) DEFAULT NULL,
  `date_time` datetime DEFAULT NULL,
  PRIMARY KEY (`product_ID`,`login_password`,`login_email`,`admin_ID`),
  KEY `login_email` (`login_email`,`login_password`,`admin_ID`),
  CONSTRAINT `modify_ibfk_1` FOREIGN KEY (`product_ID`) REFERENCES `Product` (`product_ID`),
  CONSTRAINT `modify_ibfk_2` FOREIGN KEY (`login_email`, `login_password`, `admin_ID`) REFERENCES `logInInformation` (`login_email`, `login_password`, `admin_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Modify`
--

LOCK TABLES `Modify` WRITE;
/*!40000 ALTER TABLE `Modify` DISABLE KEYS */;
INSERT INTO `Modify` VALUES ('PRD001','hashed_pw_001','somchai@gymtime.com','ADM001','INSERT','2026-03-01 09:00:00'),('PRD002','hashed_pw_001','somchai@gymtime.com','ADM001','INSERT','2026-03-01 09:10:00'),('PRD003','hashed_pw_002','nattaporn@gymtime.com','ADM002','INSERT','2026-03-02 10:00:00'),('PRD004','hashed_pw_002','nattaporn@gymtime.com','ADM002','UPDATE','2026-03-05 11:00:00'),('PRD005','hashed_pw_003','piyawat@gymtime.com','ADM003','INSERT','2026-03-06 13:00:00'),('PRD006','hashed_pw_003','piyawat@gymtime.com','ADM003','UPDATE','2026-03-07 14:00:00'),('PRD007','hashed_pw_004','warisa@gymtime.com','ADM004','INSERT','2026-03-08 09:30:00'),('PRD008','hashed_pw_004','warisa@gymtime.com','ADM004','DELETE','2026-03-09 10:30:00'),('PRD009','hashed_pw_005','chaiwat@gymtime.com','ADM005','INSERT','2026-03-10 15:00:00'),('PRD010','hashed_pw_005','chaiwat@gymtime.com','ADM005','UPDATE','2026-03-11 16:00:00');
/*!40000 ALTER TABLE `Modify` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Product` (
  `product_ID` varchar(10) NOT NULL,
  `product_name` varchar(50) NOT NULL,
  `product_price` decimal(10,2) NOT NULL,
  `product_desc` varchar(100) NOT NULL,
  `admin_ID` varchar(10) NOT NULL,
  PRIMARY KEY (`product_ID`),
  KEY `admin_ID` (`admin_ID`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`admin_ID`) REFERENCES `AdminInfo` (`admin_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product`
--

LOCK TABLES `Product` WRITE;
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
INSERT INTO `Product` VALUES ('PRD001','Raven Compression',1290.00,'4-way stretch compression shirt with moisture-wicking fabric for peak training performance.','ADM001'),('PRD002','Raven Hoodie',1890.00,'Heavyweight fleece hoodie with reinforced stitching built for daily training wear.','ADM001'),('PRD003','Raven Pant Men',1490.00,'Tapered training pants with full range of motion for gym and outdoor workouts.','ADM001'),('PRD004','Raven Bra',990.00,'High-support sports bra with wide straps and seamless panels for all-day comfort.','ADM001'),('PRD005','Raven Pant Women',1390.00,'High-rise compressive pants with four-way stretch for yoga and heavy lifts.','ADM001'),('PRD006','Raven Sport Women',1190.00,'Open-back sport top with built-in support. Lightweight and breathable for any workout.','ADM001'),('PRD007','Shoes Copper',3290.00,'Performance training shoes with energy-return midsole and anti-slip rubber outsole.','ADM001'),('PRD008','Shoes Gold',3590.00,'Limited Gold edition shoes with responsive cushioning and breathable mesh upper.','ADM001'),('PRD009','Shoes Silver',3190.00,'Versatile Silver edition trainer with dual-density outsole for all disciplines.','ADM001'),('PRD010','Raven Sport Set',2190.00,'Matched Bra and Sport Top set with consistent compression and bold gym style.','ADM001'),('PRD011','Hercules Gym Bag',2490.00,'Spacious gym bag with shoe compartment, wet pocket, and padded shoulder straps.','ADM001'),('PRD012','Hercules Tee Black',890.00,'Premium cotton-blend black tee with relaxed fit and subtle Hercules branding.','ADM001'),('PRD013','Hercules Flask',690.00,'Vacuum-insulated flask. Cold for 24hrs, hot for 12hrs. Leak-proof and grip-ready.','ADM001'),('PRD014','Hercules Tee White',890.00,'Breathable white performance tee for gym, field, or everyday training sessions.','ADM001'),('PRD015','Raven Dress Sport',1790.00,'Sport dress with compression liner and flared skirt for full freedom of movement.','ADM001'),('PRD016','Hercules Tee Black-White',950.00,'Premium fusion of Black and White performance fabrics for elite gym style.','ADM001'),('PRD017','Raven Gym Bag',2190.00,'Durable water-resistant gym bag with specialized compartments for shoes and wet gear.','ADM001'),('PRD018','Raven Stealth Flask',790.00,'Matte finish vacuum-insulated flask. Keeps drinks cold for 24 hours with a leak-proof seal.','ADM001'),('PRD019','Raven Training Gloves',850.00,'High-grip training gloves with wrist support and breathable mesh for maximum control.','ADM001');
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Purchase`
--

DROP TABLE IF EXISTS `Purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Purchase` (
  `userID` varchar(25) NOT NULL,
  `product_ID` varchar(10) NOT NULL,
  PRIMARY KEY (`userID`,`product_ID`),
  KEY `product_ID` (`product_ID`),
  CONSTRAINT `purchase_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `User` (`userID`),
  CONSTRAINT `purchase_ibfk_2` FOREIGN KEY (`product_ID`) REFERENCES `Product` (`product_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Purchase`
--

LOCK TABLES `Purchase` WRITE;
/*!40000 ALTER TABLE `Purchase` DISABLE KEYS */;
INSERT INTO `Purchase` VALUES ('USR001','PRD001'),('USR002','PRD002'),('USR003','PRD003'),('USR004','PRD004'),('USR005','PRD005'),('USR006','PRD006'),('USR007','PRD007'),('USR008','PRD008'),('USR009','PRD009'),('USR010','PRD010');
/*!40000 ALTER TABLE `Purchase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SizeStock`
--

DROP TABLE IF EXISTS `SizeStock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SizeStock` (
  `sizeStock_ID` varchar(10) NOT NULL,
  `size` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`sizeStock_ID`),
  CONSTRAINT `sizestock_ibfk_1` FOREIGN KEY (`sizeStock_ID`) REFERENCES `Stock` (`stock_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SizeStock`
--

LOCK TABLES `SizeStock` WRITE;
/*!40000 ALTER TABLE `SizeStock` DISABLE KEYS */;
/*!40000 ALTER TABLE `SizeStock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Stock`
--

DROP TABLE IF EXISTS `Stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Stock` (
  `stock_ID` varchar(10) NOT NULL,
  `quantity` int NOT NULL,
  `size` varchar(10) DEFAULT NULL,
  `product_ID` varchar(10) NOT NULL,
  PRIMARY KEY (`stock_ID`),
  KEY `product_ID` (`product_ID`),
  CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`product_ID`) REFERENCES `Product` (`product_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Stock`
--

LOCK TABLES `Stock` WRITE;
/*!40000 ALTER TABLE `Stock` DISABLE KEYS */;
INSERT INTO `Stock` VALUES ('STK001',50,NULL,'PRD001'),('STK002',40,NULL,'PRD002'),('STK003',45,NULL,'PRD003'),('STK004',60,NULL,'PRD004'),('STK005',55,NULL,'PRD005'),('STK006',50,NULL,'PRD006'),('STK007',30,NULL,'PRD007'),('STK008',25,NULL,'PRD008'),('STK009',35,NULL,'PRD009'),('STK010',20,NULL,'PRD010'),('STK011',40,NULL,'PRD011'),('STK012',80,NULL,'PRD012'),('STK013',60,NULL,'PRD013'),('STK014',80,NULL,'PRD014'),('STK015',35,NULL,'PRD015'),('STK016',50,NULL,'PRD016'),('STK017',40,NULL,'PRD017'),('STK018',65,NULL,'PRD018'),('STK019',55,NULL,'PRD019');
/*!40000 ALTER TABLE `Stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `userID` varchar(25) NOT NULL,
  `f_name` varchar(50) DEFAULT NULL,
  `l_name` varchar(50) DEFAULT NULL,
  `user_email` varchar(50) DEFAULT NULL,
  `password` varchar(50) NOT NULL,
  `district` varchar(50) DEFAULT NULL,
  `postal_code` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `house_number` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `password` (`password`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('USR001','Araya','Sombat','araya@gmail.com','hashed_u001','Chatuchak','10900','Thailand','12/3'),('USR002','Bandit','Phrom','bandit@gmail.com','hashed_u002','Bang Rak','10500','Thailand','45'),('USR003','Chanya','Kul','chanya@gmail.com','hashed_u003','Sathon','10120','Thailand','7/1'),('USR004','Decha','Thong','decha@gmail.com','hashed_u004','Lat Phrao','10230','Thailand','88'),('USR005','Erin','Smith','erin@gmail.com','hashed_u005','Watthana','10110','Thailand','22/4'),('USR006','Fah','Narin','fah@gmail.com','hashed_u006','Huai Khwang','10310','Thailand','5'),('USR007','Gun','Siriphat','gun@gmail.com','hashed_u007','Din Daeng','10400','Thailand','33/2'),('USR008','Honey','Malee','honey@gmail.com','hashed_u008','Ratchathewi','10400','Thailand','19'),('USR009','Ice','Chantra','ice@gmail.com','hashed_u009','Bang Sue','10800','Thailand','6/6'),('USR010','James','Wilson','james@gmail.com','hashed_u010','Pathum Wan','10330','Thailand','101');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-27 23:40:23
