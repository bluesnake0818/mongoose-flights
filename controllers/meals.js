import { Meal } from '../models/meal.js'

function newMeal(req, res) {
  // console.log("sanity check")
  Meal.find({}, function (err, meals) {
    res.render('meals/new', {
      title: 'Add Meal', 
      meals: meals,
    })
  })
}

function create(req, res) {
  console.log("sanity check")
}

export {
  newMeal as new,
  create,
}