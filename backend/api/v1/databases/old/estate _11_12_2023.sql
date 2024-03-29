-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 11, 2023 at 06:37 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `esm_admins`
--

INSERT INTO `esm_admins` (`id`, `name`, `email`, `phone`, `profile_image`, `address`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'Ashraful Islam', 'isheiblu@gmail.com', '01671794064', '1700937958518-boy-with-glasses-candle-front-window_758145-8.jpg', '', 1, 1, 1, '2022-01-11 17:15:01', '2023-12-11 10:44:53');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(8, 'Bohoddarhut', 2, 7, 1, 1, 1, '2023-03-25 11:37:24', '2023-03-25 11:37:24');

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
  `details` text DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `esm_banners`
--

INSERT INTO `esm_banners` (`id`, `banner_type`, `from_date`, `to_date`, `image`, `details`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(11, 3, '2023-05-01', '2023-07-31', '1685301000561-cover1.jpg', NULL, 0, 1, 1, '2023-05-29 01:10:00', '2023-11-25 21:05:54'),
(12, 3, '2023-06-01', '2023-06-28', '1685301102289-cover2.jpg', NULL, 0, 1, 1, '2023-05-29 01:11:42', '2023-11-25 21:05:52'),
(13, 3, '2023-05-01', '2023-05-12', '1685301263261-20822109.jpg', NULL, 0, 1, 1, '2023-05-29 01:14:23', '2023-11-25 21:05:49'),
(14, 2, '2023-05-01', '2023-05-31', '1685301343852-344241058_1262825987651288_6123855043788802573_n.jpg', NULL, 0, 1, 1, '2023-05-29 01:15:43', '2023-11-25 20:57:14'),
(15, 4, '2023-05-25', '2023-12-29', '1700924227474-ZiClJf-1920w.jpg', '#', 1, 1, 1, '2023-05-29 01:16:29', '2023-12-02 14:27:56'),
(16, 4, '2023-11-25', '2024-03-31', '1700924716219-mailchimp-04X1Yp9hNH8-unsplash.jpg', '#', 1, 1, 1, '2023-11-25 21:05:16', '2023-12-02 14:27:53'),
(17, 3, '2023-11-17', '2024-01-23', '1700924792601-IMG_20231104_155154.jpg', 'undefined', 1, 1, 1, '2023-11-25 21:06:32', '2023-12-02 14:31:31'),
(18, 3, '2023-11-02', '2023-11-30', '1700924823825-boy-with-glasses-candle-front-window_758145-8.jpg', 'undefined', 1, 1, 1, '2023-11-25 21:07:03', '2023-12-02 14:31:48'),
(19, 3, '2023-11-26', '2024-03-31', '1701010678618-20822109.jpg', '#', 1, 1, 1, '2023-11-26 20:57:58', '2023-12-02 14:27:48');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `status` int(11) NOT NULL DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `esm_categories`
--

INSERT INTO `esm_categories` (`id`, `title`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'Apartment', 1, NULL, NULL, '2022-11-15 10:02:42', '2022-11-15 10:02:42'),
(2, 'Commercial', 1, NULL, NULL, '2022-11-15 10:02:53', '2022-11-15 10:02:53'),
(3, 'Hotel/ Resort', 1, NULL, NULL, '2022-11-15 10:03:32', '2023-11-25 21:00:34'),
(4, 'House/ Building', 1, NULL, NULL, '2022-11-15 10:03:32', '2023-11-25 21:00:34'),
(5, 'Land', 1, NULL, NULL, '2022-11-15 10:04:04', '2022-11-15 10:04:04'),
(6, 'Room Mate/Sublet', 1, NULL, NULL, '2022-11-15 10:04:04', '2022-11-15 10:04:04');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `esm_company_details`
--

INSERT INTO `esm_company_details` (`id`, `company_name`, `email`, `phone`, `fax`, `fb_link`, `twitter_link`, `youtube_link`, `youtube_video_key`, `instagram`, `logo`, `footer_one`, `footer_two`, `address`, `gps_coordinates`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'Temper', '', '', 'null', '', '', '', 'null', 'https://www.instagram.com/', '1685298249683-header-logo2.png', '', 'null', '', '', 1, NULL, 1, '2022-11-20 17:37:20', '2023-05-31 00:53:50');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `esm_contact_us`
--

INSERT INTO `esm_contact_us` (`id`, `name`, `email`, `phone`, `subject`, `message`, `is_read`, `status`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'Mokbul khan', 'abc@gm.com', '01718909090', 'g', 'h', 0, 1, NULL, '2023-02-28 10:23:05', '2023-02-28 10:23:05'),
(2, 'Mokbul khan', 'abc@gm.com', '01718909090', 'Great', 'h', 1, 1, 1, '2023-02-28 10:23:19', '2023-02-28 10:34:35'),
(3, 'kabir khan', 'dsdn@gm.com', '01718909099', 'Nice', 'jhiaoi', 0, 1, 1, '2023-02-28 10:23:41', '2023-02-28 10:36:16'),
(4, 'kabir khan', 'dsdn@gm.com', '01718909099', 'Nice', 'gthew', 1, 1, 1, '2023-02-28 10:24:07', '2023-02-28 10:35:08');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
-- Table structure for table `esm_forget_passwords`
--

CREATE TABLE `esm_forget_passwords` (
  `id` int(15) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `token` text DEFAULT NULL,
  `medium` varchar(50) NOT NULL DEFAULT 'Unknown',
  `otp` varchar(50) NOT NULL DEFAULT 'Unknown',
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `esm_forget_passwords`
--

INSERT INTO `esm_forget_passwords` (`id`, `user_id`, `token`, `medium`, `otp`, `status`, `created_at`) VALUES
(1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibWVkaXVtIjoiZW1haWwiLCJ0aW1lUGVyaW9kIjoiMjAyMy0xMi0xMSAwNDoyOToyNSIsImNvbm5lY3Rpb25UeXBlIjoiOTU5ODcxYjdiMzgwNjkzNWE5OTE4MTM2YjdmNDE4ZTciLCJkZXZpY2VBbmFseXNpcyI6IjMwNWFkNThhM2I1ZTg3YWFjZjFkNmMyZjQ0OGE5YmYwNTU3OWZjYzQzNTJmMGZiYzliNTZiMWViNzJiNTg5ZWMiLCJpYXQiOjE3MDIyNjg2NjUsImV4cCI6MTcwMjI2ODk2NX0.Azx5L6qkCtF-itF-43j_N24KvU_3MnwkD78jso_GX60', 'email', '3754', 0, '2023-12-11 04:24:25'),
(2, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibWVkaXVtIjoiZW1haWwiLCJ0aW1lUGVyaW9kIjoiMjAyMy0xMi0xMSAwNDo0NTo1NSIsImNvbm5lY3Rpb25UeXBlIjoiMDcyNzVjZDQ5MmNmZmRkNzczNjM0Mzc4OWYzN2Y3MWQiLCJkZXZpY2VBbmFseXNpcyI6IjMwNWFkNThhM2I1ZTg3YWFjZjFkNmMyZjQ0OGE5YmYwNTU3OWZjYzQzNTJmMGZiYzliNTZiMWViNzJiNTg5ZWMiLCJpYXQiOjE3MDIyNjk2NTUsImV4cCI6MTcwMjI2OTk1NX0.WW3nptUOI8q9myupHxNMug5I942LE-vtgX6CboWd3vk', 'email', '0783', 0, '2023-12-11 04:40:55'),
(3, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibWVkaXVtIjoiZW1haWwiLCJ0aW1lUGVyaW9kIjoiMjAyMy0xMi0xMSAwNDo0ODo0NCIsImNvbm5lY3Rpb25UeXBlIjoiMGQ5YjExNGExNTg4MTIwNzM1MDdlMDRmNjMxYTMwYzciLCJkZXZpY2VBbmFseXNpcyI6IjMwNWFkNThhM2I1ZTg3YWFjZjFkNmMyZjQ0OGE5YmYwNTU3OWZjYzQzNTJmMGZiYzliNTZiMWViNzJiNTg5ZWMiLCJpYXQiOjE3MDIyNjk4MjQsImV4cCI6MTcwMjI3MDEyNH0.JkC0TeXWQS5PCo-vPvRwyvpHkD93ZMfIDyRpNJIgNV8', 'email', '6320', 0, '2023-12-11 04:43:44');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(64, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNjc4NTA2ODEyODk4LWRyIHB1c2gucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTcwMDkyNzc5ODE0NiwiaWRlbnRpdHlfaWQiOiJhNmExNmU0MS1iMzIzLTQxNWItYThiOC0zNDk4YWYzM2JiNmQiLCJpYXQiOjE3MDA5MjQxOTgsImV4cCI6MTcwMTAxMDU5OH0.quIfr6RxNbggogztLf7jh5U31vPtRJTtLkn5oRkkCRs', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"119.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', 'a6a16e41-b323-415b-a8b8-3498af33bb6d', 1, '2023-11-25 14:56:38', '2023-11-25 14:56:38'),
(65, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNjc4NTA2ODEyODk4LWRyIHB1c2gucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTcwMDkyOTkzMTEwMCwiaWRlbnRpdHlfaWQiOiIzZmQxZmQxZC03OTgxLTQ0MDMtOTI1ZS1mYWNkZWVlZDFjMjciLCJpYXQiOjE3MDA5MjYzMzEsImV4cCI6MTcwMTAxMjczMX0.qXL4rF_aZL0jxvrhNLA8LSnDagyBYrmUdjTMeUdpllY', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"119.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', '3fd1fd1d-7981-4403-925e-facdeeed1c27', 1, '2023-11-25 15:32:11', '2023-11-25 15:32:11'),
(66, 22, 22, 22, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiI4OTMyNDk1ODhlNTBlY2M0YTE5NjhmMzgwOTBkNzVlMyIsImVtYWlsIjpudWxsLCJyb2xlIjp7InJvbGVfaWQiOjIsInJvbGVfbmFtZSI6IkJ1c2luZXNzIEFnZW50In0sInByb2ZpbGUiOnsibmFtZSI6IlNob3ZvbiAzIiwiZW1haWwiOm51bGwsInBob25lIjoiMDE2MTIxMDI1NTgiLCJwcm9maWxlX2ltYWdlIjoiZGVmYXVsdF9wcm9maWxlX2ltYWdlLnBuZyIsInN0YXR1cyI6MSwidXNlcl90eXBlIjoyLCJ1c2VyX3JvbGUiOiJCdXNpbmVzcyBBZ2VudCJ9LCJ0aW1lX3BlcmlvZCI6MTcwMDk0MjkyMjAyNywiaWRlbnRpdHlfaWQiOiJiMzg4ZGY0OC1hZWJlLTRkODktODU2Yy03ZWU5ZGI3NjJlOTEiLCJpYXQiOjE3MDA5MzkzMjIsImV4cCI6MTcwMTAyNTcyMn0.8oMyn5I-R3gc-STPL7hN_a7uNGt8Y3GPoXlcXManyy4', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"119.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', 'b388df48-aebe-4d89-856c-7ee9db762e91', 1, '2023-11-25 19:08:42', '2023-11-25 19:08:42'),
(67, 21, 21, 21, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiI3ZGJlOWM3NzhjMDNkMzYxZDhiZjYyZTZlNTBkMjY0NyIsImVtYWlsIjoic2hvdm9uMUBnbWFpNi5jb20iLCJyb2xlIjp7InJvbGVfaWQiOjMsInJvbGVfbmFtZSI6IlBlcnNvbmFsIEFnZW50In0sInByb2ZpbGUiOnsibmFtZSI6IlNob3ZvbiAxMSIsImVtYWlsIjoic2hvdm9uOEBtbi5jb20iLCJwaG9uZSI6IjAxNjcxNzk0MDY1IiwicHJvZmlsZV9pbWFnZSI6ImRlZmF1bHRfcHJvZmlsZV9pbWFnZS5wbmciLCJzdGF0dXMiOjEsInVzZXJfdHlwZSI6MywidXNlcl9yb2xlIjoiUGVyc29uYWwgQWdlbnQifSwidGltZV9wZXJpb2QiOjE3MDA5NDMwNzMyNTksImlkZW50aXR5X2lkIjoiYjk3NTA2NzctMzc4Yi00MjFlLWIxZjEtNGNiNWEwZDhjNjY2IiwiaWF0IjoxNzAwOTM5NDczLCJleHAiOjE3MDEwMjU4NzN9.cdhZc5ReP7_dBYJGyX5OOP9nayqyAJaZHCu4giEJtY4', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"119.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', 'b9750677-378b-421e-b1f1-4cb5a0d8c666', 1, '2023-11-25 19:11:13', '2023-11-25 19:11:13'),
(68, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNzAwOTM3OTU4NTE4LWJveS13aXRoLWdsYXNzZXMtY2FuZGxlLWZyb250LXdpbmRvd183NTgxNDUtOC5qcGciLCJzdGF0dXMiOjEsInVzZXJfcm9sZSI6IkFkbWluIn0sInRpbWVfcGVyaW9kIjoxNzAxMDExODY5MjkxLCJpZGVudGl0eV9pZCI6IjBkY2FlNzgxLTY0YzEtNGQ2Ni1hMTMzLTQ5M2NiZWU3YWNkMiIsImlhdCI6MTcwMTAwODI2OSwiZXhwIjoxNzAxMDk0NjY5fQ.Nm7dMXij4jl1PNEZfUOUXyLFzLczI4xr88-4Dddjd3o', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"119.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', '0dcae781-64c1-4d66-a133-493cbee7acd2', 1, '2023-11-26 14:17:49', '2023-11-26 14:17:49'),
(69, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNzAwOTM3OTU4NTE4LWJveS13aXRoLWdsYXNzZXMtY2FuZGxlLWZyb250LXdpbmRvd183NTgxNDUtOC5qcGciLCJzdGF0dXMiOjEsInVzZXJfcm9sZSI6IkFkbWluIn0sInRpbWVfcGVyaW9kIjoxNzAxMDkzNDg1OTUxLCJpZGVudGl0eV9pZCI6Ijk2YTdmOTM2LTBkZjktNDAwYy1iYmMyLTcxNThmOTExYWU2ZCIsImlhdCI6MTcwMTA4OTg4NSwiZXhwIjoxNzAxMTc2Mjg1fQ.KEkXVuebJF7C1Bj3ef7YtqkIO8hRnJv2rEX1ro-dhUA', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"119.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', '96a7f936-0df9-400c-bbc2-7158f911ae6d', 1, '2023-11-27 12:58:05', '2023-11-27 12:58:05'),
(70, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNzAwOTM3OTU4NTE4LWJveS13aXRoLWdsYXNzZXMtY2FuZGxlLWZyb250LXdpbmRvd183NTgxNDUtOC5qcGciLCJzdGF0dXMiOjEsInVzZXJfcm9sZSI6IkFkbWluIn0sInRpbWVfcGVyaW9kIjoxNzAxMDk1NjkxMDEzLCJpZGVudGl0eV9pZCI6IjkyZGI4MzIwLThhZWYtNGU5OS1hNDg0LTA3Njk1ZTBmYmUyNSIsImlhdCI6MTcwMTA5MjA5MSwiZXhwIjoxNzAxMTc4NDkxfQ.tSprEIUjewamCxAMeOLYRvVdwenhnBgui8xGroLvdeU', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"119.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', '92db8320-8aef-4e99-a484-07695e0fbe25', 1, '2023-11-27 13:34:51', '2023-11-27 13:34:51'),
(71, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNzAwOTM3OTU4NTE4LWJveS13aXRoLWdsYXNzZXMtY2FuZGxlLWZyb250LXdpbmRvd183NTgxNDUtOC5qcGciLCJzdGF0dXMiOjEsInVzZXJfcm9sZSI6IkFkbWluIn0sInRpbWVfcGVyaW9kIjoxNzAxMDk4Mjk5NTE2LCJpZGVudGl0eV9pZCI6ImM3NDY5OWRlLWMwY2ItNGJiMi05NjlkLWMyZmI3NTllNmU3MyIsImlhdCI6MTcwMTA5NDY5OSwiZXhwIjoxNzAxMTgxMDk5fQ.alxSWh-gHnVBKPBBWRSXgShvZyWjXPg4wZH7_9Bo2Wk', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"119.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', 'c74699de-c0cb-4bb2-969d-c2fb759e6e73', 1, '2023-11-27 14:18:19', '2023-11-27 14:18:19'),
(72, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNzAwOTM3OTU4NTE4LWJveS13aXRoLWdsYXNzZXMtY2FuZGxlLWZyb250LXdpbmRvd183NTgxNDUtOC5qcGciLCJzdGF0dXMiOjEsInVzZXJfcm9sZSI6IkFkbWluIn0sInRpbWVfcGVyaW9kIjoxNzAxNDMzMTkzNTgwLCJpZGVudGl0eV9pZCI6IjY0NmZlN2VkLTY0OWItNGYyMi04YWFkLTdlNGRhNzcxZjljNSIsImlhdCI6MTcwMTQyOTU5MywiZXhwIjoxNzAxNTE1OTkzfQ.JJEEn1AplCsrR96W-ti2LU5RilOKP4TgEUMSpqJWFLE', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"119.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', '646fe7ed-649b-4f22-8aad-7e4da771f9c5', 1, '2023-12-01 11:19:53', '2023-12-01 11:19:53'),
(73, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNzAwOTM3OTU4NTE4LWJveS13aXRoLWdsYXNzZXMtY2FuZGxlLWZyb250LXdpbmRvd183NTgxNDUtOC5qcGciLCJzdGF0dXMiOjEsInVzZXJfcm9sZSI6IkFkbWluIn0sInRpbWVfcGVyaW9kIjoxNzAxNDMzMjQ5MDA3LCJpZGVudGl0eV9pZCI6IjhlMmMzM2E5LWU0OGMtNDg1NC1iYjA4LTIyODFkNmY5ZDgwMCIsImlhdCI6MTcwMTQyOTY0OSwiZXhwIjoxNzAxNTE2MDQ5fQ.eI6fiKHt7N34HGHLz5bI8f9IIJN7c9gA_QPh4qgSjtc', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"119.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', '8e2c33a9-e48c-4854-bb08-2281d6f9d800', 1, '2023-12-01 11:20:49', '2023-12-01 11:20:49'),
(74, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNzAwOTM3OTU4NTE4LWJveS13aXRoLWdsYXNzZXMtY2FuZGxlLWZyb250LXdpbmRvd183NTgxNDUtOC5qcGciLCJzdGF0dXMiOjEsInVzZXJfcm9sZSI6IkFkbWluIn0sInRpbWVfcGVyaW9kIjoxNzAxNDM1NTc4NDg3LCJpZGVudGl0eV9pZCI6IjQ0ZGVmOTQzLTdiMTEtNDFhZS1hMWE3LTgyYjVlMjgxOGM2NiIsImlhdCI6MTcwMTQzMTk3OCwiZXhwIjoxNzAxNTE4Mzc4fQ.KtWT2IEuzkbw8j_4iWimqak85aNyDG-VoKsYjkew2Io', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"119.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', '44def943-7b11-41ae-a1a7-82b5e2818c66', 1, '2023-12-01 11:59:38', '2023-12-01 11:59:38'),
(75, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNzAwOTM3OTU4NTE4LWJveS13aXRoLWdsYXNzZXMtY2FuZGxlLWZyb250LXdpbmRvd183NTgxNDUtOC5qcGciLCJzdGF0dXMiOjEsInVzZXJfcm9sZSI6IkFkbWluIn0sInRpbWVfcGVyaW9kIjoxNzAxNDM4NDg1NDEzLCJpZGVudGl0eV9pZCI6IjJjZTZjZjhlLWZkNjUtNGU4Zi04NWNjLTA3ZjgyMDhjN2VlOSIsImlhdCI6MTcwMTQzNDg4NSwiZXhwIjoxNzAxNTIxMjg1fQ.UzyNAKvaPdO5PJeLlyibc4-UWtRE3i-96EqTaGt-eeU', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"119.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', '2ce6cf8e-fd65-4e8f-85cc-07f8208c7ee9', 1, '2023-12-01 12:48:05', '2023-12-01 12:48:05'),
(76, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNzAwOTM3OTU4NTE4LWJveS13aXRoLWdsYXNzZXMtY2FuZGxlLWZyb250LXdpbmRvd183NTgxNDUtOC5qcGciLCJzdGF0dXMiOjEsInVzZXJfcm9sZSI6IkFkbWluIn0sInRpbWVfcGVyaW9kIjoxNzAxNDQzMDE0ODM3LCJpZGVudGl0eV9pZCI6IjNiMzM5NzViLWViZDMtNGIyNS1hMDA4LTk4ZGEyNDc3ZTE2YSIsImlhdCI6MTcwMTQzOTQxNCwiZXhwIjoxNzAxNTI1ODE0fQ.uA2WFIVSzFQcNfVTCINZgjP-zhIIUMa0l3kZMIaWyyk', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"119.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', '3b33975b-ebd3-4b25-a008-98da2477e16a', 1, '2023-12-01 14:03:34', '2023-12-01 14:03:34'),
(77, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNzAwOTM3OTU4NTE4LWJveS13aXRoLWdsYXNzZXMtY2FuZGxlLWZyb250LXdpbmRvd183NTgxNDUtOC5qcGciLCJzdGF0dXMiOjEsInVzZXJfcm9sZSI6IkFkbWluIn0sInRpbWVfcGVyaW9kIjoxNzAxNTA5MjUwMTQ3LCJpZGVudGl0eV9pZCI6ImI4MTA3ZDdiLTVkODUtNDUzNi1hZjY4LWY5ZjUxZDdjMTUxYSIsImlhdCI6MTcwMTUwNTY1MCwiZXhwIjoxNzAxNTkyMDUwfQ.oEeuZi6IjUfgMBe_k4WPmVc41hARnhuEXXqPsgJUv7g', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"119.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', 'b8107d7b-5d85-4536-af68-f9f51d7c151a', 1, '2023-12-02 08:27:30', '2023-12-02 08:27:30'),
(78, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNzAwOTM3OTU4NTE4LWJveS13aXRoLWdsYXNzZXMtY2FuZGxlLWZyb250LXdpbmRvd183NTgxNDUtOC5qcGciLCJzdGF0dXMiOjEsInVzZXJfcm9sZSI6IkFkbWluIn0sInRpbWVfcGVyaW9kIjoxNzAxNTEwNDE3Njc2LCJpZGVudGl0eV9pZCI6ImFjZDQzYTUxLTk5YTMtNDYzZS04Njk3LWFhYTgwMGZiNjNmNSIsImlhdCI6MTcwMTUwNjgxNywiZXhwIjoxNzAxNTkzMjE3fQ.yaL-54Pgj3puqNV7hvAsoeadtggXcRG2YNzfXtHmVt8', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"119.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', 'acd43a51-99a3-463e-8697-aaa800fb63f5', 1, '2023-12-02 08:46:57', '2023-12-02 08:46:57'),
(79, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNzAwOTM3OTU4NTE4LWJveS13aXRoLWdsYXNzZXMtY2FuZGxlLWZyb250LXdpbmRvd183NTgxNDUtOC5qcGciLCJzdGF0dXMiOjEsInVzZXJfcm9sZSI6IkFkbWluIn0sInRpbWVfcGVyaW9kIjoxNzAyMjE3MTg4MzEzLCJpZGVudGl0eV9pZCI6IjkyZTg3NzcwLWVmM2QtNDM3MS04ZmM0LTRmYWJjMWQwOTZiYSIsImlhdCI6MTcwMjIxMzU4OCwiZXhwIjoxNzAyMjk5OTg4fQ.fK5sW8ZtdWXD9zi8n_2gmO2H0NcLSCObjIMt0153xZw', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"120.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', '92e87770-ef3d-4371-8fc4-4fabc1d096ba', 1, '2023-12-10 13:06:28', '2023-12-10 13:06:28'),
(80, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoic2hvdm9uMTMwNDA1NkBnbWFpbC5jb20iLCJyb2xlIjp7InJvbGVfaWQiOjEsInJvbGVfbmFtZSI6ImFkbWluIn0sInByb2ZpbGUiOnsibmFtZSI6IkFzaHJhZnVsIElzbGFtIiwiZW1haWwiOiJzaG92b24xMzA0MDU2QGdtYWlsLmNvbSIsInBob25lIjoiMDE2NzE3OTQwNjQiLCJwcm9maWxlX2ltYWdlIjoiMTcwMDkzNzk1ODUxOC1ib3ktd2l0aC1nbGFzc2VzLWNhbmRsZS1mcm9udC13aW5kb3dfNzU4MTQ1LTguanBnIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTcwMjI3MzQyMDE1NywiaWRlbnRpdHlfaWQiOiJlZDNjYjUyZC1mZDlmLTQyMDYtOThlOC05ZjE1MmFjYzlkMzYiLCJpYXQiOjE3MDIyNjk4MjAsImV4cCI6MTcwMjM1NjIyMH0.sHX75dasK-UnODvgdhbRLBcKY0ZYosTkSPuiwKGaAsE', '{\"useragent\":\"PostmanRuntime/7.35.0\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.35.0\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', 'ed3cb52d-fd9f-4206-98e8-9f152acc9d36', 1, '2023-12-11 04:43:40', '2023-12-11 04:43:40'),
(81, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoic2hvdm9uMTMwNDA1NkBnbWFpbC5jb20iLCJyb2xlIjp7InJvbGVfaWQiOjEsInJvbGVfbmFtZSI6ImFkbWluIn0sInByb2ZpbGUiOnsibmFtZSI6IkFzaHJhZnVsIElzbGFtIiwiZW1haWwiOiJzaG92b24xMzA0MDU2QGdtYWlsLmNvbSIsInBob25lIjoiMDE2NzE3OTQwNjQiLCJwcm9maWxlX2ltYWdlIjoiMTcwMDkzNzk1ODUxOC1ib3ktd2l0aC1nbGFzc2VzLWNhbmRsZS1mcm9udC13aW5kb3dfNzU4MTQ1LTguanBnIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTcwMjI3MzQ2OTA3NywiaWRlbnRpdHlfaWQiOiI2YTE3NjEwNi1kMmE2LTQyMDYtOTNjNi0xMjcxNWMwMGI0OWYiLCJpYXQiOjE3MDIyNjk4NjksImV4cCI6MTcwMjM1NjI2OX0.v95QqRYppb98DFRFd1FuBuLr9X8abpg_zzkVScaV0B4', '{\"useragent\":\"PostmanRuntime/7.35.0\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.35.0\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '6a176106-d2a6-4206-93c6-12715c00b49f', 1, '2023-12-11 04:44:29', '2023-12-11 04:44:29'),
(82, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNzAwOTM3OTU4NTE4LWJveS13aXRoLWdsYXNzZXMtY2FuZGxlLWZyb250LXdpbmRvd183NTgxNDUtOC5qcGciLCJzdGF0dXMiOjEsInVzZXJfcm9sZSI6IkFkbWluIn0sInRpbWVfcGVyaW9kIjoxNzAyMjczNjQ3MDYxLCJpZGVudGl0eV9pZCI6Ijc0MWM3ZWMzLWJmNWQtNDdkYi05NjczLThjNzRlMDUwMWJmMiIsImlhdCI6MTcwMjI3MDA0NywiZXhwIjoxNzAyMzU2NDQ3fQ.dXH0WKupuzS8TCUwzBwfzuDgcKGDDoPYAsI6bHJPDRs', '{\"useragent\":\"PostmanRuntime/7.35.0\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.35.0\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '741c7ec3-bf5d-47db-9673-8c74e0501bf2', 1, '2023-12-11 04:47:27', '2023-12-11 04:47:27'),
(83, 8, 8, 8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiI1MmMyNjBhZGZiNGVjMjU3ZTA5NWNmODhmNGY1M2RmZSIsImVtYWlsIjoic2hvdm9uOEBnbWFpNi5jb20iLCJyb2xlIjp7InJvbGVfaWQiOjIsInJvbGVfbmFtZSI6IkJ1c2luZXNzIEFnZW50In0sInByb2ZpbGUiOnsibmFtZSI6IlNob3ZvbiAxIiwiZW1haWwiOiJzaG92b24xQGdtYWk2LmNvbSIsInBob25lIjoiMDE2NzE3OTQwNjUiLCJwcm9maWxlX2ltYWdlIjoiZGVmYXVsdF9wcm9maWxlX2ltYWdlLnBuZyIsInN0YXR1cyI6MSwidXNlcl90eXBlIjoyLCJ1c2VyX3JvbGUiOiJCdXNpbmVzcyBBZ2VudCJ9LCJ0aW1lX3BlcmlvZCI6MTcwMjI3NjAwNTc1NSwiaWRlbnRpdHlfaWQiOiJkMTI4ODgyZi01OWQwLTQ4YTMtOTIwNy0zNzEzNmQxNTMyZDEiLCJpYXQiOjE3MDIyNzI0MDUsImV4cCI6MTcwMjM1ODgwNX0._tmlGDWzSJFDlPk-9kwPLUhxixY1wdP_pD3pRSrNZ78', '{\"useragent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36\",\"os-name\":\"Windows\",\"os-short-name\":\"WIN\",\"os-family\":\"Windows\",\"client-type\":\"browser\",\"client-name\":\"Chrome\",\"client-short-name\":\"CH\",\"client-version\":\"120.0.0.0\",\"device-id\":\"\",\"device-type\":\"desktop\",\"device-brand\":\"\",\"device-model\":\"\"}', 'd128882f-59d0-48a3-9207-37136d1532d1', 1, '2023-12-11 05:26:45', '2023-12-11 05:26:45');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `esm_page_meta`
--

INSERT INTO `esm_page_meta` (`id`, `page_name`, `meta_title`, `meta_description`, `meta_canonical_url`, `meta_tag`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'Home', 'Estate Mart', 'Meta Description', 'req.body.meta_canonical_url', 'Meta Tag', 1, NULL, 1, '2023-06-02 11:34:37', '2023-11-26 00:39:39'),
(2, 'All Ads', NULL, NULL, NULL, NULL, 1, NULL, NULL, '2023-06-02 11:34:52', '2023-06-02 11:34:52'),
(4, 'All Agent', NULL, NULL, NULL, NULL, 1, NULL, NULL, '2023-10-07 16:10:04', '2023-10-07 16:10:04'),
(5, 'AgentDetails', 'Agents page', 'Agents who are the medium to get success on your goal to get your dream property.', 'http://localhost:8081/agent-detail/21', 'Agent,  Business', 1, NULL, 1, '2023-10-07 16:10:04', '2023-11-26 20:21:09'),
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `status` int(11) NOT NULL DEFAULT 1,
  `post_owner_id` int(11) NOT NULL DEFAULT 0,
  `is_published` int(11) NOT NULL DEFAULT 0 COMMENT '0  = false, 1 = true',
  `is_sold_out` int(11) NOT NULL DEFAULT 0 COMMENT '0  = false, 1 = true',
  `meta_title` text DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `meta_canonical_url` text DEFAULT NULL,
  `meta_tag` text DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `esm_property`
--

INSERT INTO `esm_property` (`id`, `property_name`, `details`, `description`, `category`, `location`, `area`, `purpose`, `size`, `bedroom`, `bathroom`, `price_per_sqft`, `total_price`, `owner_ship`, `floor`, `distance`, `size_calculation_method`, `unit_size`, `total_unit`, `total_floor`, `front_road`, `address`, `indoor_amenities`, `outdoor_amenities`, `is_featured`, `feature_start_date`, `feature_end_date`, `total_inquiries_count`, `total_device_click_count`, `status`, `post_owner_id`, `is_published`, `is_sold_out`, `meta_title`, `meta_description`, `meta_canonical_url`, `meta_tag`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'This is propertity_name', 'This is details', '<p>This is a description</p>', 1, 1, 6, 2, 1200, 4, 1, 0, 5000, 1, 3, '[{\"name\":\"entertainmen\",\"distance\":10},{\"name\":\"train\",\"distance\":null},{\"name\":\"school\",\"distance\":null},{\"name\":\"bus\",\"distance\":null},{\"name\":\"pharmacy\",\"distance\":null},{\"name\":\"hospital\",\"distance\":null}]', 1, 1, 1, 1, 100, 'This is address', '1__$2', '3', 1, '2023-01-30', '2023-03-24', 0, 24, 1, 8, 0, 0, 'null', 'null', 'null', 'null', 1, 1, '2022-11-24 02:11:53', '2023-12-11 11:05:36'),
(2, 'This is propertity_name 2', 'This is details', '<p>This is a description</p>', 1, 2, 7, 1, 1200, 4, 1, 50, 5000, 1, 3, '[{\"name\":\"entertainmen\",\"distance\":10},{\"name\":\"train\",\"distance\":null},{\"name\":\"school\",\"distance\":null},{\"name\":\"bus\",\"distance\":null},{\"name\":\"pharmacy\",\"distance\":null},{\"name\":\"hospital\",\"distance\":null}]', 1, 1, 1, 1, 100, 'This is address', '1__$2', '3', 0, NULL, NULL, 0, 31, 1, 8, 1, 0, 'This is propertity_name 2', 'Property Meta Description', 'Property Meta Canonical Url', 'Dhaka, Apartment, For rent.', 1, 1, '2022-11-24 02:12:49', '2023-12-11 11:05:36'),
(3, 'p2.1', '', '<p>sdds</p>', 2, 1, 3, 1, 500, 1, 2, 1, 234, 1, 5, '[{\"name\":\"entertainmen\",\"distance\":\"12\"},{\"name\":\"train\",\"distance\":\"1\"},{\"name\":\"school\"},{\"name\":\"bus\"},{\"name\":\"pharmacy\"},{\"name\":\"hospital\"}]', 1, 1, 1, 1, 1, 'Dhaka', '2', '1', 1, '2023-12-10', '2023-12-12', 0, 5, 1, 8, 1, 1, 'false', 'false', 'false', 'false', 1, 1, '2023-12-01 17:33:46', '2023-12-11 11:06:07');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(7, 2, '45fbbdef-2402-4363-b4cc-5f4213166f66', 0, NULL, 1, NULL, NULL, '2023-11-25 14:56:29', '2023-11-25 14:56:29'),
(8, 1, '45fbbdef-2402-4363-b4cc-5f4213166f66', 0, NULL, 1, NULL, NULL, '2023-11-25 14:57:17', '2023-11-25 14:57:17'),
(9, 2, '453bc37a-53c5-46de-9753-79c6a736e4fc', 0, NULL, 1, NULL, NULL, '2023-11-25 15:09:05', '2023-11-25 15:09:05'),
(10, 2, '253bcf0d-5d4d-4c42-9d7c-4335c02554dd', 0, NULL, 1, NULL, NULL, '2023-11-25 15:16:28', '2023-11-25 15:16:28'),
(11, 1, '253bcf0d-5d4d-4c42-9d7c-4335c02554dd', 0, NULL, 1, NULL, NULL, '2023-11-25 15:24:36', '2023-11-25 15:24:36'),
(12, 2, '116f7991-e352-44a8-9a51-84e9fbc2812a', 0, NULL, 1, NULL, NULL, '2023-11-25 18:35:46', '2023-11-25 18:35:46'),
(13, 1, '74927417-7a91-4821-aa7a-3e274745e35e', 0, NULL, 1, NULL, NULL, '2023-11-25 18:40:40', '2023-11-25 18:40:40'),
(14, 2, '2473b7a2-49e4-4b3b-b7ab-6e5967dc9c09', 0, NULL, 1, NULL, NULL, '2023-11-25 18:41:39', '2023-11-25 18:41:39'),
(15, 2, '28132cbf-3c2e-46a6-99e2-fea89b9e94a5', 0, NULL, 1, NULL, NULL, '2023-11-25 18:43:44', '2023-11-25 18:43:44'),
(16, 2, '37791820-da18-4982-bc59-4e727fa3c046', 0, NULL, 1, NULL, NULL, '2023-11-25 18:45:14', '2023-11-25 18:45:14'),
(17, 2, 'be4cd44d-3e71-4a89-ad9e-28425f7a923d', 0, NULL, 1, NULL, NULL, '2023-11-25 18:47:54', '2023-11-25 18:47:54'),
(18, 2, '5b5eaf09-8484-40b9-87c9-27d543a05de6', 0, NULL, 1, NULL, NULL, '2023-11-25 18:48:55', '2023-11-25 18:48:55'),
(19, 1, '5b5eaf09-8484-40b9-87c9-27d543a05de6', 0, NULL, 1, NULL, NULL, '2023-11-25 18:50:22', '2023-11-25 18:50:22'),
(20, 2, '8c0a45e4-c0da-4886-a44f-44975719e719', 0, NULL, 1, NULL, NULL, '2023-11-25 19:02:59', '2023-11-25 19:02:59'),
(21, 2, 'null', 0, NULL, 1, NULL, NULL, '2023-11-25 19:03:26', '2023-11-25 19:03:26'),
(22, 1, '2f533f74-50b9-4c5c-ab33-bb27fa248f7a', 0, NULL, 1, NULL, NULL, '2023-11-25 19:03:46', '2023-11-25 19:03:46'),
(23, 2, '2f533f74-50b9-4c5c-ab33-bb27fa248f7a', 0, NULL, 1, NULL, NULL, '2023-11-25 19:03:54', '2023-11-25 19:03:54'),
(24, 2, 'd7ddc2a5-5722-46ed-9df9-a71d207bffe8', 0, NULL, 1, NULL, NULL, '2023-11-26 14:13:16', '2023-11-26 14:13:16'),
(25, 2, 'fb7d2ab3-f273-438e-bf7a-368ca8e8de4d', 0, NULL, 1, NULL, NULL, '2023-11-26 15:38:12', '2023-11-26 15:38:12'),
(26, 2, '846a51f6-7a9c-4a35-bb3d-0b0d1e7e7c82', 0, NULL, 1, NULL, NULL, '2023-11-26 16:05:25', '2023-11-26 16:05:25'),
(27, 1, '64f1ba0d-9d72-4075-bcab-50dd62439fbb', 0, NULL, 1, NULL, NULL, '2023-11-26 16:08:50', '2023-11-26 16:08:50'),
(28, 1, '44a53915-53b0-4210-b77e-d94f5e130b8d', 0, NULL, 1, NULL, NULL, '2023-11-26 16:10:03', '2023-11-26 16:10:03'),
(29, 2, '79ba5499-8774-4e30-9d6e-2eeacf3cde71', 0, NULL, 1, NULL, NULL, '2023-11-27 13:29:59', '2023-11-27 13:29:59'),
(30, 2, '7ba2568b-1965-44cc-a587-0c67490c0db4', 0, NULL, 1, NULL, NULL, '2023-11-27 13:34:56', '2023-11-27 13:34:56'),
(31, 2, '7f3cafe4-dd76-4a4d-acc5-2aa79c3d0587', 0, NULL, 1, NULL, NULL, '2023-11-27 13:41:44', '2023-11-27 13:41:44'),
(32, 2, '0cb38bc6-36ba-4fd3-8ee3-8da94c5fbfef', 0, NULL, 1, NULL, NULL, '2023-11-27 13:53:47', '2023-11-27 13:53:47'),
(33, 2, 'f9660a35-80bc-47c7-9de7-bb01916c6cb9', 0, NULL, 1, NULL, NULL, '2023-11-27 14:01:11', '2023-11-27 14:01:11'),
(34, 1, '767cd387-f44d-4958-a6ab-4d22f960b85e', 0, NULL, 1, NULL, NULL, '2023-11-27 14:01:16', '2023-11-27 14:01:16'),
(35, 1, '83af2eac-af30-4a2c-95a1-15b06c1d19fa', 0, NULL, 1, NULL, NULL, '2023-11-27 14:01:21', '2023-11-27 14:01:21'),
(36, 1, 'd023057f-ef96-42fd-829c-9c340bf72a9c', 0, NULL, 1, NULL, NULL, '2023-11-27 14:01:28', '2023-11-27 14:01:28'),
(37, 2, '54b794dd-35bd-4cab-be1a-d664af444147', 0, NULL, 1, NULL, NULL, '2023-11-27 14:20:35', '2023-11-27 14:20:35'),
(38, 2, 'e0f881da-d844-4540-8e1f-9556b7bc86e6', 0, NULL, 1, NULL, NULL, '2023-11-27 14:23:02', '2023-11-27 14:23:02'),
(39, 1, 'e0f881da-d844-4540-8e1f-9556b7bc86e6', 0, NULL, 1, NULL, NULL, '2023-11-27 14:23:33', '2023-11-27 14:23:33'),
(40, 2, '4ef9b849-09a9-43c0-8603-d409ab50a7a6', 0, NULL, 1, NULL, NULL, '2023-12-01 11:08:40', '2023-12-01 11:08:40'),
(41, 1, 'dfc01205-fcb0-428e-bb80-9aa1414ae11a', 0, NULL, 1, NULL, NULL, '2023-12-01 11:19:31', '2023-12-01 11:19:31'),
(42, 2, '03df08b5-281b-462f-bfb2-d4d8d00a475d', 0, NULL, 1, NULL, NULL, '2023-12-01 11:50:20', '2023-12-01 11:50:20'),
(43, 2, '7ecb3737-9404-4269-9659-f6e4475e4f65', 0, NULL, 1, NULL, NULL, '2023-12-01 11:51:50', '2023-12-01 11:51:50'),
(44, 2, 'b88c4488-4162-4717-addb-d2d2e37dc719', 0, NULL, 1, NULL, NULL, '2023-12-01 12:00:21', '2023-12-01 12:00:21'),
(45, 2, 'b533d9b7-31d6-467d-b0a3-43d83e8f81c6', 0, NULL, 1, NULL, NULL, '2023-12-01 12:28:48', '2023-12-01 12:28:48'),
(46, 3, 'b533d9b7-31d6-467d-b0a3-43d83e8f81c6', 0, NULL, 1, NULL, NULL, '2023-12-01 12:48:22', '2023-12-01 12:48:22'),
(47, 3, '655cc3a7-5f19-4c13-8d7f-be9992b2f24d', 0, NULL, 1, NULL, NULL, '2023-12-01 13:03:09', '2023-12-01 13:03:09'),
(48, 3, '38ba9850-4303-47cc-a771-0cafe2e4a987', 0, NULL, 1, NULL, NULL, '2023-12-01 13:06:03', '2023-12-01 13:06:03'),
(49, 1, '38ba9850-4303-47cc-a771-0cafe2e4a987', 0, NULL, 1, NULL, NULL, '2023-12-01 13:08:23', '2023-12-01 13:08:23'),
(50, 2, '17146ee5-3e8d-4367-8723-502eef396912', 0, NULL, 1, NULL, NULL, '2023-12-01 13:23:23', '2023-12-01 13:23:23'),
(51, 1, 'a3bbe6d8-c5fd-4b56-af17-fdfa3c4abc9e', 0, NULL, 1, NULL, NULL, '2023-12-01 13:30:01', '2023-12-01 13:30:01'),
(52, 3, '165d22c5-9c5d-4851-be4f-3aa046633059', 0, NULL, 1, NULL, NULL, '2023-12-02 08:32:36', '2023-12-02 08:32:36'),
(53, 2, '5531fbbc-8c97-498c-8dca-51cf8e536739', 0, NULL, 1, NULL, NULL, '2023-12-02 08:34:16', '2023-12-02 08:34:16'),
(54, 1, '4eb2235e-5359-47c2-a132-abb6350c8d8d', 0, NULL, 1, NULL, NULL, '2023-12-02 08:50:49', '2023-12-02 08:50:49'),
(55, 1, 'f57f07c2-7210-4573-92f1-14bfc77e9f6f', 0, NULL, 1, NULL, NULL, '2023-12-02 08:50:54', '2023-12-02 08:50:54'),
(56, 2, '5fcde2b3-7a9b-4120-9361-4967617ac477', 0, NULL, 1, NULL, NULL, '2023-12-02 08:51:22', '2023-12-02 08:51:22'),
(57, 1, '5fcde2b3-7a9b-4120-9361-4967617ac477', 0, NULL, 1, NULL, NULL, '2023-12-02 08:51:26', '2023-12-02 08:51:26'),
(58, 1, '0bdabeb3-3005-469e-94a7-a58d0833f556', 0, NULL, 1, NULL, NULL, '2023-12-02 08:51:43', '2023-12-02 08:51:43'),
(59, 1, '2b8f3610-8ffc-4e6b-9e5d-e85130808ebe', 0, NULL, 1, NULL, NULL, '2023-12-10 13:08:31', '2023-12-10 13:08:31'),
(60, 3, '2b8f3610-8ffc-4e6b-9e5d-e85130808ebe', 0, NULL, 1, NULL, NULL, '2023-12-10 13:08:45', '2023-12-10 13:08:45');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `esm_property_images`
--

INSERT INTO `esm_property_images` (`id`, `property_id`, `name`, `path`, `image_type`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(17, 2, '1700938116628-property-investement.jpg', 'public/upload/images/property_image/', 'property_image', 1, 1, 1, '2023-11-25 18:48:36', '2023-11-25 18:48:36'),
(18, 1, '1700938241027-property-investement.jpg', 'public/upload/images/property_image/', 'property_image', 1, 1, 1, '2023-11-25 18:50:41', '2023-11-25 18:50:41'),
(19, 3, '1701430425528-property-investement.jpg', 'public/upload/images/property_image/', 'property_image', 1, 1, 1, '2023-12-01 11:33:45', '2023-12-01 11:33:45'),
(20, 3, '1701430425209-ZiClJf-1920w.jpg', 'public/upload/images/property_image/', 'floor_image', 1, 1, 1, '2023-12-01 11:33:45', '2023-12-01 11:33:45'),
(21, 3, '1701434934488-54057828-business-people-and-portrait-concept-smiling-businessman-face-or-portrait.jpg', 'public/upload/images/property_image/', 'property_image', 1, 1, 1, '2023-12-01 12:48:54', '2023-12-01 12:48:54'),
(22, 1, '1701507111012-boy-with-glasses-candle-front-window_758145-8.jpg', 'public/upload/images/property_image/', 'property_image', 1, 1, 1, '2023-12-02 08:51:51', '2023-12-02 08:51:51');

-- --------------------------------------------------------

--
-- Table structure for table `esm_roles`
--

CREATE TABLE `esm_roles` (
  `id` int(11) NOT NULL,
  `identity_id` int(11) NOT NULL DEFAULT 0,
  `title` varchar(50) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `esm_roles`
--

INSERT INTO `esm_roles` (`id`, `identity_id`, `title`, `status`) VALUES
(1, 1, 'admin', 1),
(2, 2, 'agent', 1),
(3, 3, 'user', 1);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `esm_services`
--

INSERT INTO `esm_services` (`id`, `short_description`, `title`, `details`, `meta_title`, `meta_description`, `meta_canonical_url`, `meta_tag`, `image`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'none', 'Sales and Marketing Support', '<p>Testing perpend</p>', '', '', 'undefined', '', '1669741713431-WhatsApp Image 2022-11-20 at 16.40.45.jpeg', 1, 1, 1, '2022-11-29 23:08:33', '2023-12-01 20:07:09'),
(2, 'he;;', 'Investment Management', '<p>jopjoo</p>', 'meta_title', '', 'undefined', '', '1677555901946-sdss.png', 1, 1, 1, '2023-02-28 09:45:01', '2023-12-01 20:07:09'),
(3, 'none', 'Construction Management', 'Hello 2', '', '', '', '', '1667066472075-Dentist-cartoon-vector.jpg', 1, 1, 1, '2022-10-30 00:01:12', '2023-12-01 20:07:09'),
(4, 'none', 'Design and Development', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida quis libero eleifend ornare. Maecenas mattis enim at arcu feugiat, sit amet blandit nisl iaculis. Donec lacus odio, malesuada eu libero sit amet, congue aliquam leo. In hac habitasse platea dictumst.', '', '', '', '', '1667066525331-unnamed.jpg', 1, 1, 1, '2022-10-30 00:02:05', '2023-12-01 20:07:09'),
(11, 'none', 'Temper', 'huw', '', '', '', '', '1667067827666-abcf.png', 0, 1, 1, '2022-10-30 00:00:18', '2023-12-01 20:06:48'),
(41, 'none', 'Design and Development2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida quis libero eleifend ornare. Maecenas mattis enim at arcu feugiat, sit amet blandit nisl iaculis. Donec lacus odio, malesuada eu libero sit amet, congue aliquam leo. In hac habitasse platea dictumst.', '', '', '', '', '1667066750534-unnamed.jpg', 0, 1, 1, '2022-10-30 00:05:50', '2023-12-01 20:06:48');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `esm_system_users`
--

INSERT INTO `esm_system_users` (`id`, `name`, `email`, `phone`, `user_type`, `profile_image`, `status`, `organization_name`, `organization_details`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(2, 'Shovon 1', 'shovon1@gmai6.com', '01671794065', 2, 'default_profile_image.png', 1, 'Sm Traders', NULL, 0, 1, '2022-10-22 15:42:33', '2023-11-26 01:39:33'),
(14, 'Shovon 11', 'shovon@gmai6.com', '01671794066', 3, '1700940082003-54057828-business-people-and-portrait-concept-smiling-businessman-face-or-portrait.jpg', 1, NULL, NULL, 0, 21, '2023-02-21 23:47:04', '2023-12-11 10:01:43'),
(22, 'Shovon', NULL, NULL, 2, '1700939415101-images.png', 1, 'BS Property', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like', 0, 22, '2023-02-24 13:14:56', '2023-11-25 19:10:15');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `esm_users`
--

INSERT INTO `esm_users` (`id`, `name`, `email`, `phone`, `password`, `status`, `role_id`, `profile_id`, `updated_by`, `updated_at`) VALUES
(1, 'isheiblu', 'isheiblu@gmail.com', '01671794061', '$2b$10$fCpFLL/qdeLVWkNjM3k6x.NpcYQXiTIbopfFsb7mbwHSwkQBlqx7K', 1, 1, 1, 1, '2022-06-29 11:51:17'),
(8, '', 'shovon8@gmai6.com', '01671794065', '$2b$10$oAgcgmD64bw5VFah5CUqwOcEwF2JGnQzS9Qp7PEzt8koATR/KgtfG', 1, 2, 2, 1, '2023-02-21 23:34:13'),
(21, '', 'shovon@gmai6.com', '01671794066', '$2b$10$bmiljgyhrccc3FDOEMwJ/u.H41uxD7gIh5F/u1anBcvk1eQEaNWJa', 1, 3, 14, 1, '2023-02-23 14:55:45'),
(22, '--s-', NULL, '01612102558', '$2b$10$vcrEfI6EkeUpsUbDb5AequDXsoShqeSHtAwEY7azAnoIkdfCrkhoS', 1, 2, 22, 0, '2023-02-24 13:14:56');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
-- Indexes for table `esm_forget_passwords`
--
ALTER TABLE `esm_forget_passwords`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `esm_contact_us`
--
ALTER TABLE `esm_contact_us`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `esm_favorites`
--
ALTER TABLE `esm_favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `esm_forget_passwords`
--
ALTER TABLE `esm_forget_passwords`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `esm_property_images`
--
ALTER TABLE `esm_property_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `esm_roles`
--
ALTER TABLE `esm_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `esm_services`
--
ALTER TABLE `esm_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `esm_system_users`
--
ALTER TABLE `esm_system_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `esm_users`
--
ALTER TABLE `esm_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

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
