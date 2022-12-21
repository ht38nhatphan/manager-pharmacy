const Thuoc = require('../models/Thuoc')
const { encode, decode } = require('url-encode-decode')
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongose')

const path = require('path');
const dirPath = path.join("./uploads");
const fs = require('fs')

const ThuocController = {
    getAllThuoc: async (req, res) => {
        const qCategory = req.query.category;
        const qNew = req.query.new;
        try {


            let thuocs;
            if (qNew) {
                thuocs = await Thuoc.find().sort({ createdAt: -1 })
            } else if (qCategory) {
                thuocs = await Thuoc.find({ categories: { $in: [qCategory] } })
            } else {
                thuocs = await Thuoc.find();
            }
            res.status(200).json(thuocs)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    getThuocById: async (req, res) => {
        try {
            const thuocs = await Thuoc.findById(req.params.id);
            res.status(200).json(thuocs)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    createThuoc: async (req, res) => {
        const newThuoc = new Thuoc(req.body);
        console.log(newThuoc);
        try {
            const isthuoc = await Thuoc.findOne({ name: req.body.name });
            if (isthuoc) {
                return res.status(400).json("Thuốc Này đã tồn tại!");
            }
            const thuocSaved = await newThuoc.save();
            res.status(200).json(thuocSaved)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    createImage: async (req, res) => {
        // console.log(req.body)
        // console.log(newThuoc)

        const newThuoc = new Thuoc(req.body);
        if (req.files && req.files.length <= 4) {
            req.files.forEach(element => {
                newThuoc.Images.push(`http://localhost:8000/uploads/${element.filename}`)
            });
        }
        console.log(newThuoc)

        try {
            const isthuoc = await Thuoc.findOne({ name: req.body.name });
            if (isthuoc) {
                return res.status(400).json("Thuốc Này đã tồn tại!");
            }
            const thuocSaved = await newThuoc.save();

            res.status(200).json(thuocSaved)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    updateThuoc: async (req, res) => {
        const thuocs = await Thuoc.findById(req.params.id)
        if (req.files) {
            req.files.forEach(element => {
                thuocs.Images.push(`http://localhost:8000/uploads/${element.filename}`)
            });
        } else {
            thuocs.Images.push(thuocs.Images)
        }
        const updateThuoc = await Thuoc.updateOne({ _id: req.params.id }, req.body);
        try {
            res.status(200).json("Update Successfully!");
        } catch (error) {
            res.status(500).json(error)
        }
    },

    // [DELETE] /thuocs/:id   
    destroyThuoc: async (req, res) => {

        try {
            await Thuoc.delete({ _id: req.params.id })
            res.status(200).json("Product Has been deleted!");
        } catch (error) {
            res.status(500).json(error)
        }
    },
    // [DELETE] /thuocs/:id   
    restore: async (req, res) => {
        try {
            await Thuoc.restore({ _id: req.params.id })
            res.status(200).json("Product Has been Restored!");
        } catch (error) {
            res.status(500).json(error)
        }
    },

    forceDestroyThuoc: async (req, res) => {
        try {
            await Thuoc.deleteOne({ _id: req.params.id })
            res.status(200).json("Product Has been deleted!");
        } catch (error) {
            res.status(500).json(error)
        }
    }




    //[GET] /thuocs    
    //    show: async(req, res, next){
    //       const thuocs = Thuoc.findOne({ slug: req.params.slug })
    //       .then(res.json(thuocs))
    //       .catch(next)
    //  }
    //[GET] /getAll  
    //  getAll: async(req, res, next){
    //    const filter = {}
    //       Thuoc.find(filter)
    //       .then(thuocs => {
    //          res.status(200).json(thuocs);
    //       })
    //       .catch(next)
    //  }

    //   //[GET] /thuocs/create    
    //   create: async(req, res, next){
    //      res.render('thuocs/create')
    //    }

    //   //[POST] /thuocs/store    
    //   store: async(req, res, next){
    //    const thuoc = new Thuoc(req.body)
    //    thuoc.save() 
    //    .then(() =>  res.redirect('/'))
    //    .catch(error => {

    //    });
    //    }

    //[POST] /thuocs/:id/edit    
    //  edit(req, res, next){
    //    Thuoc.findById(req.params.id)
    //    .then(thuocs => res.render('thuocs/edit', {thuocs: mongooseToObject(thuocs)}))
    //    .catch(next)
    // }
    //  //[PUT] (EDIT) /thuocs/:id   
    //  udpate(req, res, next){
    //    Thuoc.updateOne({_id : req.params.id}, req.body)
    //    .then(() => res.redirect('/me/stored/thuocs'))
    //    .catch(next)
    // }


    //[DELETE] /thuocs/:id/force   
    //  forceDestroy(req, res, next){
    //    Thuoc.deleteOne({_id : req.params.id})
    //    .then(() => res.redirect('back'))
    //    .catch(next)
    // }

    //[PATCH] /thuocs/:id/restore   
    // restore(req, res, next){
    //    Thuoc.restore({_id : req.params.id})
    //    .then(() => res.redirect('back'))
    //    .catch(next)
    // }

    //[POST] /thuocs/handle-form-actions   
    // handleFormActions(req, res, next){
    //    switch(req.body.action){
    //       case 'delete':
    //          Thuoc.delete({_id : {$in: req.body.thuocsIds} })
    //          .then(() => res.redirect('back'))
    //          .catch(next)
    //          break;
    //       case 'restore':
    //          Thuoc.restore({_id : {$in: req.body.thuocsIds} })
    //          .then(() => res.redirect('back'))
    //          .catch(next)
    //          break;
    //          default:
    //             res.json({message: 'Action is invalid'})
    //    }
    // }

}

module.exports = ThuocController;

