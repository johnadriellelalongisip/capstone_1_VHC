-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 19, 2024 at 04:43 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `capstone`
--

-- --------------------------------------------------------

--
-- Table structure for table `medicalstaff`
--

CREATE TABLE `medicalstaff` (
  `staff_id` int NOT NULL,
  `staff_username` varchar(50) NOT NULL,
  `staff_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `staff_email` varchar(50) NOT NULL,
  `staff_role` varchar(30) NOT NULL,
  `account_created_at` datetime NOT NULL,
  `account_last_updated_at` datetime NOT NULL,
  `staff_last_activity` datetime NOT NULL,
  `staff_history` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `medicalstaff`
--

INSERT INTO `medicalstaff` (`staff_id`, `staff_username`, `staff_password`, `staff_email`, `staff_role`, `account_created_at`, `account_last_updated_at`, `staff_last_activity`, `staff_history`) VALUES
(24, 'asdfasdf', '$2b$10$GGSae1g9bGYbAS67GkR25.0bMyIBEuGxx8bo.d.VBTqhuaiiNsrL6', 'asdfasdf@asdf', 'USER', '2024-02-17 13:05:01', '2024-02-17 13:05:01', '2024-02-17 13:05:01', '{\"account_created_at\": \"2024-02-17 13:05:01\", \"2024-02-17 21:17:41\": \"Logged In\"}'),
(25, 'asdfasdf', '$2b$10$cUwKYyQnyof9j830Oa2rF.wNMcUSvE4pMl7/y5CsNN3VjuEZ..n8W', 'asdfasdf@asdf', 'USER', '2024-02-17 21:07:48', '2024-02-17 21:07:48', '2024-02-17 21:07:48', '{\"account_created_at\": \"2024-02-17 21:07:48\"}');

-- --------------------------------------------------------

--
-- Table structure for table `municipal_citizens`
--

CREATE TABLE `municipal_citizens` (
  `citizen_family_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `citizen_firstname` varchar(255) NOT NULL,
  `citizen_middlename` varchar(255) NOT NULL,
  `citizen_lastname` varchar(255) NOT NULL,
  `citizen_gender` varchar(50) NOT NULL,
  `citizen_barangay` varchar(255) NOT NULL,
  `date_added` datetime NOT NULL,
  `citizen_number` varchar(12) DEFAULT NULL,
  `citizen_history` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `municipal_citizens`
--

INSERT INTO `municipal_citizens` (`citizen_family_id`, `citizen_firstname`, `citizen_middlename`, `citizen_lastname`, `citizen_gender`, `citizen_barangay`, `date_added`, `citizen_number`, `citizen_history`) VALUES
('FAMILY_ID-LKGBAX8R', 'NEW RECORD', 'MIDDLE NAME', 'LAST NAME', 'male', 'BARANGAY', '2024-02-18 22:57:45', '123456789012', '{\"logs\": {\"Record added\": \"2024-02-18 22:57:45\"}}'),
('FAMILY_ID-LWDSXLIP', 'FIRSTNAME', 'MIDDLE', 'LASTNAME', 'female', 'THEBARANGAY', '2024-02-19 02:52:49', '121212121212', '{\"logs\": {\"Record added\": \"2024-02-18 22:57:45\", \"Prescription Added\": {\"time\": \"2024-02-19 11:03:54\", \"notes\": \"NEW HISTORY\"}}}');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`) VALUES
(46, 'asdf2', 'asdf321'),
(47, '55', '55'),
(48, 'sadf', 'asdf321');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `medicalstaff`
--
ALTER TABLE `medicalstaff`
  ADD PRIMARY KEY (`staff_id`);

--
-- Indexes for table `municipal_citizens`
--
ALTER TABLE `municipal_citizens`
  ADD PRIMARY KEY (`citizen_family_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `medicalstaff`
--
ALTER TABLE `medicalstaff`
  MODIFY `staff_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
