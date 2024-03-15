-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 18, 2023 at 03:14 PM
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
-- Database: `estate`
--

-- --------------------------------------------------------

--
-- Table structure for table `esm_admins`
--

CREATE TABLE `esm_admins` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT 'Unknow',
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `profile_image` varchar(255) NOT NULL DEFAULT 'default_profile_image.png',
  `address` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `esm_admins`
--

INSERT INTO `esm_admins` (`id`, `name`, `email`, `phone`, `profile_image`, `address`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'Ashraful Islam', 'isheiblu@gmail.com', '01671794064', '1678506812898-dr push.png', '', 1, 1, 1, '2022-01-11 17:15:01', '2023-03-11 03:53:32');

-- --------------------------------------------------------

--
-- Table structure for table `esm_areas`
--

CREATE TABLE `esm_areas` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT 'Unknown',
  `parent_id` int(11) NOT NULL DEFAULT 0,
  `child_id` int(11) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `esm_areas`
--

INSERT INTO `esm_areas` (`id`, `title`, `parent_id`, `child_id`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'Dhaka', 0, 0, 1, 1, 1, '2023-03-25 11:28:26', '2023-03-25 13:23:41'),
(2, 'Chittagong', 0, 0, 1, 1, 1, '2023-03-25 11:28:36', '2023-03-25 11:28:36'),
(3, 'Gazipur', 1, 0, 1, 1, 1, '2023-03-25 11:28:52', '2023-03-25 12:25:09'),
(4, 'Faridpur', 1, 0, 1, 1, 1, '2023-03-25 11:29:39', '2023-03-25 12:23:38'),
(5, 'Vanga', 1, 4, 1, 1, 1, '2023-03-25 11:34:28', '2023-03-25 12:23:38'),
(6, 'Chowrasta', 1, 3, 1, 1, 1, '2023-03-25 11:35:56', '2023-03-25 12:25:12'),
(7, 'Ctg Town', 2, 0, 1, 1, 1, '2023-03-25 11:36:57', '2023-03-25 11:36:57'),
(8, 'Bohoddarhut', 2, 7, 1, 1, 1, '2023-03-25 11:37:24', '2023-03-25 11:37:24'),
(13, 'Gulshan', 1, 0, 1, 1, 1, '2023-10-13 19:30:04', '2023-10-13 19:30:04');

-- --------------------------------------------------------

--
-- Table structure for table `esm_banners`
--

CREATE TABLE `esm_banners` (
  `id` int(11) NOT NULL,
  `banner_type` int(11) NOT NULL DEFAULT 0 COMMENT '1: left, 2: right, 3: middle, 4 : Home',
  `from_date` date DEFAULT NULL,
  `to_date` date DEFAULT NULL,
  `image` varchar(255) NOT NULL DEFAULT 'default_image.png',
  `details` text NOT NULL DEFAULT '\'#\'' COMMENT 'now use for link',
  `status` int(11) NOT NULL DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `esm_banners`
--

INSERT INTO `esm_banners` (`id`, `banner_type`, `from_date`, `to_date`, `image`, `details`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(11, 3, '2023-05-01', '2023-07-31', '1685301000561-cover1.jpg', '', 0, 1, 1, '2023-05-29 01:10:00', '2023-10-13 20:37:12'),
(12, 3, '2023-06-01', '2023-06-28', '1685301102289-cover2.jpg', '', 0, 1, 1, '2023-05-29 01:11:42', '2023-10-13 20:37:15'),
(13, 3, '2023-05-01', '2023-05-12', '1685301263261-20822109.jpg', '', 0, 1, 1, '2023-05-29 01:14:23', '2023-10-13 20:37:17'),
(14, 2, '2023-05-01', '2023-05-31', '1685301343852-344241058_1262825987651288_6123855043788802573_n.jpg', '', 0, 1, 1, '2023-05-29 01:15:43', '2023-10-13 20:37:43'),
(15, 2, '2023-05-01', '2023-07-27', '1685301389157-data-structure-word-cloud-concept-grey-background-90729928.jpg', '', 0, 1, 1, '2023-05-29 01:16:29', '2023-11-17 00:36:58'),
(16, 3, '2023-10-12', '2023-10-31', '1697207578658-fitted (5).jpg', '', 1, 1, 1, '2023-10-13 20:32:58', '2023-10-13 20:32:58'),
(17, 3, '2023-10-13', '2023-10-31', '1697207673099-fitted (4).jpg', '', 1, 1, 1, '2023-10-13 20:34:33', '2023-10-13 20:34:33'),
(18, 4, '2023-10-13', '2023-10-30', '1697207691718-header-logo2.png', '', 1, 1, 1, '2023-10-13 20:34:51', '2023-11-17 00:37:03'),
(19, 4, '2023-11-01', '2023-12-28', '1700160352796-IMG_20231104_155154.jpg', '#', 1, 1, 1, '2023-11-17 00:45:52', '2023-11-17 01:39:51');

-- --------------------------------------------------------

--
-- Table structure for table `esm_blogs`
--

CREATE TABLE `esm_blogs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT 'Unknown',
  `details` text DEFAULT NULL,
  `image` varchar(255) NOT NULL DEFAULT 'default_image.png',
  `status` int(11) NOT NULL DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `esm_blogs`
--

INSERT INTO `esm_blogs` (`id`, `title`, `details`, `image`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'New Blog', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida quis libero eleifend ornare. Maecenas mattis enim at arcu feugiat, sit amet blandit nisl iaculis. Donec lacus odio, malesuada eu libero sit amet, congue aliquam leo. In hac habitasse platea dictumst.', '1667154792879-284305072_5319473641425402_2517996224778736487_n.jpeg', 0, 1, 1, '2022-10-31 00:33:12', '2022-10-31 00:35:30'),
(2, 'Temper', 'Details this is', '1669741764490-WhatsApp Image 2022-11-20 at 16.40.45.jpeg', 1, 1, 1, '2022-10-31 00:33:52', '2022-11-29 23:09:24'),
(3, 'Design and Development2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida quis libero eleifend ornare. Maecenas mattis enim at arcu feugiat, sit amet blandit nisl iaculis. Donec lacus odio, malesuada eu libero sit amet, congue aliquam leo. In hac habitasse platea dictumst.', '1677555837970-pack1.png', 1, 1, 1, '2023-02-28 09:43:57', '2023-02-28 09:43:57');

-- --------------------------------------------------------

--
-- Table structure for table `esm_categories`
--

CREATE TABLE `esm_categories` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT 'Unknown',
  `sub_title` text NOT NULL DEFAULT ' ',
  `status` int(11) NOT NULL DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `esm_categories`
--

INSERT INTO `esm_categories` (`id`, `title`, `sub_title`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'Apartment', ' Best deals for your dream apartment.', 1, NULL, NULL, '2022-11-15 10:02:42', '2023-10-20 11:33:05'),
(2, 'Commercial', ' Unlock opportunities in prime commercial spaces.', 1, NULL, NULL, '2022-11-15 10:02:53', '2023-10-20 11:06:09'),
(3, 'Hotel/ Resort', ' Experience luxury getaways.', 1, NULL, NULL, '2022-11-15 10:03:32', '2023-10-20 18:08:48'),
(4, 'House/ Building', ' Discover your dream home.', 1, NULL, NULL, '2022-11-15 10:03:32', '2023-10-20 18:08:54'),
(5, 'Land', ' Invest in exclusive land properties.', 1, NULL, NULL, '2022-11-15 10:04:04', '2023-10-20 19:25:52'),
(6, 'Sublet', ' Explore flexible living options.', 1, NULL, NULL, '2022-11-15 10:04:04', '2023-10-20 19:27:25');

-- --------------------------------------------------------

--
-- Table structure for table `esm_company_details`
--

CREATE TABLE `esm_company_details` (
  `id` int(11) NOT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `email` varchar(25) DEFAULT NULL,
  `phone` varchar(25) DEFAULT NULL,
  `fax` varchar(25) DEFAULT NULL,
  `fb_link` varchar(25) DEFAULT NULL,
  `twitter_link` varchar(25) DEFAULT NULL,
  `youtube_link` varchar(200) DEFAULT NULL,
  `youtube_video_key` varchar(200) DEFAULT NULL,
  `instagram` varchar(255) NOT NULL,
  `logo` varchar(255) NOT NULL DEFAULT 'default_image.png',
  `footer_one` text DEFAULT NULL,
  `footer_two` text DEFAULT NULL,
  `address` text DEFAULT NULL,
  `gps_coordinates` varchar(200) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `esm_company_details`
--

INSERT INTO `esm_company_details` (`id`, `company_name`, `email`, `phone`, `fax`, `fb_link`, `twitter_link`, `youtube_link`, `youtube_video_key`, `instagram`, `logo`, `footer_one`, `footer_two`, `address`, `gps_coordinates`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'Temper', 'estate@gmail.com', '01671794064', 'null', '', '', 'https://www.youtube.com/watch?v=kXYiU_JCYtU', 'null', 'https://www.instagram.com/', '1697187542603-header-logo2.png', '', 'null', 'Dhaka', '', 1, NULL, 1, '2022-11-20 17:37:20', '2023-11-18 19:24:42');

-- --------------------------------------------------------

--
-- Table structure for table `esm_contact_us`
--

CREATE TABLE `esm_contact_us` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT 'Unknown',
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(25) NOT NULL DEFAULT '0',
  `subject` varchar(255) NOT NULL DEFAULT 'Unknown',
  `message` text DEFAULT NULL,
  `is_read` int(11) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 1,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `esm_contact_us`
--

INSERT INTO `esm_contact_us` (`id`, `name`, `email`, `phone`, `subject`, `message`, `is_read`, `status`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'Mokbul khan', 'abc@gm.com', '01718909090', 'g', 'h', 1, 1, 1, '2023-02-28 10:23:05', '2023-10-13 15:38:52'),
(2, 'Mokbul khan', 'abc@gm.com', '01718909090', 'Great', 'h', 1, 1, 1, '2023-02-28 10:23:19', '2023-02-28 10:34:35'),
(3, 'kabir khan', 'dsdn@gm.com', '01718909099', 'Nice', 'jhiaoi', 0, 1, 1, '2023-02-28 10:23:41', '2023-02-28 10:36:16'),
(4, 'kabir khan', 'dsdn@gm.com', '01718909099', 'Nice', 'gthew', 1, 1, 1, '2023-02-28 10:24:07', '2023-02-28 10:35:08'),
(5, 'safsfg', 'sdfgsdgsd@gmail.com', '01675852884', 'ASFDFHFJ', 'sdgfsdgsdsF', 0, 1, NULL, '2023-10-20 13:11:20', '2023-10-20 13:11:20');

-- --------------------------------------------------------

--
-- Table structure for table `esm_favorites`
--

CREATE TABLE `esm_favorites` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `property_id` int(11) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `esm_favorites`
--

INSERT INTO `esm_favorites` (`id`, `user_id`, `property_id`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 8, 2, 0, 8, 8, '2023-02-04 08:15:08', '2023-02-04 08:15:19'),
(2, 8, 2, 0, 8, 8, '2023-02-04 08:15:24', '2023-02-04 14:16:45'),
(3, 8, 2, 1, 8, 8, '2023-02-04 14:16:54', '2023-02-04 14:16:54'),
(4, 8, 1, 0, 8, 8, '2023-02-04 14:17:03', '2023-02-04 14:26:19'),
(5, 8, 1, 0, 8, 8, '2023-02-04 14:26:22', '2023-02-04 14:26:31'),
(6, 8, 1, 1, 8, 8, '2023-02-04 14:27:02', '2023-02-04 14:33:12');

-- --------------------------------------------------------

--
-- Table structure for table `esm_indoor_amenities`
--

CREATE TABLE `esm_indoor_amenities` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `esm_indoor_amenities`
--

INSERT INTO `esm_indoor_amenities` (`id`, `title`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'Sink', 1, 1, 1, '2022-10-29 15:20:22', '2022-11-20 14:11:45'),
(2, 'Grill', 1, 1, 1, '2022-10-29 15:20:35', '2022-11-20 14:11:45'),
(3, 'AC', 1, 1, 1, '2022-10-29 15:23:59', '2022-10-29 15:23:59');

-- --------------------------------------------------------

--
-- Table structure for table `esm_inquiries`
--

CREATE TABLE `esm_inquiries` (
  `id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL DEFAULT 0,
  `sender_id` int(11) NOT NULL DEFAULT 0,
  `receiver_id` int(11) NOT NULL DEFAULT 0,
  `name` varchar(255) NOT NULL DEFAULT 'Unknown',
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(25) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `details` text DEFAULT NULL,
  `is_read` int(11) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `esm_inquiries`
--

INSERT INTO `esm_inquiries` (`id`, `property_id`, `sender_id`, `receiver_id`, `name`, `email`, `phone`, `address`, `details`, `is_read`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 1, 8, 1, 'Kabir khan', 'rawr@gm.com', '01718909090', 'abc', 'erf', 1, 1, 8, 1, '2023-02-04 06:48:02', '2023-05-26 18:31:04'),
(2, 2, 8, 1, 'Mokbul khan', 'abc@gm.com', '01718909090', 'good to go', 'hello', 0, 0, 8, 8, '2023-02-04 06:48:16', '2023-02-04 13:18:53'),
(3, 1, 8, 1, 'Azam khan', 'rawr@gm.com', '01718909090', 'good to go', 'erf', 0, 1, 8, 8, '2023-02-04 06:51:30', '2023-02-04 13:19:20');

-- --------------------------------------------------------

--
-- Table structure for table `esm_login_tracks`
--

CREATE TABLE `esm_login_tracks` (
  `id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `jwt_token` text NOT NULL,
  `login_device_info` text NOT NULL,
  `uuid` varchar(255) NOT NULL DEFAULT '',
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `esm_login_tracks`
--

INSERT INTO `esm_login_tracks` (`id`, `created_by`, `updated_by`, `user_id`, `jwt_token`, `login_device_info`, `uuid`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwic3RhdHVzIjoxLCJ1c2VyX2lkIjoxfSwidGltZV9wZXJpb2QiOjE2NjYyOTU0Mjk3NzEsImlkZW50aXR5X2lkIjoiYWEwMmQ3Y2EtNjQ0MS00MjFjLTllY2EtZWQ3OGFkNTM0NmViIiwiaWF0IjoxNjY2MjkxODI5LCJleHAiOjE2NjYzNzgyMjl9.WD7Xs3xJqwdVbya78fP1DkxEYtXsEbUoov43_KOKfxw', '{\"useragent\":\"PostmanRuntime/7.29.2\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.29.2\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', 'aa02d7ca-6441-421c-9eca-ed78ad5346eb', 1, '2022-10-20 20:50:29', '2022-10-20 20:50:29'),
(2, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwic3RhdHVzIjoxLCJ1c2VyX2lkIjoxfSwidGltZV9wZXJpb2QiOjE2NjY0NjcwNTcwNDQsImlkZW50aXR5X2lkIjoiYmEwZjczYTgtYWI2YS00YzA3LTk3ZDgtMjM5NTk5NzY1Yjc1IiwiaWF0IjoxNjY2NDYzNDU3LCJleHAiOjE2NjY1NDk4NTd9.iUpiUzlCfR-Ll1H3TGpTZNHPsifG7WHFivdpMHntJa8', '{\"useragent\":\"PostmanRuntime/7.29.2\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.29.2\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', 'ba0f73a8-ab6a-4c07-97d8-239599765b75', 1, '2022-10-22 20:30:57', '2022-10-22 20:30:57'),
(3, 8, 8, 8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiI1MmMyNjBhZGZiNGVjMjU3ZTA5NWNmODhmNGY1M2RmZSIsImVtYWlsIjoic2hvdm9uOEBnbWFpNi5jb20iLCJyb2xlIjp7InJvbGVfaWQiOjIsInJvbGVfbmFtZSI6ImFnZW50In0sInByb2ZpbGUiOnsibmFtZSI6IlNob3ZvbiAzIiwiZW1haWwiOiJzaG92b244QGdtYWk2LmNvbSIsInBob25lIjoiMDE2NzE3OTQwNjQiLCJwcm9maWxlX2ltYWdlIjoiZGVmYXVsdF9wcm9maWxlX2ltYWdlLnBuZyIsInN0YXR1cyI6MSwidXNlcl9pZCI6OH0sInRpbWVfcGVyaW9kIjoxNjY2NDY3OTY3MDAxLCJpZGVudGl0eV9pZCI6Ijk1MzY2NzdlLTI0ZmQtNDM5Ny1iZDQ3LTNkODUzYWNmM2I5NyIsImlhdCI6MTY2NjQ2NDM2NywiZXhwIjoxNjY2NTUwNzY3fQ.rySNH6URZdfwn_mWdMk5zPbpVDI8JOpuiksCtnPZ1C8', '{\"useragent\":\"PostmanRuntime/7.29.2\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.29.2\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '9536677e-24fd-4397-bd47-3d853acf3b97', 1, '2022-10-22 20:46:07', '2022-10-22 20:46:07'),
(4, 8, 8, 8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiI1MmMyNjBhZGZiNGVjMjU3ZTA5NWNmODhmNGY1M2RmZSIsImVtYWlsIjoic2hvdm9uOEBnbWFpNi5jb20iLCJyb2xlIjp7InJvbGVfaWQiOjIsInJvbGVfbmFtZSI6ImFnZW50In0sInByb2ZpbGUiOnsibmFtZSI6IlNob3ZvbiAzIiwiZW1haWwiOiJzaG92b244QGdtYWk2LmNvbSIsInBob25lIjoiMDE2NzE3OTQwNjQiLCJwcm9maWxlX2ltYWdlIjoiZGVmYXVsdF9wcm9maWxlX2ltYWdlLnBuZyIsInN0YXR1cyI6MSwidXNlcl9pZCI6OH0sInRpbWVfcGVyaW9kIjoxNjY2NDY4MzExNzg0LCJpZGVudGl0eV9pZCI6ImE1MzkzNmY0LWYzOTUtNDBiMC05YjJjLTY5YzI5YzZlZWU3MSIsImlhdCI6MTY2NjQ2NDcxMSwiZXhwIjoxNjY2NTUxMTExfQ.bXP6cipa2Rf5z_eyOEJp9B9fiNqfCFpRYZN1R8nVaDE', '{\"useragent\":\"PostmanRuntime/7.29.2\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.29.2\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', 'a53936f4-f395-40b0-9b2c-69c29c6eee71', 1, '2022-10-22 20:51:51', '2022-10-22 20:51:51'),
(5, 8, 8, 8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiI1MmMyNjBhZGZiNGVjMjU3ZTA5NWNmODhmNGY1M2RmZSIsImVtYWlsIjoic2hvdm9uOEBnbWFpNi5jb20iLCJyb2xlIjp7InJvbGVfaWQiOjIsInJvbGVfbmFtZSI6ImFnZW50In0sInByb2ZpbGUiOnsibmFtZSI6IlNob3ZvbiAzIiwiZW1haWwiOiJzaG92b244QGdtYWk2LmNvbSIsInBob25lIjoiMDE2NzE3OTQwNjQiLCJwcm9maWxlX2ltYWdlIjoiZGVmYXVsdF9wcm9maWxlX2ltYWdlLnBuZyIsInN0YXR1cyI6MSwidXNlcl9pZCI6OH0sInRpbWVfcGVyaW9kIjoxNjY2ODc2MDY5NjIyLCJpZGVudGl0eV9pZCI6IjNhMmUxYjY3LTAyOTMtNDE0Ny1iZmM3LTM1MGQxMjllNzBhZiIsImlhdCI6MTY2Njg3MjQ2OSwiZXhwIjoxNjY2OTU4ODY5fQ.4stvwBue2n1b-03SSejf8Vmh17Awo9lF5sIFnr4jBVA', '{\"useragent\":\"PostmanRuntime/7.29.2\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.29.2\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '3a2e1b67-0293-4147-bfc7-350d129e70af', 1, '2022-10-27 14:07:49', '2022-10-27 14:07:49'),
(6, 8, 8, 8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiI1MmMyNjBhZGZiNGVjMjU3ZTA5NWNmODhmNGY1M2RmZSIsImVtYWlsIjoic2hvdm9uOEBnbWFpNi5jb20iLCJyb2xlIjp7InJvbGVfaWQiOjIsInJvbGVfbmFtZSI6ImFnZW50In0sInByb2ZpbGUiOnsibmFtZSI6IlNob3ZvbiAzIiwiZW1haWwiOiJzaG92b244QGdtYWk2LmNvbSIsInBob25lIjoiMDE2NzE3OTQwNjQiLCJwcm9maWxlX2ltYWdlIjoiZGVmYXVsdF9wcm9maWxlX2ltYWdlLnBuZyIsInN0YXR1cyI6MSwidXNlcl9pZCI6OH0sInRpbWVfcGVyaW9kIjoxNjY2ODc2MTE5NDgyLCJpZGVudGl0eV9pZCI6ImUyNzNjN2Q1LWEzMDMtNGY2Zi1hOGE5LTZmMmVlM2I1YjMzNCIsImlhdCI6MTY2Njg3MjUxOSwiZXhwIjoxNjY2OTU4OTE5fQ.bpdvr-O7Jg9NomvA25yj-20aEuzyfInJUqxP7kn_z6c', '{\"useragent\":\"PostmanRuntime/7.29.2\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.29.2\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', 'e273c7d5-a303-4f6f-a8a9-6f2ee3b5b334', 1, '2022-10-27 14:08:39', '2022-10-27 14:08:39'),
(7, 8, 8, 8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiI1MmMyNjBhZGZiNGVjMjU3ZTA5NWNmODhmNGY1M2RmZSIsImVtYWlsIjoic2hvdm9uOEBnbWFpNi5jb20iLCJyb2xlIjp7InJvbGVfaWQiOjIsInJvbGVfbmFtZSI6ImFnZW50In0sInByb2ZpbGUiOnsibmFtZSI6IlNob3ZvbiAzIiwiZW1haWwiOiJzaG92b244QGdtYWk2LmNvbSIsInBob25lIjoiMDE2NzE3OTQwNjQiLCJwcm9maWxlX2ltYWdlIjoiZGVmYXVsdF9wcm9maWxlX2ltYWdlLnBuZyIsInN0YXR1cyI6MSwidXNlcl9pZCI6OH0sInRpbWVfcGVyaW9kIjoxNjY2ODc2MTM0NjI1LCJpZGVudGl0eV9pZCI6ImUxNjdiZGFiLWQ4NzYtNDFmYi1iODFmLWY2MmNhNWMwOGI5ZCIsImlhdCI6MTY2Njg3MjUzNCwiZXhwIjoxNjY2OTU4OTM0fQ.1fFS64TWEvt-Qr8rUNrv6-QRVBtUr3RUz7NPGhvKU9I', '{\"useragent\":\"PostmanRuntime/7.29.2\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.29.2\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', 'e167bdab-d876-41fb-b81f-f62ca5c08b9d', 1, '2022-10-27 14:08:54', '2022-10-27 14:08:54'),
(8, 8, 8, 8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiI1MmMyNjBhZGZiNGVjMjU3ZTA5NWNmODhmNGY1M2RmZSIsImVtYWlsIjoic2hvdm9uOEBnbWFpNi5jb20iLCJyb2xlIjp7InJvbGVfaWQiOjIsInJvbGVfbmFtZSI6ImFnZW50In0sInByb2ZpbGUiOnsibmFtZSI6IlNob3ZvbiAzIiwiZW1haWwiOiJzaG92b244QGdtYWk2LmNvbSIsInBob25lIjoiMDE2NzE3OTQwNjQiLCJwcm9maWxlX2ltYWdlIjoiZGVmYXVsdF9wcm9maWxlX2ltYWdlLnBuZyIsInN0YXR1cyI6MSwidXNlcl9pZCI6OH0sInRpbWVfcGVyaW9kIjoxNjY3MDM4MTU4MjQ3LCJpZGVudGl0eV9pZCI6ImYxZjExYjAzLWFlNjctNDllZi05NGQwLTg4NTc3OWQxOTg1NSIsImlhdCI6MTY2NzAzNDU1OCwiZXhwIjoxNjY3MTIwOTU4fQ.mvBd8Y0bOk4z0J1BPVXeqBgUh7imbt5Gje86KYKe46g', '{\"useragent\":\"PostmanRuntime/7.29.2\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.29.2\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', 'f1f11b03-ae67-49ef-94d0-885779d19855', 1, '2022-10-29 11:09:18', '2022-10-29 11:09:18'),
(9, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX2lkIjoxfSwidGltZV9wZXJpb2QiOjE2NjcwMzg2MjcyNDgsImlkZW50aXR5X2lkIjoiM2U3NmQ4ODUtMzUyYy00MDk5LThiODYtNDA0ZDRjZjBlNDNiIiwiaWF0IjoxNjY3MDM1MDI3LCJleHAiOjE2NjcxMjE0Mjd9.jdYnz3uU4cYShEX4I4KAkRzwx_k9j-qcxlNcdHIp950', '{\"useragent\":\"PostmanRuntime/7.29.2\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.29.2\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '3e76d885-352c-4099-8b86-404d4cf0e43b', 1, '2022-10-29 11:17:07', '2022-10-29 11:17:07'),
(10, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX2lkIjoxfSwidGltZV9wZXJpb2QiOjE2NjcxNTAyNTA3NTIsImlkZW50aXR5X2lkIjoiMzBmYTc1OTYtMjk4OC00YjkzLTkzMjYtMGNjYTcxNDFjY2UwIiwiaWF0IjoxNjY3MTQ2NjUwLCJleHAiOjE2NjcyMzMwNTB9.BE7BrB1Qpxhb87gv1I6DuofrjXaUY4LqeXpN1gHKKI4', '{\"useragent\":\"PostmanRuntime/7.29.2\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.29.2\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '30fa7596-2988-4b93-9326-0cca7141cce0', 1, '2022-10-30 16:17:30', '2022-10-30 16:17:30'),
(11, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX2lkIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY2NzE2NjA1Mjk4NCwiaWRlbnRpdHlfaWQiOiI3OTI4Y2NmMi0wMDZhLTRjYzEtYWQwYy02ZmRmNjhjOTMyYzIiLCJpYXQiOjE2NjcxNjI0NTIsImV4cCI6MTY2NzI0ODg1Mn0.jiZXVPBIpMgPPgz4qRCe98UhRqEsTLIFUSnZsHZUEcM', '{\"useragent\":\"PostmanRuntime/7.29.2\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.29.2\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '7928ccf2-006a-4cc1-ad0c-6fdf68c932c2', 1, '2022-10-30 20:40:52', '2022-10-30 20:40:52'),
(12, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX2lkIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY2NzE2NjEyODczMCwiaWRlbnRpdHlfaWQiOiJkZDNkOTQ0OS03YmYzLTQzNzktYTAzOS0yNzdlMzE1NzhjMzUiLCJpYXQiOjE2NjcxNjI1MjgsImV4cCI6MTY2NzI0ODkyOH0.Ldc3ScgX2mm_FuXlQAewtSRf9V7_g51LJSD5v_-X1i8', '{\"useragent\":\"PostmanRuntime/7.29.2\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.29.2\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', 'dd3d9449-7bf3-4379-a039-277e31578c35', 1, '2022-10-30 20:42:08', '2022-10-30 20:42:08'),
(13, 8, 8, 8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiI1MmMyNjBhZGZiNGVjMjU3ZTA5NWNmODhmNGY1M2RmZSIsImVtYWlsIjoic2hvdm9uOEBnbWFpNi5jb20iLCJyb2xlIjp7InJvbGVfaWQiOjIsInJvbGVfbmFtZSI6IlBlcnNvbmFsIEFnZW50In0sInByb2ZpbGUiOnsibmFtZSI6IlNob3ZvbiA0MSIsImVtYWlsIjoic2hvdm9uOEBnbWFpNi5jb20iLCJwaG9uZSI6IjAxNjcxNzk0MDY0IiwicHJvZmlsZV9pbWFnZSI6ImRlZmF1bHRfcHJvZmlsZV9pbWFnZS5wbmciLCJzdGF0dXMiOjEsInVzZXJfdHlwZSI6MywidXNlcl9pZCI6OCwidXNlcl9yb2xlIjoiUGVyc29uYWwgQWdlbnQifSwidGltZV9wZXJpb2QiOjE2NjcxNjY0MDMyMjcsImlkZW50aXR5X2lkIjoiZGNkN2Y1NzctNDJhNC00MzhkLTg4ZDYtOTU1OTY1YjJmMzdhIiwiaWF0IjoxNjY3MTYyODAzLCJleHAiOjE2NjcyNDkyMDN9.SRBZlKx3I9uTY2Tl5clFWbej8mpaQXD0TPHuXsx13cQ', '{\"useragent\":\"PostmanRuntime/7.29.2\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.29.2\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', 'dcd7f577-42a4-438d-88d6-955965b2f37a', 1, '2022-10-30 20:46:43', '2022-10-30 20:46:43'),
(14, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX2lkIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY2NzU1ODUyOTkyOCwiaWRlbnRpdHlfaWQiOiJlOTk3ZjJhNy1jMDQxLTQwMjMtYTVkMS0zOGY5ODdkYmJiZTgiLCJpYXQiOjE2Njc1NTQ5MjksImV4cCI6MTY2NzY0MTMyOX0.aetfPFcgYT4vP7hpICZoiik0-G6540lQEu3cgMBl0ag', '{\"useragent\":\"PostmanRuntime/7.29.2\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.29.2\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', 'e997f2a7-c041-4023-a5d1-38f987dbbbe8', 1, '2022-11-04 09:42:09', '2022-11-04 09:42:09'),
(15, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX2lkIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY2ODQxMjAxMDI0NCwiaWRlbnRpdHlfaWQiOiI3Y2FjN2ZjZC1iMjg5LTRlMzUtYmVjOC05ZmU5MGRiMzNmMjEiLCJpYXQiOjE2Njg0MDg0MTAsImV4cCI6MTY2ODQ5NDgxMH0.DxpN47JVev4o2d9ayIVaPbpGN4wvGHUtnJxdo99NMXs', '{\"useragent\":\"PostmanRuntime/7.29.2\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.29.2\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '7cac7fcd-b289-4e35-bec8-9fe90db33f21', 1, '2022-11-14 06:46:50', '2022-11-14 06:46:50'),
(16, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX2lkIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY2ODgzODkxNzY1NywiaWRlbnRpdHlfaWQiOiI1ODk1MTJiOS1lOWJkLTQ5ZjEtOTE4OS0yMTU1YmRkZGVkODIiLCJpYXQiOjE2Njg4MzUzMTcsImV4cCI6MTY2ODkyMTcxN30.xo71DUHko0qgI08hUefmjSWecWl5LVgOH_IhgeN6ED4', '{\"useragent\":\"PostmanRuntime/7.29.2\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.29.2\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '589512b9-e9bd-49f1-9189-2155bddded82', 1, '2022-11-19 11:21:57', '2022-11-19 11:21:57'),
(17, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX2lkIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY2ODkzMzc0MDYwNiwiaWRlbnRpdHlfaWQiOiJiZTUzNWZjMy01ZWI0LTRjYjEtYmZiMS0yOWNhMTI2ZjA0MzUiLCJpYXQiOjE2Njg5MzAxNDAsImV4cCI6MTY2OTAxNjU0MH0.h9qp60HRBV1bWAiqoHVzqFhhXWruRdPKYWzpnhB2SFc', '{\"useragent\":\"PostmanRuntime/7.29.2\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.29.2\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', 'be535fc3-5eb4-4cb1-bfb1-29ca126f0435', 1, '2022-11-20 13:42:20', '2022-11-20 13:42:20'),
(18, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX2lkIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY2OTAxMjQ1MTA1OCwiaWRlbnRpdHlfaWQiOiI1NWUwMmI3ZC0yZmJmLTRmNjMtODRhOC1iYzVlMzNkZWM3NDAiLCJpYXQiOjE2NjkwMDg4NTEsImV4cCI6MTY2OTA5NTI1MX0.QvbmP9cypTuGZufYbUjajYEQLbdT1L2TQNyk2S2l8MA', '{\"useragent\":\"PostmanRuntime/7.29.2\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.29.2\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '55e02b7d-2fbf-4f63-84a8-bc5e33dec740', 1, '2022-11-21 11:34:11', '2022-11-21 11:34:11'),
(19, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX2lkIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY2OTIwMTg2NzcyMywiaWRlbnRpdHlfaWQiOiJlN2MwZGYxMC03ZDkwLTRlZjktODZiMS04ZjBlOTliNTM1YjUiLCJpYXQiOjE2NjkxOTgyNjcsImV4cCI6MTY2OTI4NDY2N30.3-6TMB2W8rjnP5apRZBb3P5YH7d3xe4RnW9hgpbSAq0', '{\"useragent\":\"PostmanRuntime/7.29.2\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.29.2\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', 'e7c0df10-7d90-4ef9-86b1-8f0e99b535b5', 1, '2022-11-23 16:11:07', '2022-11-23 16:11:07'),
(20, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX2lkIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY2OTIzMTUxNzQzMSwiaWRlbnRpdHlfaWQiOiI0OWUxM2JlNC03NGYxLTQwYjItOGUxNC0xY2M3Njg3NWYyMWYiLCJpYXQiOjE2NjkyMjc5MTcsImV4cCI6MTY2OTMxNDMxN30.aOwwmF9KUjDpBX2bNAQqu03igffUCv3Gjqbq6-TGROE', '{\"useragent\":\"PostmanRuntime/7.29.2\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.29.2\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '49e13be4-74f1-40b2-8e14-1cc76875f21f', 1, '2022-11-24 00:25:17', '2022-11-24 00:25:17'),
(21, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX2lkIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY2OTc0NTE4ODgxNSwiaWRlbnRpdHlfaWQiOiI1YjAyY2FjYy04N2ExLTQ5ODItYjZkMy1iMGRmMWZiNDBmMDMiLCJpYXQiOjE2Njk3NDE1ODgsImV4cCI6MTY2OTgyNzk4OH0.1seV3A73ZaY2enjE4MNkEy7i_Y33sAxBoonQ7C0_MeA', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.56\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Microsoft Edge\",\"client-short-name\":\"PS\",\"client-version\":\"107.0.1418.56\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', '5b02cacc-87a1-4982-b6d3-b0df1fb40f03', 1, '2022-11-29 23:06:28', '2022-11-29 23:06:28'),
(22, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX2lkIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY2OTc0NTYxNzY4NywiaWRlbnRpdHlfaWQiOiI5NDFjMTJhZi0wZDRkLTRkOTUtYTQxMi1lYjBhOGQ2ZGU5MTciLCJpYXQiOjE2Njk3NDIwMTcsImV4cCI6MTY2OTgyODQxN30.Doj1wNzGSaEsbgNwuPDK7BGT_j4ittQNrHOj5bJcUeM', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"107.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', '941c12af-0d4d-4d95-a412-eb0a8d6de917', 1, '2022-11-29 23:13:37', '2022-11-29 23:13:37'),
(23, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX2lkIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY2OTgwNTYxNDUzOCwiaWRlbnRpdHlfaWQiOiJjOTQzMGI2ZS1lN2FiLTQ0NTMtYmQ5OC1lMDllNWU5ZWM5MGMiLCJpYXQiOjE2Njk4MDIwMTQsImV4cCI6MTY2OTg4ODQxNH0.hnHe3Z4BYfm303ZaUzAFdYIN6poXLC0DcFdTDuJuN_Y', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"107.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', 'c9430b6e-e7ab-4453-bd98-e09e5e9ec90c', 1, '2022-11-30 15:53:34', '2022-11-30 15:53:34'),
(24, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX2lkIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY2OTgyODAwOTg0OSwiaWRlbnRpdHlfaWQiOiI3MWRlYzQ2Yi02ODEzLTQ4OWMtYmZkNi1hMjZkNTkyNDE5ZGMiLCJpYXQiOjE2Njk4MjQ0MDksImV4cCI6MTY2OTkxMDgwOX0.-YG73toJuB_Uxt1Vsc9Nu-wybX1aDmF2CLh6z6KWCyU', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"107.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', '71dec46b-6813-489c-bfd6-a26d592419dc', 1, '2022-11-30 22:06:49', '2022-11-30 22:06:49'),
(25, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX2lkIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY3MDgzOTE2NTcwMywiaWRlbnRpdHlfaWQiOiIzMzc0ZDMyNC0wZjgzLTRhNTAtOTA0Yi01NjVhZmNkYWVlMGIiLCJpYXQiOjE2NzA4MzU1NjUsImV4cCI6MTY3MDkyMTk2NX0.oYZGWB8-mS9urn7c_69kk1YR4Rjkp9gfIXL59dShmk0', '{\"useragent\":\"PostmanRuntime/7.29.2\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.29.2\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '3374d324-0f83-4a50-904b-565afcdaee0b', 1, '2022-12-12 14:59:25', '2022-12-12 14:59:25'),
(26, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX2lkIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY3NDQ0NzczNDE1MSwiaWRlbnRpdHlfaWQiOiI0YjdiOGY2Mi01N2FiLTQ2MjQtYTcxNS01OTU3Y2ZiMGYyNWUiLCJpYXQiOjE2NzQ0NDQxMzQsImV4cCI6MTY3NDUzMDUzNH0.QIHFC9eUOUXXuGomCw54ltp5qROCRS9HRffbIfo0zVk', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"109.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', '4b7b8f62-57ab-4624-a715-5957cfb0f25e', 1, '2023-01-23 03:22:14', '2023-01-23 03:22:14'),
(27, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY3NDgzNDEwNDIwNywiaWRlbnRpdHlfaWQiOiI2ZjRiMzM1YS0zNDQyLTRiOWYtOTE3OC1kNDVjMTZjNTIwMTQiLCJpYXQiOjE2NzQ4MzA1MDQsImV4cCI6MTY3NDkxNjkwNH0.GKazGQeDOwsljpv-A56tHAdf1cY7loaOa-zxrzCKOvk', '{\"useragent\":\"PostmanRuntime/7.30.0\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.30.0\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '6f4b335a-3442-4b9f-9178-d45c16c52014', 1, '2023-01-27 14:41:44', '2023-01-27 14:41:44'),
(28, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY3NTAxNjk5ODQ3NywiaWRlbnRpdHlfaWQiOiI3ODE0YWYxZC1iNGY5LTQ1ZmItOGZkOC1kYzBmMjEwOGVmOTEiLCJpYXQiOjE2NzUwMTMzOTgsImV4cCI6MTY3NTA5OTc5OH0.I7qlKBKqPtdH6RacRnpnVaSY8NJ9lAGZZ-0tnBrmvAA', '{\"useragent\":\"PostmanRuntime/7.30.0\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.30.0\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '7814af1d-b4f9-45fb-8fd8-dc0f2108ef91', 1, '2023-01-29 17:29:58', '2023-01-29 17:29:58'),
(29, 8, 8, 8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiI1MmMyNjBhZGZiNGVjMjU3ZTA5NWNmODhmNGY1M2RmZSIsImVtYWlsIjoic2hvdm9uOEBnbWFpNi5jb20iLCJyb2xlIjp7InJvbGVfaWQiOjIsInJvbGVfbmFtZSI6IkJ1c2luZXNzIEFnZW50In0sInByb2ZpbGUiOnsibmFtZSI6IlNob3ZvbiAxIiwiZW1haWwiOiJzaG92b244QGdtYWk2LmNvbSIsInBob25lIjoiMDE2NzE3OTQwNjUiLCJwcm9maWxlX2ltYWdlIjoiZGVmYXVsdF9wcm9maWxlX2ltYWdlLnBuZyIsInN0YXR1cyI6MSwidXNlcl90eXBlIjoyLCJ1c2VyX3JvbGUiOiJCdXNpbmVzcyBBZ2VudCJ9LCJ0aW1lX3BlcmlvZCI6MTY3NTQ5NTgyNTEwNiwiaWRlbnRpdHlfaWQiOiJlOTI4NTRjYi1kNWFmLTQ3ODMtOGFjYi1kZWRiZjFhMTc1NTUiLCJpYXQiOjE2NzU0OTIyMjUsImV4cCI6MTY3NTU3ODYyNX0.2olNZZeh1QFjmUKwBttKNAuXhOKrwr54atxcR7cJFsY', '{\"useragent\":\"PostmanRuntime/7.30.0\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.30.0\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', 'e92854cb-d5af-4783-8acb-dedbf1a17555', 1, '2023-02-04 06:30:25', '2023-02-04 06:30:25'),
(30, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY3NTQ5NzQ4MjI3NSwiaWRlbnRpdHlfaWQiOiIwMzdlZTAzMi1iYmUzLTQyYmMtYmQwZi1jMjhkNDdhNmNmZWYiLCJpYXQiOjE2NzU0OTM4ODIsImV4cCI6MTY3NTU4MDI4Mn0.CVSWZDMGseBJP-pGaLKkUTEENgLeybGfkAfN2Nh9y_A', '{\"useragent\":\"PostmanRuntime/7.30.0\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.30.0\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '037ee032-bbe3-42bc-bd0f-c28d47a6cfef', 1, '2023-02-04 06:58:02', '2023-02-04 06:58:02'),
(31, 8, 8, 8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiI1MmMyNjBhZGZiNGVjMjU3ZTA5NWNmODhmNGY1M2RmZSIsImVtYWlsIjoic2hvdm9uOEBnbWFpNi5jb20iLCJyb2xlIjp7InJvbGVfaWQiOjIsInJvbGVfbmFtZSI6IkJ1c2luZXNzIEFnZW50In0sInByb2ZpbGUiOnsibmFtZSI6IlNob3ZvbiAxIiwiZW1haWwiOiJzaG92b244QGdtYWk2LmNvbSIsInBob25lIjoiMDE2NzE3OTQwNjUiLCJwcm9maWxlX2ltYWdlIjoiZGVmYXVsdF9wcm9maWxlX2ltYWdlLnBuZyIsInN0YXR1cyI6MSwidXNlcl90eXBlIjoyLCJ1c2VyX3JvbGUiOiJCdXNpbmVzcyBBZ2VudCJ9LCJ0aW1lX3BlcmlvZCI6MTY3NTQ5NzcyODE1OCwiaWRlbnRpdHlfaWQiOiI0YTI0ZWY2MS04MmUwLTRjZTktODI4ZS1jZGQ1YmQ4NzlhZTIiLCJpYXQiOjE2NzU0OTQxMjgsImV4cCI6MTY3NTU4MDUyOH0.kz0_kIPGF-f7sfG-P_rQwOAlbu75F_XZeQnQP0GehmM', '{\"useragent\":\"PostmanRuntime/7.30.0\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.30.0\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '4a24ef61-82e0-4ce9-828e-cdd5bd879ae2', 1, '2023-02-04 07:02:08', '2023-02-04 07:02:08'),
(32, 8, 8, 8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiI1MmMyNjBhZGZiNGVjMjU3ZTA5NWNmODhmNGY1M2RmZSIsImVtYWlsIjoic2hvdm9uOEBnbWFpNi5jb20iLCJyb2xlIjp7InJvbGVfaWQiOjIsInJvbGVfbmFtZSI6IkJ1c2luZXNzIEFnZW50In0sInByb2ZpbGUiOnsibmFtZSI6IlNob3ZvbiAxIiwiZW1haWwiOiJzaG92b244QGdtYWk2LmNvbSIsInBob25lIjoiMDE2NzE3OTQwNjUiLCJwcm9maWxlX2ltYWdlIjoiZGVmYXVsdF9wcm9maWxlX2ltYWdlLnBuZyIsInN0YXR1cyI6MSwidXNlcl90eXBlIjoyLCJ1c2VyX3JvbGUiOiJCdXNpbmVzcyBBZ2VudCJ9LCJ0aW1lX3BlcmlvZCI6MTY3NTQ5OTYyNzM3MSwiaWRlbnRpdHlfaWQiOiIxYjJiMmQ5OC1mZjRjLTQ5N2ItOTBkZi0wNTI1MmMyMDNiZTgiLCJpYXQiOjE2NzU0OTYwMjcsImV4cCI6MTY3NTU4MjQyN30.eaGWylIXylP3bv1jQGPVk7n3Qg-WsdsW5A9QeXikFVY', '{\"useragent\":\"PostmanRuntime/7.30.0\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.30.0\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '1b2b2d98-ff4c-497b-90df-05252c203be8', 1, '2023-02-04 07:33:47', '2023-02-04 07:33:47'),
(33, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY3NTQ5OTYzNjQ0NiwiaWRlbnRpdHlfaWQiOiI5NDU1MGVhZC05NjdmLTRjYTQtOWVjOC0zODhlMzUxMWM5NWEiLCJpYXQiOjE2NzU0OTYwMzYsImV4cCI6MTY3NTU4MjQzNn0.hHwR6M3L4EZ8HZpW4AqxFY57rhAArQAs-o2La8UYu3g', '{\"useragent\":\"PostmanRuntime/7.30.0\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.30.0\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '94550ead-967f-4ca4-9ec8-388e3511c95a', 1, '2023-02-04 07:33:56', '2023-02-04 07:33:56'),
(34, 8, 8, 8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiI1MmMyNjBhZGZiNGVjMjU3ZTA5NWNmODhmNGY1M2RmZSIsImVtYWlsIjoic2hvdm9uOEBnbWFpNi5jb20iLCJyb2xlIjp7InJvbGVfaWQiOjIsInJvbGVfbmFtZSI6IkJ1c2luZXNzIEFnZW50In0sInByb2ZpbGUiOnsibmFtZSI6IlNob3ZvbiAxIiwiZW1haWwiOiJzaG92b244QGdtYWk2LmNvbSIsInBob25lIjoiMDE2NzE3OTQwNjUiLCJwcm9maWxlX2ltYWdlIjoiZGVmYXVsdF9wcm9maWxlX2ltYWdlLnBuZyIsInN0YXR1cyI6MSwidXNlcl90eXBlIjoyLCJ1c2VyX3JvbGUiOiJCdXNpbmVzcyBBZ2VudCJ9LCJ0aW1lX3BlcmlvZCI6MTY3NTUwMTEzMDk3NSwiaWRlbnRpdHlfaWQiOiJkZjAyOGEwMi0yNjI0LTQ5MWYtYjkwNS1lMTFhNmZlODdmY2QiLCJpYXQiOjE2NzU0OTc1MzAsImV4cCI6MTY3NTU4MzkzMH0.TxFuRIiISfRZ8X9nlsLPUSJ8x7jja4fRbXZbWgnp6-4', '{\"useragent\":\"PostmanRuntime/7.30.0\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.30.0\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', 'df028a02-2624-491f-b905-e11a6fe87fcd', 1, '2023-02-04 07:58:50', '2023-02-04 07:58:50'),
(35, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY3NTUwMTI0Mjk3NCwiaWRlbnRpdHlfaWQiOiI2NWUyZjhkZi0yMmM0LTRkNjItYTY2NC1mOTNiYzJjNzQ1ZmIiLCJpYXQiOjE2NzU0OTc2NDIsImV4cCI6MTY3NTU4NDA0Mn0.6fSRfkuKChAL4HKRDv6da9ujYFiSDZgKjIu-fYhWHO4', '{\"useragent\":\"PostmanRuntime/7.30.0\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.30.0\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '65e2f8df-22c4-4d62-a664-f93bc2c745fb', 1, '2023-02-04 08:00:42', '2023-02-04 08:00:42'),
(36, 8, 8, 8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiI1MmMyNjBhZGZiNGVjMjU3ZTA5NWNmODhmNGY1M2RmZSIsImVtYWlsIjoic2hvdm9uOEBnbWFpNi5jb20iLCJyb2xlIjp7InJvbGVfaWQiOjIsInJvbGVfbmFtZSI6IkJ1c2luZXNzIEFnZW50In0sInByb2ZpbGUiOnsibmFtZSI6IlNob3ZvbiAxIiwiZW1haWwiOiJzaG92b244QGdtYWk2LmNvbSIsInBob25lIjoiMDE2NzE3OTQwNjUiLCJwcm9maWxlX2ltYWdlIjoiZGVmYXVsdF9wcm9maWxlX2ltYWdlLnBuZyIsInN0YXR1cyI6MSwidXNlcl90eXBlIjoyLCJ1c2VyX3JvbGUiOiJCdXNpbmVzcyBBZ2VudCJ9LCJ0aW1lX3BlcmlvZCI6MTY3NTUwMTM4MDUyMCwiaWRlbnRpdHlfaWQiOiI5Y2NkNzg2Yy0xNWY4LTQ5ZWUtOTMyNS1iZjg2NTJhYWE4MWIiLCJpYXQiOjE2NzU0OTc3ODAsImV4cCI6MTY3NTU4NDE4MH0.l0L1OHoVsRzIT3KiTl3t1IZUx26eISPVY-A1la7EAnI', '{\"useragent\":\"PostmanRuntime/7.30.0\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.30.0\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '9ccd786c-15f8-49ee-9325-bf8652aaa81b', 1, '2023-02-04 08:03:00', '2023-02-04 08:03:00'),
(37, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY3NTUwMjk0ODMxNiwiaWRlbnRpdHlfaWQiOiI2OWY5OGVlZi0yNTMyLTQ1MTktOTgyZC1kMzc5NzUwOTY3ZGIiLCJpYXQiOjE2NzU0OTkzNDgsImV4cCI6MTY3NTU4NTc0OH0.D9ix_-j1FPF8XycfSAsxTPQJdgDIAz6uDr2k7ANHHao', '{\"useragent\":\"PostmanRuntime/7.30.0\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.30.0\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '69f98eef-2532-4519-982d-d379750967db', 1, '2023-02-04 14:29:08', '2023-02-04 14:29:08'),
(38, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY3NjU1OTYwOTQ0MSwiaWRlbnRpdHlfaWQiOiIyOTI1NjZkNC04MjdmLTRiYTUtYWYzZC1hMzRiZjkyYjIyOGEiLCJpYXQiOjE2NzY1NTYwMDksImV4cCI6MTY3NjY0MjQwOX0.euoUBnjtUhrUbdQ4wrznm3lV_Zzfz3pBlF_vLvYV0ZY', '{\"useragent\":\"PostmanRuntime/7.31.0\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.31.0\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '292566d4-827f-4ba5-af3d-a34bf92b228a', 1, '2023-02-16 20:00:09', '2023-02-16 20:00:09'),
(39, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY3NzAwNDQyMjU4NywiaWRlbnRpdHlfaWQiOiJkODJlNTM1OC0wYjI0LTQ3ZGQtYjRhMi04OTllNzM1ZjBkNzkiLCJpYXQiOjE2NzcwMDA4MjIsImV4cCI6MTY3NzA4NzIyMn0.yhmABMrHAD_mRAgNisgm9Lq7hMY_eCH4SC32m_aUhho', '{\"useragent\":\"PostmanRuntime/7.31.0\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.31.0\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', 'd82e5358-0b24-47dd-b4a2-899e735f0d79', 1, '2023-02-21 23:33:42', '2023-02-21 23:33:42'),
(40, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY3NzE0NTk1NTg3NSwiaWRlbnRpdHlfaWQiOiIxMWJkNWQ2Yy1lN2JlLTRhNDMtYWQ5Yi1lMjBmNWFlOTk0ZTAiLCJpYXQiOjE2NzcxNDIzNTUsImV4cCI6MTY3NzIyODc1NX0.Lj8jqBrdG7b8leUOLmH1JfZayZgRDvoqKn4waWQfpXQ', '{\"useragent\":\"PostmanRuntime/7.31.1\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.31.1\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '11bd5d6c-e7be-4a43-ad9b-e20f5ae994e0', 1, '2023-02-23 14:52:35', '2023-02-23 14:52:35'),
(41, 8, 8, 8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiI1MmMyNjBhZGZiNGVjMjU3ZTA5NWNmODhmNGY1M2RmZSIsImVtYWlsIjoic2hvdm9uOEBnbWFpNi5jb20iLCJyb2xlIjp7InJvbGVfaWQiOjIsInJvbGVfbmFtZSI6IkJ1c2luZXNzIEFnZW50In0sInByb2ZpbGUiOnsibmFtZSI6IlNob3ZvbiAxIiwiZW1haWwiOiJzaG92b24xQGdtYWk2LmNvbSIsInBob25lIjoiMDE2NzE3OTQwNjUiLCJwcm9maWxlX2ltYWdlIjoiZGVmYXVsdF9wcm9maWxlX2ltYWdlLnBuZyIsInN0YXR1cyI6MSwidXNlcl90eXBlIjoyLCJ1c2VyX3JvbGUiOiJCdXNpbmVzcyBBZ2VudCJ9LCJ0aW1lX3BlcmlvZCI6MTY3NzE4MTk2Njg2MCwiaWRlbnRpdHlfaWQiOiJmMzYxMDlmNC00MGQ5LTRlMGYtYWQ2My1jMmIxMWI5NTM4MDYiLCJpYXQiOjE2NzcxNzgzNjYsImV4cCI6MTY3NzI2NDc2Nn0.rmWM_SgZYW6pxKQ2z-YB97Ze25xHPd-qKRd_amJVF_o', '{\"useragent\":\"PostmanRuntime/7.31.1\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.31.1\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', 'f36109f4-40d9-4e0f-ad63-c2b11b953806', 1, '2023-02-24 00:52:46', '2023-02-24 00:52:46'),
(42, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY3NzE5MDI1MDA5MywiaWRlbnRpdHlfaWQiOiJlY2VhOWU1OS1lMDc2LTQ0ZDAtOGI5YS0xZDA5MTI4MzA3ZjQiLCJpYXQiOjE2NzcxODY2NTAsImV4cCI6MTY3NzI3MzA1MH0.1__0io8VKnDWv8gpve2uhJNIs167NhKBlfiDspuaJrA', '{\"useragent\":\"PostmanRuntime/7.31.1\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.31.1\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', 'ecea9e59-e076-44d0-8b9a-1d09128307f4', 1, '2023-02-24 03:10:50', '2023-02-24 03:10:50'),
(43, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY3NzIzNTkwNzYyMywiaWRlbnRpdHlfaWQiOiJlNDE1OWI0Yy1lYjgzLTRmOTAtOWVhZC00MzZhYTkyNWQ4YjUiLCJpYXQiOjE2NzcyMzIzMDcsImV4cCI6MTY3NzMxODcwN30.dY6iVacHJwolNY-0mShPKpDQO2UOAhw1YpN4TrzHvyc', '{\"useragent\":\"PostmanRuntime/7.31.1\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.31.1\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', 'e4159b4c-eb83-4f90-9ead-436aa925d8b5', 1, '2023-02-24 15:51:47', '2023-02-24 15:51:47'),
(44, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY3NzI2NjA1MzUwMSwiaWRlbnRpdHlfaWQiOiJkODVjZmFlOS0yN2Q2LTRhMzItYjAyOC03MTAzMzY5OWY4MDgiLCJpYXQiOjE2NzcyNjI0NTMsImV4cCI6MTY3NzM0ODg1M30._BSPqN4NB9CYhdX0an-resGAAlabcxZitslNir6VBDc', '{\"useragent\":\"PostmanRuntime/7.31.1\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.31.1\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', 'd85cfae9-27d6-4a32-b028-71033699f808', 1, '2023-02-25 00:14:13', '2023-02-25 00:14:13'),
(45, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY3NzI2NjIxNDEyMSwiaWRlbnRpdHlfaWQiOiIyM2ViYmFmMi1mYTI1LTQ1Y2ItYTE1My1jNjBkOGFlNDNmY2QiLCJpYXQiOjE2NzcyNjI2MTQsImV4cCI6MTY3NzM0OTAxNH0.4P4-SbEt0TwVM1-fn_aM19bFz0SiYCspCMtIz7EunhY', '{\"useragent\":\"PostmanRuntime/7.31.1\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.31.1\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '23ebbaf2-fa25-45cb-a153-c60d8ae43fcd', 1, '2023-02-25 00:16:54', '2023-02-25 00:16:54'),
(46, 8, 8, 8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiI1MmMyNjBhZGZiNGVjMjU3ZTA5NWNmODhmNGY1M2RmZSIsImVtYWlsIjoic2hvdm9uOEBnbWFpNi5jb20iLCJyb2xlIjp7InJvbGVfaWQiOjIsInJvbGVfbmFtZSI6IkJ1c2luZXNzIEFnZW50In0sInByb2ZpbGUiOnsibmFtZSI6IlNob3ZvbiAxIiwiZW1haWwiOiJzaG92b24xQGdtYWk2LmNvbSIsInBob25lIjoiMDE2NzE3OTQwNjUiLCJwcm9maWxlX2ltYWdlIjoiZGVmYXVsdF9wcm9maWxlX2ltYWdlLnBuZyIsInN0YXR1cyI6MSwidXNlcl90eXBlIjoyLCJ1c2VyX3JvbGUiOiJCdXNpbmVzcyBBZ2VudCJ9LCJ0aW1lX3BlcmlvZCI6MTY3NzI2NjMxOTg5NSwiaWRlbnRpdHlfaWQiOiJkOGQ5MDc0OC1lNDAwLTQ2MjgtYTVkYy1lNGEwNmQxZjdkMjgiLCJpYXQiOjE2NzcyNjI3MTksImV4cCI6MTY3NzM0OTExOX0.b9BUm2LOaU_WP2l1rjBMPn8ohyPIcbiS26CejU0awKo', '{\"useragent\":\"PostmanRuntime/7.31.1\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.31.1\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', 'd8d90748-e400-4628-a5dc-e4a06d1f7d28', 1, '2023-02-25 00:18:39', '2023-02-25 00:18:39'),
(47, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY3NzI2NjMzNzgzMywiaWRlbnRpdHlfaWQiOiJhNGRjZmU0Zi04NDMzLTQzNzItOTkzNi00NjBkZWY2MzMxNzQiLCJpYXQiOjE2NzcyNjI3MzcsImV4cCI6MTY3NzM0OTEzN30.9ThX06DPQdulHhC2iRBYnX_Bt-neTt26oXt3wXLej1Y', '{\"useragent\":\"PostmanRuntime/7.31.1\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.31.1\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', 'a4dcfe4f-8433-4372-9936-460def633174', 1, '2023-02-25 00:18:57', '2023-02-25 00:18:57');
INSERT INTO `esm_login_tracks` (`id`, `created_by`, `updated_by`, `user_id`, `jwt_token`, `login_device_info`, `uuid`, `status`, `created_at`, `updated_at`) VALUES
(48, 8, 8, 8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiI1MmMyNjBhZGZiNGVjMjU3ZTA5NWNmODhmNGY1M2RmZSIsImVtYWlsIjoic2hvdm9uOEBnbWFpNi5jb20iLCJyb2xlIjp7InJvbGVfaWQiOjIsInJvbGVfbmFtZSI6IkJ1c2luZXNzIEFnZW50In0sInByb2ZpbGUiOnsibmFtZSI6IlNob3ZvbiAxIiwiZW1haWwiOiJzaG92b24xQGdtYWk2LmNvbSIsInBob25lIjoiMDE2NzE3OTQwNjUiLCJwcm9maWxlX2ltYWdlIjoiZGVmYXVsdF9wcm9maWxlX2ltYWdlLnBuZyIsInN0YXR1cyI6MSwidXNlcl90eXBlIjoyLCJ1c2VyX3JvbGUiOiJCdXNpbmVzcyBBZ2VudCJ9LCJ0aW1lX3BlcmlvZCI6MTY3NzI2NzMyNzM0NSwiaWRlbnRpdHlfaWQiOiI5N2JiOTA0MC05OWJiLTRkMTItYWViYi1kMmNkNWFmN2ViOTgiLCJpYXQiOjE2NzcyNjM3MjcsImV4cCI6MTY3NzM1MDEyN30.0ymUH6jRiJz3TZQqVbUwoSGpFe319QR9-wfTNhD-uYU', '{\"useragent\":\"PostmanRuntime/7.31.1\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.31.1\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '97bb9040-99bb-4d12-aebb-d2cd5af7eb98', 1, '2023-02-25 00:35:27', '2023-02-25 00:35:27'),
(49, 8, 8, 8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiI1MmMyNjBhZGZiNGVjMjU3ZTA5NWNmODhmNGY1M2RmZSIsImVtYWlsIjoic2hvdm9uOEBnbWFpNi5jb20iLCJyb2xlIjp7InJvbGVfaWQiOjIsInJvbGVfbmFtZSI6IkJ1c2luZXNzIEFnZW50In0sInByb2ZpbGUiOnsibmFtZSI6IlNob3ZvbiAxIiwiZW1haWwiOiJzaG92b24xQGdtYWk2LmNvbSIsInBob25lIjoiMDE2NzE3OTQwNjUiLCJwcm9maWxlX2ltYWdlIjoiZGVmYXVsdF9wcm9maWxlX2ltYWdlLnBuZyIsInN0YXR1cyI6MSwidXNlcl90eXBlIjoyLCJ1c2VyX3JvbGUiOiJCdXNpbmVzcyBBZ2VudCJ9LCJ0aW1lX3BlcmlvZCI6MTY3NzI2NzQyMTM5MiwiaWRlbnRpdHlfaWQiOiI2MmNhNjVjNi00ZjZiLTQ5MmItYjk3NC05NTE1YjA3OGNiOGIiLCJpYXQiOjE2NzcyNjM4MjEsImV4cCI6MTY3NzM1MDIyMX0.GL5tUW5wFEusw_sMs9mi0y0cMT7GK6ISXM8AYtnkYrY', '{\"useragent\":\"PostmanRuntime/7.31.1\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.31.1\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '62ca65c6-4f6b-492b-b974-9515b078cb8b', 1, '2023-02-25 00:37:01', '2023-02-25 00:37:01'),
(50, 8, 8, 8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiI1MmMyNjBhZGZiNGVjMjU3ZTA5NWNmODhmNGY1M2RmZSIsImVtYWlsIjoic2hvdm9uOEBnbWFpNi5jb20iLCJyb2xlIjp7InJvbGVfaWQiOjIsInJvbGVfbmFtZSI6IkJ1c2luZXNzIEFnZW50In0sInByb2ZpbGUiOnsibmFtZSI6IlNob3ZvbiAxIiwiZW1haWwiOiJzaG92b24xQGdtYWk2LmNvbSIsInBob25lIjoiMDE2NzE3OTQwNjUiLCJwcm9maWxlX2ltYWdlIjoiZGVmYXVsdF9wcm9maWxlX2ltYWdlLnBuZyIsInN0YXR1cyI6MSwidXNlcl90eXBlIjoyLCJ1c2VyX3JvbGUiOiJCdXNpbmVzcyBBZ2VudCJ9LCJ0aW1lX3BlcmlvZCI6MTY3NzI2NzQ2NjUzMSwiaWRlbnRpdHlfaWQiOiJhMDFlYTU3OC0xN2IxLTQ0M2ItYjlkMS0wY2QxNzM1ZDc2ZDkiLCJpYXQiOjE2NzcyNjM4NjYsImV4cCI6MTY3NzM1MDI2Nn0.V4Fk7jBJXc9_-RJ5-c2PodCq1E2ESt8n5VRbraKEAG4', '{\"useragent\":\"PostmanRuntime/7.31.1\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.31.1\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', 'a01ea578-17b1-443b-b9d1-0cd1735d76d9', 1, '2023-02-25 00:37:46', '2023-02-25 00:37:46'),
(51, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY3NzI2NzUwMTg0OSwiaWRlbnRpdHlfaWQiOiIxODBiZWJhNS0xZmQzLTRlOWQtYmE1OC1kMTAxNWY1YjRiY2EiLCJpYXQiOjE2NzcyNjM5MDEsImV4cCI6MTY3NzM1MDMwMX0.u8VY_uJnuJa5ReFD14fAHO3giHONzzOy1P4VXLE7cxw', '{\"useragent\":\"PostmanRuntime/7.31.1\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.31.1\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '180beba5-1fd3-4e9d-ba58-d1015f5b4bca', 1, '2023-02-25 00:38:21', '2023-02-25 00:38:21'),
(52, 8, 8, 8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiI1MmMyNjBhZGZiNGVjMjU3ZTA5NWNmODhmNGY1M2RmZSIsImVtYWlsIjoic2hvdm9uOEBnbWFpNi5jb20iLCJyb2xlIjp7InJvbGVfaWQiOjIsInJvbGVfbmFtZSI6IkJ1c2luZXNzIEFnZW50In0sInByb2ZpbGUiOnsibmFtZSI6IlNob3ZvbiAxIiwiZW1haWwiOiJzaG92b24xQGdtYWk2LmNvbSIsInBob25lIjoiMDE2NzE3OTQwNjUiLCJwcm9maWxlX2ltYWdlIjoiZGVmYXVsdF9wcm9maWxlX2ltYWdlLnBuZyIsInN0YXR1cyI6MSwidXNlcl90eXBlIjoyLCJ1c2VyX3JvbGUiOiJCdXNpbmVzcyBBZ2VudCJ9LCJ0aW1lX3BlcmlvZCI6MTY3NzI2NzUxNTI1MSwiaWRlbnRpdHlfaWQiOiJhODIxMjM5OC03MzI3LTRmMDEtOTExMS1kZDFkMjgxMjhhZmQiLCJpYXQiOjE2NzcyNjM5MTUsImV4cCI6MTY3NzM1MDMxNX0._foh0yzLUrr9MugKDvnE0skl_IKOvWE9SRDCA0JAGXc', '{\"useragent\":\"PostmanRuntime/7.31.1\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.31.1\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', 'a8212398-7327-4f01-9111-dd1d28128afd', 1, '2023-02-25 00:38:35', '2023-02-25 00:38:35'),
(53, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY3NzI2ODI4NDczNCwiaWRlbnRpdHlfaWQiOiIzNjdjNWM3YS03NjVlLTQ4NTktODkzZC00NjQzMWRlNGY0ZGUiLCJpYXQiOjE2NzcyNjQ2ODQsImV4cCI6MTY3NzM1MTA4NH0.-NCPYDfCUeuC1kqXGaUXO7kQlTnGcQToZ7lEoKX_2pE', '{\"useragent\":\"PostmanRuntime/7.31.1\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.31.1\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '367c5c7a-765e-4859-893d-46431de4f4de', 1, '2023-02-25 00:51:24', '2023-02-25 00:51:24'),
(54, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY3NzU1OTIyMDM0NywiaWRlbnRpdHlfaWQiOiI0ZjU1OTFkMi1mNjk4LTQzOGYtODU0ZS1iNGIyNjM2MWM5Y2UiLCJpYXQiOjE2Nzc1NTU2MjAsImV4cCI6MTY3NzY0MjAyMH0.25mu-cfIOxDoj-8WDT_XXBVSuxiPj33fzSNAi_CqL0I', '{\"useragent\":\"PostmanRuntime/7.31.1\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.31.1\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '4f5591d2-f698-438f-854e-b4b26361c9ce', 1, '2023-02-28 09:40:20', '2023-02-28 09:40:20'),
(55, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY3NzYwODkwODc0NSwiaWRlbnRpdHlfaWQiOiIzZjA2YTBjZi05MDBiLTRiMmYtYTEwZi04YzExYzdkMzMzMjEiLCJpYXQiOjE2Nzc2MDUzMDgsImV4cCI6MTY3NzY5MTcwOH0.COaAwzDn-GVnvOCqquuYCwzzgtPJE4w9yK1drqxeZHo', '{\"useragent\":\"PostmanRuntime/7.31.1\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.31.1\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '3f06a0cf-900b-4b2f-a10f-8c11c7d33321', 1, '2023-02-28 23:28:28', '2023-02-28 23:28:28'),
(56, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY3ODUwMzcyMzg2NSwiaWRlbnRpdHlfaWQiOiI0YjNkYWRjMy05NzU2LTQ2ZTgtOGQwZS04ZjA4NjI2MTBiYjciLCJpYXQiOjE2Nzg1MDAxMjMsImV4cCI6MTY3ODU4NjUyM30.VzZiW9pYwB6idR8ZoAUqc9edSkBKkZWfxt-t8Xb3nME', '{\"useragent\":\"PostmanRuntime/7.31.1\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.31.1\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '4b3dadc3-9756-46e8-8d0e-8f0862610bb7', 1, '2023-03-11 08:02:03', '2023-03-11 08:02:03'),
(57, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNjc4NTA2ODEyODk4LWRyIHB1c2gucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY3OTcyNTQxMzcyNSwiaWRlbnRpdHlfaWQiOiI2NGViY2RmNi1mMTVhLTQyZTAtOGE2Zi1hYjdmZmNiZTQ5NmIiLCJpYXQiOjE2Nzk3MjE4MTMsImV4cCI6MTY3OTgwODIxM30.7q4u4g-Ppa6MeClAkROQQEa7Mii3HGPgovoK8kuA3xk', '{\"useragent\":\"PostmanRuntime/7.31.3\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.31.3\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '64ebcdf6-f15a-42e0-8a6f-ab7ffcbe496b', 1, '2023-03-25 05:23:33', '2023-03-25 05:23:33'),
(58, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNjc4NTA2ODEyODk4LWRyIHB1c2gucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY4NTEwMDg1NTg3NSwiaWRlbnRpdHlfaWQiOiJmNGFkMDU2My0xYzgwLTQ0NjEtOTcxNy01ZDJlYmVlYzAzYmUiLCJpYXQiOjE2ODUwOTcyNTUsImV4cCI6MTY4NTE4MzY1NX0.CKiLg7GkeJ9dmoxq7XZUlUQYQemCthaET-7U61To8CE', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.50\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Microsoft Edge\",\"client-short-name\":\"PS\",\"client-version\":\"113.0.1774.50\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', 'f4ad0563-1c80-4461-9717-5d2ebeec03be', 1, '2023-05-26 10:34:15', '2023-05-26 10:34:15'),
(59, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNjc4NTA2ODEyODk4LWRyIHB1c2gucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY4NTEwODI4NDY0MiwiaWRlbnRpdHlfaWQiOiI5NGU5NzljNy1jNWUyLTQ5ZTEtYmY2My0xNjkzMmE0NDM5M2QiLCJpYXQiOjE2ODUxMDQ2ODQsImV4cCI6MTY4NTE5MTA4NH0.7tkDDvIcTBQHjruRhf1ZRqWsTGd-7xfjVcY3APj9Mwk', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.50\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Microsoft Edge\",\"client-short-name\":\"PS\",\"client-version\":\"113.0.1774.50\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', '94e979c7-c5e2-49e1-bf63-16932a44393d', 1, '2023-05-26 12:38:04', '2023-05-26 12:38:04'),
(60, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNjc4NTA2ODEyODk4LWRyIHB1c2gucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY4NTMwMDk4MDQ3MiwiaWRlbnRpdHlfaWQiOiI5YWNkNDg2My00MjYwLTRhZTEtYTdmMS0wN2M2MzU5MDIzZDkiLCJpYXQiOjE2ODUyOTczODAsImV4cCI6MTY4NTM4Mzc4MH0.nmq50oyN5oZVHauTOxfCNOcXcmMYuj17Q-rjE71ewYo', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.57\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Microsoft Edge\",\"client-short-name\":\"PS\",\"client-version\":\"113.0.1774.57\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', '9acd4863-4260-4ae1-a7f1-07c6359023d9', 1, '2023-05-28 18:09:40', '2023-05-28 18:09:40'),
(61, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNjc4NTA2ODEyODk4LWRyIHB1c2gucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY4NTMwMTI0ODQxMiwiaWRlbnRpdHlfaWQiOiJlNDc1YTUwNS1mOGEwLTQ5M2MtYmIyZS1kZTRjMjMzNTUxY2YiLCJpYXQiOjE2ODUyOTc2NDgsImV4cCI6MTY4NTM4NDA0OH0.bOXKAHp2n-3dN1eAe1Kx4DD99Q0KRRKpFl4JOemV1yk', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"113.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', 'e475a505-f8a0-493c-bb2e-de4c233551cf', 1, '2023-05-28 18:14:08', '2023-05-28 18:14:08'),
(62, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNjc4NTA2ODEyODk4LWRyIHB1c2gucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY4NTQ3NjQyNjI3MCwiaWRlbnRpdHlfaWQiOiJiOTVlOGY1Mi1lYzI0LTQwMDUtOGZiNi0xNTA1NWMxNDA0OTYiLCJpYXQiOjE2ODU0NzI4MjYsImV4cCI6MTY4NTU1OTIyNn0.rcYstnzdy0Fr-VduZRpywijTihxbC2aQRNyDrx8RkQY', '{\"useragent\":\"PostmanRuntime/7.32.2\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.32.2\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', 'b95e8f52-ec24-4005-8fb6-15055c140496', 1, '2023-05-30 18:53:46', '2023-05-30 18:53:46'),
(63, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNjc4NTA2ODEyODk4LWRyIHB1c2gucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY4NTY5MDU4MjQ1MywiaWRlbnRpdHlfaWQiOiI5MzdjM2MzNi1hZWRiLTRiMmQtYjRiYy03YjM5YzZjMzQwNzgiLCJpYXQiOjE2ODU2ODY5ODIsImV4cCI6MTY4NTc3MzM4Mn0.MbFj5t5q49Ykmt06cTCao774S-9b04TArZg8pFqW8bY', '{\"useragent\":\"PostmanRuntime/7.32.2\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.32.2\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '937c3c36-aedb-4b2d-b4bc-7b39c6c34078', 1, '2023-06-02 06:23:02', '2023-06-02 06:23:02'),
(64, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNjc4NTA2ODEyODk4LWRyIHB1c2gucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY5NjY5NzUxMzg4OSwiaWRlbnRpdHlfaWQiOiJjMmVmM2RiNy1hNGEyLTRkZGEtYjIyOC0zMzJjNjc2OGE3OGYiLCJpYXQiOjE2OTY2OTM5MTMsImV4cCI6MTY5Njc4MDMxM30.uqa8G3hFC0lRojkuJ8Rg6Ih-I86GxFl9VFlIO0b86KE', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"117.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', 'c2ef3db7-a4a2-4dda-b228-332c6768a78f', 1, '2023-10-07 15:51:53', '2023-10-07 15:51:53'),
(65, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNjc4NTA2ODEyODk4LWRyIHB1c2gucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY5NzE5MDg5MTc3OCwiaWRlbnRpdHlfaWQiOiI0ZTgxZWY3My0wNjU3LTQ4ZjktYmNmZS0zYmUxMTRjZWU4MjMiLCJpYXQiOjE2OTcxODcyOTEsImV4cCI6MTY5NzI3MzY5MX0.sFAyDHpG5RrEbSVI_xzB4KpLEAiUlJSkGpHyYP8W--4', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"117.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', '4e81ef73-0657-48f9-bcfe-3be114cee823', 1, '2023-10-13 08:54:51', '2023-10-13 08:54:51'),
(66, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNjc4NTA2ODEyODk4LWRyIHB1c2gucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY5NzE5MDk4NzQxNCwiaWRlbnRpdHlfaWQiOiJjMWNhMDgxNi1hYWU4LTRmMjYtOGI5Yi04NmUzZWFjZDZlNTAiLCJpYXQiOjE2OTcxODczODcsImV4cCI6MTY5NzI3Mzc4N30.iwEruWFlvoNVhaswHQm5NGkTWldYng-6MrbG5cWB3S8', '{\"useragent\":\"Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Mobile Safari/537.36\",\"os-name\":\"Android\",\"os-short-name\":\"AND\",\"os-family\":\"Android\",\"client-type\":\"browser\",\"client-name\":\"Chrome Mobile\",\"client-short-name\":\"CM\",\"client-version\":\"117.0.0.0\",\"device-id\":\"GO\",\"device-type\":\"smartphone\",\"device-brand\":\"Google\",\"device-model\":\"Nexus 5\"}', 'c1ca0816-aae8-4f26-8b9b-86e3eacd6e50', 1, '2023-10-13 08:56:27', '2023-10-13 08:56:27'),
(67, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNjc4NTA2ODEyODk4LWRyIHB1c2gucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY5NzE5MTA5NjE0MywiaWRlbnRpdHlfaWQiOiJkMTk3ZjAxZi03ZmI1LTRjNGQtYjA2NS1jYWJjZGM5OTU2OWEiLCJpYXQiOjE2OTcxODc0OTYsImV4cCI6MTY5NzI3Mzg5Nn0.n9EnfUChcvw-izR8eUElL5qnKZdMhKCV1vhPmuPY3_o', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"117.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', 'd197f01f-7fb5-4c4d-b065-cabcdc99569a', 1, '2023-10-13 08:58:16', '2023-10-13 08:58:16'),
(68, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNjc4NTA2ODEyODk4LWRyIHB1c2gucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY5NzE5MjE0NzgzNCwiaWRlbnRpdHlfaWQiOiJlNjBlODVkOS1iOTRiLTRlYTktOTc2Zi03MzdiNWM2M2ZjMzIiLCJpYXQiOjE2OTcxODg1NDcsImV4cCI6MTY5NzI3NDk0N30._OUQXvlBRL8fTwz56GRWN0UYC0hE_f35S41cRwn6vbg', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"117.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', 'e60e85d9-b94b-4ea9-976f-737b5c63fc32', 1, '2023-10-13 09:15:47', '2023-10-13 09:15:47'),
(69, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNjc4NTA2ODEyODk4LWRyIHB1c2gucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY5NzE5MjUzMDI5OCwiaWRlbnRpdHlfaWQiOiJlOTYxOWNmZi0zMWFkLTQ5MWUtOGFjNy00ODAwZDQ4ZjhlNWEiLCJpYXQiOjE2OTcxODg5MzAsImV4cCI6MTY5NzI3NTMzMH0.DgvmaNN4lz3DhvdAtbG3T-Y--NJnkxOL7YpCYj9oD_s', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"117.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', 'e9619cff-31ad-491e-8ac7-4800d48f8e5a', 1, '2023-10-13 09:22:10', '2023-10-13 09:22:10'),
(70, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNjc4NTA2ODEyODk4LWRyIHB1c2gucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY5NzIwNzMwMDIxMiwiaWRlbnRpdHlfaWQiOiJiYjU0MWYyMC1hNjc2LTQyYzktOTRmYS02YmJjZGQzM2UxZjgiLCJpYXQiOjE2OTcyMDM3MDAsImV4cCI6MTY5NzI5MDEwMH0.QKIWAVnhME3XBg4U26xj8UVp2Dx138kRGGMUp93SwoM', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"117.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', 'bb541f20-a676-42c9-94fa-6bbcdd33e1f8', 1, '2023-10-13 13:28:20', '2023-10-13 13:28:20'),
(71, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNjc4NTA2ODEyODk4LWRyIHB1c2gucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY5NzIxMTQxMDc0NywiaWRlbnRpdHlfaWQiOiI0YjExYzA4Ny1mYWYyLTQ3ZTktYjU1My1jODE1ZmQxZjBkN2EiLCJpYXQiOjE2OTcyMDc4MTAsImV4cCI6MTY5NzI5NDIxMH0.DOBseynnQXxJ9Rnjd4qORi0GXxaWLqtQyVkT7B4eTIk', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"117.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', '4b11c087-faf2-47e9-b553-c815fd1f0d7a', 1, '2023-10-13 14:36:50', '2023-10-13 14:36:50'),
(72, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNjc4NTA2ODEyODk4LWRyIHB1c2gucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY5Nzc4MzA0NTk0OSwiaWRlbnRpdHlfaWQiOiI5NjYyNGU5ZC01ZWRlLTQ2MGItOTQyNi0yNmUwMmIyYmI3NWQiLCJpYXQiOjE2OTc3Nzk0NDUsImV4cCI6MTY5Nzg2NTg0NX0.g94WqDWvf5ApD_RJNqLhRAfKMyLlsbh1wLgBzyQPp6E', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"118.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', '96624e9d-5ede-460b-9426-26e02b2bb75d', 1, '2023-10-20 05:24:05', '2023-10-20 05:24:05'),
(73, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNjc4NTA2ODEyODk4LWRyIHB1c2gucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY5Nzc4MzE0OTI0OCwiaWRlbnRpdHlfaWQiOiJiMWJjOTJiZi02M2JiLTQxYTktYWQyOC1hMDYyOWM4YmFjNGEiLCJpYXQiOjE2OTc3Nzk1NDksImV4cCI6MTY5Nzg2NTk0OX0.1Lnso8KlDBt-mySHAIF7KNCqn9FacfWAHm6X3D8kK1I', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"118.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', 'b1bc92bf-63bb-41a9-ad28-a0629c8bac4a', 1, '2023-10-20 05:25:49', '2023-10-20 05:25:49'),
(74, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNjc4NTA2ODEyODk4LWRyIHB1c2gucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY5NzgxMTE4NTM5NywiaWRlbnRpdHlfaWQiOiIzNGIzNjc1OS1jNWM1LTQyZjItODQxZC1kMDVmZDVmOTY2MDYiLCJpYXQiOjE2OTc4MDc1ODUsImV4cCI6MTY5Nzg5Mzk4NX0.k7BRmdRD7vioHI0tKKdiqjsw06yimyCAhLndPFnkQRA', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"118.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', '34b36759-c5c5-42f2-841d-d05fd5f96606', 1, '2023-10-20 13:13:05', '2023-10-20 13:13:05'),
(75, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJBZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNjc4NTA2ODEyODk4LWRyIHB1c2gucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY5ODI2NDA4MjkzNywiaWRlbnRpdHlfaWQiOiI2NDFlMDBjNC03MWRjLTQ5NWMtOGU2Yy00MjI4NDEyMGQ5NjIiLCJpYXQiOjE2OTgyNjA0ODIsImV4cCI6MTY5ODM0Njg4Mn0.FEZLEExG5Nyx3QXNOZ1Lo6Z_xa2ScZueui1bUmuMXUE', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"118.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', '641e00c4-71dc-495c-8e6c-42284120d962', 1, '2023-10-25 19:01:22', '2023-10-25 19:01:22'),
(76, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJBZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNjc4NTA2ODEyODk4LWRyIHB1c2gucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY5ODI2NDE3ODUyMCwiaWRlbnRpdHlfaWQiOiJkZjJlZTBhZS0zNmFkLTRiNGQtOGQ3Yy0wMjY3NjBmZWI0ZWIiLCJpYXQiOjE2OTgyNjA1NzgsImV4cCI6MTY5ODM0Njk3OH0.pnUGSp75xMtCVCR0CImidtXx7WdPBndxpPw2j8VLzZA', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"118.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', 'df2ee0ae-36ad-4b4d-8d7c-026760feb4eb', 1, '2023-10-25 19:02:58', '2023-10-25 19:02:58'),
(77, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJBZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNjc4NTA2ODEyODk4LWRyIHB1c2gucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY5ODI2NDE5MTc2NCwiaWRlbnRpdHlfaWQiOiI1MTI0NWNjOC1jZGNmLTQ4NDYtODNhYS1kZjYwODY1YWVhZjAiLCJpYXQiOjE2OTgyNjA1OTEsImV4cCI6MTY5ODM0Njk5MX0.yTwCUi_Vs5VmQ80qeMLkZ6ianp85hUZV4zSvFKhhwwg', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"118.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', '51245cc8-cdcf-4846-83aa-df60865aeaf0', 1, '2023-10-25 19:03:11', '2023-10-25 19:03:11'),
(78, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJBZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNjc4NTA2ODEyODk4LWRyIHB1c2gucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY5ODI2NDcxMTQ3OSwiaWRlbnRpdHlfaWQiOiI5ODJjNDkzMS1mMTRkLTRhNjQtYjc0OS01NzZiMjgyYTgzYmEiLCJpYXQiOjE2OTgyNjExMTEsImV4cCI6MTY5ODM0NzUxMX0.g801Iq62QVhi0C7Wux8OpRb38WbE80s-T6sA7ftys-U', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"118.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', '982c4931-f14d-4a64-b749-576b282a83ba', 1, '2023-10-25 19:11:51', '2023-10-25 19:11:51'),
(79, 24, 24, 24, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiI5ZDZmYTFhN2RiNjg0ZTQyZDk3NThiZmM2YzQ4ZjU3MyIsImVtYWlsIjoic2hlaWJsdTJAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjozLCJyb2xlX25hbWUiOiJQZXJzb25hbCBBZ2VudCJ9LCJwcm9maWxlIjp7Im5hbWUiOiJTaGVpYmx1IChCdXNpbmVzc2wgcGVyc29uYWwpIiwiZW1haWwiOiJzaGVpYmx1MkBnbWFpbC5jb20iLCJwaG9uZSI6IjAxNjcxNzk0MDY2IiwicHJvZmlsZV9pbWFnZSI6ImRlZmF1bHRfcHJvZmlsZV9pbWFnZS5wbmciLCJzdGF0dXMiOjEsInVzZXJfdHlwZSI6MywidXNlcl9yb2xlIjoiUGVyc29uYWwgQWdlbnQifSwidGltZV9wZXJpb2QiOjE2OTgyNjcwNjQyNzUsImlkZW50aXR5X2lkIjoiOTA2NWY3NWQtMzVmZi00YzkzLTlmZWYtMDFiOGI3NmFiOWViIiwiaWF0IjoxNjk4MjYzNDY0LCJleHAiOjE2OTgzNDk4NjR9.BegMC4YOPyEnNn7Isf1id9PHHG5fwgapa4NgLKSOPaA', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"118.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', '9065f75d-35ff-4c93-9fef-01b8b76ab9eb', 1, '2023-10-25 19:51:04', '2023-10-25 19:51:04'),
(80, 8, 8, 8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiI1MmMyNjBhZGZiNGVjMjU3ZTA5NWNmODhmNGY1M2RmZSIsImVtYWlsIjoic2hvdm9uOEBnbWFpNi5jb20iLCJyb2xlIjp7InJvbGVfaWQiOjIsInJvbGVfbmFtZSI6IkNvbXBhbnkgQWdlbnQifSwicHJvZmlsZSI6eyJuYW1lIjoiU2hvdm9uIDEiLCJlbWFpbCI6InNob3ZvbjFAZ21haTYuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NSIsInByb2ZpbGVfaW1hZ2UiOiJkZWZhdWx0X3Byb2ZpbGVfaW1hZ2UucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3R5cGUiOjIsInVzZXJfcm9sZSI6IkNvbXBhbnkgQWdlbnQifSwidGltZV9wZXJpb2QiOjE2OTgyNjcyNDY0MTQsImlkZW50aXR5X2lkIjoiZTA3OTgyMGUtMDg3YS00YWQ0LWI0YjMtMjNkNzEwODdlNTFkIiwiaWF0IjoxNjk4MjYzNjQ2LCJleHAiOjE2OTgzNTAwNDZ9.6dDKWFRm9003rEPjfd1daMd8-Nct_pe1qZzgN2EaXL8', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"118.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', 'e079820e-087a-4ad4-b4b3-23d71087e51d', 1, '2023-10-25 19:54:06', '2023-10-25 19:54:06'),
(81, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJBZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNjc4NTA2ODEyODk4LWRyIHB1c2gucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTcwMDE2MzA0NjQ4NywiaWRlbnRpdHlfaWQiOiIyY2ZiMjBlMS03MTRlLTQyMTctOTI4ZC0yMGEyZjQ1MzBjNmYiLCJpYXQiOjE3MDAxNTk0NDYsImV4cCI6MTcwMDI0NTg0Nn0.bQCKkK2Edm6sHq9mmj6VPdk03O2pgy2q7JFY0_aSbpo', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"119.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', '2cfb20e1-714e-4217-928d-20a2f4530c6f', 1, '2023-11-16 18:30:46', '2023-11-16 18:30:46'),
(82, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJBZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNjc4NTA2ODEyODk4LWRyIHB1c2gucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTcwMDMxNjkwNTQxNCwiaWRlbnRpdHlfaWQiOiJhNDFkYjQ4Yy02NzBlLTRmODMtOTU1MS05ZTllZWNmZmFkYTciLCJpYXQiOjE3MDAzMTMzMDUsImV4cCI6MTcwMDM5OTcwNX0.JsuSqaRfWIWXcAhiWse01RIXlGiOfvAlvLCMNNPCG5E', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"119.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', 'a41db48c-670e-4f83-9551-9e9eecffada7', 1, '2023-11-18 13:15:05', '2023-11-18 13:15:05'),
(83, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJBZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNjc4NTA2ODEyODk4LWRyIHB1c2gucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTcwMDMxNzM1OTEzNywiaWRlbnRpdHlfaWQiOiJlOWMyZmRmNS01OTg2LTRhMTYtODFkNS00YzI5NzYwMTZjYTIiLCJpYXQiOjE3MDAzMTM3NTksImV4cCI6MTcwMDQwMDE1OX0.eR6j9I27CmMAvlPxbQ6TEZwRzf76Dy4XoJtdxPkKzOs', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"119.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', 'e9c2fdf5-5986-4a16-81d5-4c2976016ca2', 1, '2023-11-18 13:22:39', '2023-11-18 13:22:39');

-- --------------------------------------------------------

--
-- Table structure for table `esm_outdoor_amenities`
--

CREATE TABLE `esm_outdoor_amenities` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `esm_outdoor_amenities`
--

INSERT INTO `esm_outdoor_amenities` (`id`, `title`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'AC$', 1, 1, 1, '2022-10-29 15:38:12', '2022-11-20 14:11:26'),
(2, 'AC1', 1, 1, 1, '2022-10-29 15:38:18', '2022-10-29 15:38:18'),
(3, 'AC5', 1, 1, 1, '2022-10-29 15:38:30', '2022-10-29 15:38:30');

-- --------------------------------------------------------

--
-- Table structure for table `esm_page_meta`
--

CREATE TABLE `esm_page_meta` (
  `id` int(11) NOT NULL,
  `page_name` varchar(255) NOT NULL,
  `meta_title` text DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `meta_canonical_url` text DEFAULT NULL,
  `meta_tag` text DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `esm_page_meta`
--

INSERT INTO `esm_page_meta` (`id`, `page_name`, `meta_title`, `meta_description`, `meta_canonical_url`, `meta_tag`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'Home', 'EstateMart BD', '', 'req.body.meta_canonical_url', 'req.body.meta_tag', 1, NULL, 1, '2023-06-02 11:34:37', '2023-10-13 20:23:15'),
(2, 'All Ads', NULL, NULL, NULL, NULL, 1, NULL, NULL, '2023-06-02 11:34:52', '2023-06-02 11:34:52'),
(4, 'All Agent', NULL, NULL, NULL, NULL, 1, NULL, NULL, '2023-10-07 16:10:04', '2023-10-07 16:10:04'),
(5, 'AgentDetails', NULL, NULL, NULL, NULL, 1, NULL, NULL, '2023-10-07 16:10:04', '2023-10-07 16:10:04'),
(6, 'Business', NULL, NULL, NULL, NULL, 1, NULL, NULL, '2023-10-07 16:10:45', '2023-10-07 16:10:45');

-- --------------------------------------------------------

--
-- Table structure for table `esm_payment_packages`
--

CREATE TABLE `esm_payment_packages` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT 'Unknown',
  `duration` int(11) NOT NULL DEFAULT 1,
  `post_limit` int(11) NOT NULL DEFAULT 0,
  `price` double NOT NULL DEFAULT 1,
  `discount_amount` double DEFAULT NULL,
  `discount_percentage` double DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `esm_payment_packages`
--

INSERT INTO `esm_payment_packages` (`id`, `title`, `duration`, `post_limit`, `price`, `discount_amount`, `discount_percentage`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, '3 Month', 90, 0, 300, 100, 33.33, 1, 1, 1, '2022-10-31 01:11:28', '2022-10-31 01:16:55'),
(2, '6 Month', 180, 0, 600, 0, 0, 1, 1, 1, '2022-10-31 01:12:06', '2022-10-31 01:17:23'),
(3, '12 Month', 365, 0, 600, 0, 0, 1, 1, 1, '2022-10-31 01:13:04', '2022-10-31 01:19:00'),
(4, '16 Month', 365, 145, 1000, 800, 80, 1, 1, 1, '2023-02-24 15:58:27', '2023-02-24 15:58:27');

-- --------------------------------------------------------

--
-- Table structure for table `esm_property`
--

CREATE TABLE `esm_property` (
  `id` int(11) NOT NULL,
  `property_name` text NOT NULL,
  `details` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `category` int(11) NOT NULL DEFAULT 1,
  `location` int(11) NOT NULL DEFAULT 1,
  `area` int(11) NOT NULL DEFAULT 1,
  `purpose` int(11) NOT NULL DEFAULT 1,
  `size` double DEFAULT 1,
  `bedroom` int(11) DEFAULT 1,
  `bathroom` int(11) DEFAULT 1,
  `price_per_sqft` double DEFAULT 1,
  `total_price` double DEFAULT 1,
  `owner_ship` int(11) DEFAULT 1,
  `floor` int(11) DEFAULT 1,
  `distance` text DEFAULT NULL,
  `size_calculation_method` int(11) DEFAULT 1,
  `unit_size` double DEFAULT 1,
  `total_unit` int(11) DEFAULT 1,
  `total_floor` int(11) DEFAULT 1,
  `front_road` int(11) DEFAULT 1,
  `address` text DEFAULT NULL,
  `indoor_amenities` text DEFAULT NULL,
  `outdoor_amenities` text DEFAULT NULL,
  `is_featured` int(11) NOT NULL DEFAULT 0 COMMENT ' 0 = false, 1 = true',
  `feature_start_date` date DEFAULT NULL,
  `feature_end_date` date DEFAULT NULL,
  `total_inquiries_count` int(11) NOT NULL DEFAULT 0,
  `total_device_click_count` int(11) NOT NULL DEFAULT 0,
  `meta_title` text NOT NULL,
  `meta_description` text NOT NULL,
  `meta_canonical_url` text NOT NULL,
  `meta_tag` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `post_owner_id` int(11) NOT NULL DEFAULT 0,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `esm_property`
--

INSERT INTO `esm_property` (`id`, `property_name`, `details`, `description`, `category`, `location`, `area`, `purpose`, `size`, `bedroom`, `bathroom`, `price_per_sqft`, `total_price`, `owner_ship`, `floor`, `distance`, `size_calculation_method`, `unit_size`, `total_unit`, `total_floor`, `front_road`, `address`, `indoor_amenities`, `outdoor_amenities`, `is_featured`, `feature_start_date`, `feature_end_date`, `total_inquiries_count`, `total_device_click_count`, `meta_title`, `meta_description`, `meta_canonical_url`, `meta_tag`, `status`, `post_owner_id`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'This is propertity_name', 'This is details', 'This is a description', 1, 1, 3, 2, 1200, 4, 1, 50, 5000, 1, 3, '[{\"name\":\"hospital\",\"distance\":10}]', 1, 1, 1, 1, 100, 'This is address', '2__$1', '3', 0, NULL, NULL, 0, 14, '', '', '', '', 1, 1, 1, 1, '2022-11-24 02:11:53', '2023-11-18 20:11:57'),
(2, 'This is propertity_name 2', 'This is details', '<p>This is a description</p>', 1, 1, 13, 2, 1200, 4, 1, 50, 5000, 1, 3, '[{\"name\":\"entertainmen\",\"distance\":10},{\"name\":\"train\",\"distance\":null},{\"name\":\"school\",\"distance\":null},{\"name\":\"bus\",\"distance\":null},{\"name\":\"pharmacy\",\"distance\":null},{\"name\":\"hospital\",\"distance\":null}]', 1, 1, 1, 1, 100, 'This is address', '1__$2', '3', 1, '2023-03-05', '2023-03-24', 0, 10, 'Meta Title', 'Meta Description', 'Meta Canonical Url', 'Meta Tag', 1, 1, 1, 1, '2022-11-24 02:12:49', '2023-11-18 20:09:42'),
(3, 'Exclusive Brand New Full Furnished Flat Rent @ GULSHAN', '', '<p style=\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; outline: 0px; background: rgb(255, 255, 255); color: rgb(112, 118, 118); font-family: &quot;Open Sans&quot;, &quot;PF DinText Pro&quot;, Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: pre-wrap; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 14px;\"><strong>The flat description below:</strong></p><p style=\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; outline: 0px; background: rgb(255, 255, 255); color: rgb(112, 118, 118); font-family: &quot;Open Sans&quot;, &quot;PF DinText Pro&quot;, Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: pre-wrap; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 14px;\">★Bedroom 03</p><p style=\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; outline: 0px; background: rgb(255, 255, 255); color: rgb(112, 118, 118); font-family: &quot;Open Sans&quot;, &quot;PF DinText Pro&quot;, Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: pre-wrap; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 14px;\">★Bathroom 04</p><p style=\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; outline: 0px; background: rgb(255, 255, 255); color: rgb(112, 118, 118); font-family: &quot;Open Sans&quot;, &quot;PF DinText Pro&quot;, Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: pre-wrap; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 14px;\">★Drawing space</p><p style=\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; outline: 0px; background: rgb(255, 255, 255); color: rgb(112, 118, 118); font-family: &quot;Open Sans&quot;, &quot;PF DinText Pro&quot;, Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: pre-wrap; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 14px;\">★Dining Space</p><p style=\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; outline: 0px; background: rgb(255, 255, 255); color: rgb(112, 118, 118); font-family: &quot;Open Sans&quot;, &quot;PF DinText Pro&quot;, Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: pre-wrap; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 14px;\">★Living space</p><p style=\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; outline: 0px; background: rgb(255, 255, 255); color: rgb(112, 118, 118); font-family: &quot;Open Sans&quot;, &quot;PF DinText Pro&quot;, Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: pre-wrap; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 14px;\">★Kitchen</p><p style=\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; outline: 0px; background: rgb(255, 255, 255); color: rgb(112, 118, 118); font-family: &quot;Open Sans&quot;, &quot;PF DinText Pro&quot;, Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: pre-wrap; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 14px;\">★Servants room&amp;bath room</p><p style=\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; outline: 0px; background: rgb(255, 255, 255); color: rgb(112, 118, 118); font-family: &quot;Open Sans&quot;, &quot;PF DinText Pro&quot;, Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: pre-wrap; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 14px;\">★Wall cabinet</p><p style=\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; outline: 0px; background: rgb(255, 255, 255); color: rgb(112, 118, 118); font-family: &quot;Open Sans&quot;, &quot;PF DinText Pro&quot;, Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: pre-wrap; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 14px;\">★Floor Tiled </p><p style=\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; outline: 0px; background: rgb(255, 255, 255); color: rgb(112, 118, 118); font-family: &quot;Open Sans&quot;, &quot;PF DinText Pro&quot;, Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: pre-wrap; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 14px;\">★Nice view</p><p style=\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; outline: 0px; background: rgb(255, 255, 255); color: rgb(112, 118, 118); font-family: &quot;Open Sans&quot;, &quot;PF DinText Pro&quot;, Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: pre-wrap; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 14px;\">★Lift</p><p style=\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; outline: 0px; background: rgb(255, 255, 255); color: rgb(112, 118, 118); font-family: &quot;Open Sans&quot;, &quot;PF DinText Pro&quot;, Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: pre-wrap; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 14px;\">★Generator </p><p style=\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; outline: 0px; background: rgb(255, 255, 255); color: rgb(112, 118, 118); font-family: &quot;Open Sans&quot;, &quot;PF DinText Pro&quot;, Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: pre-wrap; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 14px;\">★Gas</p><p style=\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; outline: 0px; background: rgb(255, 255, 255); color: rgb(112, 118, 118); font-family: &quot;Open Sans&quot;, &quot;PF DinText Pro&quot;, Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: pre-wrap; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 14px;\">★Electricity</p><p style=\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; outline: 0px; background: rgb(255, 255, 255); color: rgb(112, 118, 118); font-family: &quot;Open Sans&quot;, &quot;PF DinText Pro&quot;, Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: pre-wrap; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 14px;\">★Water</p><p style=\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; outline: 0px; background: rgb(255, 255, 255); color: rgb(112, 118, 118); font-family: &quot;Open Sans&quot;, &quot;PF DinText Pro&quot;, Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: pre-wrap; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 14px;\">★Community Hall</p><p style=\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; outline: 0px; background: rgb(255, 255, 255); color: rgb(112, 118, 118); font-family: &quot;Open Sans&quot;, &quot;PF DinText Pro&quot;, Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: pre-wrap; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 14px;\">★Waiting room</p><p style=\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; outline: 0px; background: rgb(255, 255, 255); color: rgb(112, 118, 118); font-family: &quot;Open Sans&quot;, &quot;PF DinText Pro&quot;, Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: pre-wrap; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 14px;\">★Gard room</p><p style=\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; outline: 0px; background: rgb(255, 255, 255); color: rgb(112, 118, 118); font-family: &quot;Open Sans&quot;, &quot;PF DinText Pro&quot;, Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: pre-wrap; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 14px;\">★Care taker room</p><p style=\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; outline: 0px; background: rgb(255, 255, 255); color: rgb(112, 118, 118); font-family: &quot;Open Sans&quot;, &quot;PF DinText Pro&quot;, Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: pre-wrap; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 14px;\">★Garden rooftop</p><p style=\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; outline: 0px; background: rgb(255, 255, 255); color: rgb(112, 118, 118); font-family: &quot;Open Sans&quot;, &quot;PF DinText Pro&quot;, Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: pre-wrap; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 14px;\">★Car parking</p><p style=\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; outline: 0px; background: rgb(255, 255, 255); color: rgb(112, 118, 118); font-family: &quot;Open Sans&quot;, &quot;PF DinText Pro&quot;, Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: pre-wrap; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 14px;\">★CCTV Monitoring system</p><p style=\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; outline: 0px; background: rgb(255, 255, 255); color: rgb(112, 118, 118); font-family: &quot;Open Sans&quot;, &quot;PF DinText Pro&quot;, Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: pre-wrap; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 14px;\">★Security guard 24 hours Service.</p><p style=\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; outline: 0px; background: rgb(255, 255, 255); color: rgb(112, 118, 118); font-family: &quot;Open Sans&quot;, &quot;PF DinText Pro&quot;, Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: pre-wrap; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 14px;\">★★Service Charge =15000 BDT</p><p style=\"box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; outline: 0px; background: rgb(255, 255, 255); color: rgb(112, 118, 118); font-family: &quot;Open Sans&quot;, &quot;PF DinText Pro&quot;, Arial, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: pre-wrap; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-size: 14px;\">Please Call For More Details.</p>', 1, 1, 13, 1, 3040, 3, 4, 66, 200000, 2, 3, '[{\"name\":\"entertainmen\",\"distance\":\"10 meter\"},{\"name\":\"train\",\"distance\":\"100 meter\"},{\"name\":\"school\",\"distance\":\"20 meter\"},{\"name\":\"bus\",\"distance\":\"20 meter\"},{\"name\":\"pharmacy\",\"distance\":\"5 meter\"},{\"name\":\"hospital\",\"distance\":\"30 meter\"}]', 1, 1, 1, 1, 1, 'Gulshan Dhaka', '1__$2__$3', NULL, 1, '2023-10-13', '2023-10-31', 0, 16, '', '', '', '', 1, 8, 8, 1, '2023-10-13 19:44:24', '2023-11-18 20:11:49');

-- --------------------------------------------------------

--
-- Table structure for table `esm_property_device_click_count_details`
--

CREATE TABLE `esm_property_device_click_count_details` (
  `id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL DEFAULT 1,
  `user_browser_id` varchar(255) NOT NULL DEFAULT 'Unknown',
  `user_id` int(11) NOT NULL DEFAULT 1,
  `other_info` text DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `esm_property_device_click_count_details`
--

INSERT INTO `esm_property_device_click_count_details` (`id`, `property_id`, `user_browser_id`, `user_id`, `other_info`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 2, '49ad8e0a-fca7-4b6b-928a-541a4575edfc', 0, NULL, 1, NULL, NULL, '2022-12-12 15:45:49', '2022-12-12 15:45:49'),
(2, 1, '49ad8e0a-fca7-4b6b-928a-541a4575edfc', 0, NULL, 1, NULL, NULL, '2022-12-12 15:45:54', '2022-12-12 15:45:54'),
(3, 1, '49ad8e0a-fca7-4b6b-928a-541a4575edft', 0, NULL, 1, NULL, NULL, '2022-12-12 15:46:19', '2022-12-12 15:46:19'),
(4, 1, 'd9619801-2d1b-4b33-b1dc-6904fd41e369', 0, NULL, 1, NULL, NULL, '2023-05-26 12:01:54', '2023-05-26 12:01:54'),
(5, 1, 'ccec2e88-d094-4a5c-8ae9-cc1983455235', 0, NULL, 1, NULL, NULL, '2023-05-28 18:53:54', '2023-05-28 18:53:54'),
(6, 1, 'feb98bf5-ccdc-4b4e-8548-1afb020f7455', 0, NULL, 1, NULL, NULL, '2023-05-28 19:54:34', '2023-05-28 19:54:34'),
(7, 1, '592693a9-ab1d-4129-9752-67ec6c1c490b', 0, NULL, 1, NULL, NULL, '2023-07-25 10:36:26', '2023-07-25 10:36:26'),
(8, 2, '6a56e838-669f-46ca-a347-486a6c7c5426', 0, NULL, 1, NULL, NULL, '2023-10-07 15:45:04', '2023-10-07 15:45:04'),
(9, 1, '7c0addf5-4b6d-424f-846a-0c8d6e85b133', 0, NULL, 1, NULL, NULL, '2023-10-07 15:52:07', '2023-10-07 15:52:07'),
(10, 2, 'ac2f1d8a-5325-4f51-841a-54d79828dd21', 0, NULL, 1, NULL, NULL, '2023-10-07 16:21:45', '2023-10-07 16:21:45'),
(11, 2, 'null', 0, NULL, 1, NULL, NULL, '2023-10-07 16:22:10', '2023-10-07 16:22:10'),
(12, 1, 'baf6d3dd-8339-480d-8a61-b249bee61394', 0, NULL, 1, NULL, NULL, '2023-10-13 14:04:15', '2023-10-13 14:04:15'),
(13, 3, 'f2894d97-bd1c-49ff-a27a-5d3aa7a17a51', 0, NULL, 1, NULL, NULL, '2023-10-13 14:52:52', '2023-10-13 14:52:52'),
(14, 1, '57fe5d76-eb21-45a8-b7e5-14b4aef1cd54', 0, NULL, 1, NULL, NULL, '2023-10-13 14:53:55', '2023-10-13 14:53:55'),
(15, 3, '90f07ac9-72cf-4ec3-b507-48517d19dcf8', 0, NULL, 1, NULL, NULL, '2023-10-13 15:17:21', '2023-10-13 15:17:21'),
(16, 2, '22a6ebcf-f182-455a-b7eb-34a18354bce0', 0, NULL, 1, NULL, NULL, '2023-10-13 15:28:48', '2023-10-13 15:28:48'),
(17, 1, '8d4ec232-4656-405f-a9f7-ea640124d3a1', 0, NULL, 1, NULL, NULL, '2023-10-13 15:28:58', '2023-10-13 15:28:58'),
(18, 2, '0ee7f99b-cb38-4664-bd8c-3164270bcfc0', 0, NULL, 1, NULL, NULL, '2023-10-13 15:51:43', '2023-10-13 15:51:43'),
(19, 3, '7ac7b3e0-9386-4607-991d-f022857a25bd', 0, NULL, 1, NULL, NULL, '2023-10-18 13:28:12', '2023-10-18 13:28:12'),
(20, 3, '1e5a17cc-5d19-4792-afbc-f974f6dc71bd', 0, NULL, 1, NULL, NULL, '2023-10-18 13:33:50', '2023-10-18 13:33:50'),
(21, 3, '2585fe4f-c199-4f80-bc39-cda8d15a8081', 0, NULL, 1, NULL, NULL, '2023-10-18 13:35:04', '2023-10-18 13:35:04'),
(22, 3, '2c5d7680-b9ae-4211-839e-f30b79db1915', 0, NULL, 1, NULL, NULL, '2023-10-18 13:36:15', '2023-10-18 13:36:15'),
(23, 3, 'ae0cef51-9e10-478e-b409-a6e5fe34d73f', 0, NULL, 1, NULL, NULL, '2023-10-20 05:15:58', '2023-10-20 05:15:58'),
(24, 2, 'e34bfcd8-0503-4741-9376-50913cdb4676', 0, NULL, 1, NULL, NULL, '2023-10-20 11:53:03', '2023-10-20 11:53:03'),
(25, 1, 'c6d870a6-391b-41d4-ab90-fb0f437edd7e', 0, NULL, 1, NULL, NULL, '2023-10-20 11:54:44', '2023-10-20 11:54:44'),
(26, 2, 'b8340840-1f69-486c-a370-54b94d729e37', 0, NULL, 1, NULL, NULL, '2023-10-20 12:06:39', '2023-10-20 12:06:39'),
(27, 3, '5c70b1c6-fc7b-48e2-a058-8650a79af6b1', 0, NULL, 1, NULL, NULL, '2023-10-20 12:13:15', '2023-10-20 12:13:15'),
(28, 3, '5a6d3658-3f10-4ebb-abe1-02d18556d204', 0, NULL, 1, NULL, NULL, '2023-10-20 12:22:18', '2023-10-20 12:22:18'),
(29, 3, 'a7077607-83e2-4504-9ee8-9a7cfb2d6a28', 0, NULL, 1, NULL, NULL, '2023-10-20 14:15:15', '2023-10-20 14:15:15'),
(30, 2, 'a7077607-83e2-4504-9ee8-9a7cfb2d6a28', 0, NULL, 1, NULL, NULL, '2023-10-20 14:17:36', '2023-10-20 14:17:36'),
(31, 3, '01d76a85-93f2-4902-88f1-c82cb8273629', 0, NULL, 1, NULL, NULL, '2023-10-20 14:20:27', '2023-10-20 14:20:27'),
(32, 3, 'be63a0d3-5385-42f5-96c1-292f5bb7ac4a', 0, NULL, 1, NULL, NULL, '2023-10-20 14:52:40', '2023-10-20 14:52:40'),
(33, 3, '12b3cb62-fb44-432b-8ef9-e7be49f57242', 0, NULL, 1, NULL, NULL, '2023-10-25 18:39:39', '2023-10-25 18:39:39'),
(34, 1, '2b56fdc0-f1fe-4e5b-8e5a-5e21460f6ec5', 0, NULL, 1, NULL, NULL, '2023-11-18 13:13:37', '2023-11-18 13:13:37'),
(35, 3, '3c201a0d-a2fa-465b-8504-5250bee7a4c6', 0, NULL, 1, NULL, NULL, '2023-11-18 13:19:40', '2023-11-18 13:19:40'),
(36, 3, '85f47d6e-68c1-470b-8a62-9fd8df2e0d2b', 0, NULL, 1, NULL, NULL, '2023-11-18 13:22:11', '2023-11-18 13:22:11'),
(37, 2, 'e5259208-a25e-4cfc-80f2-d3cc3a05035d', 0, NULL, 1, NULL, NULL, '2023-11-18 13:26:18', '2023-11-18 13:26:18'),
(38, 1, 'e5259208-a25e-4cfc-80f2-d3cc3a05035d', 0, NULL, 1, NULL, NULL, '2023-11-18 13:44:40', '2023-11-18 13:44:40'),
(39, 3, 'e5259208-a25e-4cfc-80f2-d3cc3a05035d', 0, NULL, 1, NULL, NULL, '2023-11-18 14:11:49', '2023-11-18 14:11:49'),
(40, 1, 'cafc924a-97d4-436e-951f-4549c7b84dd6', 0, NULL, 1, NULL, NULL, '2023-11-18 14:11:57', '2023-11-18 14:11:57');

-- --------------------------------------------------------

--
-- Table structure for table `esm_property_images`
--

CREATE TABLE `esm_property_images` (
  `id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL DEFAULT 1,
  `name` text DEFAULT NULL,
  `path` text DEFAULT NULL,
  `image_type` text DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `esm_property_images`
--

INSERT INTO `esm_property_images` (`id`, `property_id`, `name`, `path`, `image_type`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 1, '1669234313487-Group 47.png', 'public/upload/images/propertity_image/', 'property_image', 1, 1, 1, '2022-11-24 02:11:53', '2022-11-24 02:11:53'),
(2, 1, '1669234313549-oops.png', 'public/upload/images/propertity_image/', 'property_image', 1, 1, 1, '2022-11-24 02:11:53', '2022-11-24 02:11:53'),
(3, 1, '1669234313482-floor_image.jpg', 'public/upload/images/propertity_image/', 'floor_image', 1, 1, 1, '2022-11-24 02:11:53', '2022-11-24 02:11:53'),
(4, 2, '1669234369211-Group 47.png', 'public/upload/images/propertity_image/', 'property_image', 1, 1, 1, '2022-11-24 02:12:49', '2022-11-24 02:12:49'),
(5, 2, '1669234369237-oops.png', 'public/upload/images/propertity_image/', 'property_image', 1, 1, 1, '2022-11-24 02:12:49', '2022-11-24 02:12:49'),
(6, 2, '1669234369205-floor_image.jpg', 'public/upload/images/propertity_image/', 'floor_image', 1, 1, 1, '2022-11-24 02:12:49', '2022-11-24 02:12:49'),
(7, 1, '1669234375601-Group 47.png', 'public/upload/images/propertity_image/', 'property_image', 1, 1, 1, '2022-11-24 02:12:55', '2022-11-24 02:12:55'),
(8, 1, '1669234375616-oops.png', 'public/upload/images/propertity_image/', 'property_image', 1, 1, 1, '2022-11-24 02:12:55', '2022-11-24 02:12:55'),
(9, 1, '1669234375596-floor_image.jpg', 'public/upload/images/propertity_image/', 'floor_image', 1, 1, 1, '2022-11-24 02:12:55', '2022-11-24 02:12:55'),
(10, 1, '1669234392400-Group 47.png', 'public/upload/images/propertity_image/', 'property_image', 1, 1, 1, '2022-11-24 02:13:12', '2022-11-24 02:13:12'),
(11, 1, '1669234392417-oops.png', 'public/upload/images/propertity_image/', 'property_image', 1, 1, 1, '2022-11-24 02:13:12', '2022-11-24 02:13:12'),
(12, 1, '1669234392393-floor_image.jpg', 'public/upload/images/propertity_image/', 'floor_image', 1, 1, 1, '2022-11-24 02:13:12', '2022-11-24 02:13:12'),
(13, 2, '1677260793582-hatirjil.jpeg', 'public/upload/images/property_image/', 'property_image', 1, 1, 1, '2023-02-24 23:46:33', '2023-02-24 23:46:33'),
(14, 2, '1677260793955-dhaka.jpeg', 'public/upload/images/property_image/', 'property_image', 1, 1, 1, '2023-02-24 23:46:33', '2023-02-24 23:46:33'),
(15, 2, '1677260807897-hatirjil.jpeg', 'public/upload/images/property_image/', 'property_image', 1, 1, 1, '2023-02-24 23:46:47', '2023-02-24 23:46:47'),
(16, 2, '1677260807935-dhaka.jpeg', 'public/upload/images/property_image/', 'property_image', 1, 1, 1, '2023-02-24 23:46:47', '2023-02-24 23:46:47'),
(17, 3, '1697204661790-fitted (4).jpg', 'public/upload/images/property_image/', 'property_image', 1, 1, 1, '2023-10-13 13:44:21', '2023-10-13 13:44:21'),
(18, 3, '1697204663859-fitted (3).jpg', 'public/upload/images/property_image/', 'property_image', 1, 1, 1, '2023-10-13 13:44:21', '2023-10-13 13:44:21'),
(19, 3, '1697204664190-fitted (2).jpg', 'public/upload/images/property_image/', 'property_image', 1, 1, 1, '2023-10-13 13:44:21', '2023-10-13 13:44:21'),
(20, 3, '1697204664446-fitted.jpg', 'public/upload/images/property_image/', 'property_image', 1, 1, 1, '2023-10-13 13:44:21', '2023-10-13 13:44:21'),
(21, 3, '1697204664621-fitted (1).jpg', 'public/upload/images/property_image/', 'property_image', 1, 1, 1, '2023-10-13 13:44:21', '2023-10-13 13:44:21'),
(22, 3, '1697204661785-fitted (4).jpg', 'public/upload/images/property_image/', 'floor_image', 1, 1, 1, '2023-10-13 13:44:21', '2023-10-13 13:44:21');

-- --------------------------------------------------------

--
-- Table structure for table `esm_roles`
--

CREATE TABLE `esm_roles` (
  `id` int(11) NOT NULL,
  `identity_id` int(11) NOT NULL DEFAULT 0,
  `title` varchar(50) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `esm_roles`
--

INSERT INTO `esm_roles` (`id`, `identity_id`, `title`, `status`) VALUES
(1, 1, 'Admin', 1),
(2, 2, 'Business agent', 1),
(3, 3, 'Personal Agent', 1),
(4, 4, 'General User', 1);

-- --------------------------------------------------------

--
-- Table structure for table `esm_services`
--

CREATE TABLE `esm_services` (
  `id` int(11) NOT NULL,
  `short_description` varchar(255) NOT NULL DEFAULT 'none',
  `title` varchar(255) NOT NULL DEFAULT 'Unknown',
  `details` text DEFAULT NULL,
  `meta_title` text DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `meta_canonical_url` text DEFAULT NULL,
  `meta_tag` text DEFAULT NULL,
  `image` varchar(255) NOT NULL DEFAULT 'default_image.png',
  `status` int(11) NOT NULL DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `esm_services`
--

INSERT INTO `esm_services` (`id`, `short_description`, `title`, `details`, `meta_title`, `meta_description`, `meta_canonical_url`, `meta_tag`, `image`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'none', 'Temper', '<p>huw</p>', '', '', 'undefined', '', '1697205759852-header-logo2.png', 1, 1, 1, '2022-10-30 00:00:18', '2023-10-13 20:02:39'),
(2, 'none', 'Construction Management', 'Hello 2', '', '', '', '', '1667066472075-Dentist-cartoon-vector.jpg', 1, 1, 1, '2022-10-30 00:01:12', '2022-11-29 23:08:41'),
(3, 'none', 'Design and Development', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida quis libero eleifend ornare. Maecenas mattis enim at arcu feugiat, sit amet blandit nisl iaculis. Donec lacus odio, malesuada eu libero sit amet, congue aliquam leo. In hac habitasse platea dictumst.', '', '', '', '', '1667066525331-unnamed.jpg', 1, 1, 1, '2022-10-30 00:02:05', '2022-10-30 00:02:05'),
(4, 'none', 'Design and Development2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida quis libero eleifend ornare. Maecenas mattis enim at arcu feugiat, sit amet blandit nisl iaculis. Donec lacus odio, malesuada eu libero sit amet, congue aliquam leo. In hac habitasse platea dictumst.', '', '', '', '', '1667066750534-unnamed.jpg', 0, 1, 1, '2022-10-30 00:05:50', '2022-10-30 00:08:36'),
(5, 'none', 'Testing', 'Testing perpend', '', '', '', '', '1669741713431-WhatsApp Image 2022-11-20 at 16.40.45.jpeg', 1, 1, 1, '2022-11-29 23:08:33', '2022-11-29 23:08:33'),
(6, 'he;;', 'IT SERVICE', 'jopjoo', 'meta_title', '', '', '', '1677555901946-sdss.png', 1, 1, 1, '2023-02-28 09:45:01', '2023-05-31 01:29:51');

-- --------------------------------------------------------

--
-- Table structure for table `esm_system_users`
--

CREATE TABLE `esm_system_users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT 'Unknow',
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `user_type` int(11) NOT NULL DEFAULT 1 COMMENT '1 = General,  2 : Business Agent, 3: Personal Agent',
  `profile_image` varchar(255) NOT NULL DEFAULT 'default_profile_image.png',
  `status` int(11) NOT NULL DEFAULT 1,
  `organization_name` varchar(255) DEFAULT NULL,
  `organization_details` text DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `esm_system_users`
--

INSERT INTO `esm_system_users` (`id`, `name`, `email`, `phone`, `user_type`, `profile_image`, `status`, `organization_name`, `organization_details`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(2, 'Shovon 1', 'shovon1@gmai6.com', '01671794065', 2, '1698263663567-getty_509107562_2000133320009280346_351827.jpg', 1, NULL, NULL, 0, 8, '2022-10-22 15:42:33', '2023-10-25 19:54:24'),
(14, 'Shovon 11', 'shovon8@mn.com', '01671794065', 3, 'default_profile_image.png', 1, NULL, NULL, 0, 1, '2023-02-21 23:47:04', '2023-02-21 23:53:30'),
(22, 'Shovon 3', NULL, '01612102558', 2, 'default_profile_image.png', 1, NULL, NULL, 0, 0, '2023-02-24 13:14:56', '2023-03-11 09:35:08'),
(23, 'Sheiblu (Member)', 'sheiblu1@gmail.com', '01671794064', 4, 'default_profile_image.png', 1, NULL, NULL, 0, 0, '2023-10-13 09:12:23', '2023-10-13 09:12:23'),
(24, 'Sheiblu (Businessl personal)', 'sheiblu2@gmail.com', '01671794066', 3, '1698263522442-392954182_2635042193320508_8034415405919771612_n.jpg', 1, NULL, NULL, 0, 24, '2023-10-13 09:19:18', '2023-10-25 19:52:02'),
(25, 'Sheiblu (Business Business Member)', 'sheiblu3@gmail.com', '01671794067', 2, 'default_profile_image.png', 1, 'AIS test', 'This is our testing user. we user this gg', 0, 1, '2023-10-13 09:21:47', '2023-10-25 19:34:16'),
(26, 'Md. Nakeeb Bin Ali', 'nakeeb.binali@yahoo.com', '01675852884', 2, 'default_profile_image.png', 1, 'Organization Name', 'Say some Details', 0, 1, '2023-10-13 15:33:13', '2023-10-25 19:42:03');

-- --------------------------------------------------------

--
-- Table structure for table `esm_users`
--

CREATE TABLE `esm_users` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `password` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1 COMMENT '1 =active , 2 = deactive',
  `role_id` int(11) NOT NULL DEFAULT 0,
  `profile_id` int(11) NOT NULL DEFAULT 0,
  `updated_by` int(11) NOT NULL DEFAULT 0,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `esm_users`
--

INSERT INTO `esm_users` (`id`, `name`, `email`, `phone`, `password`, `status`, `role_id`, `profile_id`, `updated_by`, `updated_at`) VALUES
(1, 'isheiblu', 'isheiblu@gmail.com', '01671794061', '$2b$10$zUYjeo0B2LusyOOZRMZRwed6xPL1V1B4iEi/R4t3txAhf5PQoROSK', 1, 1, 1, 1, '2022-06-29 11:51:17'),
(8, 'nakeeb', 'shovon8@gmai6.com', '01671794065', '$2b$10$oAgcgmD64bw5VFah5CUqwOcEwF2JGnQzS9Qp7PEzt8koATR/KgtfG', 1, 2, 2, 1, '2023-02-21 23:34:13'),
(21, '', 'shovon1@gmai6.com', '01671794065', '$2b$10$bmiljgyhrccc3FDOEMwJ/u.H41uxD7gIh5F/u1anBcvk1eQEaNWJa', 1, 3, 14, 1, '2023-02-23 14:55:45'),
(22, '--s-', NULL, '01612102558', '$2b$10$vcrEfI6EkeUpsUbDb5AequDXsoShqeSHtAwEY7azAnoIkdfCrkhoS', 1, 2, 22, 0, '2023-02-24 13:14:56'),
(23, '--s-', 'sheiblu1@gmail.com', '01671794064', '$2b$10$vlX24i0sU1KlV2ooKVB4QerzvoJyVAONcmy4qE.qZFzg9YcwPNOVS', 1, 4, 23, 0, '2023-10-13 09:12:23'),
(24, '--s-', 'sheiblu2@gmail.com', '01671794066', '$2b$10$1L1lkzAQirLiRhutDwH.ouw6/C5JHEYfzaM.Iy828xhgf./Z9Vkra', 1, 3, 24, 0, '2023-10-13 09:19:18'),
(25, '--s-', 'sheiblu3@gmail.com', '01671794067', '$2b$10$meiwSiDWashMNuUtvYyBzuu0BQSBQEJ2TBbdu8cfRLY6cQhSjZbQS', 1, 2, 25, 0, '2023-10-13 09:21:47'),
(26, '--s-', 'nakeeb.binali@yahoo.com', '01675852884', '$2b$10$yujX7FiomLGDXtgRNgUH.u8pFB4ZP8b5W/gVAgJMphYVvvaOOYVPu', 1, 3, 26, 1, '2023-10-25 19:36:05');

-- --------------------------------------------------------

--
-- Table structure for table `esm_user_subscribed_packages`
--

CREATE TABLE `esm_user_subscribed_packages` (
  `id` int(11) NOT NULL,
  `package_id` int(11) NOT NULL DEFAULT 0,
  `user_id` int(11) DEFAULT 0,
  `total_post_available` varchar(45) DEFAULT NULL,
  `expired_date` date DEFAULT NULL,
  `details` text DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `esm_user_subscribed_packages`
--

INSERT INTO `esm_user_subscribed_packages` (`id`, `package_id`, `user_id`, `total_post_available`, `expired_date`, `details`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 1, 22, '50', '2023-03-27', '{\"id\":1,\"title\":\"3 Month\",\"duration\":30,\"post_limit\":0,\"price\":300,\"discount_amount\":100,\"discount_percentage\":33.33,\"status\":1,\"created_by\":1,\"updated_by\":1,\"created_at\":\"2022-10-30T19:11:28.000Z\",\"updated_at\":\"2022-10-30T19:16:55.000Z\",\"total_post\":50}', 1, 1, 1, '2023-02-25 00:31:44', '2023-02-25 00:31:44'),
(2, 1, 8, NULL, '2023-03-17', '{\"id\":1,\"title\":\"3 Month\",\"duration\":20,\"post_limit\":0,\"price\":300,\"discount_amount\":100,\"discount_percentage\":33.33,\"status\":1,\"created_by\":1,\"updated_by\":1,\"created_at\":\"2022-10-30T19:11:28.000Z\",\"updated_at\":\"2022-10-30T19:16:55.000Z\",\"total_job_post\":9}', 1, 1, 1, '2023-02-25 00:38:25', '2023-02-25 01:18:16');

-- --------------------------------------------------------

--
-- Table structure for table `esm_user_subscribed_package_histories`
--

CREATE TABLE `esm_user_subscribed_package_histories` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `package_id` int(11) DEFAULT 0,
  `details` text DEFAULT NULL,
  `price` double NOT NULL DEFAULT 1,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `esm_user_subscribed_package_histories`
--

INSERT INTO `esm_user_subscribed_package_histories` (`id`, `user_id`, `package_id`, `details`, `price`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 22, 1, '{\"id\":1,\"title\":\"3 Month\",\"duration\":30,\"post_limit\":0,\"price\":300,\"discount_amount\":100,\"discount_percentage\":33.33,\"status\":1,\"created_by\":1,\"updated_by\":1,\"created_at\":\"2022-10-30T19:11:28.000Z\",\"updated_at\":\"2022-10-30T19:16:55.000Z\",\"total_post\":50}', 1, 1, 1, NULL, '2023-02-25 00:31:44', '2023-02-25 00:31:44'),
(2, 8, 1, '{\"id\":1,\"title\":\"3 Month\",\"duration\":30,\"post_limit\":0,\"price\":300,\"discount_amount\":100,\"discount_percentage\":33.33,\"status\":1,\"created_by\":1,\"updated_by\":1,\"created_at\":\"2022-10-30T19:11:28.000Z\",\"updated_at\":\"2022-10-30T19:16:55.000Z\",\"total_post\":50}', 1, 1, 1, NULL, '2023-02-25 00:38:25', '2023-02-25 00:38:25'),
(3, 8, 1, '{\"id\":1,\"title\":\"3 Month\",\"duration\":33,\"post_limit\":0,\"price\":300,\"discount_amount\":100,\"discount_percentage\":33.33,\"status\":1,\"created_by\":1,\"updated_by\":1,\"created_at\":\"2022-10-30T19:11:28.000Z\",\"updated_at\":\"2022-10-30T19:16:55.000Z\",\"total_post\":30}', 1, 1, 1, NULL, '2023-02-25 00:52:04', '2023-02-25 00:52:04'),
(4, 8, 1, '{\"id\":1,\"title\":\"3 Month\",\"duration\":200,\"post_limit\":0,\"price\":300,\"discount_amount\":100,\"discount_percentage\":33.33,\"status\":1,\"created_by\":1,\"updated_by\":1,\"created_at\":\"2022-10-30T19:11:28.000Z\",\"updated_at\":\"2022-10-30T19:16:55.000Z\",\"total_post\":70}', 1, 1, 1, NULL, '2023-02-25 01:09:00', '2023-02-25 01:09:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `esm_admins`
--
ALTER TABLE `esm_admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `esm_areas`
--
ALTER TABLE `esm_areas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `esm_banners`
--
ALTER TABLE `esm_banners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `esm_blogs`
--
ALTER TABLE `esm_blogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `esm_categories`
--
ALTER TABLE `esm_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `esm_contact_us`
--
ALTER TABLE `esm_contact_us`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `esm_favorites`
--
ALTER TABLE `esm_favorites`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `esm_indoor_amenities`
--
ALTER TABLE `esm_indoor_amenities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `esm_inquiries`
--
ALTER TABLE `esm_inquiries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `esm_login_tracks`
--
ALTER TABLE `esm_login_tracks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `esm_outdoor_amenities`
--
ALTER TABLE `esm_outdoor_amenities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `esm_page_meta`
--
ALTER TABLE `esm_page_meta`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `esm_payment_packages`
--
ALTER TABLE `esm_payment_packages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `esm_property`
--
ALTER TABLE `esm_property`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `esm_property_device_click_count_details`
--
ALTER TABLE `esm_property_device_click_count_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `esm_property_images`
--
ALTER TABLE `esm_property_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `esm_roles`
--
ALTER TABLE `esm_roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `esm_services`
--
ALTER TABLE `esm_services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `esm_system_users`
--
ALTER TABLE `esm_system_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `esm_users`
--
ALTER TABLE `esm_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `esm_user_subscribed_packages`
--
ALTER TABLE `esm_user_subscribed_packages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `esm_user_subscribed_package_histories`
--
ALTER TABLE `esm_user_subscribed_package_histories`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `esm_admins`
--
ALTER TABLE `esm_admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `esm_areas`
--
ALTER TABLE `esm_areas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `esm_banners`
--
ALTER TABLE `esm_banners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `esm_blogs`
--
ALTER TABLE `esm_blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `esm_categories`
--
ALTER TABLE `esm_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `esm_contact_us`
--
ALTER TABLE `esm_contact_us`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `esm_favorites`
--
ALTER TABLE `esm_favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `esm_indoor_amenities`
--
ALTER TABLE `esm_indoor_amenities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `esm_inquiries`
--
ALTER TABLE `esm_inquiries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `esm_login_tracks`
--
ALTER TABLE `esm_login_tracks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `esm_outdoor_amenities`
--
ALTER TABLE `esm_outdoor_amenities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `esm_page_meta`
--
ALTER TABLE `esm_page_meta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `esm_payment_packages`
--
ALTER TABLE `esm_payment_packages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `esm_property`
--
ALTER TABLE `esm_property`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `esm_property_device_click_count_details`
--
ALTER TABLE `esm_property_device_click_count_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `esm_property_images`
--
ALTER TABLE `esm_property_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `esm_roles`
--
ALTER TABLE `esm_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `esm_services`
--
ALTER TABLE `esm_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `esm_system_users`
--
ALTER TABLE `esm_system_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `esm_users`
--
ALTER TABLE `esm_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `esm_user_subscribed_packages`
--
ALTER TABLE `esm_user_subscribed_packages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `esm_user_subscribed_package_histories`
--
ALTER TABLE `esm_user_subscribed_package_histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;