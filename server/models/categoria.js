const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la categoria es necesaria']
    },
    usuario: { 
        type: Schema.Types.ObjectId, 
        required: [true, 'El id del usuario es necesario'],
        ref: 'Usuario' 
    },
    estado: {
        type: Boolean,
        default: true
    }

});       

module.exports = mongoose.model('Categoria', categoriaSchema);