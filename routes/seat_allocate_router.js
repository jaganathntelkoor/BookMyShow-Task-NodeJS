/**
 * Handles Seat allocate related service routings
 * Author: Jaganath N Telkoor<jaganath.nt@gmail.com>
 */

var express = require('express');
var router = express.Router();

var seat_allocate_controller = app_helper.load_controller('seat_allocate_controller');

router.post('/allocate/:number_of_seats', function(req, res, next) {
  seat_allocate_controller.allocate(req, res, next);
});

module.exports = router;
