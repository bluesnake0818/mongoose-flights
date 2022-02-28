import "dotenv/config.js"
import createError from 'http-errors'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import logger from 'morgan'
import methodOverride from 'method-override'

// Connect to the database with Mongoose
import('./config/database.js')

// import routers
import { router as indexRouter } from './routes/index.js'
import { router as flightsRouter } from './routes/flights.js'


// set up app
const app = express()

// view engine setup
app.set(
  'views',
  path.join(path.dirname(fileURLToPath(import.meta.url)), 'views')
)
app.set('view engine', 'ejs')

// middleware
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  express.static(
    path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')
  )
)
app.use(methodOverride('_method'))


// mounted routers
app.use(function (req, res, next) {
  req.time = new Date().toLocaleDateString()
  next()
})
app.use('/', indexRouter)
app.use('/flights', flightsRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export {
  app
}


/* bonus user stories
AAU, I want to view the list of flights by departure date in ascending order.
AAU, I want the flights in the list to be displayed using red text if the flight’s departure date has passed.
// AAU, I want to delete flights from the list.

// Change flights/index to table form
Style the index and new views.
*/