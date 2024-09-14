-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 14, 2024 at 02:35 PM
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
  `appointed_datetime` datetime NOT NULL,
  `status` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ccr_diagnosis`
--

CREATE TABLE `ccr_diagnosis` (
  `diagnosis_id` int NOT NULL,
  `record_id` int NOT NULL,
  `primary_diagnosis` varchar(255) NOT NULL,
  `secondary_diagnosis` varchar(255) DEFAULT NULL,
  `severity` enum('mild','moderate','sever') NOT NULL DEFAULT 'moderate',
  `symptoms` text,
  `tests_conducted` text,
  `diagnosis_details` text,
  `prescription_id` int NOT NULL,
  `follow_up_recommendations` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ccr_diagnosis_prescription`
--

CREATE TABLE `ccr_diagnosis_prescription` (
  `prescription_id` int NOT NULL,
  `diagnosis_id` int NOT NULL,
  `item_id` int NOT NULL,
  `medication_name` varchar(255) NOT NULL,
  `dosage` varchar(100) NOT NULL,
  `intake_method` enum('oral','injection','topical','iv') NOT NULL,
  `frequency` varchar(100) NOT NULL,
  `duration` varchar(50) NOT NULL,
  `instructions` text NOT NULL,
  `refill_allowed` tinyint(1) NOT NULL DEFAULT '0',
  `quantity_prescribed` int NOT NULL,
  `status` enum('active','completed','cancelled') NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ccr_family_medical_history`
--

CREATE TABLE `ccr_family_medical_history` (
  `family_medical_history_id` int NOT NULL,
  `record_id` int NOT NULL,
  `allergy` varchar(255) DEFAULT NULL,
  `cerebrovascular_disease` varchar(255) DEFAULT NULL,
  `emphysema` varchar(255) DEFAULT NULL,
  `hepatitis` varchar(255) DEFAULT NULL,
  `mental_illness` varchar(255) DEFAULT NULL,
  `peptic_ulcer` varchar(255) DEFAULT NULL,
  `thyroid_disease` varchar(255) DEFAULT NULL,
  `asthma` varchar(255) DEFAULT NULL,
  `coronary_artery_disease` varchar(255) DEFAULT NULL,
  `epilepsy_seizure_disorder` varchar(255) DEFAULT NULL,
  `hyperlipidemia` varchar(255) DEFAULT NULL,
  `pneumonia` varchar(255) DEFAULT NULL,
  `urinary_tract_infection` varchar(255) DEFAULT NULL,
  `cancer` varchar(255) DEFAULT NULL,
  `diabetes_mellitus` varchar(255) DEFAULT NULL,
  `extrapulmonary_tuberculosis` varchar(255) DEFAULT NULL,
  `pulmonary_tuberculosis` varchar(255) DEFAULT NULL,
  `none` tinyint(1) DEFAULT '0',
  `others` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ccr_menstrual_history`
--

CREATE TABLE `ccr_menstrual_history` (
  `menstrual_history_id` int NOT NULL,
  `record_id` int NOT NULL,
  `menarche` int NOT NULL,
  `last_menstrual_date` date NOT NULL,
  `menstrual_duration` int NOT NULL,
  `cycle_length` int NOT NULL,
  `pads_per_day` int NOT NULL,
  `sexual_intercourse_age` int NOT NULL,
  `birth_control_use` tinyint(1) NOT NULL,
  `birth_control_method` varchar(100) NOT NULL,
  `is_menopause` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ccr_past_medical_history`
--

CREATE TABLE `ccr_past_medical_history` (
  `past_medical_history_id` int NOT NULL,
  `record_id` int NOT NULL,
  `allergy` varchar(255) DEFAULT NULL,
  `cerebrovascular_disease` varchar(255) DEFAULT NULL,
  `emphysema` varchar(255) DEFAULT NULL,
  `hepatitis` varchar(255) DEFAULT NULL,
  `mental_illness` varchar(255) DEFAULT NULL,
  `peptic_ulcer` varchar(255) DEFAULT NULL,
  `thyroid_disease` varchar(255) DEFAULT NULL,
  `asthma` varchar(255) DEFAULT NULL,
  `coronary_artery_disease` varchar(255) DEFAULT NULL,
  `epilepsy_seizure_disorder` varchar(255) DEFAULT NULL,
  `hyperlipidemia` varchar(255) DEFAULT NULL,
  `pneumonia` varchar(255) DEFAULT NULL,
  `urinary_tract_infection` varchar(255) DEFAULT NULL,
  `cancer` varchar(255) DEFAULT NULL,
  `diabetes_mellitus` varchar(255) DEFAULT NULL,
  `extrapulmonary_tuberculosis` varchar(255) DEFAULT NULL,
  `pulmonary_tuberculosis` varchar(255) DEFAULT NULL,
  `none` tinyint(1) DEFAULT '0',
  `others` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ccr_pediatric_client`
--

CREATE TABLE `ccr_pediatric_client` (
  `pediatric_client_id` int NOT NULL,
  `record_id` int NOT NULL,
  `length` int NOT NULL,
  `limb` int NOT NULL,
  `waist` int NOT NULL,
  `mua_circumference` int NOT NULL,
  `head_circumference` int NOT NULL,
  `skinfold` int NOT NULL,
  `hip` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ccr_pregnancy_history`
--

CREATE TABLE `ccr_pregnancy_history` (
  `pregnancy_history_id` int NOT NULL,
  `record_id` int NOT NULL,
  `gravidity` int NOT NULL,
  `parity` int NOT NULL,
  `delivery_types` varchar(255) NOT NULL,
  `full_term_pregnancies` int NOT NULL,
  `premature_pregnancies` int NOT NULL,
  `abortions` int NOT NULL,
  `living_children` int NOT NULL,
  `pre_eclampsia` tinyint(1) NOT NULL,
  `family_planning_access` enum('yes','no') DEFAULT 'yes'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ccr_vital_signs`
--

CREATE TABLE `ccr_vital_signs` (
  `vital_signs_id` int NOT NULL,
  `record_id` int NOT NULL,
  `blood_pressure` varchar(50) NOT NULL,
  `temperature` varchar(50) NOT NULL,
  `heart_rate` varchar(50) NOT NULL,
  `weight` varchar(50) NOT NULL,
  `height` varchar(50) NOT NULL,
  `pulse_rate` varchar(50) NOT NULL,
  `respiratory_rate` varchar(50) NOT NULL,
  `bmi` varchar(50) NOT NULL,
  `oxygen_saturation` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `citizen`
--

CREATE TABLE `citizen` (
  `citizen_family_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `citizen_firstname` varchar(255) NOT NULL,
  `citizen_middlename` varchar(255) NOT NULL,
  `citizen_lastname` varchar(255) NOT NULL,
  `citizen_gender` varchar(50) NOT NULL,
  `citizen_birthdate` date NOT NULL,
  `citizen_barangay` varchar(255) NOT NULL,
  `date_added` datetime NOT NULL,
  `citizen_number` varchar(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `citizen`
--

INSERT INTO `citizen` (`citizen_family_id`, `citizen_firstname`, `citizen_middlename`, `citizen_lastname`, `citizen_gender`, `citizen_birthdate`, `citizen_barangay`, `date_added`, `citizen_number`) VALUES
('FASADF32132', 'ASDF', 'ASDF', 'ASDF', 'ASDF', '2024-09-11', 'ASDFASDF', '2024-09-10 12:13:02', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `citizen_clinical_record`
--

CREATE TABLE `citizen_clinical_record` (
  `record_id` int NOT NULL,
  `staff_id` int NOT NULL,
  `citizen_family_id` varchar(50) NOT NULL,
  `civil_status` varchar(50) NOT NULL,
  `philhealth_number` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `philhealth_dpin` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `philhealth_category` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `vital_signs_id` int NOT NULL,
  `pediatric_client_id` int DEFAULT NULL,
  `chief_of_complaint` text NOT NULL,
  `history_of_present_illness` text NOT NULL,
  `past_medical_history_id` int NOT NULL,
  `smoking_status` enum('no','quit','yes') NOT NULL DEFAULT 'no',
  `alchohol_status` enum('no','quit','yes') NOT NULL DEFAULT 'no',
  `illicit_drug_status` enum('no','quit','yes') NOT NULL DEFAULT 'no',
  `sexually_active` enum('no','yes') NOT NULL DEFAULT 'no',
  `physical_examination` json NOT NULL,
  `family_medical_history_id` int NOT NULL,
  `menstrual_history_id` int NOT NULL,
  `pregnancy_history_id` int NOT NULL,
  `diagnosis_id` int NOT NULL,
  `datetime_issued` datetime NOT NULL,
  `plan` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `citizen_history`
--

CREATE TABLE `citizen_history` (
  `history_id` int NOT NULL,
  `family_id` varchar(50) NOT NULL,
  `action` varchar(255) NOT NULL,
  `action_details` text NOT NULL,
  `staff_id` int DEFAULT NULL,
  `action_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `medicalstaff`
--

CREATE TABLE `medicalstaff` (
  `staff_id` int NOT NULL,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `refresh_token` varchar(255) NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `isVerified` tinyint(1) NOT NULL DEFAULT '0',
  `role` enum('doctor','admin','staff','developer') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'staff',
  `accessibility_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `medicalstaff`
--

INSERT INTO `medicalstaff` (`staff_id`, `username`, `password`, `refresh_token`, `email`, `isVerified`, `role`, `accessibility_id`) VALUES
(52, 'filhmarola', '$2a$10$Ot26lxOmbY4J1qtfV7wMV.4ehdVWuuZnZ7H1t8aujgrX348eQ1nIa', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZpbGhtYXJvbGEiLCJyb2xlIjoiZGV2ZWxvcGVyIiwiaWF0IjoxNzI2MzA1MDUxLCJleHAiOjE3MjY5MDk4NTF9.ZcjwD2B6VsbJy_bjnnbzb9lQJK5cIUe8Z6-NYies_b8', 'olajohnfilhmar@gmail.com', 0, 'developer', NULL),
(54, 'adriellelalongisip', '$2a$10$ShhCnVVrHwOKm8bp5vprg.QSgMunND.NBvmdsD9EPJwFxHenmBkf.', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3RhZmYiLCJpYXQiOjE3MjYwMzg2MzEsImV4cCI6MTcyNjA0NTgzMX0.tu_R24vtX_oBPi_FBE298_7fGGQzB2-sNqRO-XZjDJQ', 'adriellelalongisip@gmail.com', 0, 'developer', NULL),
(55, 'albeurmacapia', '$2a$10$308q.UFAhc5Y6LtISPyCT.rEX.cFo/Wyl/CoK3LtmTFZnTVk5peMW', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTUsInJvbGUiOiJkZXZlbG9wZXIiLCJpYXQiOjE3MjYyMTQ5NDYsImV4cCI6MTcyNjMwMTM0Nn0.Kb_WTC_GfjIYcOzdtasY8KxSBN8XCdOnikwWhA7-GjA', 'albeurmacapia@gmail.com', 0, 'developer', NULL),
(56, 'TestingUser', '$2a$10$n3tRZ3mSi04XlCewSxy.ceJVAwFPh3XruTbFv.UsgZFbPGY.Emva.', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3RhZmYiLCJpYXQiOjE3MjYwNDkzMDgsImV4cCI6MTcyNjA1NjUwOH0.SZO0GzBki3QhJExesraApWhnVW1_VjGs-HFtYYTnVuo', 'testinguser@test.testing', 0, 'staff', NULL),
(57, 'SecondTestingUser', '$2a$10$dt/Glv11SaT4hcb2d5LQaufsbFXaS.QwuHTuYVyl9sZ4KEvNYsW5O', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjYwNDk0NzQsImV4cCI6MTcyNjA1NjY3NH0.ktF9syF2XqE1uLRXpQd7w57EOwwjQkWnise_vt-NVio', 'secondtestinguser@testing.test', 0, 'admin', NULL),
(58, 'EmailVerificationTest', '$2a$10$N/TVexis4qx.G4SLE9WxzOlDXQAj8o4T3946CXNeS.Itac1M4H75i', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3RhZmYiLCJpYXQiOjE3MjYwNTExNzYsImV4cCI6MTcyNjA1ODM3Nn0.kWT6spNlGxYETeGEaO3Ay0cdlPtEniR0AS1DD-dwgNU', 'emailverificationtest@testing.test', 0, 'staff', NULL),
(59, 'EmailVerificationTest2', '$2a$10$5ADLOFvOlQuOg5PzPxY0muUowiM1Krk2dVOe9YPorMp48zthKmI8W', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3RhZmYiLCJpYXQiOjE3MjYwNTEyMzgsImV4cCI6MTcyNjA1ODQzOH0.kvSmWbIGtEvx3MzPOgCP7jC0I8Z2Nec8_D9WhNZhV4U', 'emailverificationtest2@testing.test', 0, 'staff', NULL),
(60, 'EmailVerificationTest3', '$2a$10$fGEabqElyGRhcXD6hbLci.HjDYjy3WS6IeOqlLFkEsKrE1H.KTqDK', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3RhZmYiLCJpYXQiOjE3MjYwNTEzODQsImV4cCI6MTcyNjA1ODU4NH0.eRmFt1zmTgtzJADYuDEEm8epmBJhq_jksKr6Oe3SVCs', 'emailverificationtest3@testing.test', 0, 'staff', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `medicalstaff_accessbility`
--

CREATE TABLE `medicalstaff_accessbility` (
  `staff_id` int NOT NULL,
  `general` int NOT NULL,
  `accessibility_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `medicalstaff_email_verification`
--

CREATE TABLE `medicalstaff_email_verification` (
  `token` varchar(255) NOT NULL,
  `staff_id` int NOT NULL,
  `expiry_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `medicalstaff_email_verification`
--

INSERT INTO `medicalstaff_email_verification` (`token`, `staff_id`, `expiry_date`) VALUES
('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYwLCJpYXQiOjE3MjYwNTEzODR9.YQOGCOqSPqDlL2H3_iHiuIpbLolF9FJhA58qvksiDj8', 60, '2024-09-12 18:43:04');

-- --------------------------------------------------------

--
-- Table structure for table `medicalstaff_history`
--

CREATE TABLE `medicalstaff_history` (
  `history_id` int NOT NULL,
  `staff_id` int NOT NULL,
  `action` varchar(255) NOT NULL,
  `action_details` text NOT NULL,
  `citizen_family_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `action_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `medicalstaff_history`
--

INSERT INTO `medicalstaff_history` (`history_id`, `staff_id`, `action`, `action_details`, `citizen_family_id`, `action_datetime`) VALUES
(1, 57, 'registered', 'account created', NULL, '2024-09-11 18:11:11'),
(2, 58, 'registered', 'account created', NULL, '2024-09-11 18:39:32'),
(3, 59, 'registered', 'account created', NULL, '2024-09-11 18:40:36'),
(4, 60, 'registered', 'account created', NULL, '2024-09-11 18:43:03'),
(5, 52, 'logged in', 'logged in', NULL, '2024-09-12 08:38:30'),
(6, 52, 'logged in', 'logged in', NULL, '2024-09-12 08:38:42'),
(7, 52, 'logged in', 'logged in', NULL, '2024-09-12 09:06:57'),
(8, 52, 'logged in', 'logged in', NULL, '2024-09-12 09:07:08'),
(9, 52, 'logged in', 'logged in', NULL, '2024-09-12 09:38:47'),
(10, 52, 'logged in', 'logged in', NULL, '2024-09-12 09:38:59'),
(11, 52, 'logged in', 'logged in', NULL, '2024-09-12 09:40:06'),
(12, 52, 'logged in', 'logged in', NULL, '2024-09-12 09:44:03'),
(13, 52, 'logged in', 'logged in', NULL, '2024-09-12 09:53:29'),
(14, 52, 'logged in', 'logged in', NULL, '2024-09-12 09:57:34'),
(15, 52, 'logged in', 'logged in', NULL, '2024-09-12 09:58:25'),
(16, 52, 'logged in', 'logged in', NULL, '2024-09-12 09:59:07'),
(17, 52, 'logged in', 'logged in', NULL, '2024-09-12 10:01:41'),
(18, 52, 'logged in', 'logged in', NULL, '2024-09-12 10:02:56'),
(19, 52, 'logged in', 'logged in', NULL, '2024-09-12 10:04:17'),
(20, 52, 'logged in', 'logged in', NULL, '2024-09-12 10:05:06'),
(21, 52, 'logged in', 'logged in', NULL, '2024-09-12 10:10:52'),
(22, 52, 'logged in', 'logged in', NULL, '2024-09-12 10:11:39'),
(23, 52, 'logged in', 'logged in', NULL, '2024-09-12 10:17:47'),
(24, 52, 'logged in', 'logged in', NULL, '2024-09-12 10:18:26'),
(25, 52, 'logged in', 'logged in', NULL, '2024-09-13 14:26:56'),
(26, 52, 'logged in', 'logged in', NULL, '2024-09-13 14:28:24'),
(27, 55, 'logged in', 'logged in', NULL, '2024-09-13 16:09:05'),
(28, 52, 'logged in', 'logged in', NULL, '2024-09-13 16:27:06'),
(29, 52, 'logged in', 'logged in', NULL, '2024-09-13 16:28:10'),
(30, 52, 'logged in', 'logged in', NULL, '2024-09-13 18:55:05'),
(31, 52, 'logged in', 'logged in', NULL, '2024-09-13 19:25:54'),
(32, 52, 'logout', 'logged out of account', NULL, '2024-09-13 20:26:39'),
(33, 52, 'logged in', 'logged in', NULL, '2024-09-13 20:27:24'),
(34, 52, 'logged in', 'logged in', NULL, '2024-09-14 00:33:09'),
(35, 52, 'logged in', 'logged in', NULL, '2024-09-14 00:38:09'),
(36, 52, 'logged in', 'logged in', NULL, '2024-09-14 00:48:14'),
(37, 52, 'logged in', 'logged in', NULL, '2024-09-14 09:59:01'),
(38, 52, 'logged in', 'logged in', NULL, '2024-09-14 10:12:31'),
(39, 52, 'logged in', 'logged in', NULL, '2024-09-14 15:32:03'),
(40, 52, 'logout', 'logged out of account', NULL, '2024-09-14 15:32:13'),
(41, 52, 'logged in', 'logged in', NULL, '2024-09-14 15:50:59'),
(42, 52, 'logout', 'logged out of account', NULL, '2024-09-14 15:51:25'),
(43, 52, 'logged in', 'logged in', NULL, '2024-09-14 15:56:54'),
(44, 52, 'logged in', 'logged in', NULL, '2024-09-14 17:10:50');

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
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` int NOT NULL,
  `staff_id` int DEFAULT NULL,
  `message` text,
  `status` enum('unread','read','archived') DEFAULT 'unread',
  `datetime_received` datetime DEFAULT NULL,
  `datetime_seen` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `patient_queue`
--

CREATE TABLE `patient_queue` (
  `queue_number` int NOT NULL,
  `citizen_family_id` varchar(50) NOT NULL,
  `time_arrived` datetime NOT NULL,
  `current_status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `quantity_stockroom` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
-- Indexes for table `ccr_diagnosis`
--
ALTER TABLE `ccr_diagnosis`
  ADD PRIMARY KEY (`diagnosis_id`),
  ADD KEY `fk_diagnosis_prescription` (`prescription_id`),
  ADD KEY `fk_diagnosis_citizen_clinical_record` (`record_id`);

--
-- Indexes for table `ccr_diagnosis_prescription`
--
ALTER TABLE `ccr_diagnosis_prescription`
  ADD PRIMARY KEY (`prescription_id`),
  ADD KEY `fk_prescription_diagnosis` (`diagnosis_id`),
  ADD KEY `fk_prescription_pharmacy_inventory` (`item_id`);

--
-- Indexes for table `ccr_family_medical_history`
--
ALTER TABLE `ccr_family_medical_history`
  ADD PRIMARY KEY (`family_medical_history_id`),
  ADD KEY `fk_family_medical_history_citizen_clinical_record` (`record_id`);

--
-- Indexes for table `ccr_menstrual_history`
--
ALTER TABLE `ccr_menstrual_history`
  ADD PRIMARY KEY (`menstrual_history_id`),
  ADD KEY `fk_menstrual_history_citizen_clinical_record` (`record_id`);

--
-- Indexes for table `ccr_past_medical_history`
--
ALTER TABLE `ccr_past_medical_history`
  ADD PRIMARY KEY (`past_medical_history_id`),
  ADD KEY `fk_past_medical_history_citizen_clinical_record` (`record_id`);

--
-- Indexes for table `ccr_pediatric_client`
--
ALTER TABLE `ccr_pediatric_client`
  ADD PRIMARY KEY (`pediatric_client_id`),
  ADD KEY `fk_pediatric_client_citizen_clinical_record` (`record_id`);

--
-- Indexes for table `ccr_pregnancy_history`
--
ALTER TABLE `ccr_pregnancy_history`
  ADD PRIMARY KEY (`pregnancy_history_id`),
  ADD KEY `fk_pregnancy_history_citizen_clinical_record` (`record_id`);

--
-- Indexes for table `ccr_vital_signs`
--
ALTER TABLE `ccr_vital_signs`
  ADD PRIMARY KEY (`vital_signs_id`),
  ADD KEY `fk_vital_signs` (`record_id`);

--
-- Indexes for table `citizen`
--
ALTER TABLE `citizen`
  ADD PRIMARY KEY (`citizen_family_id`);

--
-- Indexes for table `citizen_clinical_record`
--
ALTER TABLE `citizen_clinical_record`
  ADD PRIMARY KEY (`record_id`),
  ADD KEY `fk_clinical_record_medicalstaff` (`staff_id`),
  ADD KEY `fk_clinical_record_citizen` (`citizen_family_id`),
  ADD KEY `fk_clinical_record_ccr_vital_signs` (`vital_signs_id`),
  ADD KEY `fk_clinical_record_pediatric_client` (`pediatric_client_id`),
  ADD KEY `fk_clinical_record_past_medical_history` (`past_medical_history_id`),
  ADD KEY `fk_clinical_record_menstrual_history` (`menstrual_history_id`),
  ADD KEY `fk_clinical_record_family_medical_history` (`family_medical_history_id`),
  ADD KEY `fk_clinical_record_diagnosis` (`diagnosis_id`),
  ADD KEY `fk_clinical_record_pregnancy_history` (`pregnancy_history_id`);

--
-- Indexes for table `citizen_history`
--
ALTER TABLE `citizen_history`
  ADD PRIMARY KEY (`history_id`),
  ADD KEY `citizen_history_medicalstaff_staff_id` (`staff_id`),
  ADD KEY `fk_citizen_history_citizen` (`family_id`);

--
-- Indexes for table `medicalstaff`
--
ALTER TABLE `medicalstaff`
  ADD PRIMARY KEY (`staff_id`),
  ADD KEY `fk_medicalstaff_accessibility` (`accessibility_id`);

--
-- Indexes for table `medicalstaff_accessbility`
--
ALTER TABLE `medicalstaff_accessbility`
  ADD PRIMARY KEY (`accessibility_id`),
  ADD KEY `fk_accessibility_medicalstaff` (`staff_id`) USING BTREE;

--
-- Indexes for table `medicalstaff_email_verification`
--
ALTER TABLE `medicalstaff_email_verification`
  ADD PRIMARY KEY (`token`),
  ADD KEY `fk_email_verification_medicalstaff` (`staff_id`);

--
-- Indexes for table `medicalstaff_history`
--
ALTER TABLE `medicalstaff_history`
  ADD PRIMARY KEY (`history_id`),
  ADD KEY `medicalstaff_staff_id` (`staff_id`),
  ADD KEY `citizen_citizen_family_id` (`citizen_family_id`);

--
-- Indexes for table `messaging`
--
ALTER TABLE `messaging`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `receiver_id` (`receiver_id`),
  ADD KEY `sender_id` (`sender_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `staff_id` (`staff_id`);

--
-- Indexes for table `patient_queue`
--
ALTER TABLE `patient_queue`
  ADD PRIMARY KEY (`queue_number`),
  ADD KEY `fk_patient_queue_citizen` (`citizen_family_id`);

--
-- Indexes for table `pharmacy_inventory`
--
ALTER TABLE `pharmacy_inventory`
  ADD PRIMARY KEY (`item_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `appointment_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ccr_diagnosis`
--
ALTER TABLE `ccr_diagnosis`
  MODIFY `diagnosis_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ccr_diagnosis_prescription`
--
ALTER TABLE `ccr_diagnosis_prescription`
  MODIFY `prescription_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ccr_family_medical_history`
--
ALTER TABLE `ccr_family_medical_history`
  MODIFY `family_medical_history_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ccr_menstrual_history`
--
ALTER TABLE `ccr_menstrual_history`
  MODIFY `menstrual_history_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ccr_past_medical_history`
--
ALTER TABLE `ccr_past_medical_history`
  MODIFY `past_medical_history_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ccr_pediatric_client`
--
ALTER TABLE `ccr_pediatric_client`
  MODIFY `pediatric_client_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ccr_pregnancy_history`
--
ALTER TABLE `ccr_pregnancy_history`
  MODIFY `pregnancy_history_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ccr_vital_signs`
--
ALTER TABLE `ccr_vital_signs`
  MODIFY `vital_signs_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `citizen_clinical_record`
--
ALTER TABLE `citizen_clinical_record`
  MODIFY `record_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `citizen_history`
--
ALTER TABLE `citizen_history`
  MODIFY `history_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `medicalstaff`
--
ALTER TABLE `medicalstaff`
  MODIFY `staff_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `medicalstaff_accessbility`
--
ALTER TABLE `medicalstaff_accessbility`
  MODIFY `accessibility_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `medicalstaff_history`
--
ALTER TABLE `medicalstaff_history`
  MODIFY `history_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `messaging`
--
ALTER TABLE `messaging`
  MODIFY `message_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `patient_queue`
--
ALTER TABLE `patient_queue`
  MODIFY `queue_number` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pharmacy_inventory`
--
ALTER TABLE `pharmacy_inventory`
  MODIFY `item_id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `constraint_municipal_citizens_citizen_family_id_FK_appointmentid` FOREIGN KEY (`citizen_id`) REFERENCES `citizen` (`citizen_family_id`);

--
-- Constraints for table `ccr_diagnosis`
--
ALTER TABLE `ccr_diagnosis`
  ADD CONSTRAINT `fk_diagnosis_citizen_clinical_record` FOREIGN KEY (`record_id`) REFERENCES `citizen_clinical_record` (`record_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_diagnosis_prescription` FOREIGN KEY (`prescription_id`) REFERENCES `ccr_diagnosis_prescription` (`prescription_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `ccr_diagnosis_prescription`
--
ALTER TABLE `ccr_diagnosis_prescription`
  ADD CONSTRAINT `fk_prescription_diagnosis` FOREIGN KEY (`diagnosis_id`) REFERENCES `ccr_diagnosis` (`diagnosis_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_prescription_pharmacy_inventory` FOREIGN KEY (`item_id`) REFERENCES `pharmacy_inventory` (`item_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `ccr_family_medical_history`
--
ALTER TABLE `ccr_family_medical_history`
  ADD CONSTRAINT `fk_family_medical_history_citizen_clinical_record` FOREIGN KEY (`record_id`) REFERENCES `citizen_clinical_record` (`record_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `ccr_menstrual_history`
--
ALTER TABLE `ccr_menstrual_history`
  ADD CONSTRAINT `fk_menstrual_history_citizen_clinical_record` FOREIGN KEY (`record_id`) REFERENCES `citizen_clinical_record` (`record_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `ccr_past_medical_history`
--
ALTER TABLE `ccr_past_medical_history`
  ADD CONSTRAINT `fk_past_medical_history_citizen_clinical_record` FOREIGN KEY (`record_id`) REFERENCES `citizen_clinical_record` (`record_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `ccr_pediatric_client`
--
ALTER TABLE `ccr_pediatric_client`
  ADD CONSTRAINT `fk_pediatric_client_citizen_clinical_record` FOREIGN KEY (`record_id`) REFERENCES `citizen_clinical_record` (`record_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `ccr_pregnancy_history`
--
ALTER TABLE `ccr_pregnancy_history`
  ADD CONSTRAINT `fk_pregnancy_history_citizen_clinical_record` FOREIGN KEY (`record_id`) REFERENCES `citizen_clinical_record` (`record_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `ccr_vital_signs`
--
ALTER TABLE `ccr_vital_signs`
  ADD CONSTRAINT `fk_vital_signs` FOREIGN KEY (`record_id`) REFERENCES `citizen_clinical_record` (`record_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `citizen_clinical_record`
--
ALTER TABLE `citizen_clinical_record`
  ADD CONSTRAINT `fk_clinical_record_ccr_vital_signs` FOREIGN KEY (`vital_signs_id`) REFERENCES `ccr_vital_signs` (`vital_signs_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_clinical_record_citizen` FOREIGN KEY (`citizen_family_id`) REFERENCES `citizen` (`citizen_family_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_clinical_record_diagnosis` FOREIGN KEY (`diagnosis_id`) REFERENCES `ccr_diagnosis` (`diagnosis_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_clinical_record_family_medical_history` FOREIGN KEY (`family_medical_history_id`) REFERENCES `ccr_family_medical_history` (`family_medical_history_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_clinical_record_medicalstaff` FOREIGN KEY (`staff_id`) REFERENCES `medicalstaff` (`staff_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_clinical_record_menstrual_history` FOREIGN KEY (`menstrual_history_id`) REFERENCES `ccr_menstrual_history` (`menstrual_history_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_clinical_record_past_medical_history` FOREIGN KEY (`past_medical_history_id`) REFERENCES `ccr_past_medical_history` (`past_medical_history_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_clinical_record_pediatric_client` FOREIGN KEY (`pediatric_client_id`) REFERENCES `ccr_pediatric_client` (`pediatric_client_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_clinical_record_pregnancy_history` FOREIGN KEY (`pregnancy_history_id`) REFERENCES `ccr_pregnancy_history` (`pregnancy_history_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `citizen_history`
--
ALTER TABLE `citizen_history`
  ADD CONSTRAINT `fk_citizen_history_citizen` FOREIGN KEY (`family_id`) REFERENCES `citizen` (`citizen_family_id`),
  ADD CONSTRAINT `fk_citizen_history_medicalstaff` FOREIGN KEY (`staff_id`) REFERENCES `medicalstaff` (`staff_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `medicalstaff`
--
ALTER TABLE `medicalstaff`
  ADD CONSTRAINT `fk_medicalstaff_accessibility` FOREIGN KEY (`accessibility_id`) REFERENCES `medicalstaff_accessbility` (`accessibility_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `medicalstaff_accessbility`
--
ALTER TABLE `medicalstaff_accessbility`
  ADD CONSTRAINT `fk_accessibility_medicalstaff` FOREIGN KEY (`staff_id`) REFERENCES `medicalstaff` (`staff_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `medicalstaff_email_verification`
--
ALTER TABLE `medicalstaff_email_verification`
  ADD CONSTRAINT `fk_email_verification_medicalstaff` FOREIGN KEY (`staff_id`) REFERENCES `medicalstaff` (`staff_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `medicalstaff_history`
--
ALTER TABLE `medicalstaff_history`
  ADD CONSTRAINT `fk_history_citizen` FOREIGN KEY (`citizen_family_id`) REFERENCES `citizen` (`citizen_family_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_history_medicalstaff` FOREIGN KEY (`staff_id`) REFERENCES `medicalstaff` (`staff_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `messaging`
--
ALTER TABLE `messaging`
  ADD CONSTRAINT `messaging_ibfk_1` FOREIGN KEY (`receiver_id`) REFERENCES `medicalstaff` (`staff_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `messaging_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `medicalstaff` (`staff_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`staff_id`) REFERENCES `medicalstaff` (`staff_id`);

--
-- Constraints for table `patient_queue`
--
ALTER TABLE `patient_queue`
  ADD CONSTRAINT `fk_patient_queue_citizen` FOREIGN KEY (`citizen_family_id`) REFERENCES `citizen` (`citizen_family_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
