const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/PruebaMongoJS',{
    useNewUrlParser: true
})
    .then(db => console.log('Conectado a la base de datos'))
    .catch(err => console.error(err))


//esquema

const UsuariosSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            require:true
        },
        email:{
            type:String
        },
        numberPhone:{
            type:String,
            default:123-456
        }

    },
    {
        timestamps: true //se agrega campo de creacion y fecha de actualización
    }
)


const PublicacionShema = new mongoose.Schema(
    {
        title:{
            type:String
        },
        description:{
            type:String
        },
        authot:{
            type:mongoose.Types.ObjectId //tipo ObjectId = referencia a un documento
        }
    },
    {
        timestamps: true
    }
)

// MODELOS

const Usuarios = new mongoose.model('usuarios', UsuariosSchema)
const publicaciones = new mongoose.model('publicaciones', PublicacionShema)

Usuarios.create(
    {
        name:'Jesus',
        email:'jesus@demo.com',
        numberPhone:'12345678'
    }
)