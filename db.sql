CREATE TABLE `Productos`(
    `id` int auto_increment primary key not null,
    `cliente` varchar(255) not null,
    `documento`int not null,
    `productos` text
);
CREATE TABLE `events`(

    `id` int unsigned not null primary key auto_increment,

    `name` varchar(50),

    `startDate` datetime,

    `endDate` datetime

);