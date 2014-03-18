$(document).ready( function() {
// GOOGLE API not being used. var API_KEY = "AIzaSyARbPin6u7cRfs1dyqXZemAWs3f-btI3m0"; //googlemaps
//instagram "https://api.instagram.com/v1/tags/100happydays/media/recent?access_token=ACCESS-TOKEN",
var client_id = "b8450f13c6f04d21b2d85661cc8a1923";

//This prototype is not being used yet. 
//function Star(longitude, latitude, url) {
//	this.longitude = longitude;
//	this.latitude = latitude;
//	this.url = url;
//}
// end of prototype




//Declare Variables
var latitude = 0; // (φ)
var longitude = 0;   // (λ)
var newPicURL;
var caption;
var x;
var y;
var div = $('.container');
var mapWidth    = 550;
var mapHeight   = 550;


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
	.css('top', y -16+ 'px')
	.css('left', x  -16 + 'px')
	.css('position', 'absolute')
	.attr('data', newPicURL)
	.attr('data-caption', caption + " ")
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
				//i = new Star(+item.location.longitude, +item.location.latitude, item.images.low_resolution.url);
				latitude = +item.location.latitude;
				longitude = +item.location.longitude;
				newPicURL = item.images.low_resolution.url;
				if (item.caption.text !== null){
					caption = item.caption.text;
					}
				$("#mapcontainer").prepend(createNewStar);
	
			}
		});
	});
//display 
$("div#mapcontainer").on('click', 'img.star', function(event){
	event.preventDefault();
	console.log("click");
	console.log($(this).attr("data"));
	var newPic = $(this).attr("data");
	var newCaption = $(this).attr("data-caption");
	console.log(newPic);
	$("#current_pic").css('background-image', 'url('+newPic+')');
	$("#caption p").text(newCaption);
	});

$("#on").click(function(event){
	event.preventDefault();
	$(this)
	.css('background-color', '#9f7435')
	.css('color', '#FAFF91');
	$("#off")
	.css('background-color', '#FAFF91')
	.css('color', '#9f7435');
	$("#caption p")
	.css('color', '#9f7435');
});

$("#off").click(function(event){
	event.preventDefault();
	$(this)
	.css('background-color', '#9f7435')
	.css('color', '#FAFF91');
	$("#on")
	.css('background-color', '#FAFF91')
	.css('color', '#9f7435');
	$("#caption p")
	.css('color', '#FAFF91');
});





});