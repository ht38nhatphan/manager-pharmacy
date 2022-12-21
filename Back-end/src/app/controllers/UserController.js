const User = require('../models/User');
const bcrypt = require("bcrypt");

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find();
      return res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error)
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json("FindUser Successfully!")
    } catch (error) {
      res.status(500).json(error)
    }
  },

  updateUser: async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    // Validate
    if (req.body.password) {
      const hashed = await bcrypt.hash(req.body.password, salt);
    }

    try {
      const user = await User.updateOne({ _id: req.params.id }, req.body);
      res.status(200).json("Update Successfully!")
    } catch (error) {
      res.status(500).json(error)
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      console.log(user)
      if (user.admin === true) {
        return res.status(403).json("Không thể KHÓA tài khoản Admin!")
      } else {
        user.delete();
        return res.status(200).json("Delete User Successfully!")
      }
    } catch (error) {
      res.status(500).json(error)
    }
  },
  trashAccount: async (req, res) => {
    try {
      const user = await User.findDeleted();
      return res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error)
    }
  },

  getCountDeleted: async (req, res, next) => {
    try {
      const count = await User.countDocumentsDeleted();
      return res.status(200).json(count);
    } catch (error) {
      res.status(500).json(error)
    }
  },

  restore: async (req, res) => {
    try {
      await User.restore({ _id: req.params.id })
      res.status(200).json("Tài Khoản đã được mở khóa!");
    } catch (error) {
      res.status(500).json(error)
    }
  },
  StatusOder: async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = userController;