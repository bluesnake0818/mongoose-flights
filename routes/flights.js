import { Router } from 'express'
const router = Router()
import * as flightsCtrl from "../controllers/flights.js"


// GET - localhost:3000/flights
router.get('/', flightsCtrl.index)
// GET localhost:3000/flights/new
router.get('/new', flightsCtrl.new)
// GET - localhost:3000/flights/:id
router.get("/:id", flightsCtrl.show)

// POST localhost:3000/flights
router.post('/', flightsCtrl.create)

export {
  router
}
