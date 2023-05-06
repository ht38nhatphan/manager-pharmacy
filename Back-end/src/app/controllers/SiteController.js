const Thuoc = require('../models/Thuoc')

const { multipleMongooseToObject } = require('../../util/mongose')

class SiteController {

    //[GET] /Home

    index(req, res, next) {

        Thuoc.find({})
            .then(thuocs => {
                res.render('home', { thuocs: multipleMongooseToObject(thuocs) })
            })
            .catch(next);
    }

    //[GET] /search
    search(req, res) {
        res.render('search')
    }

}

module.exports = new SiteController;