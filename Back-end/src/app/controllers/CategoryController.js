const Category = require('../models/Category')

const CategoryController = {
  getAllCategory: async (req, res) => {
    try {
      const category = await Category.find()
      res.status(200).json(category);
    }
    catch (error) {
      res.status(500).json(error)
    }
  },
  createCategory: async (req, res) => {
    const newCategory = new Category(req.body);
    try {
      const CategorySaved = await newCategory.save();
      res.status(200).json(CategorySaved)
    } catch (error) {
      res.status(500).json(error)
    }
  },
}
module.exports = CategoryController;