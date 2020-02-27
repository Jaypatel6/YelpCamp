var express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	mongoose = require('mongoose'),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	seedDB = require("./seeds"),
	flash = require("connect-flash"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment"),
	User = require("./models/user"),
	methodOverride = require("method-override");

//acquiring routes
var commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index");

mongoose.set('useNewUrlParser', true);
mongoose.connect('mongodb://localhost/yelp_camp', { useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//seed database
//seedDB();

//passport
app.use(require("express-session")({
	secret: "Once again Rocky wins cutest dog",
	resave: false, 
	saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
})

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", indexRoutes)
//start server//
app.listen(3000, function(){
	+console.log("Yelp Camp Server running...");
});