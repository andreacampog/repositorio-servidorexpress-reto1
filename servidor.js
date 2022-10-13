//console.log("Hola mundo desde node.js")

const express = require ('express'); 
const { default: mongoose } = require('mongoose');
const app = express();  //Instancia del paquete express
const router = express.Router();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const PersonaSchema = require("./modelos/Persona.js");

//Conexion a base de datos

mongoose.connect("mongodb+srv://andreacampo:Mike123@clusterdesarrolloweb.913jxdq.mongodb.net/UniversidadBaseDatos?retryWrites=true&w=majority");


//OPERACIONES CRUD

//mensaje en localhost:3000 al hacer get
router.get('/', (req,res)=>{
    res.send("El inicio de mi API");
})

//Obtener listado completo o uno especifico 
router.get('/persona',(req,res)=>{
    PersonaSchema.find(function(err,datos){
        if(err){
        console.log("Error leyendo personas");
        }else{
            res.send(datos);
        }
    })
});



//Crear una persona 
router.post('/persona', (req,res)=>{
    let nuevaPersona = new PersonaSchema({
    id: req.body.id,
    tipo_documento: req.body.tipo_documento,
    documento: req.body.documento,
    nombres: req.body.nombres,
    apellidos: req.body.apellidos,
    direccion: req.body.direccion,
    correo: req.body.correo,
    telefono: req.body.telefono,
    celular: req.body.celular,
    link: req.body.link,
    codigo_icfes: req.body.codigo_icfes,
    familiar_asociado: req.body.familiar_asociado,
    estrato_social: req.body.estrato_social,
    tipo_colegio: req.body.tipo_colegio
    });

    //Guardo el objeto nuevaPersona si da error imprimo el error
    //de lo contrario la persona se almaceno correcto
    nuevaPersona.save(function(err,datos){
        if(err){
            console.log(err);
        }
        res.send("Persona almacenada correctamente");
    })
});


//Actualizar Persona
router.put('/persona/:id',(req,res)=>{
    console.log(req);
    PersonaSchema.findByIdAndUpdate(req.params.id,req.body,(err,persona)=>{
        if(err){
            res.send(err);
        }else{
            res.json(persona); //json lo uso para devolver objetos 
        }
    });
});

//Borrar una Persona

router.delete('/persona/:id', (req,res)=>{
    PersonaSchema.findByIdAndRemove(req.params.id,(err,persona)=>{
    if(err){
        res.send(err);
    }else{
        res.json(persona);
    }
});
});



//aqui ya puedo utilizar herramientas del paquete express
//a traves del objeto app
//Aqui voy a iniciar a escuchar por el puerto 3000

app.use(router);
app.listen(3000, () =>{
    console.log("Servidor corriendo en el puerto 3000");

});



