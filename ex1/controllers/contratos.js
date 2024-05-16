const mongoose = require('mongoose')
var Contrato = require("../models/contratos")

module.exports.list = () => {
    return Contrato
        .find()
        .sort({idcontrato : 1})
        .exec()
}

module.exports.findById = id => {
    return Contrato
        .findOne({idcontrato : id})
        .exec()
}

module.exports.getEntityContracts = entidade => {
    return Contrato.find({entidade_comunicante : entidade}).exec()
}

module.exports.getContractsByProcedure = procedimento => {
    return Contrato.find({tipoprocedimento : procedimento}).exec()
}

module.exports.getEntities = () => {
    return Contrato.distinct(entidade_comunicante).sort({entidade_comunicante: 1 });
}

module.exports.getProcedures = () => {
    return Contrato.distinct(tipoprocedimento).sort({tipoprocedimento: 1 });
}


module.exports.insert = contrato => {
    if((Contrato.find({idcontrato : contrato.idcontrato}).exec()).length != 1){
        var newContrato = new Contrato(contrato)
        return newContrato.save()
    }
}

module.exports.update = (id, contrato) => {
    return Contrato
        .findByIdAndUpdate(id, contrato, {new : true})
}

module.exports.remove = id => {
    return Contrato
        .findOneAndDelete({idcontrato : id})
}
