create table usuarios (
idUsuario int unsigned not null unique auto_increment,
nombreUsuario varchar(20),
apellidoUsuario varchar(25),
correoUsuario varchar(50),
consultaUsuario varchar(1000)
);

select * from usuarios