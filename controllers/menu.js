const express = require('express');
const router = express.Router();
const axios = require("axios");


router.get('/recipes', function(req, res) {
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
            // console.log(response)
            var results = response.data.items;
            // JSON.parse(results)
            console.log("-----------------------")
            console.log(results);
            res.render('menu', { meals: results });
        }).catch(err => {
            console.log(err);
        }).finally(function() {
            console.log("Made it to this function!");
        })
});

module.exports = router;