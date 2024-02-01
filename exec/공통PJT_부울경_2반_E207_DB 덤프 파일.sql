DROP DATABASE IF EXISTS `ssafy_web_db`l;
create database IF NOT EXISTS `ssafy_web_db` collate utf8mb4_general_ci;

-- MySQL dump 10.13  Distrib 5.7.39, for Linux (x86_64)
--
-- Host: localhost    Database: ssafy_web_db
-- ------------------------------------------------------
-- Server version	5.7.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `certificate`
--

DROP TABLE IF EXISTS `certificate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `certificate` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `img_path` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `counselor_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKcusrmwmit1kws5p9qulcupwrf` (`counselor_id`),
  CONSTRAINT `FKcusrmwmit1kws5p9qulcupwrf` FOREIGN KEY (`counselor_id`) REFERENCES `counselor` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificate`
--

LOCK TABLES `certificate` WRITE;
/*!40000 ALTER TABLE `certificate` DISABLE KEYS */;
INSERT INTO `certificate` VALUES (12,'http://res.cloudinary.com/daomkhvu8/image/upload/v1660505025/ovwni0lid3zolumifo8p.jpg','미술심리치료사 1급',7),(13,'http://res.cloudinary.com/daomkhvu8/image/upload/v1660549024/beqnl2zpsdvmtwb0ezla.jpg','심리상담사 1급',16),(16,'http://res.cloudinary.com/daomkhvu8/image/upload/v1660556917/cbakimijqfpid82ilgqr.png','미술심리상담사 2급',10),(19,'http://res.cloudinary.com/daomkhvu8/image/upload/v1660557391/v5k9vjsbfulm7opuizup.png','아동미술심리상담사 1급',10),(20,'http://res.cloudinary.com/daomkhvu8/image/upload/v1660557451/p7x35ullyjwb2giojnw5.png','test',10),(21,'http://res.cloudinary.com/daomkhvu8/image/upload/v1660557589/godukpbkuthjdvphgmkw.png','test2',10),(22,'http://res.cloudinary.com/daomkhvu8/image/upload/v1660557737/wf9agjehdhtacht7jw3v.png','test3',10),(23,'http://res.cloudinary.com/daomkhvu8/image/upload/v1660557954/nm6g5qyzdbhgymx839qg.png','test4',10),(24,'http://res.cloudinary.com/daomkhvu8/image/upload/v1660558201/cvuoanhhccvcm4eunfea.png','test5',10),(25,'http://res.cloudinary.com/daomkhvu8/image/upload/v1660574656/tlnribifqy9g6rpk6mvc.jpg','역학심리상담사',15),(26,'http://res.cloudinary.com/daomkhvu8/image/upload/v1660574779/ivyokwmmiybjqdkjd0it.jpg','심리학과 학위증',15),(30,'http://res.cloudinary.com/daomkhvu8/image/upload/v1660714015/zx1yzmrdihifzym8hbt7.png','미술심리상담사 1급',13);
/*!40000 ALTER TABLE `certificate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `counselor`
--

DROP TABLE IF EXISTS `counselor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `counselor` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `career` int(11) NOT NULL,
  `consult_number` int(11) NOT NULL,
  `consult_target` varchar(255) DEFAULT NULL,
  `contact_end_time` time DEFAULT NULL,
  `contact_start_time` time DEFAULT NULL,
  `counselor_id` varchar(255) DEFAULT NULL,
  `holiday` varchar(255) DEFAULT NULL,
  `long_introduction` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `profile` varchar(255) DEFAULT NULL,
  `reserve_end_time` time DEFAULT NULL,
  `reserve_start_time` time DEFAULT NULL,
  `short_introduction` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `counselor`
--

LOCK TABLES `counselor` WRITE;
/*!40000 ALTER TABLE `counselor` DISABLE KEYS */;
INSERT INTO `counselor` VALUES (8,20,10,'청소년/성인(여)','19:00:00','10:00:00','minji','0/6','우울, 불안, 스트레스,분노,인간관계 갈등 등, 모든고통들은 삶의 조건이라고 합니다. 상담을 통해 긍정적 기대감과 희망을 드리겠습니다.','정민지','$2a$10$yt7xyzqyJTIgYzMvacg8OOOqunbzmfgdzo0oMctgvHFHRX6UvLGVq','010-5678-1234',70000,'https://res.cloudinary.com/daomkhvu8/image/upload/v1660629167/59D8F27B-045C-4FA9-B831-EDF629FC9C04_jxwp1a.png','19:00:00','09:00:00','한국대학교 심리학 박사 정민지 상담사'),(12,0,0,'청소년','22:30:00','10:30:00','parksangjin','0/6','저는 청소년 상담을 전문으로 하고 있습니다. 청소년 본인이나 학부모님들 상담 신청주세요. 상담으로 조금 더 편한 마음 상태 만들어봐요!','박상진','$2a$10$Bhv4gdj61Y1x9IyXD8k4buARjjFpLznFEXXcLIClCjbvWtHigfRJq','010-1234-5678',50000,'https://res.cloudinary.com/daomkhvu8/image/upload/v1660629167/59D8F27B-045C-4FA9-B831-EDF629FC9C04_jxwp1a.png','18:00:00','09:00:00','청소년 전문 상담사 박상진입니다.'),(13,0,0,'성인(여)/성인(남)','19:00:00','10:00:00','inyeja','0/6','편하게 예약하기를 통해 상담 신청주세요. 그러면 개인적으로 연락 드리고 상담 과정 설명드리겠습니다. 저와의 상담을 통해 심리적 안정 찾아봐요!','인예자','$2a$10$GLNRxtP.7lbTE.s.NLrVXey13RuYcfqZMQ3OPqvc.e1lLtiZddpxm','01023924100',50000,'https://res.cloudinary.com/daomkhvu8/image/upload/v1660628673/7A86990A-2651-43ED-A617-36B8F1056278_wp67j7.jpg','19:00:00','11:00:00','안녕하세요, 5년 경력의 상담사 인예자입니다!'),(16,0,0,NULL,'18:00:00','09:00:00','MMMM','0/6',NULL,'쥬만지','$2a$10$WKCBcHRcQLQlhOZ3hcC8VORUcQel/Lz27HHgyTX6qKRFD7GgPwbhS','010-5052-9347',40000,'https://res.cloudinary.com/daomkhvu8/image/upload/v1660629167/59D8F27B-045C-4FA9-B831-EDF629FC9C04_jxwp1a.png','18:00:00','09:00:00','상담 진짜 잘합니다.'),(17,0,0,NULL,'18:00:00','09:00:00','tang','0/6',NULL,'정마라','$2a$10$V6vIoopJjqYNvQEu19XWLeM7ZIQmbAE0ziOPICb2J7eAH7UeVFTqy','01050529347',60000,'https://res.cloudinary.com/daomkhvu8/image/upload/v1660628695/A74E365E-1590-4A3A-A500-08D13664F1AA_mjzdal.jpg','18:00:00','09:00:00','경력 30년차입니다.'),(18,0,0,'청소년/성인(여)/성인(남)','20:00:00','09:00:00','foofoo','0/6','..','푸푸푸푸','$2a$10$rnC4GIatjcwuNz99WknE.ezRygDUNu6v4.j4BrNuPwXdQ9cemHyqG','01012345678',50000,'https://res.cloudinary.com/daomkhvu8/image/upload/v1660628654/038713DE-7B21-40E1-B766-71CD1FF51189_igpexl.jpg','17:00:00','10:00:00','안녕하세요. 저는 경력 5년의 미술 심리 상담사입니다.'),(19,0,0,NULL,'18:00:00','09:00:00','leesumin',NULL,NULL,'이수민','$2a$10$q4PUl/tNEPlSb3C9oqdmQOUxUQGbT1X2Q1P6uzZ7Bu.VgWuwi3/SS','01014563334',45000,'https://res.cloudinary.com/daomkhvu8/image/upload/v1660629167/59D8F27B-045C-4FA9-B831-EDF629FC9C04_jxwp1a.png','18:00:00','09:00:00','안녕하세요. 여러 분의 상담사 이수민입니다.'),(20,0,0,NULL,'18:00:00','10:00:00','kimjigoo','0/1',NULL,'김지구','$2a$10$DXNZOr/JzxcFZyMmqWTag.p4bBRE7r0ilnUT.Jz3dh886.K9w4VcG','01078914561',35000,'https://res.cloudinary.com/daomkhvu8/image/upload/v1660629167/59D8F27B-045C-4FA9-B831-EDF629FC9C04_jxwp1a.png','18:00:00','09:00:00','반갑습니다. 예약하기를 통해 상담 신청주세요. 편안한 시간 함께 해요.'),(21,0,0,NULL,'19:00:00','10:00:00','jojiyeon',NULL,NULL,'조지연','$2a$10$.caeCWSJG9619QcK.S.uBOCxScc4lQ7z4UZdgK492Fj.VFI7UNCjW','01081254231',50000,'basic.png','18:00:00','09:00:00','힘들었던 시간 저와 함께 풀어나가봐요.'),(22,0,0,NULL,'23:00:00','01:00:00','test','',NULL,'테스트','$2a$10$/IadePdmPJHPQfnULYOh1eK/mZuE0ewJQW6UYhOUOveBAdeBNtR6K','010-1234-5678',0,'https://res.cloudinary.com/daomkhvu8/image/upload/v1660629167/59D8F27B-045C-4FA9-B831-EDF629FC9C04_jxwp1a.png','23:00:00','01:00:00','테스트 용 계정입니다.'),(24,0,0,NULL,'21:00:00','09:00:00','amu',NULL,NULL,'아무이름','$2a$10$Zdao6xT6PF7jneaclKRKwOWT1Zz03xshNXPtveYdFS3VE.CaELRXO','01012345678',0,'basic.png','21:00:00','09:00:00','안녕하세요. 저는 경력 5년의 미술 심리 상담사입니다.'),(25,0,0,NULL,'18:30:00','09:30:00','goosc',NULL,NULL,'구상담','$2a$10$ruxUHoQkv1GYVFNe2J7fPeiGTr9k91wIwlIQwgPi2FKZccidpSmQ2','01023924100',0,'https://res.cloudinary.com/daomkhvu8/image/upload/v1660629167/59D8F27B-045C-4FA9-B831-EDF629FC9C04_jxwp1a.png','18:30:00','09:30:00','안녕하세요~ 구상담입니다~');
/*!40000 ALTER TABLE `counselor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `review` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `reg_time` datetime(6) NOT NULL,
  `score` int(11) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `counselor_id` bigint(20) DEFAULT NULL,
  `schedule_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKmcyepmtqxx9edli4hpfu52fok` (`user_id`,`counselor_id`,`schedule_id`),
  CONSTRAINT `FKmcyepmtqxx9edli4hpfu52fok` FOREIGN KEY (`user_id`, `counselor_id`, `schedule_id`) REFERENCES `schedule` (`user_id`, `counselor_id`, `id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (2,'상담사님과 얘기 후 마음이 한결 편해졌어요.','2022-08-16 11:52:14.591000',5,31,16,5),(4,'처음 받아보는 그림 상담이었는데 저도 몰랐던 힘들었던 점을 알 수 있었어요','2022-08-16 11:53:42.874000',5,27,13,45),(6,'많은 도움이 되었습니다!','2022-08-16 15:30:26.579000',5,21,20,47),(7,'상담 좋았습니다','2022-08-16 18:09:49.076000',4,31,16,10),(8,'상담사님이 친절해요','2022-08-16 22:03:02.699000',5,38,18,84);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schedule` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `end_time` datetime(6) NOT NULL,
  `form_path` varchar(255) DEFAULT NULL,
  `is_complete` bit(1) NOT NULL,
  `is_confirmed` bit(1) NOT NULL,
  `is_holiday` bit(1) NOT NULL,
  `is_registered_result` bit(1) NOT NULL,
  `result_content` varchar(10000) DEFAULT NULL,
  `result_img` varchar(255) DEFAULT NULL,
  `start_time` datetime(6) NOT NULL,
  `counselor_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_ptel7om6sr6siddtu1klmlrsb` (`user_id`,`counselor_id`,`id`),
  KEY `FK8wbi4l53mdgdfnr831152o1yl` (`counselor_id`),
  CONSTRAINT `FK8wbi4l53mdgdfnr831152o1yl` FOREIGN KEY (`counselor_id`) REFERENCES `counselor` (`id`) ON DELETE SET NULL,
  CONSTRAINT `FKa50n59y1j4a6qwa42p8jiguds` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (5,'2022-08-16 02:30:00.000000',NULL,_binary '',_binary '',_binary '\0',_binary '\0',NULL,NULL,'2022-08-16 01:30:00.000000',16,31),(10,'2022-08-16 03:30:00.000000',NULL,_binary '',_binary '',_binary '\0',_binary '\0',NULL,NULL,'2022-08-16 02:30:00.000000',16,31),(28,'2022-08-16 13:00:00.000000',NULL,_binary '',_binary '',_binary '\0',_binary '\0',NULL,NULL,'2022-08-16 12:00:00.000000',18,22),(35,'2022-08-06 23:59:00.000000',NULL,_binary '',_binary '',_binary '',_binary '\0',NULL,NULL,'2022-08-06 00:00:00.000000',18,NULL),(43,'2022-09-08 23:59:00.000000',NULL,_binary '\0',_binary '\0',_binary '',_binary '\0',NULL,NULL,'2022-09-08 00:00:00.000000',18,NULL),(44,'2022-09-11 23:59:00.000000',NULL,_binary '\0',_binary '\0',_binary '',_binary '\0',NULL,NULL,'2022-09-11 00:00:00.000000',18,NULL),(45,'2022-07-29 14:30:00.000000',NULL,_binary '',_binary '',_binary '\0',_binary '\0',NULL,NULL,'2022-07-29 13:30:00.000000',13,27),(46,'2022-08-09 14:30:00.000000',NULL,_binary '',_binary '',_binary '\0',_binary '','정만지님과 상담을 진행했습니다. 먼저 그림으로 심리 상태를 알아보았습니다. 나무는 정신적 성숙도와 자화상을 나타냅니다. 나무 근처에 그린 그림을 통해서도 심리를 파악해볼 수 있어요. 정만지님은 사과나무와 나비를 그리셨습니다. 그림으로는 만지님의 심리를 추측해볼 수는 있지만 추측한 것이 무조건 정확하다고는 할 수 없습니다. 만지님과의 추가적인 대화로 상담 진행하였는데요. 요즘 스트레스가 많아 보이셨어요. 저와의 상담으로 조금이라도 해결되셨길 바랍니다. 다음 상담도 신청해주시면 더 많은 이야기 나눠봐요. ','http://res.cloudinary.com/daomkhvu8/image/upload/v1660792062/tre9i7zbuwawjpzz0elh.png','2022-08-09 13:30:00.000000',13,27),(47,'2022-06-09 14:30:00.000000','https://docs.google.com/forms/d/1K11pmVaNlQfo-gTTYfhhMKmQsyxnWyfoXITLdfeViVg/edit',_binary '',_binary '',_binary '\0',_binary '','박싸피님은 처음 받아보는 미술 상담이시라서 간단하게 나무와 나비를 그려보시게 하여 심리 상담을 진행하였습니다. 그림과 대화를 통해 박싸피님의 현재 고민, 힘든 점에 대해 알아보고 이에 대한 이야기를 나누었습니다. 현재 취업 스트레스로 많은 고민이 있으셨는데요. 저와의 상담으로 심리적 안정을 찾으셨기를 바랍니다.   아무래도 처음 상담이었다보니 한번 더 상담 예약 잡아주시면 더 큰 도움 드릴 수 있을 것 같아요.','http://res.cloudinary.com/daomkhvu8/image/upload/v1660623943/jfv5sg1elbfemmq8mibf.png','2022-06-09 13:30:00.000000',20,21),(48,'2022-07-20 14:30:00.000000',NULL,_binary '',_binary '',_binary '\0',_binary '\0',NULL,NULL,'2022-07-20 13:30:00.000000',20,21),(49,'2022-08-31 11:00:00.000000',NULL,_binary '\0',_binary '',_binary '\0',_binary '\0',NULL,NULL,'2022-08-31 10:00:00.000000',18,31),(52,'2022-08-31 12:00:00.000000','https://docs.google.com/forms/d/1K11pmVaNlQfo-gTTYfhhMKmQsyxnWyfoXITLdfeViVg/edit',_binary '\0',_binary '',_binary '\0',_binary '\0',NULL,NULL,'2022-08-31 11:00:00.000000',20,21),(55,'2022-08-16 18:00:00.000000',NULL,_binary '',_binary '',_binary '\0',_binary '\0',NULL,NULL,'2022-08-16 17:00:00.000000',18,31),(56,'2022-08-16 19:30:00.000000',NULL,_binary '',_binary '',_binary '\0',_binary '\0',NULL,NULL,'2022-08-16 18:30:00.000000',18,31),(81,'2022-08-17 11:00:00.000000','https://forms.gle/EMBPANA1ofARGufU6',_binary '',_binary '',_binary '\0',_binary '','ㄴㄴㄴ','','2022-08-17 10:00:00.000000',18,38),(82,'2022-08-17 12:00:00.000000','https://forms.gle/EMBPANA1ofARGufU6',_binary '',_binary '',_binary '\0',_binary '','123','http://res.cloudinary.com/daomkhvu8/image/upload/v1660653465/yxntn0zvcbbd2oou1xj1.png','2022-08-17 11:00:00.000000',18,38),(84,'2022-08-16 23:00:00.000000','https://forms.gle/EMBPANA1ofARGufU6',_binary '',_binary '',_binary '\0',_binary '','산봉우리가 2개인것은 ...','http://res.cloudinary.com/daomkhvu8/image/upload/v1660654934/qputw0m97fd9vxhslmyz.png','2022-08-16 22:00:00.000000',18,38),(89,'2022-08-17 12:00:00.000000','https://forms.gle/ar92dXgFfhARH5GWA',_binary '',_binary '',_binary '\0',_binary '','빗방울의 개수는 준구님이 스스로 생각하는 외로운 정도입니다.','http://res.cloudinary.com/daomkhvu8/image/upload/v1660719935/ofiusggtim0a8mgazm4n.png','2022-08-17 11:00:00.000000',12,46),(92,'2022-08-29 11:00:00.000000','https://docs.google.com/forms/d/1K11pmVaNlQfo-gTTYfhhMKmQsyxnWyfoXITLdfeViVg/edit',_binary '\0',_binary '',_binary '\0',_binary '\0',NULL,NULL,'2022-08-29 10:00:00.000000',13,42),(93,'2022-08-31 23:59:00.000000',NULL,_binary '\0',_binary '\0',_binary '',_binary '\0',NULL,NULL,'2022-08-31 00:00:00.000000',13,NULL),(95,'2022-08-17 18:30:00.000000','https://forms.gle/ar92dXgFfhARH5GWA',_binary '',_binary '',_binary '\0',_binary '','준구님은 오늘 빗속의 사람 그리기 검사를 하셨는데요. 빗속의 사람 그리기 검사는 빗속에 서 있는 사람을 그리게 하여 자아 강도와 스트레스 대처능력의 수준을 확인하는 투사적 그림검사예요. 준구님의 그림에는 비가 어느정도 내렸을까요? 비의 양이 많으면 스트레스가 많다는 것을 의미합니다. 오늘 여러 이야기를 나누며 준구님의 스트레스가 해결되셨길 바랍니다.','http://res.cloudinary.com/daomkhvu8/image/upload/v1660736529/fdzdcxqe2i4cta6a6tkg.png','2022-08-17 17:30:00.000000',12,61),(97,'2022-08-15 23:59:00.000000',NULL,_binary '\0',_binary '\0',_binary '',_binary '\0',NULL,NULL,'2022-08-15 00:00:00.000000',18,NULL),(98,'2022-08-18 11:00:00.000000',NULL,_binary '',_binary '',_binary '\0',_binary '','ㅇㅇㅇㅇ','http://res.cloudinary.com/daomkhvu8/image/upload/v1660785290/eb6vkcogiympquxppjdu.png','2022-08-18 10:00:00.000000',18,61),(100,'2022-08-18 16:00:00.000000','https://docs.google.com/forms/d/1K11pmVaNlQfo-gTTYfhhMKmQsyxnWyfoXITLdfeViVg/viewform?edit_requested=true',_binary '\0',_binary '',_binary '\0',_binary '\0',NULL,NULL,'2022-08-18 15:00:00.000000',13,61);
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `profile` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `is_naver_user` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (21,'박싸피','$2a$10$N2bPQ0Kqolou0m.ZYy8z3.nAbaxQo3zGPz2R3/thD4q4R1lVwOpyq','01012345678','http://res.cloudinary.com/daomkhvu8/image/upload/v1660713013/vwvgwexq4qfgw9bdudnn.png','parkssafy',0),(22,'정민혁','$2a$10$30kvxKvV0y8xZNOiw94qfeJ0m7g0OAVGstB0aT.Gzr.pUNgkk4X3m','01012345678','basic.png','minhyuk',0),(27,'정만지','$2a$10$sKlBvhMT6qBGK1qe.4INgO2vV7WfmIwIGSqNHAfOXZdmJ9EEOuEWK','010-5052-9347','basic.png','malaa',0),(28,'만두','$2a$10$IFmeC.f5EiBc36MPHbd.MujB72yMXcG68wkIWb2stWaGOCCwkmgGK','01050529347','http://res.cloudinary.com/daomkhvu8/image/upload/v1660551555/rdeixeg3bdmrtqumad1y.jpg','dumpling',0),(31,'예림','$2a$10$N3j2LbbTdc0hpuPoHpgHZOq5xuPay4dTCz6eExsaAmgZGCb/qOwAy','01023924100','https://res.cloudinary.com/daomkhvu8/image/upload/v1660512760/KakaoTalk_20220731_203458342_y2sith.jpg','yerim',0),(38,'테스트','$2a$10$d10a2qwh6R7qRyqaJyw.ZOrBxPrNrzbJCQxpzq3Lvaboky79hbYLy','01012345678','basic.png','test',0),(39,'네아로',NULL,'010-2438-7786','basic.png','tChWJx0Yc9z3uoskyW20U18AvjdAPkyttEbO_IBIw1Q',1),(42,'인예림','$2a$10$pIWefAuW7sv7Loa0AryDaOPBV1UUrqFUzhXk188okQruKk2iVWsLW','01023924100','http://res.cloudinary.com/daomkhvu8/image/upload/v1660633863/d48glu09vwgqatqvlm8g.png','inyerim',0),(46,'김준구','$2a$10$/qqYHx75ot/.BRxzer9hCu8qA.sG.7VgVenjZxs24fsX887uzQzl2','01012345678','basic.png','junkoo',0),(61,'김준구',NULL,'01075143900','https://res.cloudinary.com/daomkhvu8/image/upload/v1660629167/59D8F27B-045C-4FA9-B831-EDF629FC9C04_jxwp1a.png','WH7StkkDZVojft275TkmF3jQvvv9BMlWlugU2GlIt2k',1),(62,'예림',NULL,'01023924111','https://res.cloudinary.com/daomkhvu8/image/upload/v1660629167/59D8F27B-045C-4FA9-B831-EDF629FC9C04_jxwp1a.png','6XVMd9oTudTfO6aVLBqQkK8Vfv8jzewcc38qtL0GjX4',1),(63,'이상진',NULL,'010-3920-0912','https://res.cloudinary.com/daomkhvu8/image/upload/v1660629167/59D8F27B-045C-4FA9-B831-EDF629FC9C04_jxwp1a.png','X84dpd0mOZUxP9iApGgR4TbEk5uUrVl5pmunPmZWTUs',1),(64,'정민지',NULL,'01050529347','https://res.cloudinary.com/daomkhvu8/image/upload/v1660629167/59D8F27B-045C-4FA9-B831-EDF629FC9C04_jxwp1a.png','JF0tuZ3KU_8gel_g-a_ehF43n4rtcxasU5g8gRt2tzA',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-18 14:14:22
