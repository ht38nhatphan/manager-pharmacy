const Order = require('../models/Order')
const OrderController = {
  // GET User Orders
  getAllOrder: async (req, res) => {
    try {
      const orders = await Order.find()
      res.status(200).json(orders);
    }
    catch (error) {
      res.status(500).json(error)
    }
  },
  //GET User Orders
  getOrderByUserId: async (req, res) => {
    try {
      const orders = await Order.find({ userId: req.params.userId });
      res.status(200).json(orders)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  createOrder: async (req, res) => {
    const newOrder = new Order(req.body);
    console.log(newOrder);
    try {
      const OrderSaved = await newOrder.save();
      res.status(200).json(OrderSaved)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  updateOrder: async (req, res) => {
    const updateOrder = await Order.updateOne({ _id: req.params.id }, req.body);
    try {
      res.status(200).json(updateOrder);
    } catch (error) {
      res.status(500).json(error)
    }
  },
  forceDestroyOrder: async (req, res) => {
    try {
      await Order.deleteOne({ _id: req.params.id })
      res.status(200).json("Oder Has been deleted forever!");
    } catch (error) {
      res.status(500).json(error)
    }
  },

  //  // GET MONTHLY INCOME
  //  getMonthlyIncome: async(req, res) => {
  //   const date = new Date();
  //   const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  //   const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  //   try {
  //     const income = await Oder.aggregate([
  //       { $match: { createdAt: { $gte: previousMonth } } },
  //       {
  //         $project: {
  //           month: { $month: "$createdAt" },
  //           sales: "$amount",
  //         },
  //       },
  //       {
  //         $group: {
  //           _id: "$month",
  //           total: { $sum: "$sales" },
  //         },
  //       },
  //     ]);
  //     res.status(200).json(income);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  //  },


}

module.exports = OrderController;

