/**
 * Handles Seat allocate related service routings
 * Author: Jaganath N Telkoor<jaganath.nt@gmail.com>
 */

var express = require('express');
var router = express.Router();

var update_seat_status_controller = app_helper.load_controller('update_seat_status_controller');

router.post('/sold/:seat_ids', function(req, res, next) {
  update_seat_status_controller.update_seats_status(req, res, next);
});

module.exports = router;
