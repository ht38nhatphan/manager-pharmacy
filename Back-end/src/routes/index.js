const siteRouter = require('./site');
const meRouter = require('./me');
const thuocRouter = require('./thuocs');
const authRouter = require('./auth');
const userRouter = require('./user');
const cartRouter = require('./cart');
const orderRouter = require('./order');
const stripeRouter = require('./stripe');


function route(app){

  app.use('/user', userRouter)
  app.use('/auth', authRouter)
  app.use('/me', meRouter)
  app.use('/order', orderRouter)
  app.use('/thuocs', thuocRouter)
  app.use('/cart', cartRouter)
  app.use('/stripe', stripeRouter)
  app.use('/', siteRouter)

}

module.exports = route;