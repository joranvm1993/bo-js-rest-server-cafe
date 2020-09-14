const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let productoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    precioUnit: {
        type: Number,
        required: [true, 'El precio unitario es necesario']
    },
    categoria: {
        type: Schema.Types.ObjectId, 
        required: [true, 'El id es necesario'],
        ref: 'categoria'
    },
    usuario: {
        type: Schema.Types.ObjectId, 
        required: [true, 'El id del usuario es necesario'],
        ref: 'usuario'
    },
    estado: {
        type: Boolean,
        default: true
    }
    
});

module.exports = mongoose.model('Producto', productoSchema );