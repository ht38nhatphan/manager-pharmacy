const Thuocs = require('../models/Thuoc')
const {multipleMongooseToObject} = require('../../util/mongose')
class MeController {

    //[GET] /me/stored/thuocs
    
    storedThuocs(req, res, next){
        Promise.all([Thuocs.find({}), Thuocs.countDocumentsDeleted()])
            .then(([thuocs, deletedCount]) => 
            res.render('me/stored-thuocs', {
                deletedCount,
                thuocs: multipleMongooseToObject(thuocs)
            }))
        
    }
    //[GET] /me/trash/thuocs
    
    trashThuocs(req, res, next){
        Thuocs.findDeleted({})
        .then(thuocs => res.render('me/trash-thuocs', {
            thuocs: multipleMongooseToObject(thuocs)
        }))
        .catch(next)
        
    }



}

module.exports = new MeController;