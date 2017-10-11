var express = require('express');
var app = express();

var Animal = require('./Animal.js');
var Toy = require('./Toy.js');


// app.use('/', (req, res) => {
// 	res.json({ msg : 'It still now works!' });
// });

app.get('/findToy', (req, res) => {
	var query = {};
	if (req.query.id) {
	    query.id = req.query.id;

	    Toy.findOne( query, (err, toy) => {
			if (err) {
			    res.type('html').status(500);
			    res.send('Error: ' + err);
			} else if (toy) {
				res.json(toy);
			}
			else {
			    res.json({});
			}
		});	  
	} else {
        res.json({});
    }  
});

app.get('/findAnimals', (req, res) => {
	var query = {};
	if (req.query.species) {
	    query.species = req.query.species;
	}
	if (req.query.trait) {
	    query.traits = req.query.trait;
	}
	if (req.query.gender) {
	    query.gender = req.query.gender;
	}

	Animal.find( query, '-_id name species breed gender age', (err, animals) => {
		if (err) {
		    res.type('html').status(500);
		    res.send('Error: ' + err);
		}
		else {
		    res.json(animals);
		}
	});

});


app.listen(3000, () => {
	console.log('Now listening on port 3000');
});



// Please do not delete the following line; we need it for testing!
module.exports = app;