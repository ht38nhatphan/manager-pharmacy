const Supelier = require('../models/Supelier')

const SupelierController = {
  getAllSupelier: async (req, res) => {
    try {
      const supelier = await Supelier.find()
      res.status(200).json(supelier);
    }
    catch (error) {
      res.status(500).json(error)
    }
  },
  createSupelier: async (req, res) => {
    const newSupelier = new Supelier(req.body);
    try {
      const SupelierSaved = await newSupelier.save();
      res.status(200).json(SupelierSaved)
    } catch (error) {
      res.status(500).json(error)
    }
  },
}
module.exports = SupelierController;