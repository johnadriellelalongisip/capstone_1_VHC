-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 23, 2024 at 01:46 AM
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
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `appointment_id` int NOT NULL,
  `citizen_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `fullname` varchar(100) NOT NULL,
  `phone_number` varchar(12) DEFAULT NULL,
  `appointed_datetime` datetime NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL,
  `appointment_logs` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `medicalstaff`
--

CREATE TABLE `medicalstaff` (
  `staff_id` int NOT NULL,
  `staff_username` varchar(50) NOT NULL,
  `staff_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `refresh_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `staff_email` varchar(50) NOT NULL,
  `isVerified` tinyint(1) NOT NULL,
  `staff_role` varchar(30) NOT NULL,
  `account_created_at` datetime NOT NULL,
  `account_last_updated_at` datetime NOT NULL,
  `staff_last_activity` datetime NOT NULL,
  `staff_accessibility` json NOT NULL,
  `staff_history` json NOT NULL,
  `staff_devices` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `medicalstaff`
--

INSERT INTO `medicalstaff` (`staff_id`, `staff_username`, `staff_password`, `refresh_token`, `staff_email`, `isVerified`, `staff_role`, `account_created_at`, `account_last_updated_at`, `staff_last_activity`, `staff_accessibility`, `staff_history`, `staff_devices`) VALUES
(45, 'filhmar', '$2a$10$2z54fmGlDS92CKiFVyY.AuPjqp89NOwuPeSa4xPb3tAe3iHkkAnvi', NULL, 'ola@asdf.com', 0, 'user', '2024-05-22 09:37:50', '2024-05-22 09:37:50', '2024-05-23 09:09:09', '{\"accessibility\": {\"home\": {\"edit\": false, \"view\": true}, \"queue\": {\"edit\": false, \"view\": true}, \"users\": {\"edit\": false, \"view\": true, \"create\": false, \"delete\": false}, \"mapping\": {\"edit\": false, \"view\": true}, \"records\": {\"edit\": false, \"view\": true, \"create\": false, \"delete\": false}, \"accounts\": {\"edit\": false, \"view\": true, \"create\": false, \"delete\": false}, \"notfound\": {\"view\": true}, \"pharmacy\": {\"edit\": false, \"view\": true, \"create\": false, \"delete\": false}, \"analytics\": {\"edit\": false, \"view\": true}, \"dashboard\": {\"edit\": false, \"view\": true}, \"blood_unit\": {\"edit\": false, \"view\": true, \"create\": false, \"delete\": false}, \"appointments\": {\"edit\": false, \"view\": true, \"create\": false, \"delete\": false}}}', '{\"2024-05-22 09:37:50\": \"Account Added\", \"2024-05-23 06:45:33\": \"Logged In\", \"2024-05-23 06:47:12\": \"Logged In\", \"2024-05-23 07:24:47\": \"Logged In\", \"2024-05-23 07:25:55\": \"Logged In\", \"2024-05-23 07:25:57\": \"Logged In\", \"2024-05-23 07:26:14\": \"Logged In\"}', NULL),
(46, 'elizabeth', '$2a$10$CCFBwbmSFNkYZeaYJav8Guw6lBxVL6WofSuszxnOoeix.vQx4G5/C', NULL, 'elasef@asdf.ea', 0, 'user', '2024-05-22 13:20:38', '2024-05-22 13:20:38', '2024-05-22 13:20:38', '{\"accessibility\": {\"home\": {\"edit\": false, \"view\": true}, \"queue\": {\"edit\": false, \"view\": true}, \"users\": {\"edit\": false, \"view\": true, \"create\": false, \"delete\": false}, \"mapping\": {\"edit\": false, \"view\": true}, \"records\": {\"edit\": false, \"view\": true, \"create\": false, \"delete\": false}, \"accounts\": {\"edit\": false, \"view\": true, \"create\": false, \"delete\": false}, \"notfound\": {\"view\": true}, \"pharmacy\": {\"edit\": false, \"view\": true, \"create\": false, \"delete\": false}, \"analytics\": {\"edit\": false, \"view\": true}, \"dashboard\": {\"edit\": false, \"view\": true}, \"blood_unit\": {\"edit\": false, \"view\": true, \"create\": false, \"delete\": false}, \"appointments\": {\"edit\": false, \"view\": true, \"create\": false, \"delete\": false}}}', '{\"2024-05-22 13:20:38\": \"Account Added\"}', NULL),
(47, 'qqqqqqqqqqq', '$2a$10$S1iDhmk.vBPyNUzyv5QY7eCeMKxHfzOqk2bjWRIMD9MAT1tAZXTGm', NULL, 'asdf@afds.casd', 0, 'user', '2024-05-22 13:20:59', '2024-05-22 13:20:59', '2024-05-22 13:20:59', '{\"accessibility\": {\"home\": {\"edit\": false, \"view\": true}, \"queue\": {\"edit\": false, \"view\": true}, \"users\": {\"edit\": false, \"view\": true, \"create\": false, \"delete\": false}, \"mapping\": {\"edit\": false, \"view\": true}, \"records\": {\"edit\": false, \"view\": true, \"create\": false, \"delete\": false}, \"accounts\": {\"edit\": false, \"view\": true, \"create\": false, \"delete\": false}, \"notfound\": {\"view\": true}, \"pharmacy\": {\"edit\": false, \"view\": true, \"create\": false, \"delete\": false}, \"analytics\": {\"edit\": false, \"view\": true}, \"dashboard\": {\"edit\": false, \"view\": true}, \"blood_unit\": {\"edit\": false, \"view\": true, \"create\": false, \"delete\": false}, \"appointments\": {\"edit\": false, \"view\": true, \"create\": false, \"delete\": false}}}', '{\"2024-05-22 13:20:59\": \"Account Added\"}', NULL),
(49, 'zxcv', '$2a$10$r7kSGqEXOaNybBI6vfBsaOCjrXC96sPbY6DIAP/usDl0lUjSNrOVe', NULL, 'ASDFi@mIFSMOFD.FODSMA', 0, 'user', '2024-05-22 20:19:20', '2024-05-22 20:19:20', '2024-05-22 20:19:20', '{\"accessibility\": {\"home\": {\"edit\": false, \"view\": true}, \"queue\": {\"edit\": false, \"view\": true}, \"users\": {\"edit\": false, \"view\": true, \"create\": false, \"delete\": false}, \"mapping\": {\"edit\": false, \"view\": true}, \"records\": {\"edit\": false, \"view\": true, \"create\": false, \"delete\": false}, \"accounts\": {\"edit\": false, \"view\": true, \"create\": false, \"delete\": false}, \"notfound\": {\"view\": true}, \"pharmacy\": {\"edit\": false, \"view\": true, \"create\": false, \"delete\": false}, \"analytics\": {\"edit\": false, \"view\": true}, \"dashboard\": {\"edit\": false, \"view\": true}, \"blood_unit\": {\"edit\": false, \"view\": true, \"create\": false, \"delete\": false}, \"appointments\": {\"edit\": false, \"view\": true, \"create\": false, \"delete\": false}}}', '{\"2024-05-22 20:19:20\": \"Account Added\"}', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `messaging`
--

CREATE TABLE `messaging` (
  `message_id` int NOT NULL,
  `sender_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  `message` varchar(255) NOT NULL,
  `datetime_sent` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
('FAMILY_ID-DBTE48G4', 'aaaaaaaaaa', 'aaaaaaaaaa', 'aaaaaaaaaa', 'male', '2001-01-01', 'aaaaaaaaaa', '2024-05-20 11:27:12', '222222222222', '{\"2024-05-20 11:27:12\": \"Record Added\"}'),
('FAMILY_ID-IYHZO6KM', 'zxcvzxcv', 'zxcv', 'zcxv', 'male', '2001-01-01', 'zxcv', '2024-05-23 08:23:38', '112321312312', '{\"2024-05-23 08:23:38\": \"Record Added\"}'),
('FAMILY_ID-MYWUF7SK', 'ddddddddd', 'ddddddddd', 'ddddddddd', 'male', '2001-01-01', 'ddddddddd', '2024-05-22 14:45:34', '222222222222', '{\"2024-05-22 14:45:34\": \"Record Added\"}'),
('FAMILY_ID-OMYMXAJQ', 'asdf', 'asd', 'asd', 'male', '2001-01-01', 'sadf', '2024-05-22 17:15:05', '123123123123', '{\"2024-05-22 17:15:05\": \"Record Added\"}'),
('FAMILY_ID-OQUVCOOU', 'sadf', 'sadf', 'asdf', 'male', '2001-01-01', 'sadf', '2024-05-19 19:13:12', '124214214214', '{\"2024-05-19 19:13:12\": \"Record Added\"}'),
('FAMILY_ID-UBWQGDNV', 'xxxxxxxxxxxx', 'xxxxxxxxxxxx', 'xxxxxxxxxxxx', 'male', '2001-01-01', 'xxxxxxxxxxxx', '2024-05-19 19:14:32', '222222222222', '{\"2024-05-19 19:14:32\": \"Record Added\"}'),
('FAMILY_ID-VB9SMNX5', 'John Filhmar', 'De Los Reyes', 'Ola', 'male', '2001-01-01', 'Canubing 1', '2024-05-07 22:58:23', '977735309', '{\"2024-05-07 22:58\": \"Created an Appointment\", \"2024-05-08 19:24\": \"Created an Appointment\", \"2024-05-11 17:14\": \"Created an Appointment\", \"2024-05-07 22:58:23\": \"Record Added\"}'),
('FAMILY_ID-VFKPOP4N', 'asdf', 'asdf', 'asdf', 'male', '2001-01-01', 'asdf', '2024-05-08 17:31:04', '214214421421', '{\"2024-05-08 17:31:04\": \"Record Added\"}'),
('FAMILY_ID-VWD5RJFY', 'asdf', 'asdf', 'asdf', 'male', '2001-01-01', 'asdf', '2024-05-22 14:58:56', '221312312321', '{\"2024-05-22 14:58:56\": \"Record Added\"}'),
('FAMILY_ID-WRBYPLFH', 'asdf', 'asdf', 'asf', 'male', '2001-01-01', '231', '2024-05-14 15:49:33', '321231321321', '{\"2024-05-14 15:49:33\": \"Record Added\"}');

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
(7, 'asdf', 'male', 'Poblacion I', '2024-05-08 17:33:45', NULL, NULL, 'waiting', NULL),
(8, 'asdf', 'others', 'Poblacion II', '2024-05-08 17:34:21', NULL, NULL, 'priority', NULL),
(9, 'asdf', 'others', 'Poblacion I', '2024-05-08 17:34:41', NULL, NULL, 'priority', NULL),
(10, 'asdf', 'others', 'Poblacion I', '2024-05-08 17:34:52', NULL, NULL, 'priority', NULL),
(11, 'asdf', 'male', 'Poblacion I', '2024-05-08 17:36:21', NULL, NULL, 'waiting', NULL),
(12, 'asdfasdf', 'male', 'Leido', '2024-05-08 17:40:13', NULL, NULL, 'waiting', NULL),
(13, 'asdfasdf', 'male', 'Leido', '2024-05-08 17:41:54', NULL, NULL, 'emergency', NULL);

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
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`appointment_id`),
  ADD KEY `constraint_municipal_citizens_citizen_family_id_FK_appointmentid` (`citizen_id`);

--
-- Indexes for table `medicalstaff`
--
ALTER TABLE `medicalstaff`
  ADD PRIMARY KEY (`staff_id`);

--
-- Indexes for table `messaging`
--
ALTER TABLE `messaging`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `receiver_id` (`receiver_id`),
  ADD KEY `sender_id` (`sender_id`);

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
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `appointment_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `medicalstaff`
--
ALTER TABLE `medicalstaff`
  MODIFY `staff_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `messaging`
--
ALTER TABLE `messaging`
  MODIFY `message_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `patient_queue`
--
ALTER TABLE `patient_queue`
  MODIFY `queue_number` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

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
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `constraint_municipal_citizens_citizen_family_id_FK_appointmentid` FOREIGN KEY (`citizen_id`) REFERENCES `municipal_citizens` (`citizen_family_id`);

--
-- Constraints for table `messaging`
--
ALTER TABLE `messaging`
  ADD CONSTRAINT `messaging_ibfk_1` FOREIGN KEY (`receiver_id`) REFERENCES `medicalstaff` (`staff_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `messaging_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `medicalstaff` (`staff_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `patient_queue`
--
ALTER TABLE `patient_queue`
  ADD CONSTRAINT `constraint_patient_queue_existing_record_FK_municipal_citizens` FOREIGN KEY (`existing_record`) REFERENCES `municipal_citizens` (`citizen_family_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
