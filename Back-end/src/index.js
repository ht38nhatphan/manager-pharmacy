const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const cors = require('cors');
require('dotenv').config();





// route app
const route = require('./routes')

//Connect DB
const db = require('./config/db')
db.connect();



const app = express()
const port = 8000

// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL );

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });


// app.use(
//   cors({ origin: [process.env.REACT_URL, process.env.REACT_URL2] })
// );

app.use(
  cors()
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Plugin Cookies
app.use(cookieParser());


app.use(express.static(__dirname + '/public'));
app.use("/uploads", express.static('uploads'));



// HTTP Logger
app.use(morgan('combined'))

app.use(methodOverride('_method'))



// // Template Engine
// app.engine('hbs', engine({
//   extname: '.hbs',
//   helpers: {
//     sum: (a, b) => a + b
//   }
// }));
// //Sets our app to use the handlebars engine
// app.set('view engine', 'hbs');
// //Sets handlebars configurations 
// app.set('views', path.join(__dirname, 'resources/views'));



// Routes init
route(app);

// congfigure METHOD POST / GET / PUT / PATCH ...


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})