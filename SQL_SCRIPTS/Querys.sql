--create database DBVENTA

--use DBVENTA

--create table Rol(
--	idRol int primary key identity(1,1),
--	nombre varchar(50),
--	fechaRegistro datetime default getdate()
--)

--create table Menu(
--	idMenu int primary key identity(1,1),
--	nombre varchar(50),
--	icono varchar(50),
--	url varchar(50)
--)

--create table MenuRol(
--	idMenuRol int primary key identity(1,1),
--	idMenu int references Menu(idMenu),
--	idRol int references Rol(idRol)
--)

--create table Usuario(
--	idUsuario int primary key identity(1,1),
--	nombreCompleto varchar(100),
--	correo varchar(50),
--	idRol int references Rol(idRol),
--	clave varchar(40),
--	esActivo bit default 1,
--	fechaRegistro datetime default getdate()
--)

--create table Categoria(
--	idCategoria int primary key identity(1,1),
--	nombre varchar(50),
--	esActivo bit default 1,
--	fechaRegistro datetime default getdate()
--)

--create table Producto(
--	idProducto int primary key identity(1,1),
--	nombre varchar(100),
--	idCategoria int references Categoria(idCategoria),
--	stock int,
--	precio decimal(10,2),
--	esActivo bit default 1,
--	fechaRegistro datetime default getdate()
--)

--create table NumeroDocumento(
--	idNumeroDocumento int primary key identity(1,1),
--	ultimoNumero int not null,
--	fechaRegistro datetime default getdate()
--)

--create table Venta(
--	idVenta int primary key identity(1,1),
--	numeroDocumento varchar(40),
--	tipoPago varchar(50),
--	total decimal(10,2),
--	fechaRegistro datetime default getdate()
--)

--create table DetalleVenta(
--	idDetalleVenta int primary key identity(1,1),
--	idVenta int references Venta(idVenta),
--	idProducto int references Producto(idProducto),
--	cantidad int,
--	precio decimal(10,2),
--	total decimal(10,2)
--)

----Darle autorizacion a la base de datos para el usaurio
--ALTER AUTHORIZATION ON DATABASE:: DBVENTA TO sa;

---- Insertando registros
--insert into Rol(nombre) values 
--('Administrador'),
--('Empleado'),
--('Supervisor')

--insert into Usuario(nombreCompleto, correo, idRol, clave) values
--('Estudiante prueba', 'estudiante@mail.com', 1, '123')

--insert into Categoria(nombre) values
--('Laptops'),
--('Monitores'),
--('Teclados'),
--('Auriculares'),
--('Memorias'),
--('Accesirios')

--insert into Producto(nombre, idCategoria, stock, precio, esActivo) values
--('Laptop samsung book pro', 1, 20, 2500, 1),
--('Laptop lemovo idea pad', 1, 30, 2200, 1),
--('Laptop asus zenbook duo', 1, 30, 2100, 1),
--('Monitor teros gaming te-1', 2, 25, 1400, 1),
--('Monitor samsung curvo', 2, 15, 1400, 1),
--('Monitor hauwei gamer', 2, 10, 1350, 1),
--('Teclado seisen gamer', 3, 10, 800, 1),
--('Teclado logitech', 3, 10, 1000, 1),
--('Teclado antryx gamer', 3, 10, 1000, 1),
--('Auricular logitech gamer', 4, 15, 800, 1),
--('Auricular hyperx gamer', 4, 20, 680, 1),
--('Auricular redragon rgb', 4, 25, 950, 1),
--('Memoria kingston rgb', 5, 10, 200, 1),
--('Ventilador cooler master', 6, 20, 200, 1),
--('Mini ventilador lenovo', 6, 15, 200, 1)

--insert into Menu(nombre, icono, url) values
--('DashBoard','dashboard','/pages/dashboard'),
--('Usuarios','group','/pages/usuarios'),
--('Productos','collections_bookmark','/pages/productos'),
--('Venta','currency_exchange','/pages/venta'),
--('Historial Ventas','edit_note','/pages/historial_ventas'),
--('Reportes','recipt','/pages/reportes')

---- Asignar los roles de los menus
---- rol ADMINISTRADOR
--insert into MenuRol(idMenu, idRol) values
--(1,1),
--(2,1),
--(3,1),
--(4,1),
--(5,1),
--(6,1)

---- rol EMPLEADO
--insert into MenuRol(idMenu, idRol) values
--(4,2),
--(5,2)

---- rol SUPERVISOR
--insert into MenuRol(idMenu, idRol) values
--(3,3),
--(4,3),
--(5,3),
--(6,3)

--INSERT INTO NumeroDocumento(ultimoNumero) values
--(0)

