const express = require('express');
const router = express.Router();
const axios = require("axios");


router.get('/', function(req, res) {
    axios({
            "method": "GET",
            "url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate",
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "x-rapidapi-key": process.env.API_KEY
            },
            "params": {
                "timeFrame": "week",
                "targetCalories": "2000"
            }
        })
        .then(function(response) {
            var meals = response.data.items;
            console.log("--------- We are at index.js ---------")
            res.render('index', { meals: meals.slice(0, 3) });
        }).catch(err => {
            console.log(err);
        }).finally(function() {
            console.log("Made it to this function!");
        })
});

module.exports = router;