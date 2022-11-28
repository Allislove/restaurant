const { Router } = require('express');
const router = Router();
const controller = require('./controller');



router.post('/restaurant', controller.newRestaurant);
router.get('/restaurant/all', controller.restaurants);
router.delete('/restaurant/:id', controller.deleteRestaurant);
router.put('/restaurant/:id', controller.updateRestaurant);



module.exports = router;