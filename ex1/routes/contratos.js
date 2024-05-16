var express = require('express');
var router = express.Router();
var Contrato = require('../controllers/contratos')
var COntrato = require("../models/contratos")

/* GET /contratos: devolve uma lista com todos os registos; */
router.get('/', function (req, res) {
    console.log("entrou na página 1");
    var selectors = {};
    //GET /contratos?entidade=EEEE
    if (req.query.entidade) {
      console.log("esp", req.query.entidade)
        selectors.entidade_comunicante = req.query.entidade;
    }
    ////GET /contratos?tipo=AAA
    if (req.query.tipo){
        selectors.tipoprocedimento = req.query.tipo;
    }
    
    Contrato.find(selectors).then(function (contratos) {
      res.send(contratos);
    }).catch(err => { res.status(500).send(err) });
   });

router.get('/contratos', function(req, res) {
    Contrato.list().then((function (p) {
        res.send(p);
      })).catch(err => res.jsonp(err));
  });

router.get('/contratos/:id', function(req, res){
    Contrato.findById(req.params.id).then((function (p) {
        res.send(p);
      })).catch(err => res.jsonp(err));
  });;

router.get('/contratos?entidade=:valor', function(req, res){
    Contrato.getEntityContracts(req.params.valor).then((function (p) {
        res.send(p);
      })).catch(err => res.jsonp(err));
  });

router.get('/contratos?tipo=:valor', function(req, res){
    Contrato.getContractsByProcedure(req.params.valor).then((function (p) {
        res.send(p);
      })).catch(err => res.jsonp(err));
  });

router.get('/contratos/tipos', function(req, res){
    Contrato.getProcedures().then((function (p) {
        res.send(p);
      })).catch(err => res.jsonp(err));
  });

router.get('/contratos/entidades', function(req, res){
    Contrato.getEntities().then((function (p) {
        res.send(p);
      })).catch(err => res.jsonp(err));
  });

router.post('/contratos', function(req, res){
    Contrato.insert(req.body).then((function (p) {
        res.send(p);
      })).catch(err => res.jsonp(err));
  });

router.put('/contratos/:id', function(req, res){
    Contrato.update(req.body).then((function (p) {
        res.send(p);
      })).catch(err => res.jsonp(err));
  });

router.delete('/contratos/:id', function(req, res){
    Contrato.remove(req.body).then((function (p) {
        res.send(p);
      })).catch(err => res.jsonp(err));
  });

module.exports = router;