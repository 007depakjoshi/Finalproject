-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 11, 2022 at 08:35 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bookmyvenue`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendees`
--

CREATE TABLE `attendees` (
  `attendees_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `booking_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `eve_date` datetime NOT NULL,
  `status` enum('P','A','D','R') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `phone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customer_id`, `name`, `email`, `password`, `phone`) VALUES
(1, 'ustat', 'ustat@test.com', '123456', '1254587456'),
(2, 'test', 'check@test.com', '123456', '1253548756'),
(3, '', '', '', ''),
(4, 'test', 'check@test.com', '123456', '1253548756');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `event_id` int(11) NOT NULL,
  `venue_id` int(11) NOT NULL,
  `manager_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `date` date NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`event_id`, `venue_id`, `manager_id`, `customer_id`, `title`, `description`, `date`, `price`) VALUES
(1, 1, 1, 1, 'DOWNTOWN KITCHENER RIBFEST & CRAFT BEER SHOW', 'Celebrate the BEST summer has to offer! Enjoy mouth-watering barbequed ribs and chicken, an incredible selection of Ontario craft-brewed beer, plus live entertainment and a Kids Fun Zone – all in the open atmosphere of Victoria Park.\r\n\r\nLife doesn’t get much better!\r\n\r\nThe Downtown Kitchener Ribfest & Craft Beer Show is an annual, three-day festival which takes place in Victoria Park. In past years, The Downtown Kitchener Ribfest & Craft Beer Show has partnered with Bikecheck by City of Kitchener so attendees can leave their bike safe and secure while enjoying the event as well as with the University of Waterloo Men’s and Women’s Rugby Teams to provide team funding in exchange for volunteer work at the show. The event has also implemented a Green Management program, which diverted 74% of public waste from landfills in 2019.', '2022-08-25', 60),
(2, 2, 1, 1, 'The Kitchener Blues Festival', 'The TD Kitchener Blues Festival Gospel Breakfast is a crowd favourite, as community members come together to enjoy a free Pancake Breakfast thanks to our friends at the Downtown Kitchener BIA. \r\nAnd because of it\'s great popularity we\'re moving the event this year to Victoria Park. \r\n\r\nCome down on Sunday morning on August 7th to share in the fun!\r\n\r\nGates open at 9:30am.', '2022-07-15', 80);

-- --------------------------------------------------------

--
-- Table structure for table `event_manager`
--

CREATE TABLE `event_manager` (
  `manager_id` int(11) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `phone` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `image_bucket`
--

CREATE TABLE `image_bucket` (
  `image_bucket_id` int(11) NOT NULL,
  `venue_id` int(11) DEFAULT NULL,
  `evnet_id` int(11) DEFAULT NULL,
  `image` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `manager_event`
--

CREATE TABLE `manager_event` (
  `manager_event_id` int(11) NOT NULL,
  `manger_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `manager_venue`
--

CREATE TABLE `manager_venue` (
  `manager_venue_id` int(11) NOT NULL,
  `venue_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payment_id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `venue`
--

CREATE TABLE `venue` (
  `venu_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `location` varchar(20) NOT NULL,
  `address` text NOT NULL,
  `facilites` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `venue_owner`
--

CREATE TABLE `venue_owner` (
  `owner_id` int(11) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `phone` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendees`
--
ALTER TABLE `attendees`
  ADD PRIMARY KEY (`attendees_id`);

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`event_id`);

--
-- Indexes for table `event_manager`
--
ALTER TABLE `event_manager`
  ADD PRIMARY KEY (`manager_id`);

--
-- Indexes for table `image_bucket`
--
ALTER TABLE `image_bucket`
  ADD PRIMARY KEY (`image_bucket_id`);

--
-- Indexes for table `manager_event`
--
ALTER TABLE `manager_event`
  ADD PRIMARY KEY (`manager_event_id`);

--
-- Indexes for table `manager_venue`
--
ALTER TABLE `manager_venue`
  ADD PRIMARY KEY (`manager_venue_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payment_id`);

--
-- Indexes for table `venue`
--
ALTER TABLE `venue`
  ADD PRIMARY KEY (`venu_id`);

--
-- Indexes for table `venue_owner`
--
ALTER TABLE `venue_owner`
  ADD PRIMARY KEY (`owner_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendees`
--
ALTER TABLE `attendees`
  MODIFY `attendees_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `event_manager`
--
ALTER TABLE `event_manager`
  MODIFY `manager_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `image_bucket`
--
ALTER TABLE `image_bucket`
  MODIFY `image_bucket_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `manager_event`
--
ALTER TABLE `manager_event`
  MODIFY `manager_event_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `manager_venue`
--
ALTER TABLE `manager_venue`
  MODIFY `manager_venue_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `venue`
--
ALTER TABLE `venue`
  MODIFY `venu_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `venue_owner`
--
ALTER TABLE `venue_owner`
  MODIFY `owner_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
