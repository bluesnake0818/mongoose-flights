import { Flight } from "../models/flight.js"

function newFlight(req, res) {
  const newFlight = new Flight();
  // Obtain the default date
  const dt = newFlight.departs;
  // Format the date for the value attribute of the input
  const departsDate = dt.toISOString().slice(0, 16);
  res.render('flights/new', {
    departsDate,
    title: "Add Flight"
  });
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
    res.redirect('/flights')
  })
}

function index(req, res) {
  Flight.find({}, function (error, flights) {
    console.log(error)
    res.render("flights/index", {
      error: error,
      flights: flights,
      time: req.time, 
      title: "All Flights"
    })
  })
}

function show(req, res) {
  Flight.findById(req.params.id, function (error, flight) {
    res.render('flights/show', {
      flight: flight,
      title: "Flight Detail",
      error: error
    })
  })
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id, function(err, flight) {
    res.redirect('/flights')
  })
}

function edit (req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    const dt = flight.departs;
    const departsDate = dt.toISOString().slice(0, 16); 
    res.render('flights/edit', {
      flight,
      err,
      title: "Edit Flight",
      departsDate,
    })
  })
}

function update(req,res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Flight.findByIdAndUpdate(req.params.id, req.body, function(err, flight) {
    res.redirect(`/flights/${flight._id}`)
  }) 
}

function createTicket(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    flight.tickets.push(req.body)
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

export {
  newFlight as new, 
  create,
  index,
  show,
  deleteFlight as delete,
  edit,
  update,
  createTicket,
}