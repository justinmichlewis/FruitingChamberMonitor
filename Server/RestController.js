var http = require('http');
var express = require('express');
var cors = require('cors')
var Gpio = require('onoff').Gpio;
var sensor = require('node-dht-sensor');
var bodyParser = require('body-parser');
var app = express();

var FAN1_PIN = 3;
var FAN2_PIN = 21;

var fan1 = new Gpio(FAN1_PIN,'out');
var fan2 = new Gpio(FAN2_PIN,'out');





//app.use(express['static'](__dirname ));

//Create fstream object from the JSON file in the home directory
const fs = require('fs');



app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

	


//function to determine schedule
function scheduleTimes(times){

	var d = new Date();
	var hourDelta = 24 / times
	var scheduledTime = d.getHours() + hourDelta
	//console.log('HD', hourDelta)
	//console.log('ST', scheduledTime)
	var fanTimes = [hourDelta];
	for(var x = 0; x < times; x++){
			if (x === 0){
				//do nothing
			}
			else{
				fanTimes.push(fanTimes[x-1]+hourDelta)
			}
		}
	//console.log("FT",fanTimes);
	return fanTimes;

}

//format to JSON and Save
function formatSaveSettings(dur, times){
	var settingsJSON = {duration: dur, times: times};
	fs.writeFile('settings.json', JSON.stringify(settingsJSON), function(err){
		if (err) throw err;
	});

}

//get vitals all
app.get('/vitals', function(req, res) {
	sensor.read(22, 2, function(err, temperature, humidity) {
		if(!err){
			//fanX.sync() details if the fan is on or not
			var vitals = [temperature, humidity, fan1.readSync(), fan2.readSync()];
			res.status(200).send(vitals);
			//console.log('1', fan1.readSync(), '2', fan2.readSync());
			//res.status(200).send(JSON.parse(`[{temp: ${temperature}}, {humidity: ${humidity}}]`));
			//console.log("Fetching Vitals", vitals);
			}
	});
});

//get vitals select
app.get('/vitals/:id', function(req, res) {
	res.status(200).send(vitals[req.params.id]);
	console.log("Fetching Vitals",vitals[req.params.id]); 
});

//get schedule all
app.get('/schedule', function(req, res) {
	let rawdata = fs.readFileSync('settings.json');
	let settings = JSON.parse(rawdata);
	
	console.log("Fetching Settings:",settings);
	res.status(200).send(settings);
});
//post schedule all
app.post('/schedule/', function(req, res) {
	const schedule = req.body;
	res.status(200).send(schedule)
	
	formatSaveSettings(schedule.duration, scheduleTimes(schedule.times));
	console.log("Writting Schedule",  req.body);
	
	
	
});



app.get('*', function(req, res) {
	res.status(200).send(inputs[req/params.id]);
});

app.use(function(err, req, res, next) {
	if (req.xhr) {
		res.status(500).send('500 Error');
	} else{
		next(err);
	}
});

app.listen(3000);
console.log('REST Controller running at port 3000');

