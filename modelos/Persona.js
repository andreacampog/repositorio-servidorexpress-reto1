const mongoose = require ('mongoose');

let PersonaSchema = new mongoose.Schema({
    idPersona: String,
    tipo_documento: String,
    documento: String,
    nombres: String,
    apellidos:String,
    direccion: String,
    correo: String,
    telefono: String,
    celular: String,
    link: String,
    codigo_icfes: String,
    familiar_asociado: String,
    estrato_social: String,
    tipo_colegio: String
})

module.exports= mongoose.model('persona', PersonaSchema, 'Personas');