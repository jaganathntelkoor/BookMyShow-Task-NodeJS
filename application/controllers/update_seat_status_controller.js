const fs = require('fs');
var path = require('path');

/**
 * Handles Seat allocate related service routings
 * Author: Jaganath N Telkoor<jaganath.nt@gmail.com>
 */
class seat_allocate_controller
{
	
	constructor()
	{
		
	}
	
	async update_seats_status(req, res, next)
	{
		let seat_ids = req.params.seat_ids;
		seat_ids = seat_ids.split(',');//converting to array
		
		let seats_file_data = fs.readFileSync((path.join(__dirname, '../../storage/seats.json')));
		
		let seats_json_data = JSON.parse(seats_file_data);
		this.search_and_update_seats_staus(seats_json_data, seat_ids);
		
		//after seats status update, update the json file data
		fs.writeFile((path.join(__dirname, '../../storage/seats.json')), JSON.stringify(seats_json_data), () => {});
		
		
		if(seat_ids.length == 0){
			res.json({'message':'updated successfully'});
		} else {
			res.json({'message':'no seats found with Rserved status'});
		}
		
	}

	search_and_update_seats_staus(seats_json_data, seat_ids)
	{
		for(let key in seats_json_data){
			//for(let rank_number in ranks){
			for(let i=0;i<seats_json_data[key].length; i++){
					
					//checking the rank and satus is available
					for(let s_id in seat_ids){
						
						if(seats_json_data[key][i]['id'] == seat_ids[s_id] && seats_json_data[key][i]['status'] == 'R'){
							//update the status from reserved to soldout
							seats_json_data[key][i]['status'] = 'S';
							seat_ids.splice(s_id, 1);

							if(seat_ids.length == 0){
								
								return true;
							}
						}
					}
					
				
			}
		}
	}
}

module.exports = new seat_allocate_controller();
