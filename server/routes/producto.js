const express = require('express');
const Producto = require('../models/producto');
const { verificaToken, verificaAdmin_Rol } = require('../middelewares/autenticacion')

const app = express();


app.get('/productos/:id', function (req, res) {

  let id = req.params.id

  Producto.findById(id, (err, productoDB) => {

    if (err) {
      return res.status(400).json({
        ok: false,
        err
      })
    }

    if (!productoDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'El ID no es correcto'
        }
      })
    }

    res.json({
      ok: true,
      producto: productoDB
    });

  });

})


app.get('/productos', function (req, res) {

  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 5;
  limite = Number(limite);

  
  Producto.find({estado: true})
          .skip(desde)
          .limit(limite)
          .exec((err, productos) =>{

            if (err) {
              return res.status(400).json({
                ok: false,
                err
              })
            }

            Producto.estimatedDocumentCount({estado: true}, (err, conteo) =>{
              
              res.json({
                ok: true,
                productos,
                cuantos: conteo
              })
            })


          })

})

app.post('/productos', [verificaToken, verificaAdmin_Rol], function (req, res) {

  let body = req.body;

  let producto = new Producto({
    nombre: body.nombre,
    precioUnit: body.precioUnit,
    categoria: body.categoria,
    usuario: body.usuario,
    estado: body.estado,

  })

  producto.save((err, productoDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      })
    }

    res.json({
      ok: true,
      producto: productoDB
    })
  })

});

app.put('/productos/:id', [verificaToken, verificaAdmin_Rol], function (req, res) {

  let id = req.params.id;
  let body = req.body;

  Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, productoDB) => {

    if (err) {
      return res.status(400).json({
        ok: false,
        err
      })
    }

    res.json({
      ok: true,
      producto: productoDB
    })
  });

  // productoDB.nombre = body.nombre;
  // productoDB.precioUnit = body.precioUnit;
  // productoDB.estado = body.estado;
  // productoDB.categoria = body.categoria;

})

app.delete('/producto/:id', [verificaToken, verificaAdmin_Rol], function (req, res) {

  let id = req.params.id;


  // Usuario.findByIdAndRemove(id, (err, usuarioBorrado)=>{

  let cambiaEstado = {
    estado: false
  }

  Producto.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, productoBorrado) => {

    if (err) {
      return res.status(400).json({
        ok: false,
        err
      })
    }
    if (!productoBorrado) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Producto no encontrado'
        }
      })
    }

    res.json({
      ok: true,
      producto: productoBorrado
    })

  })

});

module.exports = app;


