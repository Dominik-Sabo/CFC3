-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 05, 2020 at 10:19 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fighters`
--

-- --------------------------------------------------------

--
-- Table structure for table `fighters`
--

CREATE TABLE `fighters` (
  `id` int(15) NOT NULL,
  `name` varchar(100) NOT NULL,
  `age` varchar(20) NOT NULL,
  `info` varchar(250) NOT NULL,
  `wins` int(15) NOT NULL,
  `losses` int(15) NOT NULL,
  `picture` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `fighters`
--

INSERT INTO `fighters` (`id`, `name`, `age`, `info`, `wins`, `losses`, `picture`) VALUES
(1, 'Cat McTerror', '3', 'Very loud', 22, 5, 'images/cat1.png'),
(2, 'Caterson CatSpyder Silva', '5', 'Slim, broke leg in past years', 35, 12, 'images/cat02.png'),
(3, 'Catbib Furwmagomedov', '2.5', 'Current champion, wrestle and catmbo', 32, 1, 'images/cat04.png'),
(4, 'Kit Kitty Kones', '3', 'Bad kitty, loves to use dog food better strength', 27, 3, 'images/cat05.png'),
(5, 'Roy BigCat Meowson', '5', 'Big kitty, loves to fight', 23, 18, 'images/cat06.png'),
(6, 'Pero', '7', 'Ultimate god of destruction', 999, 0, 'images/DSC_0005.JPG'),
(7, 'Firko Cro Cat', '5', 'Past his prime, doing seminars', 38, 11, 'images/cat03.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `fighters`
--
ALTER TABLE `fighters`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
