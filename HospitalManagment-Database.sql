-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 26, 2023 at 02:00 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hospital_service_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `app_id` bigint(20) NOT NULL,
  `available_date` varchar(255) DEFAULT NULL,
  `available_time` varchar(255) DEFAULT NULL,
  `doctor_charge` decimal(38,2) DEFAULT NULL,
  `doctor_name` varchar(255) DEFAULT NULL,
  `doctor_room` int(11) DEFAULT NULL,
  `doctor_specialization` varchar(255) DEFAULT NULL,
  `hospital_charge` decimal(38,2) DEFAULT NULL,
  `patient_age` int(11) DEFAULT NULL,
  `patient_email` varchar(255) DEFAULT NULL,
  `patient_gender` varchar(255) DEFAULT NULL,
  `patient_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`app_id`, `available_date`, `available_time`, `doctor_charge`, `doctor_name`, `doctor_room`, `doctor_specialization`, `hospital_charge`, `patient_age`, `patient_email`, `patient_gender`, `patient_name`) VALUES
(1, '2023-11-23', '20:30', 2000.50, 'Thirasara Liyanage', 1000, 'Physician', 1000.50, 23, 'kavin@gmail.com', 'male', 'Kavin Eksith'),
(4, '2023-11-23', '16:25', 3500.00, 'Dr. Kamal Perera', 13, 'Psychology', 1300.00, 22, 'kaveesh@gmail.com', 'male', 'Bhashitha Kaveesh'),
(5, '2023-11-23', '20:30', 2000.50, 'Thirasara Liyanage', 1000, 'Physician', 1000.50, 12, 'amaya@gmail.com', 'female', 'Amaya Perera'),
(6, '2023-11-23', '18:30', 1500.00, 'Kapila Perera', 100, 'Psychology', 2000.00, 22, 'kaveesh@gmail.com', 'male', 'Bhashitha Kaveesh'),
(7, '2023-08-23', '19:30', 3500.00, 'Dr. Kamal Perera', 13, 'Psychology', 1000.00, 23, 'kavin@gmail.com', 'male', 'Kavin Eksith'),
(8, '2023-10-23', '20:15', 3500.00, 'Dr. Kamal Perera', 13, 'Psychology', 1000.00, 22, 'thirasara@gmail.com', 'female', 'Thirasara Liyange');

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `d_id` bigint(20) NOT NULL,
  `doctor_charge` decimal(38,2) DEFAULT NULL,
  `doctor_email` varchar(255) DEFAULT NULL,
  `doctor_id` varchar(255) DEFAULT NULL,
  `doctor_name` varchar(255) DEFAULT NULL,
  `doctor_room` int(11) DEFAULT NULL,
  `doctor_specialization` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`d_id`, `doctor_charge`, `doctor_email`, `doctor_id`, `doctor_name`, `doctor_room`, `doctor_specialization`) VALUES
(6, 3500.00, 'kamal@gmail.com', 'DOC101', 'Dr. Kamal Perera', 13, 'Psychology'),
(7, 2000.50, 'thirasara@gmail.com', 'DOC102', 'Thirasara Liyanage', 1000, 'Physician'),
(8, 1500.00, 'kapila@gmail.com', 'D100', 'Kapila Perera', 100, 'Psychology');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_request`
--

CREATE TABLE `doctor_request` (
  `req_id` bigint(20) NOT NULL,
  `doctor_name` varchar(255) DEFAULT NULL,
  `part_of_body` varchar(255) DEFAULT NULL,
  `patient_age` int(11) DEFAULT NULL,
  `patient_email` varchar(255) DEFAULT NULL,
  `patient_gender` varchar(255) DEFAULT NULL,
  `patient_name` varchar(255) DEFAULT NULL,
  `report_type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor_request`
--

INSERT INTO `doctor_request` (`req_id`, `doctor_name`, `part_of_body`, `patient_age`, `patient_email`, `patient_gender`, `patient_name`, `report_type`) VALUES
(2, 'Thirasara Liyanage', 'Legn', 23, 'kavin@gmail.com', 'male', 'Kavin Eksith', 'MRI Scan');

-- --------------------------------------------------------

--
-- Table structure for table `drug`
--

CREATE TABLE `drug` (
  `drug_id` bigint(20) NOT NULL,
  `drug_added_date` varchar(255) DEFAULT NULL,
  `drug_charge` decimal(38,2) DEFAULT NULL,
  `drug_name` varchar(255) DEFAULT NULL,
  `drug_quantity` int(11) DEFAULT NULL,
  `drug_status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `drug`
--

INSERT INTO `drug` (`drug_id`, `drug_added_date`, `drug_charge`, `drug_name`, `drug_quantity`, `drug_status`) VALUES
(4, '2023-11-23', 30.00, 'Paracitomole', 200, 'Cool and dry'),
(5, '2023-11-23', 45.00, 'Amoxilline', 400, 'Hot and dry'),
(6, '2023-11-24', 35.50, 'Repedeene', 250, 'Cool'),
(7, '2023-11-12', 5.75, 'Citracine', 400, 'Cool and dry'),
(8, '2023-12-12', 350.00, 'Salbitamole', 250, 'Cool and dry'),
(9, '2023-11-24', 230.00, 'Penisilene', 1000, 'Cool');

-- --------------------------------------------------------

--
-- Table structure for table `medical_report`
--

CREATE TABLE `medical_report` (
  `mrid` bigint(20) NOT NULL,
  `patient_age` int(11) DEFAULT NULL,
  `patient_email` varchar(255) DEFAULT NULL,
  `patient_gender` varchar(255) DEFAULT NULL,
  `patient_name` varchar(255) DEFAULT NULL,
  `report_charge` decimal(38,2) DEFAULT NULL,
  `report_date` varchar(255) DEFAULT NULL,
  `report_type` varchar(255) DEFAULT NULL,
  `sample_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medical_report`
--

INSERT INTO `medical_report` (`mrid`, `patient_age`, `patient_email`, `patient_gender`, `patient_name`, `report_charge`, `report_date`, `report_type`, `sample_id`) VALUES
(7, 44, 'theja@gmail.com', 'Male', 'Theja Rathnaweera', 1500.00, '2023-11-22', 'US Scan', 'No'),
(10, 23, 'thirasara@gmail.com', 'Female', 'Thirasara Liyange', 3000.00, '2023-11-22', 'Urine Test for albumine', 'SAM120'),
(11, 22, 'kaveesh@gmail.com', 'Male', 'Bhashitha Kaveesh', 1000.00, '2023-10-22', 'ECG Report', 'SAM120'),
(12, 23, 'kavin@gmail.com', 'Male', 'Kavin Eksith', 3000.00, '2023-08-22', 'Urine Test for albumine', 'No'),
(13, 12, 'amaya@gmail.com', 'Female', 'Amaya Perera', 3000.00, '2023-12-22', 'Blood Type Report', 'SAM120');

-- --------------------------------------------------------

--
-- Table structure for table `nurse_appoint`
--

CREATE TABLE `nurse_appoint` (
  `na_id` bigint(20) NOT NULL,
  `added_date` varchar(255) DEFAULT NULL,
  `appointed_doctor` varchar(255) DEFAULT NULL,
  `appointed_time` varchar(255) DEFAULT NULL,
  `nurse_email` varchar(255) DEFAULT NULL,
  `room_number` int(11) DEFAULT NULL,
  `user_role` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nurse_appoint`
--

INSERT INTO `nurse_appoint` (`na_id`, `added_date`, `appointed_doctor`, `appointed_time`, `nurse_email`, `room_number`, `user_role`) VALUES
(2, '2023-11-12', 'Thirasara Liyanage', '12:30', 'ashna@gmail.com', 100, 'Ashna Ashna');

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `p_id` bigint(20) NOT NULL,
  `date_check_in` datetime(6) DEFAULT NULL,
  `opd_charge` varchar(255) DEFAULT NULL,
  `patient_age` int(11) DEFAULT NULL,
  `patient_email` varchar(255) DEFAULT NULL,
  `patient_gender` varchar(255) DEFAULT NULL,
  `patient_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`p_id`, `date_check_in`, `opd_charge`, `patient_age`, `patient_email`, `patient_gender`, `patient_name`) VALUES
(1, '2023-11-18 16:00:00.000000', '500.00', 44, 'theja@gmail.com', 'female', 'Theja Rathnaweera'),
(2, '2023-11-22 16:00:00.000000', '1000.00', 13, 'amaya@gmail.com', 'female', 'Anudi Amaya'),
(4, '2023-08-09 17:00:00.000000', '500.00', 22, 'kaveesh@gmail.com', 'male', 'Bhashitha Kaveesh'),
(5, '2023-09-09 17:00:00.000000', '500.00', 23, 'kavin@gmail.com', 'male', 'Kavin Eksith'),
(6, '2023-10-09 17:00:00.000000', '500.00', 22, 'thirasara@gmail.com', 'female', 'Thirasara Liyange'),
(7, '2023-11-09 16:00:00.000000', '1000.00', 12, 'amaya@gmail.com', 'female', 'Amaya Perera'),
(8, '2023-07-09 17:00:00.000000', '500.00', 44, 'theja@gmail.com', 'male', 'Theja Rathnaweera'),
(9, '2023-08-09 17:00:00.000000', '500.00', 28, 'deshani@gmail.com', 'female', 'Deshani Perera'),
(10, '2023-09-09 17:00:00.000000', '500.00', 25, 'harsha@gmail.com', 'male', 'Harsha Perera'),
(11, '2023-06-09 17:00:00.000000', '500.00', 28, 'hiranya@gmail.com', 'male', 'Hiranya Devindra');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `pay_id` bigint(20) NOT NULL,
  `doctor_charges` decimal(38,2) DEFAULT NULL,
  `hospital_charge` decimal(38,2) DEFAULT NULL,
  `other_charges` decimal(38,2) DEFAULT NULL,
  `patient_email` varchar(255) DEFAULT NULL,
  `patient_name` varchar(255) DEFAULT NULL,
  `payment_date` varchar(255) DEFAULT NULL,
  `service_type` varchar(255) DEFAULT NULL,
  `total_charge` decimal(38,2) DEFAULT NULL,
  `report_charge` decimal(38,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`pay_id`, `doctor_charges`, `hospital_charge`, `other_charges`, `patient_email`, `patient_name`, `payment_date`, `service_type`, `total_charge`, `report_charge`) VALUES
(6, 2000.50, 1000.50, NULL, 'kavin@gmail.com', 'Kavin Eksith', '2023-11-12', 'channeling', NULL, NULL),
(7, 500.00, 200.00, 100.00, 'theja@gmail.com', 'Theja Rathnaweera', '2023-12-12', 'opd', NULL, 1000.00),
(8, NULL, 1500.00, NULL, 'amaya@gmail.com', 'Amaya Perera', '2023-11-12', 'test', NULL, 3000.00);

-- --------------------------------------------------------

--
-- Table structure for table `prescription`
--

CREATE TABLE `prescription` (
  `p_rec_id` bigint(20) NOT NULL,
  `doctor_name` varchar(255) DEFAULT NULL,
  `doctor_note` varchar(255) DEFAULT NULL,
  `drug01` varchar(255) DEFAULT NULL,
  `drug02` varchar(255) DEFAULT NULL,
  `drug03` varchar(255) DEFAULT NULL,
  `drug04` varchar(255) DEFAULT NULL,
  `drug05` varchar(255) DEFAULT NULL,
  `drug06` varchar(255) DEFAULT NULL,
  `drug07` varchar(255) DEFAULT NULL,
  `drug08` varchar(255) DEFAULT NULL,
  `drug09` varchar(255) DEFAULT NULL,
  `drug10` varchar(255) DEFAULT NULL,
  `patient_age` int(11) DEFAULT NULL,
  `patient_diagnosis` varchar(255) DEFAULT NULL,
  `patient_email` varchar(255) DEFAULT NULL,
  `patient_gender` varchar(255) DEFAULT NULL,
  `patient_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prescription`
--

INSERT INTO `prescription` (`p_rec_id`, `doctor_name`, `doctor_note`, `drug01`, `drug02`, `drug03`, `drug04`, `drug05`, `drug06`, `drug07`, `drug08`, `drug09`, `drug10`, `patient_age`, `patient_diagnosis`, `patient_email`, `patient_gender`, `patient_name`) VALUES
(2, 'Dr. Davis', 'Recommended lifestyle changes and medication', 'Losartan', 'Hydrochlorothiazide', 'Lisinopril', 'Ibuprofen', 'Aspirin', 'Ibuprofen', 'Aspirin', 'Ibuprofen', 'Aspirin', 'Ibuprofen', 45, 'Hypertension', 'john.doe@example.com', 'Male', 'John Doe'),
(3, 'Dr. Johnson', 'Prescribed rest and fluids', 'Losartan', 'Hydrochlorothiazide', 'Lisinopril', 'Ibuprofen', 'Aspirin', 'Ibuprofen', 'Aspirin', 'Ibuprofen', 'Aspirin', 'Ibuprofen', 28, 'Common Cold', 'eva.smith@example.com', 'Female', 'Eva Smith'),
(9, 'Saman Kumara', 'Don\'t eat fatty and oily food', 'Paracitomole', 'Amoxilline', 'Repedeene', 'Citracine', 'Paracitomole', 'Paracitomole', 'Paracitomole', 'Paracitomole', 'Repedeene', 'Citracine', 23, 'Cholesterol ', 'kavin@gmail.com', NULL, 'Kavin Eksith'),
(12, 'Ama Silwa', 'don\'t drink cold water', 'Paracitomole', 'Paracitomole', 'Paracitomole', 'Paracitomole', 'Paracitomole', 'Paracitomole', 'Paracitomole', 'Paracitomole', 'Paracitomole', 'Citracine', 12, 'Couch', 'amaya@gmail.com', NULL, 'Amaya Perera');

-- --------------------------------------------------------

--
-- Table structure for table `schedule_doctor`
--

CREATE TABLE `schedule_doctor` (
  `sch_id` bigint(20) NOT NULL,
  `available_date` varchar(255) DEFAULT NULL,
  `available_time` varchar(255) DEFAULT NULL,
  `doctor_charge` decimal(38,2) DEFAULT NULL,
  `doctor_email` varchar(255) DEFAULT NULL,
  `doctor_name` varchar(255) DEFAULT NULL,
  `doctor_room` int(11) DEFAULT NULL,
  `doctor_specialization` varchar(255) DEFAULT NULL,
  `hospital_charge` decimal(38,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schedule_doctor`
--

INSERT INTO `schedule_doctor` (`sch_id`, `available_date`, `available_time`, `doctor_charge`, `doctor_email`, `doctor_name`, `doctor_room`, `doctor_specialization`, `hospital_charge`) VALUES
(1, '2023-11-23', NULL, 2000.50, 'thirasara@gmail.com', 'Thirasara Liyanage', 1000, 'Physician', NULL),
(2, '2023-11-23', '20:30', 2000.50, 'thirasara@gmail.com', 'Thirasara Liyanage', 1000, 'Physician', 1000.50),
(3, '2023-11-23', '16:25', 3500.00, 'kamal@gmail.com', 'Dr. Kamal Perera', 13, 'Psychology', 1300.00),
(4, '2023-10-23', '20:15', 3500.00, 'kamal@gmail.com', 'Dr. Kamal Perera', 13, 'Psychology', 1000.00),
(5, '2023-08-23', '19:30', 3500.00, 'kamal@gmail.com', 'Dr. Kamal Perera', 13, 'Psychology', 1000.00),
(6, '2023-11-23', '18:30', 1500.00, 'kapila@gmail.com', 'Kapila Perera', 100, 'Psychology', 2000.00);

-- --------------------------------------------------------

--
-- Table structure for table `system_user`
--

CREATE TABLE `system_user` (
  `su_id` bigint(20) NOT NULL,
  `system_user_name` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `user_password` varchar(255) DEFAULT NULL,
  `user_role` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `system_user`
--

INSERT INTO `system_user` (`su_id`, `system_user_name`, `user_email`, `user_id`, `user_password`, `user_role`) VALUES
(7, 'Dr.Kapila Perera', 'kapila@gmail.com', 'D100', 'kapila123', 'Doctor'),
(8, 'Thirasara Liyanage', 'thira@gmail.com', 'M100', 'thira123', 'Management'),
(9, 'Deshani Perera', 'deshani@gmail.com', 'P100', 'deshani123', 'Phamacy'),
(10, 'Kanchana Perera', 'kancha@gmail.com', 'L100', 'kancha123', 'Laboratory'),
(11, 'Ann Vihara', 'ann@gmail.com', 'R100', 'ann123', 'Receptionist'),
(12, 'Theja Rathnaweera', 'theja@gmail.com', 'A100', 'theja123', 'Admin'),
(13, 'Sumuduni Perera', 'sumudu@gmail.com', 'N100', 'sumudu123', 'Nurse'),
(14, 'Ashna Ashna', 'ashna@gmail.com', 'N101', 'ashna123', 'Nurse');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`app_id`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`d_id`);

--
-- Indexes for table `doctor_request`
--
ALTER TABLE `doctor_request`
  ADD PRIMARY KEY (`req_id`);

--
-- Indexes for table `drug`
--
ALTER TABLE `drug`
  ADD PRIMARY KEY (`drug_id`);

--
-- Indexes for table `medical_report`
--
ALTER TABLE `medical_report`
  ADD PRIMARY KEY (`mrid`);

--
-- Indexes for table `nurse_appoint`
--
ALTER TABLE `nurse_appoint`
  ADD PRIMARY KEY (`na_id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`p_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`pay_id`);

--
-- Indexes for table `prescription`
--
ALTER TABLE `prescription`
  ADD PRIMARY KEY (`p_rec_id`);

--
-- Indexes for table `schedule_doctor`
--
ALTER TABLE `schedule_doctor`
  ADD PRIMARY KEY (`sch_id`);

--
-- Indexes for table `system_user`
--
ALTER TABLE `system_user`
  ADD PRIMARY KEY (`su_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `app_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `d_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `doctor_request`
--
ALTER TABLE `doctor_request`
  MODIFY `req_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `drug`
--
ALTER TABLE `drug`
  MODIFY `drug_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `medical_report`
--
ALTER TABLE `medical_report`
  MODIFY `mrid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `nurse_appoint`
--
ALTER TABLE `nurse_appoint`
  MODIFY `na_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `p_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `pay_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `prescription`
--
ALTER TABLE `prescription`
  MODIFY `p_rec_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `schedule_doctor`
--
ALTER TABLE `schedule_doctor`
  MODIFY `sch_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `system_user`
--
ALTER TABLE `system_user`
  MODIFY `su_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
