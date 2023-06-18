require('../models/database')
const Category = require('../models/Category')
const Recipe = require('../models/Recipe')
const Location = require('../models/Location')
const Destination = require('../models/Destination')

/*
* GET /
* Homepage
*/

exports.homepage = async(req,res) => {
    try{
       
       const limitNumber = 5;
       const categories = await Category.find({}).limit(limitNumber)
       const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber)
       const thai = await Recipe.find({ 'category': 'Thai' }).limit(limitNumber);
    const american = await Recipe.find({ 'category': 'American' }).limit(limitNumber);
    const chinese = await Recipe.find({ 'category': 'Chinese' }).limit(limitNumber);
    const locations = await Location.find({}).limit(limitNumber)

       const food = { latest, thai, american, chinese };


       res.render('index',{categories, food,locations});
    }catch(error){
        res.status(500).send({message: error.message || "Error Occured"});
    }
    
}





/*
* GET /categories
* Categories
*/

exports.exploreCategories = async(req,res) => {
    try{
       
       const limitNumber = 20;
       const categories = await Category.find({}).limit(limitNumber)

       res.render('categories',{categories});
    }catch(error){
        res.status(500).send({message: error.message || "Error Occured"});
    }
    
}


/*
* GET /categories/:id
* Categories By Id
*/

exports.exploreCategoriesbyId = async(req,res) => {
    try{
        let categoryId = req.params.id;
       
       const limitNumber = 20;
       const categoryById = await Recipe.find({'category': categoryId}).limit(limitNumber)

       res.render('categories',{categoryById});
    }catch(error){
        res.status(500).send({message: error.message || "Error Occured"});
    }
    
}



/*
* GET /recipe/:id
* Recipe
*/

exports.exploreRecipe = async(req,res) => {
    try{
        let recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);
       

       res.render('recipe',{recipe});
    }catch(error){
        res.status(500).send({message: error.message || "Error Occured"});
    }
    
}




/*
* POST/search
* Search
*/

exports.searchbox = async(req,res) => {

    //searchTerm

    try {
        let searchTerm = req.body.searchTerm;
        let recipe = await Recipe.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
        res.render('search', { recipe } );
        //res.json(recipe);
        //res.render('search',)
        
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
    
}



/**
 * GET /explore-latest
 * Explplore Latest 
*/
exports.exploreLatest = async(req, res) => {
    try {
      const limitNumber = 20;
      const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
      res.render('explore-latest', { title: 'Cooking Blog - Explore Latest', recipe } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
  } 





/**
 * GET /explore-random
 * Explplore Random 
*/
  exports.exploreRandom = async(req, res) => {
    try {
    let count = await Recipe.find().countDocuments();
    let random = Math.floor(Math.random() * count);
    let recipe = await Recipe.findOne().skip(random).exec();
      res.render('explore-random', {  recipe } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
  } 




//Travel Start 

  /*
* GET /Location
* Location
*/





/*
async function insertDummyCategoryData(){
    try {
        await Category.insertMany(
            [
                {
                    "name":"Thai",
                    "image":"img4.jpg"
                },

                {
                    "name":"American",
                    "image":"img4.jpg"
                },

                {
                    "name":"Chinese",
                    "image":"img4.jpg"
                },

                {
                    "name":"Mexican",
                    "image":"img4.jpg"
                },

                {
                    "name":"Indian",
                    "image":"img4.jpg"
                },

                {
                    "name":"Spanish",
                    "image":"img4.jpg"
                },

                {
                    "name":"Thai",
                    "image":"img4.jpg"
                },
            ]
        );
    } catch (error) {
        console.log('err', + error)
    }
}

insertDummyCategoryData();
*/





/*
async function insertDummyRecipeData(){
    try {
        await Recipe.insertMany(
            [
                { 
                    "name": "Tom Daley's sweet & sour chicken",
                    "description": "Drain the juices from the tinned fruit into a bowl, add the soy and fish sauces, then whisk in 1 teaspoon of cornflour until smooth. Chop the pineapple and peaches into bite-sized chunks and put aside.\n        Pull off the chicken skin, lay it flat in a large, cold frying pan, place on a low heat and leave for a few minutes to render the fat, turning occasionally. Once golden, remove the crispy skin to a plate, adding a pinch of sea salt and five-spice.\n        Meanwhile, slice the chicken into 3cm chunks and place in a bowl with 1 heaped teaspoon of five-spice, a pinch of salt, 1 teaspoon of cornflour and half the lime juice. Peel, finely chop and add 1 clove of garlic, then toss to coat.\n    \n        Source: https://www.jamieoliver.com/recipes/chicken-recipes/tom-daley-s-sweet-sour-chicken/",
                    "email": "hello@email.com",
                    "ingredients": [
                      "1 x 227 g tin of pineapple in natural juice",
                      "1 x 213 g tin of peaches in natural juice",
                      "1 tablespoon low-salt soy sauce",
                      "1 tablespoon fish sauce",
                      "2 teaspoons cornflour",
                      "2 x 120 g free-range chicken breasts , skin on"
                    ],
                    "category": "Chinese",
                    "image": "img3.jpg",
       },
       { 
        "name": "Stir-fried vegetables",
        "description": "Crush the garlic and finely slice the chilli and spring onion. Peel and finely slice the red onion, and mix with the garlic, chilli and spring onion.\n        Shred the mangetout, slice the mushrooms and water chestnuts, and mix with the shredded cabbage in a separate bowl to the onion mixture.\n        Heat your wok until it’s really hot. Add a splash of oil – it should start to smoke – then the chilli and onion mix. Stir for just 2 seconds before adding the other mix. Flip and toss the vegetables in the wok if you can; if you can’t, don’t worry, just keep the vegetables moving with a wooden spoon, turning them over every few seconds so they all keep feeling the heat of the bottom of the wok. Season with sea salt and black pepper.\n    \n        Source: https://www.jamieoliver.com/recipes/vegetables-recipes/stir-fried-vegetables/",
        "email": "hello@email.com",
        "ingredients": [
          "1 clove of garlic",
          "1 fresh red chilli",
          "3 spring onions",
          "1 small red onion",
          "1 handful of mangetout",
          "a few shiitake mushrooms"
        ],
        "category": "Chinese",
         "image": "img3.jpg"
       },
       { 
        "name": "Spring rolls",
  "description": "Put your mushrooms in a medium-sized bowl, cover with hot water and leave for 10 minutes, or until soft. Meanwhile, place the noodles in a large bowl, cover with boiling water and leave for 1 minute. Drain, rinse under cold water, then set aside.\n        For the filling, finely slice the cabbage and peel and julienne the carrot. Add these to a large bowl with the noodles.\n    \n        Source: https://www.jamieoliver.com/recipes/vegetables-recipes/spring-rolls/",
  "email": "hello@email.com",
  "ingredients": [
    "40 g dried Asian mushrooms",
    "50 g vermicelli noodles",
    "200 g Chinese cabbage",
    "1 carrot",
    "3 spring onions"
  ],
  "category": "Chinese",
  "image": "img3.jpg",
      },
      { 
        "name": "Chinese steak & tofu stew",
  "description": "Get your prep done first, for smooth cooking. Chop the steak into 1cm chunks, trimming away and discarding any fat.\n        Peel and finely chop the garlic and ginger and slice the chilli. Trim the spring onions, finely slice the top green halves and put aside, then chop the whites into 2cm chunks. Peel the carrots and mooli or radishes, and chop to a similar size.\n        Place a large pan on a medium-high heat and toast the Szechuan peppercorns while it heats up. Tip into a pestle and mortar, leaving the pan on the heat.\n        Place the chopped steak in the pan with 1 tablespoon of groundnut oil. Stir until starting to brown, then add the garlic, ginger, chilli, the white spring onions, carrots and mooli or radishes.\n    \n        Source: https://www.jamieoliver.com/recipes/stew-recipes/chinese-steak-tofu-stew/",
  "email": "hello@email.com",
  "ingredients": [
    "250g rump or sirloin steak",
    "2 cloves of garlic",
    "4cm piece of ginger",
    "2 fresh red chilli",
    "1 bunch of spring onions"
  ],
  "category": "Chinese",
  "image": "chinese-steak-tofu-stew.jpg",
        "image": "img3.jpg"
      },
      {
        "name": "New Chocolate Cake",
  "description": "Chocolate Cake Description...",
  "email": "hello@email.com",
  "ingredients": [
    "Water"
  ],
  "category": "Mexican",
  "image": "img2.jpg",
      },
{
      "name": "Thai green curry",
  "description": "Preheat the oven to 180ºC/350ºF/gas 4.\n        Wash the squash, carefully cut it in half lengthways and remove the seeds, then cut into wedges. In a roasting tray, toss with 1 tablespoon of groundnut oil and a pinch of sea salt and black pepper, then roast for around 1 hour, or until tender and golden.\n        For the paste, toast the cumin seeds in a dry frying pan for 2 minutes, then tip into a food processor.\n        Peel, roughly chop and add the garlic, shallots and ginger, along with the kaffir lime leaves, 2 tablespoons of groundnut oil, the fish sauce, chillies (pull off the stalks), coconut and most of the coriander (stalks and all).\n        Bash the lemongrass, remove and discard the outer layer, then snap into the processor, squeeze in the lime juice and blitz into a paste, scraping down the sides halfway.\n        Put 1 tablespoon of groundnut oil into a large casserole pan on a medium heat with the curry paste and fry for 5 minutes to get the flavours going, stirring regularly.\n        Tip in the coconut milk and half a tin’s worth of water, then simmer and thicken on a low heat for 5 minutes.\n    \n        Source: https://www.jamieoliver.com/recipes/butternut-squash-recipes/thai-green-curry/",
  "email": "hello@email.com",
  "ingredients": [
    "1 butternut squash (1.2kg)",
    "groundnut oil",
    "12x 400 g tins of light coconut milk",
    "400 g leftover cooked greens, such as",
    "Brussels sprouts, Brussels tops, kale, cabbage, broccoli"
  ],
  "category": "Thai",
  "image": "img2.jpg",
},
{
    "name": "Grilled lobster rolls",
  "description": "\n        Remove the butter from the fridge and allow to soften.\n        Preheat a griddle pan until really hot.\n        Butter the rolls on both sides and grill on both sides until toasted and lightly charred (keep an eye on them so they don’t burn).\n        Trim and dice the celery, chop the lobster meat and combine with the mayonnaise. Season with sea salt and black pepper to taste.\n        Open your warm grilled buns, shred and pile the lettuce inside each one and top with the lobster mixture. Serve immediately.\n    \n        Source: https://www.jamieoliver.com/recipes/fruit-recipes/key-lime-pie/",
  "email": "hello@email.com",
  "ingredients": [
    "85 g butter",
    "6 submarine rolls",
    "500 g cooked lobster meat, from sustainable sources",
    "1 stick of celery",
    "2 tablespoons mayonnaise , made using free-range eggs"
  ],
  "category": "American",
  "image": "img2.jpg",
},
{
    "name": "Key lime pie",
  "description": "\n        Preheat the oven to 175ºC/gas 3. Lightly grease a 22cm metal or glass pie dish with a little of the butter.\n        For the pie crust, blend the biscuits, sugar and remaining butter in a food processor until the mixture resembles breadcrumbs.\n        Transfer to the pie dish and spread over the bottom and up the sides, firmly pressing down.\n        Bake for 10 minutes, or until lightly browned. Remove from oven and place the dish on a wire rack to cool.\n        For the filling, whisk the egg yolks in a bowl. Gradually whisk in the condensed milk until smooth.\n        Mix in 6 tablespoons of lime juice, then pour the filling into the pie crust and level over with the back of a spoon.\n        Return to the oven for 15 minutes, then place on a wire rack to cool.\n        Once cooled, refrigerate for 6 hours or overnight.\n        To serve, whip the cream until it just holds stiff peaks. Add dollops of cream to the top of the pie, and grate over some lime zest, for extra zing if you like.\n    \n        Source: https://www.jamieoliver.com/recipes/fruit-recipes/key-lime-pie/",
  "email": "hello@email.com",
  "ingredients": [
    "4 large free-range egg yolks",
    "400 ml condensed milk",
    "5 limes",
    "200 ml double cream"
  ],
  "category": "American",
  "image": "img2.jpg",
},
{
    "name": "Thai red chicken soup",
  "description": "\n        Sit the chicken in a large, deep pan.\n        Carefully halve the squash lengthways, then cut into 3cm chunks, discarding the seeds.\n        Slice the coriander stalks, add to the pan with the squash, curry paste and coconut milk, then pour in 1 litre of water. Cover and simmer on a medium heat for 1 hour 20 minutes.\n        Use tongs to remove the chicken to a platter. Spoon any fat from the surface of the soup over the chicken, then sprinkle with half the coriander leaves.\n        Serve with 2 forks for divvying up the meat at the table. Use a potato masher to crush some of the squash, giving your soup a thicker texture.\n    \n        Source: https://www.jamieoliver.com/recipes/chicken-recipes/thai-red-chicken-soup/",
  "email": "hello@email.com",
  "ingredients": [
    "1 x 1.6 kg whole free-range chicken",
    "1 butternut squash (1.2kg)",
    "1 bunch of fresh coriander (30g)"
  ],
  "category": "Thai",
  "image": "img2.jpg",
},
{
    "name": "Crab cakes",
  "description": "\n        Trim and finely chop the spring onions, and pick and finely chop the parsley. Beat the egg.\n    \n        Combine the crabmeat, potatoes, spring onion, parsley, white pepper, cayenne and egg in a bowl with a little sea salt.\n    \n        Refrigerate for 30 minutes, then shape into 6cm cakes.\n    \n        Dust with flour and shallow-fry in oil over a medium heat for about 5 minutes each side or until golden-brown.\n    \n        Serve with pinches of watercress and a dollop of tartare sauce.\n    \n        Source: https://www.jamieoliver.com/recipes/seafood-recipes/crab-cakes/",
  "email": "hello@email.com",
  "ingredients": [
    "3 spring onions",
    "½ a bunch of fresh flat-leaf parsley",
    "1 large free-range egg",
    "750 g cooked crabmeat , from sustainable sources",
    "300 g mashed potatoes",
    "1 teaspoon ground white pepper",
    "1 teaspoon cayenne pepper",
    "olive oil"
  ],
  "category": "American",
  "image": "img2.jpg",
},
{
    "name": "Veggie pad Thai",
  "description": "\n        Cook the noodles according to the packet instructions, then drain and refresh under cold running water and toss with 1 teaspoon of sesame oil.\n        Lightly toast the peanuts in a large non-stick frying pan on a medium heat until golden, then bash in a pestle and mortar until fine, and tip into a bowl.\n        Peel the garlic and bash to a paste with the tofu, add 1 teaspoon of sesame oil, 1 tablespoon of soy, the tamarind paste and chilli sauce, then squeeze and muddle in half the lime juice.\n        Peel and finely slice the shallot, then place in the frying pan over a high heat. Trim, prep and slice the crunchy veg, as necessary, then dry-fry for 4 minutes, or until lightly charred (to bring out a nutty, slightly smoky flavour).\n    \n        Source: https://www.jamieoliver.com/recipes/vegetable-recipes/veggie-pad-thai/",
  "email": "hello@email.com",
  "ingredients": [
    "150 g rice noodles",
    "sesame oil",
    "2 cloves of garlic",
    "80 g silken tofu",
    "low-salt soy sauce"
  ],
  "category": "Thai",
  "image": "img2.jpg",
},
{
    "name": "Chocolate & banoffee whoopie pies",
    "description": "\n        Preheat the oven to 170ºC/325ºF/gas 3 and line 2 baking sheets with greaseproof paper.\n        Combine the cocoa powder with a little warm water to form a paste, then add to a bowl with the remaining whoopie ingredients. Mix into a smooth, slightly stiff batter.\n        Spoon equal-sized blobs, 2cm apart, onto the baking sheets, then place in the hot oven for 8 minutes, or until risen and cooked through.\n        Cool for a couple of minutes on the sheets, then move to a wire rack to cool completely.\n        Once the whoopies are cool, spread ½ a teaspoon of dulce de leche on the flat sides.\n        Peel and slice the bananas, then top half the pies with 2 slices of the banana.\n        Sandwich together with the remaining halves, and dust with icing sugar and cocoa powder.\n    \n        Source: https://www.jamieoliver.com/recipes/chocolate-recipes/chocolate-amp-banoffee-whoopie-pies/",
    "email": "hello@email.com",
    "ingredients": [
      "3 spring onions",
      "½ a bunch of fresh flat-leaf parsley",
      "1 large free-range egg",
      "750 g cooked crabmeat , from sustainable sources",
      "300 g mashed potatoes",
      "1 teaspoon ground white pepper",
      "1 teaspoon cayenne pepper",
      "olive oil"
    ],
    "category": "American",
    "image": "img2.jpg"
},
{
    "name": "Southern fried chicken",
    "description": "\n        To make the brine, toast the peppercorns in a large pan on a high heat for 1 minute, then add the rest of the brine ingredients and 400ml of cold water. Bring to the boil, then leave to cool, topping up with another 400ml of cold water.\n    \n        Meanwhile, slash the chicken thighs a few times as deep as the bone, keeping the skin on for maximum flavour. Once the brine is cool, add all the chicken pieces, cover with clingfilm and leave in the fridge for at least 12 hours – I do this overnight.\n    \n        After brining, remove the chicken to a bowl, discarding the brine, then pour over the buttermilk, cover with clingfilm and place in the fridge for a further 8 hours, so the chicken is super-tender.\n    \n        When you’re ready to cook, preheat the oven to 190°C/375°F/gas 5.\n    \n        Wash the sweet potatoes well, roll them in a little sea salt, place on a tray and bake for 30 minutes.\n    \n        Meanwhile, make the pickle – toast the fennel seeds in a large pan for 1 minute, then remove from the heat. Pour in the vinegar, add the sugar and a good pinch of sea salt, then finely slice and add the cabbage. Place in the fridge, remembering to stir every now and then while you cook your chicken.\n    \n        Source: https://www.jamieoliver.com/recipes/chicken-recipes/southern-fried-chicken/",
    "email": "hello@email.com",
    "ingredients": [
      "4 free-range chicken thighs , skin on, bone in",
      "4 free-range chicken drumsticks",
      "200 ml buttermilk",
      "4 sweet potatoes",
      "200 g plain flour",
      "1 level teaspoon baking powder",
      "1 level teaspoon cayenne pepper",
      "1 level teaspoon hot smoked paprika"
    ],
    "category": "American",
    "image": "img2.jpg"
},
{
    "name": "Thai-Chinese-inspired pinch salad",
  "description": "Peel and very finely chop the ginger and deseed and finely slice the chilli (deseed if you like). Toast the sesame seeds in a dry frying pan until lightly golden, then remove to a bowl.\n        Mix the prawns with the five-spice and ginger, finely grate in the lime zest and add a splash of sesame oil. Toss to coat, then leave to marinate.\n    \n        Source: https://www.jamieoliver.com/recipes/seafood-recipes/asian-pinch-salad/",
  "email": "hello@email.com",
  "ingredients": [
    "5 cm piece of ginger",
    "1 fresh red chilli",
    "25 g sesame seeds",
    "24 raw peeled king prawns , from sustainable sources (defrost first, if using frozen)",
    "1 pinch Chinese five-spice powder"
  ],
  "category": "Chinese",
  "image": "img2.jpg"
},
{
    "name": "Thai-style mussels",
  "description": "Peel and crush the garlic, then peel and roughly chop the ginger. Trim the greens, finely shredding the cabbage, if using. Trim and finely slice the spring onions and chilli. Pick the herbs.\n        Bash the lemongrass on a chopping board with a rolling pin until it breaks open, then add to a large saucepan along with the garlic, ginger and star anise.\n        Place the pan over a high heat, then pour in the vegetable stock. Bring it just to the boil, then turn down very low and gently simmer for 30 minutes.\n        Source: https://www.jamieoliver.com/recipes/vegetables-recipes/asian-vegetable-broth/",
  "email": "hello@email.com",
  "ingredients": [
    "3 cloves of garlic",
    "5cm piece of ginger",
    "200 g mixed Asian greens , such as baby pak choi, choy sum, Chinese cabbage",
    "2 spring onions",
    "1 fresh red chilli"
  ],
  "category": "Thai",
  "image": "img2.jpg"
},
{
    "name": "Crab cakes",
    "description": "\n        Preheat the oven to 175ºC/gas 3. Lightly grease a 22cm metal or glass pie dish with a little of the butter.\n        For the pie crust, blend the biscuits, sugar and remaining butter in a food processor until the mixture resembles breadcrumbs.\n        Transfer to the pie dish and spread over the bottom and up the sides, firmly pressing down.\n        Bake for 10 minutes, or until lightly browned. Remove from oven and place the dish on a wire rack to cool.\n        For the filling, whisk the egg yolks in a bowl. Gradually whisk in the condensed milk until smooth.\n        Mix in 6 tablespoons of lime juice, then pour the filling into the pie crust and level over with the back of a spoon.\n        Return to the oven for 15 minutes, then place on a wire rack to cool.\n        Once cooled, refrigerate for 6 hours or overnight.\n        To serve, whip the cream until it just holds stiff peaks. Add dollops of cream to the top of the pie, and grate over some lime zest, for extra zing if you like.\n    \n        Source: https://www.jamieoliver.com/recipes/fruit-recipes/key-lime-pie/",
    "email": "hello@email.com",
    "ingredients": [
      "4 large free-range egg yolks",
      "400 ml condensed milk",
      "5 limes",
      "200 ml double cream"
    ],
    "category": "American",
    "image": "img2.jpg"
}
            ]
        );
    } catch (error) {
        console.log('err', + error)
    }
}

insertDummyRecipeData();
*/


/*
async function insertDummyCategoryData(){
    try {
        await Location.insertMany(
            [
                {
                    "name":"India",
                    "image":"img4.jpg"
                },

                {
                    "name":"America",
                    "image":"img4.jpg"
                },

                {
                    "name":"Thailand",
                    "image":"img4.jpg"
                },

                {
                    "name":"Korea",
                    "image":"img4.jpg"
                },

                {
                    "name":"Australia",
                    "image":"img4.jpg"
                },

                {
                    "name":"Italy",
                    "image":"img4.jpg"
                },

                {
                    "name":"Nepal",
                    "image":"img4.jpg"
                },
            ]
        );
    } catch (error) {
        console.log('err', + error)
    }
}

insertDummyCategoryData();

*/
/*
async function insertDummyCategoryData(){
    try {
        await Destination.insertMany(
            [
                {
                    "name":"Manali",
                    "description":"Manali is a town, near Kullu town in Kullu district in the Indian state of Himachal Pradesh.[2] It is situated in the northern end of the Kullu Valley, formed by the Beas River. The town is located in the Kullu district, approximately 270 kilometres (170 mi) north of the state capital of Shimla and 544 kilometres (338 mi) northeast of the national capital of New Delhi. With a population of 8,096 people recorded in the 2011 Indian census Manali is the beginning of an ancient trade route through Lahaul (H.P) and Ladakh, over the Karakoram Pass and onto Yarkand and Hotan in the Tarim Basin of China. Manali is a popular tourist destination in India and serves as the gateway to the Lahaul and Spiti district as well as the city of Leh in Ladakh.[3]",
                    "category":"India",
                    "image" : "Manali.jpg"
                },

                {
                    "name":"New York City",
                    "description":"An iconic global centre that has inspired the world with its brilliant architecture, movies, and art. Also known as the Big Apple, New York is well-known for its magnificent skyscrapers, Broadway shows and beautiful landmarks, making it the perfect destination for travellers from all over.",
                    "category":"America",
                    "image":"nyc.jpg"
                },

                {
                    "name":"Bangkok",
                    "description":"A city that never sleeps, Bangkok, the capital of Thailand is a modern-day melting pot of contrasting cultures and faiths. Here, towering skyscrapers stand in harmony next to temples and monasteries. The luxury malls and shopping centres compete with the street bazaars and floating markets.Cuisines - both Thai and from around the world are showcased in all their glory on the streets as well as in rooftop restaurants. The nightlife of Bangkok, on the one hand, revolves around flashy nightclubs, rooftop and go-go bars, bright neon light signs and cheap drinks.",
                    "category":"Thailand",
                    "image":"bangkok.jpg"
                },

                {
                    "name":"Seoul",
                    "description":"Seoul is easily up there as one of the best places in South Korea to visit. Not only is it super vast, but it’s also got a whole heap of history, neighbourhoods and influences that are so much fun to explore.Now, for about 600years, Seoul has been Korea’s capital city that is steeped in history. This all means that lots of important historical buildings are based here and is perfect to explore for a long weekend away. ",
                    "category":"Korea",
                    "image":"seoul.jpg"
                },

                {
                    "name":"Sydney",
                    "description":"Sydney is Australia's largest city and its most iconic tourist destination. Home to the iconic Sydney Opera House and Sydney Harbour Bridge, this city is a mix of the country's best beaches, coastal and hilly hikes, modern art galleries, affluent shopping and lavish fine dining. Australia has fast evolved as a melting pot of cultures from across the world, and Sydney is perhaps the city which epitomises that the most anywhere in the country.",
                    "category":"Australia",
                    "image":"sydney.jpg"
                },

                {
                    "name":"Venice",
                    "description":"A city located in north east Italy and the capital of the Veneto region. It is known for its beautiful settings, artwork and a predominantly Venetian Gothic architecture. A beautiful city known for its interconnected canals and its gondola rides. Equal measures of romance and culture makes this city beautiful and breathtaking. This place is like nothing you imagined, even if you have seen it in movies and photos, it is totally dreamlike! Water shimmers everywhere in this breathtaking city, with canals where the streets should be. Unrelentingly romantic and beautifully chaotic, Venice is a land of art, history, magic, tradition and diversity",
                    "category":"Italy",
                    "image":"venice.jpg"
                },

                {
                    "name":"Kathmandu",
                    "description":"Sprawled over its namesake valley surrounded by Himalayan mountains, Kathmandu is Nepal’s capital and most-visited destination, full of ancient temples, golden pagodas, natural beauty and fascinating villages. At an elevation of 4,344 feet, Kathmandu marks the confluence of the Bagmati and Vishnumati rivers. One can find excellent trekking options of the world’s tallest peaks, stunning Indo-Tibetan and Newari craftsmanship, UNESCO-listed heritage landmarks and delicious food here. Kathmandu is the gateway to exploring Nepal’s essence. Amidst the old city’s maze-like alleyways is the 1627-built Durbar Square, where locals frolic during Indra Jatra masked dance festival. Swayambhunath Stupa, Pashupatinath Temple, Monkey Temple and Boudha Stupa are some more eminent religious establishments. Outdoor enthusiasts flock to Nagarkot, Rani Pokhari Lake and Champadevi Hill for hiking, bungee jumping, rafting and mountain climbing. Learning about Buddhism at Kopan Monastery, buying pashmina shawls and trinkets at Indra Chowk and Thamel’s markets and digging into steaming momos are great ways to enhance the experience. From courtyards of drying chillies and rice, incense wafting out of shrines, national museums, and contemporary Nepali art galleries to hobbit-sized workshops, bustling bazaars, rickshaws, Thukpa and Everest beer, Kathmandu offers something unique for every tourist, devotee, backpacker, history buff, foodie and shopaholic.",
                    "category":"Nepal",
                    "image":"kathmandu.jpg"
                },
            ]
        );
    } catch (error) {
        console.log('err', + error)
    }
}

insertDummyCategoryData();
*/