const express = require('express');
//const request = require('request'); 
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
	var campgrounds = [
		{name: "S Creek", image: "https://dailygazette.com/sites/default/files/styles/article_image/public/180702d.jpg?itok=6L_qDMLP"},
		{name: "G Creek", image: "https://cdn.jacksonholewy.net/images/content/14405_832ba2_gros_ventre_campground_lg.jpg"},
		{name: "M Creek", image: "https://www.olympicnationalparks.com/media/610231/sol-duc-hot-springs-resort-camping_112_1000x667.jpg"}
	]
	
app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	res.redirect("/campgrounds");
})

app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
})
app.listen(3000, function(){
	console.log("YelpCamp Server running...");
});