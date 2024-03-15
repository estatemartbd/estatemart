-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 30, 2022 at 09:51 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.1

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
  `id` int(15) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT 'Unknow',
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `profile_image` varchar(255) NOT NULL DEFAULT 'default_profile_image.png',
  `address` text NOT NULL,
  `status` int(2) NOT NULL DEFAULT 1,
  `created_by` int(15) DEFAULT NULL,
  `updated_by` int(15) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `esm_admins`
--

INSERT INTO `esm_admins` (`id`, `name`, `email`, `phone`, `profile_image`, `address`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'Ashraful Islam', 'isheiblu@gmail.com', '01671794064', 'default_profile_image.png', '', 1, 1, 1, '2022-01-11 17:15:01', '2022-10-21 00:42:54');

-- --------------------------------------------------------

--
-- Table structure for table `esm_banners`
--

CREATE TABLE `esm_banners` (
  `id` int(15) NOT NULL,
  `banner_type` int(15) NOT NULL DEFAULT 0 COMMENT '1: left, 2: right, 3: middle',
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

-- --------------------------------------------------------

--
-- Table structure for table `esm_blogs`
--

CREATE TABLE `esm_blogs` (
  `id` int(15) NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT 'Unknown',
  `details` text DEFAULT NULL,
  `image` varchar(255) NOT NULL DEFAULT 'default_image.png',
  `status` int(2) NOT NULL DEFAULT 1,
  `created_by` int(15) DEFAULT NULL,
  `updated_by` int(15) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `esm_blogs`
--

INSERT INTO `esm_blogs` (`id`, `title`, `details`, `image`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'New Blog', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida quis libero eleifend ornare. Maecenas mattis enim at arcu feugiat, sit amet blandit nisl iaculis. Donec lacus odio, malesuada eu libero sit amet, congue aliquam leo. In hac habitasse platea dictumst.', '1667154792879-284305072_5319473641425402_2517996224778736487_n.jpeg', 0, 1, 1, '2022-10-31 00:33:12', '2022-10-31 00:35:30'),
(2, 'Temper', 'sfsa', '1667154899487-defult_cover_image.png', 2, 1, 1, '2022-10-31 00:33:52', '2022-10-31 00:35:09');

-- --------------------------------------------------------

--
-- Table structure for table `esm_indoor_amenities`
--

CREATE TABLE `esm_indoor_amenities` (
  `id` int(15) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `status` int(2) NOT NULL DEFAULT 1,
  `created_by` int(15) DEFAULT NULL,
  `updated_by` int(15) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `esm_indoor_amenities`
--

INSERT INTO `esm_indoor_amenities` (`id`, `title`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'Sink', 2, 1, 1, '2022-10-29 15:20:22', '2022-10-29 15:26:39'),
(2, 'Grill', 0, 1, 1, '2022-10-29 15:20:35', '2022-10-29 15:25:48'),
(3, 'AC', 1, 1, 1, '2022-10-29 15:23:59', '2022-10-29 15:23:59');

-- --------------------------------------------------------

--
-- Table structure for table `esm_login_tracks`
--

CREATE TABLE `esm_login_tracks` (
  `id` int(15) NOT NULL,
  `created_by` int(15) NOT NULL,
  `updated_by` int(15) NOT NULL,
  `user_id` int(15) NOT NULL,
  `jwt_token` text NOT NULL DEFAULT '',
  `login_device_info` text NOT NULL DEFAULT '',
  `uuid` varchar(255) NOT NULL DEFAULT '',
  `status` int(2) NOT NULL DEFAULT 1,
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
(13, 8, 8, 8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiI1MmMyNjBhZGZiNGVjMjU3ZTA5NWNmODhmNGY1M2RmZSIsImVtYWlsIjoic2hvdm9uOEBnbWFpNi5jb20iLCJyb2xlIjp7InJvbGVfaWQiOjIsInJvbGVfbmFtZSI6IlBlcnNvbmFsIEFnZW50In0sInByb2ZpbGUiOnsibmFtZSI6IlNob3ZvbiA0MSIsImVtYWlsIjoic2hvdm9uOEBnbWFpNi5jb20iLCJwaG9uZSI6IjAxNjcxNzk0MDY0IiwicHJvZmlsZV9pbWFnZSI6ImRlZmF1bHRfcHJvZmlsZV9pbWFnZS5wbmciLCJzdGF0dXMiOjEsInVzZXJfdHlwZSI6MywidXNlcl9pZCI6OCwidXNlcl9yb2xlIjoiUGVyc29uYWwgQWdlbnQifSwidGltZV9wZXJpb2QiOjE2NjcxNjY0MDMyMjcsImlkZW50aXR5X2lkIjoiZGNkN2Y1NzctNDJhNC00MzhkLTg4ZDYtOTU1OTY1YjJmMzdhIiwiaWF0IjoxNjY3MTYyODAzLCJleHAiOjE2NjcyNDkyMDN9.SRBZlKx3I9uTY2Tl5clFWbej8mpaQXD0TPHuXsx13cQ', '{\"useragent\":\"PostmanRuntime/7.29.2\",\"os-name\":\"\",\"os-short-name\":\"\",\"os-family\":\"\",\"client-type\":\"library\",\"client-name\":\"Postman Desktop\",\"client-short-name\":\"\",\"client-version\":\"7.29.2\",\"device-id\":\"\",\"device-type\":\"\",\"device-brand\":\"\",\"device-model\":\"\"}', 'dcd7f577-42a4-438d-88d6-955965b2f37a', 1, '2022-10-30 20:46:43', '2022-10-30 20:46:43');

-- --------------------------------------------------------

--
-- Table structure for table `esm_outdoor_amenities`
--

CREATE TABLE `esm_outdoor_amenities` (
  `id` int(15) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `status` int(2) NOT NULL DEFAULT 1,
  `created_by` int(15) DEFAULT NULL,
  `updated_by` int(15) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `esm_outdoor_amenities`
--

INSERT INTO `esm_outdoor_amenities` (`id`, `title`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'AC$', 0, 1, 1, '2022-10-29 15:38:12', '2022-10-29 15:39:26'),
(2, 'AC1', 1, 1, 1, '2022-10-29 15:38:18', '2022-10-29 15:38:18'),
(3, 'AC5', 1, 1, 1, '2022-10-29 15:38:30', '2022-10-29 15:38:30');

-- --------------------------------------------------------

--
-- Table structure for table `esm_payment_packages`
--

CREATE TABLE `esm_payment_packages` (
  `id` int(15) NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT 'Unknown',
  `duration` int(11) NOT NULL DEFAULT 1,
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

INSERT INTO `esm_payment_packages` (`id`, `title`, `duration`, `price`, `discount_amount`, `discount_percentage`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, '3 Month', 90, 300, 100, 33.33, 1, 1, 1, '2022-10-31 01:11:28', '2022-10-31 01:16:55'),
(2, '6 Month', 180, 600, 0, 0, 1, 1, 1, '2022-10-31 01:12:06', '2022-10-31 01:17:23'),
(3, '12 Month', 365, 600, 0, 0, 1, 1, 1, '2022-10-31 01:13:04', '2022-10-31 01:19:00');

-- --------------------------------------------------------

--
-- Table structure for table `esm_roles`
--

CREATE TABLE `esm_roles` (
  `id` int(15) NOT NULL,
  `identity_id` int(4) NOT NULL DEFAULT 0,
  `title` varchar(50) NOT NULL,
  `status` int(2) NOT NULL
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
  `id` int(15) NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT 'Unknown',
  `details` text DEFAULT NULL,
  `image` varchar(255) NOT NULL DEFAULT 'default_image.png',
  `status` int(2) NOT NULL DEFAULT 1,
  `created_by` int(15) DEFAULT NULL,
  `updated_by` int(15) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `esm_services`
--

INSERT INTO `esm_services` (`id`, `title`, `details`, `image`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'Temper', 'huw', '1667067827666-abcf.png', 1, 1, 1, '2022-10-30 00:00:18', '2022-10-30 00:23:47'),
(2, 'Construction Management', 'Hello 2', '1667066472075-Dentist-cartoon-vector.jpg', 2, 1, 1, '2022-10-30 00:01:12', '2022-10-30 00:08:56'),
(3, 'Design and Development', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida quis libero eleifend ornare. Maecenas mattis enim at arcu feugiat, sit amet blandit nisl iaculis. Donec lacus odio, malesuada eu libero sit amet, congue aliquam leo. In hac habitasse platea dictumst.', '1667066525331-unnamed.jpg', 1, 1, 1, '2022-10-30 00:02:05', '2022-10-30 00:02:05'),
(4, 'Design and Development2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida quis libero eleifend ornare. Maecenas mattis enim at arcu feugiat, sit amet blandit nisl iaculis. Donec lacus odio, malesuada eu libero sit amet, congue aliquam leo. In hac habitasse platea dictumst.', '1667066750534-unnamed.jpg', 0, 1, 1, '2022-10-30 00:05:50', '2022-10-30 00:08:36');

-- --------------------------------------------------------

--
-- Table structure for table `esm_system_users`
--

CREATE TABLE `esm_system_users` (
  `id` int(15) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT 'Unknow',
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `user_type` int(11) NOT NULL DEFAULT 1 COMMENT '1 = General,  2 : Business Agent, 3: Personal Agent',
  `profile_image` varchar(255) NOT NULL DEFAULT 'default_profile_image.png',
  `status` int(2) NOT NULL DEFAULT 1,
  `created_by` int(15) DEFAULT NULL,
  `updated_by` int(15) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `esm_system_users`
--

INSERT INTO `esm_system_users` (`id`, `name`, `email`, `phone`, `user_type`, `profile_image`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(2, 'Shovon 1', 'shovon8@gmai6.com', '01671794064', 3, 'default_profile_image.png', 1, 0, 8, '2022-10-22 15:42:33', '2022-10-30 20:47:27');

-- --------------------------------------------------------

--
-- Table structure for table `esm_users`
--

CREATE TABLE `esm_users` (
  `id` int(15) NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `password` text NOT NULL,
  `status` int(2) NOT NULL DEFAULT 1 COMMENT '1 =active , 2 = deactive',
  `role_id` int(3) NOT NULL DEFAULT 0,
  `profile_id` int(15) NOT NULL DEFAULT 0,
  `updated_by` int(15) NOT NULL DEFAULT 0,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `esm_users`
--

INSERT INTO `esm_users` (`id`, `name`, `email`, `phone`, `password`, `status`, `role_id`, `profile_id`, `updated_by`, `updated_at`) VALUES
(1, 'isheiblu', 'isheiblu@gmail.com', '01671794061', '$2b$10$zUYjeo0B2LusyOOZRMZRwed6xPL1V1B4iEi/R4t3txAhf5PQoROSK', 1, 1, 1, 1, '2022-06-29 11:51:17'),
(8, '', 'shovon8@gmai6.com', '01671794064', '$2b$10$oAgcgmD64bw5VFah5CUqwOcEwF2JGnQzS9Qp7PEzt8koATR/KgtfG', 1, 2, 2, 8, '2022-10-30 20:47:27');

-- --------------------------------------------------------

--
-- Table structure for table `esm_user_payment_package_histories`
--

CREATE TABLE `esm_user_payment_package_histories` (
  `id` int(15) NOT NULL,
  `user_id` int(15) NOT NULL DEFAULT 0,
  `payment_package_id` int(15) DEFAULT 0,
  `enroll_date` date DEFAULT NULL,
  `expired_date` date DEFAULT NULL,
  `details` text DEFAULT NULL,
  `price` double NOT NULL DEFAULT 1,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `esm_admins`
--
ALTER TABLE `esm_admins`
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
-- Indexes for table `esm_indoor_amenities`
--
ALTER TABLE `esm_indoor_amenities`
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
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_name` (`name`);

--
-- Indexes for table `esm_user_payment_package_histories`
--
ALTER TABLE `esm_user_payment_package_histories`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `esm_admins`
--
ALTER TABLE `esm_admins`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `esm_banners`
--
ALTER TABLE `esm_banners`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `esm_blogs`
--
ALTER TABLE `esm_blogs`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `esm_indoor_amenities`
--
ALTER TABLE `esm_indoor_amenities`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `esm_login_tracks`
--
ALTER TABLE `esm_login_tracks`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `esm_outdoor_amenities`
--
ALTER TABLE `esm_outdoor_amenities`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `esm_payment_packages`
--
ALTER TABLE `esm_payment_packages`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `esm_roles`
--
ALTER TABLE `esm_roles`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `esm_services`
--
ALTER TABLE `esm_services`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `esm_system_users`
--
ALTER TABLE `esm_system_users`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `esm_users`
--
ALTER TABLE `esm_users`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `esm_user_payment_package_histories`
--
ALTER TABLE `esm_user_payment_package_histories`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
