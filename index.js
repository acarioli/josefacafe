//Imports
const express = require('express');
const app = express();
require('dotenv').config();
const Port = process.env.PORT || 8080;
const hbs = require('hbs'); 
const mysql = require('mysql2'); 
const path = require('path');
const nodemailer = require('nodemailer');

//Conectamos la app a una base de datos

const conexion = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORTDB,
    database: process.env.DATABASE,
});

//Conectamos la DB

const conectar = (
conexion.connect((error) =>{
      //  if(error) throw errorMonitor;
        console.log('Base de Datos Conectada!!');
})
);

//Configuracion de Middlewares

app.use(express.json());
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.urlencoded({extended: false}));

                                        //Configuramos la vista de la aplicacion

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

//Rutas

app.get('/', (req, res) =>{
    res.render('index', {titulo: 'Bienvenido'})
});

app.get('/contacto', (req, res) =>{
    res.render('contacto', {titulo: 'Envianos tu consulta'})
});

//Verbo http para recibir datos
app.post('/contacto', (req,res) =>{

    //Desestructuracion

    const{nombre, apellido, correo, consulta} = req.body;

    console.log(nombre);
    console.log(apellido);
    console.log(correo);
    console.log(consulta);

    //validación básica
    if(nombre == "" || correo == "" ){
        let validacion = 'Es necesario completar todos los campos para enviar la consulta'

        res.render('contacto',  {
            titulo: 'Envianos tu consulta',
            validacion 
        })
    }else{
        console.log(nombre);
        console.log(apellido);
        console.log(correo);
        console.log(consulta);

    //otra forma es creando funciones

            //conectar()
            
            let data = {
                nombreUsuario: nombre,
                apellidoUsuario: apellido,
                correoUsuario: correo,
                consultaUsuario: consulta,
            }

            let sql = "INSERT INTO USUARIOS SET ?";

            let query = conexion.query (sql, data, (err, results) =>{
            if(err) throw err;
            res.render('contacto',  {titulo: 'Envianos tu consulta'})
            });
    }
});
//res.sendStatus(200).send('Tus datos han sido recibidos')
//res.send('Tus datos han sido recibidos')

app.get('/nosotros', (req, res) =>{
    res.render('nosotros', {titulo: 'Conocenos'})
});

app.get('/menu', (req, res) =>{
    res.render('menu', {titulo: 'Conocé las opciones que tenemos para vos'})
});

app.listen(Port, ()=>{
    console.log(`Servidor corriendo en el Puerto ${Port}`);
});

app.on('error', (error) =>{
    console.log(`Tenemos un error ${error}`);
})