import { Flight } from "../models/flight.js"

function newFlight(req, res) {
  const newFlight = new Flight();
  // Obtain the default date
  const dt = newFlight.departs;
  // Format the date for the value attribute of the input
  const departsDate = dt.toISOString().slice(0, 16);
  res.render('flights/new', {departsDate});
}

function create(req, res){
  console.log("req.body before", req.body)
  for (let key in req.body) {
    if(req.body[key] === "") delete req.body[key]
  }
  const flight = new Flight(req.body)
  console.log(flight)
  flight.save(function(err) {
    // revisit to fix the error handler
    if (err) return res.redirect('/flights/new')
    // revisit to redirect to /flights/index
    res.redirect('/flights/new')
  })
}

function index(req, res) {
  Flight.find({}, function (error, flights) {
    console.log(error)
    res.render("flights/index", {
      error: error,
      flights: flights,
    })
  })
}



export {
  newFlight as new, 
  create,
  index,
}