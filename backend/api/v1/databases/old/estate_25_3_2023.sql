-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 25, 2023 at 08:47 AM
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
  `banner_type` int(11) NOT NULL DEFAULT 0 COMMENT '1: left, 2: right, 3: middle',
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
(1, 2, '2022-11-30', '2022-12-06', '1668415311247-car-switch.png', NULL, 0, 1, 1, '2022-11-14 14:41:51', '2022-11-14 14:47:47'),
(2, 1, '2022-11-08', '2022-12-03', '1668423418889-boy.jpg', NULL, 1, 1, 1, '2022-11-14 14:42:24', '2022-11-14 16:56:58'),
(3, 1, '2022-11-30', '2022-12-12', '1668415355850-unnamed.jpg', NULL, 1, 1, 1, '2022-11-14 14:42:35', '2022-11-14 14:42:35'),
(4, 1, '2022-11-30', '2022-12-04', '1668415396078-Stripe-Symbol.png', NULL, 1, 1, 1, '2022-11-14 14:43:16', '2022-11-14 14:43:16'),
(5, 3, '2022-11-30', '2022-12-04', '1668415407775-carasti.png', NULL, 1, 1, 1, '2022-11-14 14:43:27', '2022-11-14 14:43:27'),
(6, 1, '2022-11-14', '2022-11-16', '1668423995323-carasti.png', NULL, 1, 1, 1, '2022-11-14 17:06:35', '2022-11-14 17:06:35'),
(7, 1, '2022-11-14', '2022-11-14', '1668424007983-carasti.png', NULL, 1, 1, 1, '2022-11-14 17:06:47', '2022-11-14 17:06:47'),
(8, 2, '2022-11-14', '2022-11-14', '1668424083638-carasti.png', NULL, 1, 1, 1, '2022-11-14 17:08:03', '2022-11-14 17:08:03'),
(9, 3, '2022-01-30', '2022-03-24', '1678501729651-1669188186135-carzaty_new.png', NULL, 1, 1, 1, '2023-03-11 08:28:49', '2023-03-11 08:28:49'),
(10, 3, '2023-01-30', '2023-03-24', '1678501754419-1669188186135-carzaty_new.png', NULL, 1, 1, 1, '2023-03-11 08:29:14', '2023-03-11 08:29:14');

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
(3, 'Hotel and Resort', 1, NULL, NULL, '2022-11-15 10:03:32', '2022-11-15 10:03:32'),
(4, 'House', 1, NULL, NULL, '2022-11-15 10:03:32', '2022-11-15 10:03:32'),
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

INSERT INTO `esm_company_details` (`id`, `company_name`, `email`, `phone`, `fax`, `fb_link`, `twitter_link`, `youtube_link`, `youtube_video_key`, `logo`, `footer_one`, `footer_two`, `address`, `gps_coordinates`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'Estate Mart', 'info@estatemartbd.com', '01715135098', NULL, NULL, NULL, NULL, NULL, 'default_image.png', 'Real estate agency from Bangladesh', NULL, 'Section: 12, Block: A, Mirpur, Dhaka, Bangladesh', '23.826402, 90.365226', 1, NULL, NULL, '2022-11-20 17:37:20', '2022-11-20 17:37:20');

-- --------------------------------------------------------

--
-- Table structure for table `esm_contact_us`
--

CREATE TABLE `esm_contact_us` (
  `id` int(15) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT 'Unknown',
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(25) NOT NULL DEFAULT '0',
  `subject` varchar(255) NOT NULL DEFAULT 'Unknown',
  `message` text DEFAULT NULL,
  `is_read` int(10) NOT NULL DEFAULT 0,
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
(1, 1, 8, 1, 'Kabir khan', 'rawr@gm.com', '01718909090', 'abc', 'erf', 0, 1, 8, 8, '2023-02-04 06:48:02', '2023-02-04 12:51:12'),
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
(57, 1, 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJmM2ZlNDk2MWI3NjE4NjM4NmQ1MzM4NDZjODExM2I3ZCIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicm9sZSI6eyJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJhZG1pbiJ9LCJwcm9maWxlIjp7Im5hbWUiOiJBc2hyYWZ1bCBJc2xhbSIsImVtYWlsIjoiaXNoZWlibHVAZ21haWwuY29tIiwicGhvbmUiOiIwMTY3MTc5NDA2NCIsInByb2ZpbGVfaW1hZ2UiOiIxNjc4NTA2ODEyODk4LWRyIHB1c2gucG5nIiwic3RhdHVzIjoxLCJ1c2VyX3JvbGUiOiJBZG1pbiJ9LCJ0aW1lX3BlcmlvZCI6MTY3OTcyNTQxMzcyNSwiaWRlbnRpdHlfaWQiOiI2NGViY2RmNi1mMTVhLTQyZTAtOGE2Zi1hYjdmZmNiZTQ5NmIiLCJpYXQiOjE2Nzk3MjE4MTMsImV4cCI6MTY3OTgwODIxM30.7q4u4g-Ppa6MeClAkROQQEa7Mii3HGPgovoK8kuA3xk', '{\"useragent\":\"PostmanRuntime/7.31.3\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.31.3\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', '64ebcdf6-f15a-42e0-8a6f-ab7ffcbe496b', 1, '2023-03-25 05:23:33', '2023-03-25 05:23:33');

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
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `esm_property`
--

INSERT INTO `esm_property` (`id`, `property_name`, `details`, `description`, `category`, `location`, `area`, `purpose`, `size`, `bedroom`, `bathroom`, `price_per_sqft`, `total_price`, `owner_ship`, `floor`, `distance`, `size_calculation_method`, `unit_size`, `total_unit`, `total_floor`, `front_road`, `address`, `indoor_amenities`, `outdoor_amenities`, `is_featured`, `feature_start_date`, `feature_end_date`, `total_inquiries_count`, `total_device_click_count`, `status`, `post_owner_id`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'This is propertity_name', 'This is details', 'This is a description', 1, 1, 2, 1, 1200, 4, 1, 50, 5000, 1, 3, '[{\"name\":\"hospital\",\"distance\":10}]', 1, 1, 1, 1, 100, 'This is address', '2__$1', '3', 1, '2023-01-30', '2023-03-24', 0, 2, 1, 1, 1, 1, '2022-11-24 02:11:53', '2023-03-11 08:24:07'),
(2, 'This is propertity_name 2', 'This is details', 'This is a description', 1, 1, 2, 1, 1200, 4, 1, 50, 5000, 1, 3, '[{\"name\":\"hospital\",\"distance\":10}]', 1, 1, 1, 1, 100, 'This is address', '2__$1', '3', 1, '2023-03-05', '2023-03-24', 0, 1, 1, 1, 1, 1, '2022-11-24 02:12:49', '2023-03-11 08:38:15');

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
(3, 1, '49ad8e0a-fca7-4b6b-928a-541a4575edft', 0, NULL, 1, NULL, NULL, '2022-12-12 15:46:19', '2022-12-12 15:46:19');

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
(16, 2, '1677260807935-dhaka.jpeg', 'public/upload/images/property_image/', 'property_image', 1, 1, 1, '2023-02-24 23:46:47', '2023-02-24 23:46:47');

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

INSERT INTO `esm_services` (`id`, `short_description`, `title`, `details`, `image`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'none', 'Temper', 'huw', '1667067827666-abcf.png', 1, 1, 1, '2022-10-30 00:00:18', '2022-10-30 00:23:47'),
(2, 'none', 'Construction Management', 'Hello 2', '1667066472075-Dentist-cartoon-vector.jpg', 1, 1, 1, '2022-10-30 00:01:12', '2022-11-29 23:08:41'),
(3, 'none', 'Design and Development', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida quis libero eleifend ornare. Maecenas mattis enim at arcu feugiat, sit amet blandit nisl iaculis. Donec lacus odio, malesuada eu libero sit amet, congue aliquam leo. In hac habitasse platea dictumst.', '1667066525331-unnamed.jpg', 1, 1, 1, '2022-10-30 00:02:05', '2022-10-30 00:02:05'),
(4, 'none', 'Design and Development2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida quis libero eleifend ornare. Maecenas mattis enim at arcu feugiat, sit amet blandit nisl iaculis. Donec lacus odio, malesuada eu libero sit amet, congue aliquam leo. In hac habitasse platea dictumst.', '1667066750534-unnamed.jpg', 0, 1, 1, '2022-10-30 00:05:50', '2022-10-30 00:08:36'),
(5, 'none', 'Testing', 'Testing perpend', '1669741713431-WhatsApp Image 2022-11-20 at 16.40.45.jpeg', 1, 1, 1, '2022-11-29 23:08:33', '2022-11-29 23:08:33'),
(6, 'gwrg', 'IT SERVICE', 'jopjoo', '1677555901946-sdss.png', 1, 1, 1, '2023-02-28 09:45:01', '2023-02-28 09:49:46');

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
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `esm_system_users`
--

INSERT INTO `esm_system_users` (`id`, `name`, `email`, `phone`, `user_type`, `profile_image`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(2, 'Shovon 1', 'shovon1@gmai6.com', '01671794065', 2, 'default_profile_image.png', 1, 0, 1, '2022-10-22 15:42:33', '2023-02-23 14:55:45'),
(14, 'Shovon 11', 'shovon8@mn.com', '01671794065', 3, 'default_profile_image.png', 1, 0, 1, '2023-02-21 23:47:04', '2023-02-21 23:53:30'),
(22, 'Shovon 3', NULL, '01612102558', 2, 'default_profile_image.png', 1, 0, 0, '2023-02-24 13:14:56', '2023-03-11 09:35:08');

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
(1, 'isheiblu', 'isheiblu@gmail.com', '01671794061', '$2b$10$zUYjeo0B2LusyOOZRMZRwed6xPL1V1B4iEi/R4t3txAhf5PQoROSK', 1, 1, 1, 1, '2022-06-29 11:51:17'),
(8, '', 'shovon8@gmai6.com', '01671794065', '$2b$10$oAgcgmD64bw5VFah5CUqwOcEwF2JGnQzS9Qp7PEzt8koATR/KgtfG', 1, 2, 2, 1, '2023-02-21 23:34:13'),
(21, '', 'shovon1@gmai6.com', '01671794065', '$2b$10$bmiljgyhrccc3FDOEMwJ/u.H41uxD7gIh5F/u1anBcvk1eQEaNWJa', 1, 3, 14, 1, '2023-02-23 14:55:45'),
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `esm_outdoor_amenities`
--
ALTER TABLE `esm_outdoor_amenities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `esm_payment_packages`
--
ALTER TABLE `esm_payment_packages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `esm_property`
--
ALTER TABLE `esm_property`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `esm_property_device_click_count_details`
--
ALTER TABLE `esm_property_device_click_count_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `esm_property_images`
--
ALTER TABLE `esm_property_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `esm_roles`
--
ALTER TABLE `esm_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `esm_services`
--
ALTER TABLE `esm_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
