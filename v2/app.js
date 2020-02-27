var express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
mongoose.set('useNewUrlParser', true);
mongoose.connect('mongodb://localhost/yelp_camp', { useUnifiedTopology: true });

//schema setup

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});
var Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
// 	{
// 		name: 'J Creek',
// 		image:
// 		'https://dailygazette.com/sites/default/files/styles/article_image/public/180702d.jpg?itok=6L_qDMLP',
// 		description:"This is a huge creek"
// 	},
// 	function(err, campground) {
// 		if (err) {
// 			console.log('Error');
// 		} else {
// 			console.log(campground);
// 		}
// 	}
// );

app.get('/', function(req, res) {
	res.render('landing');
});

//Index - show all campgrounds
app.get('/campgrounds', function(req, res) {
	Campground.find({}, function(err, allCampgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render('index', { campgrounds: allCampgrounds });
		}
	});
});
//create- add new campground to DB
app.post('/campgrounds', function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = { name: name, image: image , description: desc};
	Campground.create(newCampground, function(err, newlyCreated) {
		if (err) {
			console.log(err);
		} else {
			//return back to all campgrounds
			res.redirect('/campgrounds');
		}
	});
});

//new- show form to create new campground 
app.get('/campgrounds/new', function(req, res) {
	res.render('new');
});

//Show- find campground with id
app.get('/campgrounds/:id', function(req, res) {
	//find the campground with provided id
	Campground.findById(req.params.id, function(err, foundCampground){
		if (err) {
			console.log(err);
		} else {
			//return back to all campgrounds
			res.render("show", {campground: foundCampground});
		}
	});
});
//Starting Server
app.listen(3000, function() {
	console.log('YelpCamp Server running...');
});