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
	
	async allocate(req, res, next)
	{
		let number_of_seats = req.params.number_of_seats;
		let seats_file_data = fs.readFileSync((path.join(__dirname, '../../storage/seats.json')));
		
		let seats_json_data = JSON.parse(seats_file_data);
		
		//search and allocate the seats
		let allocated_seats = this.search_and_allocate_seats(seats_json_data, number_of_seats);
		
		if(allocated_seats.length > 0){
			//after seats allocation update the seats json file with sold out status
			fs.writeFile((path.join(__dirname, '../../storage/seats.json')), JSON.stringify(seats_json_data), () => {});

			allocated_seats = allocated_seats.sort();
		}
		
		
		res.json(allocated_seats);
	}

	search_and_allocate_seats(seats_json_data, number_of_seats)
	{
		let allocated_seats = [];
		
			for(let key in seats_json_data){
				for(let i=0;i<seats_json_data[key].length; i++){

					   //checking the rank and satus is available
						if(seats_json_data[key][i]['status'] == 'A'){
							allocated_seats.push(seats_json_data[key][i]['id']);

							//update the status to soldout
							seats_json_data[key][i]['status'] = 'S';

							//if all seats are allocated, then return the response
							if(number_of_seats == allocated_seats.length){
								return allocated_seats;
							}
						}
					
				}
				if(number_of_seats > allocated_seats.length){
					allocated_seats = [];
				}
				
			}
		

		return allocated_seats;
	}
}

module.exports = new seat_allocate_controller();
