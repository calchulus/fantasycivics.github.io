function Fetch311(){

var SOCRATA_URL = "https://data.cityofchicago.org/resource/";
var SECRET_TOKEN = "Le00VXF0GK0d8D1tTn2v6Vkpl";

var Scoring = {

	DATASETS: {
		graffiti: 'cdmx-wzbz.json',
		rodent_baiting: 'dvua-vftq.json',
		pot_holes: '787j-mys9.json',

		tree_trims: 'yvxb-fxjz.json',
		garbage_carts: 'a9br-8sqt.json',
		street_lights: 'h555-t6kz.json',
		abandoned_vehicles: 'suj7-cg3j.json'
	},

	DATASET_NAMES: {
		graffiti: 'Graffiti',
		rodent_baiting: 'Rodent Baiting',
		pot_holes: 'Pot Holes',

		tree_trims: 'Tree Trims',
		garbage_carts: 'Garbage Carts',
		street_lights: 'Light Outages',
		abandoned_vehicles: 'Abandoned Vehicles'
	},

	getSocrataData: (url, query, callback, limit) => {
		query['$$app_token'] = SECRET_TOKEN;
		// Deactivated query limits // query['$limit'] = limit;
		$.ajax({
			url: url,
			method: "GET",
			dataType: "json",
			data: query,
			success: function(data, status, jqxhr){				
				callback(data);
			},
			error: function(jqxhr, status, error){
				callback({
					failed: true,
					status: jqxhr.status
				});
				throw new Error("Socrata request failed: " + error);
			}
		});
	},

	buildDateQuery: (field, from, to) => {
		return field + " between '" + new Date(from).toISOString().split('.')[0] + "' and '" + new Date(to).toISOString().split('.')[0] + "'";
	},

	queryDataset: (dataset, query) => {
		return new Promise((resolve, reject) => {
			try{
				Scoring.getSocrataData(SOCRATA_URL + Scoring.DATASETS[dataset], query, function(data){
					if(data.failed){
						resolve([]);
					}
					else{
						resolve(data);
					}
				});
			}
			catch(e){
				console.log('Socrata/AJAX error allowed to be resolved.');
				console.error(e);
				//reject(e);
			}
		});
	},

	getFromDataset: (params) => {
		let query = {
			'$where': Scoring.buildDateQuery('creation_date', params.from, params.to),
			'ward': PLAYER_MAP[params.player].ward
		}
		return new Promise((resolve, reject) => {
			try{
				let d_set = Scoring.DATASETS[params.dataset];
				Scoring.getSocrataData(SOCRATA_URL + d_set, query, function(data){
					if(data.failed){
						resolve([]);
					}
					else{
						resolve(data);
					}
				});
			}
			catch(e){
				console.log('Socrata/AJAX error allowed to be resolved.');
				console.error(e);
				//reject(e);
			}
		});
	},

	scoreData: (inData, from, to) => {
		var data = inData.filter((issue) => {
			var openOn = issue.creation_date;
			var inWeek = false;
			if(openOn){
				var openTime = new Date(openOn).getTime();
				inWeek = (openTime > from);
			}
			return inWeek;
		});
		var open = data.filter((issue) => { return issue.status == 'Open' });
		var completed = data.filter((issue) => {
			var comp = issue.status === 'Completed';
			var inRange = false;
			var compOn = issue.completion_date;
			if(compOn){
				var compTime = new Date(compOn).getTime();
				inRange = (compTime < to);
			}
			return comp && inRange;
		});
		return completed.length - open.length;
	}

}

return Scoring;

}

export {Fetch311};