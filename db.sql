CREATE DATABASE CAMPUS;

USE CAMPUS;

CREATE TABLE `Productos`(
    `id` int auto_increment primary key not null,
    `cliente` varchar(255) not null,
    `fecha` varchar(255) not null,
    `documento`int not null,
    `productos` text    
);