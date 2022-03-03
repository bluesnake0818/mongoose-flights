import { Meal } from '../models/meal.js'

function newMeal(req, res) {
  // console.log("sanity check")
  Meal.find({}, function (err, meals) {
    res.render('meals/new', {
      title: 'Add Meal', 
      meals,
    })
  })
}

function create(req, res) {
  Meal.create(req.body, function (err, meal) {
    res.redirect('/meals/new')
  })
}

export {
  newMeal as new,
  create,
}