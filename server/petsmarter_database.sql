-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: localhost    Database: petsmarter_database
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `Cart`
--

DROP TABLE IF EXISTS `Cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `cart_subtotal` decimal(10,2) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `user_name` (`user_name`),
  CONSTRAINT `Cart_ibfk_1` FOREIGN KEY (`user_name`) REFERENCES `User` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cart`
--

LOCK TABLES `Cart` WRITE;
/*!40000 ALTER TABLE `Cart` DISABLE KEYS */;
INSERT INTO `Cart` VALUES (1,14.97,'user');
/*!40000 ALTER TABLE `Cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CartProduct`
--

DROP TABLE IF EXISTS `CartProduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CartProduct` (
  `cart_id` int NOT NULL,
  `product_id` int NOT NULL,
  KEY `cart_id` (`cart_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `CartProduct_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `Cart` (`cart_id`),
  CONSTRAINT `CartProduct_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `Product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CartProduct`
--

LOCK TABLES `CartProduct` WRITE;
/*!40000 ALTER TABLE `CartProduct` DISABLE KEYS */;
INSERT INTO `CartProduct` VALUES (1,1),(1,3),(1,1);
/*!40000 ALTER TABLE `CartProduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderProduct`
--

DROP TABLE IF EXISTS `OrderProduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrderProduct` (
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `OrderProduct_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `PlacedOrder` (`order_id`),
  CONSTRAINT `OrderProduct_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `Product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderProduct`
--

LOCK TABLES `OrderProduct` WRITE;
/*!40000 ALTER TABLE `OrderProduct` DISABLE KEYS */;
INSERT INTO `OrderProduct` VALUES (1,1),(1,3),(2,2);
/*!40000 ALTER TABLE `OrderProduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PaymentInfo`
--

DROP TABLE IF EXISTS `PaymentInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PaymentInfo` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `card_number` varchar(20) NOT NULL,
  `exp_date` date NOT NULL,
  `cvv` char(3) NOT NULL,
  PRIMARY KEY (`payment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PaymentInfo`
--

LOCK TABLES `PaymentInfo` WRITE;
/*!40000 ALTER TABLE `PaymentInfo` DISABLE KEYS */;
INSERT INTO `PaymentInfo` VALUES (1,'1234567890123456','2027-01-01','123');
/*!40000 ALTER TABLE `PaymentInfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PlacedOrder`
--

DROP TABLE IF EXISTS `PlacedOrder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PlacedOrder` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `order_subtotal` decimal(10,2) NOT NULL,
  `order_tax` decimal(10,2) GENERATED ALWAYS AS ((`order_subtotal` * 0.0825)) VIRTUAL,
  `order_total` decimal(10,2) GENERATED ALWAYS AS ((`order_subtotal` + `order_tax`)) VIRTUAL,
  `order_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_name` varchar(20) NOT NULL,
  `shipping_id` int NOT NULL,
  `payment_id` int NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_name` (`user_name`),
  KEY `shipping_id` (`shipping_id`),
  KEY `payment_id` (`payment_id`),
  CONSTRAINT `PlacedOrder_ibfk_1` FOREIGN KEY (`user_name`) REFERENCES `User` (`user_name`),
  CONSTRAINT `PlacedOrder_ibfk_2` FOREIGN KEY (`shipping_id`) REFERENCES `ShippingInfo` (`shipping_id`),
  CONSTRAINT `PlacedOrder_ibfk_3` FOREIGN KEY (`payment_id`) REFERENCES `PaymentInfo` (`payment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PlacedOrder`
--

LOCK TABLES `PlacedOrder` WRITE;
/*!40000 ALTER TABLE `PlacedOrder` DISABLE KEYS */;
INSERT INTO `PlacedOrder` (`order_id`, `order_subtotal`, `order_time`, `user_name`, `shipping_id`, `payment_id`) VALUES (1,8.98,'2024-02-29 02:05:06','user',1,1),(2,5.99,'2024-02-29 02:05:06','user2',1,1);
/*!40000 ALTER TABLE `PlacedOrder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int NOT NULL,
  `img_filename` varchar(40) DEFAULT 'default_product_img.png',
  `rating` decimal(3,2) DEFAULT '0.00',
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product`
--

LOCK TABLES `Product` WRITE;
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
INSERT INTO `Product` VALUES (1,'Sample Product 1','This is the description of Sample Product 1.',4.99,10,'sample_img1.png',0.00),(2,'Sample Product 2','This is the description of Sample Product 2.',5.99,5,'sample_img2.png',0.00),(3,'Sample Product 3','This is the description of Sample Product 3.',3.99,5,'default_product_img.png',4.75);
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ShippingInfo`
--

DROP TABLE IF EXISTS `ShippingInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ShippingInfo` (
  `shipping_id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(40) NOT NULL,
  `city` varchar(40) NOT NULL,
  `zip_code` varchar(10) NOT NULL,
  PRIMARY KEY (`shipping_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ShippingInfo`
--

LOCK TABLES `ShippingInfo` WRITE;
/*!40000 ALTER TABLE `ShippingInfo` DISABLE KEYS */;
INSERT INTO `ShippingInfo` VALUES (1,'One Trinity Place','San Antonio','78212');
/*!40000 ALTER TABLE `ShippingInfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `user_name` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `shipping_id` int DEFAULT NULL,
  `payment_id` int DEFAULT NULL,
  PRIMARY KEY (`user_name`),
  KEY `shipping_id` (`shipping_id`),
  KEY `payment_id` (`payment_id`),
  CONSTRAINT `User_ibfk_1` FOREIGN KEY (`shipping_id`) REFERENCES `ShippingInfo` (`shipping_id`),
  CONSTRAINT `User_ibfk_2` FOREIGN KEY (`payment_id`) REFERENCES `PaymentInfo` (`payment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('admin','password',1,NULL,NULL),('user','password',0,NULL,NULL),('user2','password',0,NULL,NULL);
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

-- Dump completed on 2024-02-28 20:22:27
