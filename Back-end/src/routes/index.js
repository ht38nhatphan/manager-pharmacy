const siteRouter = require('./site');
const meRouter = require('./me');
const thuocRouter = require('./thuocs');
const authRouter = require('./auth');
const userRouter = require('./user');
const cartRouter = require('./cart');
const orderRouter = require('./order');
const stripeRouter = require('./stripe');
const categoriesRouter = require('./categories');
const supelierRouter = require('./supelier');
const unitRouter = require('./unit');
function route(app) {

  app.use('/user', userRouter)
  app.use('/auth', authRouter)
  app.use('/me', meRouter)
  app.use('/order', orderRouter)
  app.use('/thuocs', thuocRouter)
  app.use('/cart', cartRouter)
  app.use('/stripe', stripeRouter)
  app.use('/categories', categoriesRouter)
  app.use('/supelier', supelierRouter)
  app.use('/unit', unitRouter)
  app.use('/', siteRouter)

}

module.exports = route;