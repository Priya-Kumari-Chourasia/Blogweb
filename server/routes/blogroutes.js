const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogControllers')

/*
App Routes
*/

router.get('/', blogController.homepage)
router.get('/categories',blogController.exploreCategories)
router.get('/recipe/:id',blogController.exploreRecipe)
router.get('/categories/:id',blogController.exploreCategoriesbyId)
router.get('/search',blogController.searchbox)
router.get('/explore-latest',blogController.exploreLatest)
router.get('/explore-random',blogController.exploreRandom)
//router.get('/locations',blogController.exploreLocation)
//router.get('/explore-random',blogController.exploreRandom)



module.exports = router;