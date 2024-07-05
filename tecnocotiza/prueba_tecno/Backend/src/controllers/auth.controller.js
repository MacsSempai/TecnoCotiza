import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'//para crear hash
import { createAccessToken } from '../libs/jwt.js'
import jwt  from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';


//          requies(peticion), respons(respuesta)
export const register = async(req, res) => {
    //console.log(req.body) ////cuando se envia un json
    
    //const {email, nombreUsuario, contraseña} = req.body
    const {nombreUsuario, email, contraseña} = req.body
    
    
    // console.log(email, password, username)

    try{
        const userFound = await User.findOne({email});
        if (userFound)
            return res.status(400).json(["El correo ya exciste"]);

        const contraseñaHash = await bcrypt.hash(contraseña, 10) //se ejecutara 10 veces, deveulve un string


        //ingresar datos a mongo, instanciando un nuevo objeto
        //y cuando cree un nuevo usuario le pasar... y se guarda en la constante newUser
        const newUser = new User({
            nombreUsuario,
            email,
            contraseña: contraseñaHash 
        });

        
        const userSaved = await newUser.save();
        const token = await createAccessToken({id: userSaved.id})
        res.cookie('token', token) //se guarda el token en la cookie del navegador(lo hace express)
        // res.json({
        //     mensaje:"Usuario creado satisfactoriamente "

        res.json({
            id: userSaved.id,
            nombreUsuario: userSaved.nombreUsuario,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updateAt: userSaved.updatedAt
        });

        
        
        

    }catch(error){
        res.status(500).json({mensaje: error.mesage}); //*********
    }

};


//          requies(peticion), respons(respuesta)
export const login = async(req, res) => {
    //console.log(req.body) ////cuando se envia un json
    
    const {email, contraseña} = req.body //obtine email, contraseña de la peticion
    // console.log(email, password, username)


    try{

        const userFound = await User.findOne({email}) //busca si existe el email de usuario, espera que se ejecute

        //si no se encuentra el usuario devuelve un mensaje
        if(!userFound) return res.status(400).json({mensaje: "usuario no encontrado"});

        //si es que se encontro el usuario se ejecuta lo siguiete

        const isMatch = await bcrypt.compare(contraseña, userFound.contraseña); //compara la contraña de la BD con la que dio el usuario(true o false)
        
        //si no coincide la contraseña
        if(!isMatch) return res.status(400).json({mensaje: "Contraseña incorrecta"}) //***se puede enviar un mensaje menos descriptivo

        //se crea el token
        const token = await createAccessToken({id: userFound.id})
        res.cookie("token", token) //se guarda el token en la cookie del navegador(lo hace express)
        // res.json({
        //     mensaje:"Usuario creado satisfactoriamente "
        // });

        res.json({
            id: userFound.id,
            nombreUsuario: userFound.nombreUsuario,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updateAt: userFound.updatedAt
        });

    }catch(error){
        res.status(500).json({mensaje: error.mesage}); //*********
    }

};

export const logout = (req, res) =>{
    res.cookie('token',"",{
        expires: new Date(0) // fecha de expiracion
    })
    return res.sendStatus(200)
};

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)
    
    if(!userFound) return res.status(400).json({mesaje: "usuario no encontrado"});

    return res.json({
        id: userFound._id,
        nombreUsuario : userFound.nombreUsuario,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updateAt: userFound.updateAt
    });
};

export const verifyToken = async (req, res) => {
    const {token} = req.cookies;

    if (!token) return res.status(401).json({mensaje: "NO AUTORIZADO"});
    
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if(err) return res.status(401).json( { mensaje: "NO AUTORIZADO"});

        const userFound = await User.findById(user.id);
        if(!userFound) return res.status(401).json({mensaje: "NO AUTORIZADO"});

        return res.json({
            id: userFound._id,
            nombreUsuario: userFound.nombreUsuario,
            email: userFound.email
        });
    })
}