const Cart = require('../models/Cart')
const CartController = {
    // GET ALL 
   getAllCart: async(req, res) => {
       try {
            const carts = await Cart.find()
            res.status(200).json(carts);
           }
       catch (error) {
           res.status(500).json(error)
       }
   },

    getCartByUserId: async(req, res) => {
       try {
           const Cart = await Cart.findOne({userId: req.params.userId});
          res.status(200).json(Cart)
       } catch (error) {
           res.status(500).json(error)
       }
   },
   createCart: async(req, res) => {
      const newCart = new Cart(req.body);
       try {
           const CartSaved = await newCart.save();
          res.status(200).json(CartSaved)
       } catch (error) {
           res.status(500).json(error)
       }
   },
   updateCart: async(req, res) => {
      const updateCart = await Cart.updateOne({_id : req.params.id}, req.body);
       try {
          res.status(200).json(updateCart);
       } catch (error) {
           res.status(500).json(error)
       }
   },
   forceDestroyCart: async(req, res) => {
    try {
        await Cart.deleteOne({_id : req.params.id})
        res.status(200).json("Cart Has been deleted forever!");
     } catch (error) {
         res.status(500).json(error)
     }
   },
      

}

module.exports = CartController;

