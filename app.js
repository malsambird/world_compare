$(document).ready( function() {
// GOOGLE API not being used. var API_KEY = "AIzaSyARbPin6u7cRfs1dyqXZemAWs3f-btI3m0"; //googlemaps
//instagram "https://api.instagram.com/v1/tags/100happydays/media/recent?access_token=ACCESS-TOKEN",
var client_id = "b8450f13c6f04d21b2d85661cc8a1923";

//This prototype is not being used yet. 
function Star(longitude, latitude, url) {
	this.longitude = longitude;
	this.latitude = latitude;
	this.url = url;
}
// end of prototype




//Declare Variables
var latitude = 0; // (φ)
var longitude = 0;   // (λ)
var newPicURL;
var x;
var y;
var div = $('.container');
var mapWidth    = 800;
var mapHeight   = 800;


// Creating a new star on the map corresponding with pictures. 
var createNewStar = function (){
	//WARNING Complicated math below to make coordinates correspond with locations on the map
	// get x value
	var x = (longitude+180)*(mapWidth/360);
	console.log("x =" +x);

	// convert from degrees to radians
	var latRad = latitude*Math.PI/180;

	// get y value
	var mercN = Math.log(Math.tan((Math.PI/4)+(latRad/2)));
	var y     = (mapHeight/2)-(mapWidth*mercN/(2*Math.PI));
	console.log("y =" +y);
	
	//Clone Star image and place it in the correct location
	var newStar = $("#marker")
	.clone()
	.css('top', y -32+ 'px')
	.css('left', x  + 'px')
	.css('position', 'absolute')
	.attr('data', newPicURL)
	.show();
	console.log(newPicURL);
	console.log("new star created");
	return newStar;
};


//AJAX call to instagram API
var happytest = $.ajax({
	url: "https://api.instagram.com/v1/tags/100happydays/media/recent?client_id=b8450f13c6f04d21b2d85661cc8a1923",
	data: {"filter": 'Willow'},
	dataType: "jsonp",
	type: "GET",
	})
	.done(function(happytest){
		console.log(happytest);
		// Below checks for images that have location coordiantes
		$.each(happytest.data, function(i, item){
			console.log(i);
			
			if (item.location === null) {
				console.log("null");
			} else {
				//if they have location coordinates, put star on map
				console.debug("else");
				i = new Star(+item.location.longitude, +item.location.latitude, item.images.low_resolution.url);
				latitude = +item.location.latitude;
				longitude = +item.location.longitude;
				newPicURL = item.images.low_resolution.url;
				$("#mapcontainer").prepend(createNewStar);
			
				//shows the corresponding pictures. I eventually want to display the picture when the star is clicked. 
				var showPic = function(){
					var Picture = item.images.low_resolution.url;
					div.append("<img src =" + Picture +">");
					};
				showPic(item);
			}
		});
	});
//display 
$("div#mapcontainer").on('click', 'img.star', function(event){
	event.preventDefault();
	console.log("click");
	console.log($(this));
	var newPic = $(this).data();
	console.log(newPic);
	$("#current_pic").css('background-color', 'white');
	});

	
});