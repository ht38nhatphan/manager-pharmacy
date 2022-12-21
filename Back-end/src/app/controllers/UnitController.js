const Unit = require('../models/Unit')

const UnitController = {
  getAllUnit: async (req, res) => {
    try {
      const unit = await Unit.find()
      res.status(200).json(unit);
    }
    catch (error) {
      res.status(500).json(error)
    }
  },
  createUnit: async (req, res) => {
    const newUnit = new Unit(req.body);
    try {
      const UnitSaved = await newUnit.save();
      res.status(200).json(UnitSaved)
    } catch (error) {
      res.status(500).json(error)
    }
  },
}
module.exports = UnitController;