import { Meal } from '../models/meal.js'

function newMeal(req, res) {
  // console.log("sanity check")
  Meal.find({}, function (err, meal) {
    res.render('meal/new', {
      title: 'Add Meal', 
      meals: meals,
    })
  })
}

export {
  newMeal as new,
}