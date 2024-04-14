-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 14, 2024 at 10:54 PM
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
(24, 'asdfasdf', '$2b$10$GGSae1g9bGYbAS67GkR25.0bMyIBEuGxx8bo.d.VBTqhuaiiNsrL6', 'asdfasdf@asdf', 'USER', '2024-02-17 13:05:01', '2024-02-17 13:05:01', '2024-02-17 13:05:01', '{\"account_created_at\": \"2024-02-17 13:05:01\", \"2024-02-17 21:17:41\": \"Logged In\", \"2024-03-26 19:35:56\": \"Logged In\", \"2024-03-26 19:36:06\": \"Logged In\", \"2024-03-26 19:36:08\": \"Logged In\", \"2024-03-26 20:10:27\": \"Logged In\", \"2024-03-26 20:40:52\": \"Logged In\", \"2024-03-27 07:05:14\": \"Logged In\", \"2024-03-27 07:07:43\": \"Logged In\", \"2024-03-27 07:26:16\": \"Logged In\", \"2024-03-27 07:28:58\": \"Logged In\", \"2024-03-27 07:29:28\": \"Logged In\", \"2024-03-27 07:30:20\": \"Logged In\", \"2024-03-27 07:30:40\": \"Logged In\", \"2024-03-27 07:31:02\": \"Logged In\", \"2024-03-29 10:19:57\": \"Logged In\", \"2024-03-29 10:31:03\": \"Logged In\", \"2024-03-29 10:43:29\": \"Logged In\", \"2024-03-29 10:45:06\": \"Logged In\", \"2024-03-29 11:04:55\": \"Logged In\", \"2024-03-29 11:10:20\": \"Logged In\", \"2024-03-29 11:11:22\": \"Logged In\", \"2024-03-29 11:34:47\": \"Logged In\", \"2024-03-29 11:35:28\": \"Logged In\", \"2024-03-29 11:36:36\": \"Logged In\", \"2024-03-29 12:36:54\": \"Logged In\", \"2024-03-29 13:13:55\": \"Logged In\", \"2024-03-29 13:14:16\": \"Logged In\", \"2024-03-29 13:44:35\": \"Logged In\", \"2024-03-29 13:44:58\": \"Logged In\", \"2024-03-29 13:48:35\": \"Logged In\", \"2024-03-29 13:51:14\": \"Logged In\", \"2024-03-29 14:12:04\": \"Logged In\", \"2024-03-29 14:13:51\": \"Logged In\", \"2024-03-29 15:50:33\": \"Logged In\", \"2024-03-29 15:52:50\": \"Logged In\", \"2024-03-29 15:53:15\": \"Logged In\", \"2024-03-29 15:54:05\": \"Logged In\", \"2024-04-05 10:14:37\": \"Logged In\", \"2024-04-12 17:39:44\": \"Logged In\", \"2024-04-13 12:17:10\": \"Logged In\", \"2024-04-14 07:29:43\": \"Logged In\"}'),
(25, 'asdfasdf', '$2b$10$cUwKYyQnyof9j830Oa2rF.wNMcUSvE4pMl7/y5CsNN3VjuEZ..n8W', 'asdfasdf@asdf', 'USER', '2024-02-17 21:07:48', '2024-02-17 21:07:48', '2024-02-17 21:07:48', '{\"account_created_at\": \"2024-02-17 21:07:48\"}'),
(26, 'asdfasdf', '$2b$10$e6wxnD6NDeeldb/pVLQGeOvtkd4eRfvIUNeQu9YdnH16DoFfbWgCu', 'olajohnfilhmar@gmail.com', 'USER', '2024-03-26 19:35:17', '2024-03-26 19:35:17', '2024-03-26 19:35:17', '{\"account_created_at\": \"2024-03-26 19:35:17\"}'),
(27, 'asdfasdf', '$2b$10$QTJb8w6uI.qvGK6TTHzhZeKLb7FYYS.3bAfSHJsXyy696W1lwfF9y', 'asdf@asdf.com', 'USER', '2024-03-26 19:35:54', '2024-03-26 19:35:54', '2024-03-26 19:35:54', '{\"account_created_at\": \"2024-03-26 19:35:54\"}');

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
  `citizen_birthdate` date NOT NULL,
  `citizen_barangay` varchar(255) NOT NULL,
  `date_added` datetime NOT NULL,
  `citizen_number` varchar(12) DEFAULT NULL,
  `citizen_history` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `municipal_citizens`
--

INSERT INTO `municipal_citizens` (`citizen_family_id`, `citizen_firstname`, `citizen_middlename`, `citizen_lastname`, `citizen_gender`, `citizen_birthdate`, `citizen_barangay`, `date_added`, `citizen_number`, `citizen_history`) VALUES
('FAMILY_ID-4ON0EKYR', 'QASDSAD', 'ASDASD', 'ASDASD', 'male', '2001-01-01', 'ASDASD', '2024-04-13 09:53:46', '421421421421', '{\"2024-04-13 09:53:46\": \"Record Added\"}'),
('FAMILY_ID-7PUJIUBO', 'Jan Ryan', 'Delos Reyes', 'Ola', 'male', '2008-01-27', 'Antonino (Malinao)', '2024-04-09 18:06:26', '910241289412', '{\"2024-04-09 18:06:26\": \"Record Added\"}'),
('FAMILY_ID-BKOJULBX', 'asdfasdf', 'asdfasdf', 'asdfasdf', 'male', '2001-01-01', 'asdfasdf', '2024-04-13 12:17:35', '666666666666', '{\"2024-04-13 12:17:35\": \"Record Added\"}'),
('FAMILY_ID-G8UGVFZW', 'qqqqqqqqqqq', 'qqqqqqqqqqq', 'qqqqqqqqqqq', 'male', '2001-01-01', 'qqqqqqqqqqq', '2024-04-12 19:25:24', '555555555555', '{\"2024-04-12 19:25:24\": \"Record Added\"}'),
('FAMILY_ID-GR2TIQWL', '1111111111111111111111111', '1111111111111111111111111', '1111111111111111111111111', 'male', '2001-01-01', '1111111111111111111111111', '2024-04-13 09:54:04', '111111111111', '{\"2024-04-13 09:54:04\": \"Record Added\"}'),
('FAMILY_ID-HNTQJ2D0', 'Elizabeth', 'Aquino', 'Geronaga', 'female', '2000-12-31', 'Antonino (Malinao)', '2024-04-09 18:01:34', '09668649640', '{\"2024-04-09 18:01:34\": \"Record Added\"}'),
('FAMILY_ID-HNZIVKLI', '2222222222222', '2222222222222', '2222222222222', 'male', '2001-01-01', '2222222222222', '2024-04-12 19:09:29', '222222222222', '{\"2024-04-12 19:09:29\": \"Record Added\"}'),
('FAMILY_ID-JDFBZLR0', 'Joemar', 'Quinto', 'Ola', 'male', '1975-11-02', 'Antonino (Malinao)', '2024-04-09 18:03:37', '091241241241', '{\"2024-04-09 18:03:37\": \"Record Added\"}'),
('FAMILY_ID-MT1PT2FW', 'qqqqqqqqqqqqq', 'qqqqqqqqqqqqq', 'qqqqqqqqqqqqq', 'male', '2001-01-01', 'qqqqqqqqqqqqq', '2024-04-13 11:19:12', '555555555555', '{\"2024-04-13 11:19:12\": \"Record Added\"}'),
('FAMILY_ID-OG6QLS0R', '2222222222222', '2222222222222', '2222222222222', 'male', '2001-01-01', '2222222222222', '2024-04-12 19:09:54', '222222222222', '{\"2024-04-12 19:09:54\": \"Record Added\"}'),
('FAMILY_ID-R1VQU9RU', '5555555555555555', '5555555555555555', '5555555555555555', 'male', '2001-01-01', '5555555555555555', '2024-04-13 07:57:47', '555555555555', '{\"2024-04-13 07:57:47\": \"Record Added\"}'),
('FAMILY_ID-SSTDIICY', 'JAJAJAJAJA', 'JAJAJAJAJA', 'JAJAJAJAJA', 'male', '2001-01-01', 'JAJAJAJAJA', '2024-04-14 07:29:55', '444444444444', '{\"2024-04-14 07:29:55\": \"Record Added\"}'),
('FAMILY_ID-TLT8PKZ7', '1111111111111111111111111', '1111111111111111111111111', '1111111111111111111111111', 'male', '2001-01-01', '1111111111111111111111111', '2024-04-13 09:54:19', '111111111111', '{\"2024-04-13 09:54:19\": \"Record Added\"}'),
('FAMILY_ID-VIEWAG03', '2222222222222', '2222222222222', '2222222222222', 'male', '2001-01-01', '2222222222222', '2024-04-12 19:09:22', '222222222222', '{\"2024-04-12 19:09:22\": \"Record Added\"}'),
('FAMILY_ID-WPY8ECKV', 'John Filhmar', 'De Los Reyes', 'Ola', 'male', '2001-02-21', 'Canubing 1', '2024-02-29 20:07:18', '09777353309', '{\"2024-02-29 20:07:18\": \"Record Added\"}'),
('FAMILY_ID-YHVNHRJE', 'Jef', 'Donald', 'Ramos', 'male', '2003-05-12', 'Puerto', '2024-02-29 21:03:10', '09128241827', '{\"2024-02-29 21:03:10\": \"Record Added\"}');

-- --------------------------------------------------------

--
-- Table structure for table `patient_queue`
--

CREATE TABLE `patient_queue` (
  `queue_number` int NOT NULL,
  `patient_name` varchar(50) NOT NULL,
  `patient_gender` varchar(10) NOT NULL,
  `barangay_from` varchar(50) NOT NULL,
  `time_arrived` datetime NOT NULL,
  `time_attended` datetime DEFAULT NULL,
  `time_dismissed` datetime DEFAULT NULL,
  `patient_status` varchar(50) NOT NULL,
  `existing_record` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `patient_queue`
--

INSERT INTO `patient_queue` (`queue_number`, `patient_name`, `patient_gender`, `barangay_from`, `time_arrived`, `time_attended`, `time_dismissed`, `patient_status`, `existing_record`) VALUES
(1, 'Filhmar', 'male', 'Canubing 1', '2024-03-18 12:18:45', NULL, NULL, 'serving', NULL),
(2, 'Zabeth', 'male', 'Bucayao', '2024-03-18 12:31:12', NULL, NULL, 'serving', NULL),
(3, 'asdf', 'male', 'asdf', '2024-03-18 18:58:11', NULL, NULL, 'waiting', NULL),
(4, 'asdffasdf', 'male', 'asdfasd', '2024-04-03 09:44:29', NULL, NULL, 'waiting', NULL),
(5, 'asdfdsaf', 'male', 'Poblacion II', '2024-04-12 19:21:56', NULL, NULL, 'waiting', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pharmacy_inventory`
--

CREATE TABLE `pharmacy_inventory` (
  `item_id` int NOT NULL,
  `item_name` varchar(55) NOT NULL,
  `unit_size` varchar(55) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `lot_no` varchar(55) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `exp_date` date DEFAULT NULL,
  `quantity_stockroom` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `item_logs` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pharmacy_inventory`
--

INSERT INTO `pharmacy_inventory` (`item_id`, `item_name`, `unit_size`, `lot_no`, `exp_date`, `quantity_stockroom`, `item_logs`) VALUES
(1, 'ACETYCISTEINE 600mg/tablet 20\'s', 'bx', NULL, NULL, 'sample data', '{\"2024-02-22 00:04:00\": \"Date Added\"}'),
(2, 'ACICLOVIR 400mg/tabet 30\'s', '4_bxs', '37416', '2025-07-01', NULL, '{\"2024-02-22 00:04:00\": \"Date Added\"}'),
(3, 'ALLOPURINOL 100mg/tablet 100\'s', '6_bxs', 'u-02038', '2026-03-01', NULL, '{\"2024-02-22 00:04:00\": \"Date Added\"}'),
(4, 'ALLOPURINOL 300mg/tablet 100\'s', '3_bxs', 'ZKN209', '2025-10-01', NULL, '{\"2024-02-22 00:04:00\": \"Date Added\"}');

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
-- Indexes for table `patient_queue`
--
ALTER TABLE `patient_queue`
  ADD PRIMARY KEY (`queue_number`),
  ADD KEY `constraint_patient_queue_existing_record_FK_municipal_citizens` (`existing_record`);

--
-- Indexes for table `pharmacy_inventory`
--
ALTER TABLE `pharmacy_inventory`
  ADD PRIMARY KEY (`item_id`);

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
  MODIFY `staff_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `patient_queue`
--
ALTER TABLE `patient_queue`
  MODIFY `queue_number` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `pharmacy_inventory`
--
ALTER TABLE `pharmacy_inventory`
  MODIFY `item_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=150;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `patient_queue`
--
ALTER TABLE `patient_queue`
  ADD CONSTRAINT `constraint_patient_queue_existing_record_FK_municipal_citizens` FOREIGN KEY (`existing_record`) REFERENCES `municipal_citizens` (`citizen_family_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
