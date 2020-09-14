const express = require('express');
const Categoria = require('../models/categoria');
const { verificaToken, verificaAdmin_Rol } = require('../middelewares/autenticacion')


const app = express();


app.get('/categoria', function (req, res) {
    
  Categoria.find({})
          .exec((err, categorias) =>{

            
            if(err){
              return res.status(400).json({
                ok: false,
                err
              })
            }
            
            res.json({
              ok: true,
              categoria : categorias
            })
            
          })
})

app.get('/categoria/:id', function (req, res) {

  let id = req.params.id
    
  Categoria.findById(id, (err, categoriaDB) =>{

    if(err){
      return res.status(400).json({
          ok: false,
          err
      })
    }

    if(! categoriaDB){
      return res.status(400).json({
          ok: false,
          err: {
            message: 'El ID no es correcto'
          }
      })
    }

    res.json({
      ok: true,
      categoria : categoriaDB
    });

  });

  })
  
  
  app.post('/categoria', [verificaToken, verificaAdmin_Rol], function (req, res) {
  
    let body = req.body;

    let categoria = new Categoria({
        nombre: body.nombre,
        usuario: body.usuario,
        estado: body.estado
    })

    categoria.save((err, categoriaDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!categoriaDB) {
          return Response.status(400).json ({
            ok: false,
            err
          })
        }

        res.json({
            ok: true,
            categoria : categoriaDB
        })
    })
  
  
  });
   
  app.put('/categoria/:id', [verificaToken, verificaAdmin_Rol], function (req, res) {

    let id = req.params.id;
    let body =req.body;
  
    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, categoriaDB) => {
  
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        })
      }
  
      res.json({
        ok: true,
        usuario: categoriaDB
      })
    });
  })
  
  app.delete('/categoria/:id', [verificaToken, verificaAdmin_Rol], function (req, res) {

    let id = req.params.id;

    
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado)=>{

    let cambiaEstado = {
      estado: false
    }
    
    Categoria.findByIdAndUpdate(id, cambiaEstado, { new: true}, (err, categoriaBorrada)=>{

      if (err) {
        return res.status(400).json({
          ok: false,
          err
        })
      }
      if (!categoriaBorrada) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'Usuario no encontrado'
          }
        })
      }

      res.json({
        ok: true,
        usuario: categoriaBorrada
      })

    })

});
  
  
  module.exports = app;


