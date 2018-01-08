var config = require('./webpack.config')
var webpack = require('webpack')
var data = require('./app/data/data.json')
var bodyParser = require('body-parser')
var browserSync = require('browser-sync')
var compression = require('compression')
var cookieParser = require('cookie-parser')
var favicon = require('serve-favicon')
var isProduction = process.env.NODE_ENV === 'production'
var express = require('express')
var path = require('path')
var open = require('open')
var port = process.env.PORT || 3000
var router = express.Router()
var compiler = webpack(config)
var app = express()

// Set base director for views to allow abolute paths
app.locals.basedir = path.join(__dirname, 'app/views')

// View engine
app.set('views', path.join(__dirname, 'app/views/pages'))
app.set('view engine', 'pug')

// Middleware
app.use(compression())
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(
  require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  })
)

// Routes
// require('./app/routes')(app, isProduction)
app.route('/').get(function (req, res, next) {
  res.render('index/', data)
})
// External route files
app.route('/page').get(function (req, res, next) {
  res.render('page/', data)
})

app.listen(port, function (error) {
  if (error) {
    console.log(error)
  } else {
    console.log('Listening on localhost:3000')
  }
})

// app.use(require('./error'))

// Production
// if (isProduction) {
// app.listen(port, function () {})
// } else {
// Development
// browserSync.create().init({
//   server: './public',
//   files: ['./app/views/**/*.pug', './public/**'],
//   middleware: [app],
//   open: false,
//   notify: false,
//   reloadOnRestart: true
// })
// }

module.exports = app
