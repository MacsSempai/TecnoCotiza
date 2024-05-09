const express = require('express');
const passport  = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const PassportLocal = require('passport-local').Strategy; 

const app = express();

//nos permite leer la informacion enviada por el usuario
app.use(express.urlencoded({extended: true}));

//configuramos 
app.use(cookieParser('mi ultra hiper secreto'));

//configuramos el comportamiento en las sesion
app.use(session({
    secret: 'mi ultra hiper secreto',
    resave: true, //se vuelve a guardar aun que no aya sido modificado
    saveUninitialized: true 
}));

//configuramo passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new PassportLocal(function(username, password, done){
    done.err
    if(username=== "JonaHuinca" && password==="12345678")
        return done(null, {id: 1, name: "JonathanHuinca"});
    done(null, false)
}));

//serializar y dessearializar 
// tiendo {id:1, name:"jona"}  debido a id un dato 
//particular y pequeño que represeta a un usuario
//1 => serialización (para saber que usuario es)
passport.serializeUser(function(user, done){
    done(null, user.id);
});

//Deserializacion
passport.deserializeUser(function(id, done){
    done(null,{id:1, name:"jona"});
});

//ejs es similar a html
app.set('view engine','ejs')

//se crean las vistas
app.get("/",(req, res, next)=>{
    if(req.isAuthenticated()) return next();

    res.redirect("/login");
},(req,res) =>{
    //si ya iniciamos,  mostramos bienvenida 

    //si no hemos iniciado seseion redireccionamos a /login
    res.send("hola Mundo");
});

app.get("/login" , (req, res)=>{
    //Mostramos el formulario de login, "login" es la 
    //vista y debe coincidor con el nombre del archivo
    res.render("login");
});

//se una un midelware
app.post("/login",passport.authenticate('local',{
    successRedirect: "/", //si es que sale vien direge a "/"
    failuteRedirect: "/login" //si sale mal se devuelve a login
}));


app.listen(8080,() => console.log("Servidor iniciado"));