/*
 Navicat MySQL Data Transfer

 Source Server         : mydb
 Source Server Type    : MySQL
 Source Server Version : 80019
 Source Host           : localhost:3306
 Source Schema         : my_db_01

 Target Server Type    : MySQL
 Target Server Version : 80019
 File Encoding         : 65001

 Date: 06/04/2022 15:44:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `user_id` int NOT NULL,
  `article_id` int NOT NULL,
  `comment` varchar(45) NOT NULL,
  `is_delete` int NOT NULL DEFAULT '0',
  `user_name` varchar(45) NOT NULL,
  `comment_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`comment_id`),
  UNIQUE KEY `comment_id_UNIQUE` (`comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=229 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for ev_articles
-- ----------------------------
DROP TABLE IF EXISTS `ev_articles`;
CREATE TABLE `ev_articles` (
  `article_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `cover_img` json NOT NULL,
  `pub_date` varchar(255) NOT NULL,
  `is_draft` int NOT NULL COMMENT '0- 不是草稿\n1- 是草稿',
  `is_delete` tinyint(1) NOT NULL DEFAULT '0',
  `author_id` varchar(255) NOT NULL,
  `imgArray` json NOT NULL,
  `comment` json DEFAULT NULL,
  `like` int DEFAULT NULL,
  `cfav` int DEFAULT NULL,
  `article_tag` json DEFAULT NULL,
  PRIMARY KEY (`article_id`),
  UNIQUE KEY `ID_UNIQUE` (`article_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '用户的状态，是一个布尔值\\n0表示用户状态正常\\n1表示用户被禁用',
  `email` varchar(45) NOT NULL,
  `avatar` text,
  `date` varchar(45) NOT NULL,
  `info` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户信息';

SET FOREIGN_KEY_CHECKS = 1;
