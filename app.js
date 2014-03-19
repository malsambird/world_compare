$(document).ready( function() {

//Declare Variables
var latitude = 0; // (φ)
var longitude = 0;   // (λ)
var newPicURL;
var caption;
var x;
var y;
var mapWidth    = 550;
var mapHeight   = 550;

//Store info about API client ID access codes
//instagram "https://api.instagram.com/v1/tags/100happydays/media/recent?access_token=ACCESS-TOKEN",
var client_id = "b8450f13c6f04d21b2d85661cc8a1923";


// Function to create a new star with data attributes and to display it in the right location. 
var createNewStar = function (){
	//WARNING Complicated math below to make coordinates correspond with locations on the map
	//var x and var y will be used to place star in the correct location. 
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
	//Add data attributes to the star to store pic URL and caption
	var newStar = $("#marker")
	.clone()
	.css('top', y -16+ 'px')
	.css('left', x  -16 + 'px')
	.css('position', 'absolute')
	.attr('data', newPicURL)
	.attr('data-caption', caption)
	.addClass("star")
	.show();
	//debugging tools
	console.log(newPicURL);
	console.log("new star created");
	//
	return newStar;
};


//function to run AJAX
var runAJAX = function(){
	//AJAX call to instagram API that finds last 20 posts with #100happydays tag
	var happytest = $.ajax({
		url: "https://api.instagram.com/v1/tags/100happydays/media/recent?client_id=b8450f13c6f04d21b2d85661cc8a1923",
		data: {"filter": 'Willow'},
		dataType: "jsonp",
		type: "GET",
		})
	//after complete, find suitable images and make corresponding stars
	.done(function(happytest){
		console.log(happytest);
		// Check for images/items that have location coordiantes
		$.each(happytest.data, function(i, item){
			console.log(i);
			//if no location coordinates, no further actions
			if (item.location === null) {
				console.log("null");
			//else (they have location coordinates), put star on map
			} else {
				console.log("else");
				//save relevant item data to variables, so they can be accessed in other functions (ie createNewStar function)
				latitude = +item.location.latitude;
				longitude = +item.location.longitude;
				newPicURL = item.images.low_resolution.url;
				//if there is a caption, update var caption 
				if (item.caption.text !== null){
					caption = item.caption.text;
				} else {
					caption = "No caption";
				}
				// add New star to map through calling CreateNewStar function
				$("#mapcontainer").prepend(createNewStar);
			}
		});
	});
};

//Make initial AJAX call on page load
runAJAX();

//When star is clicked, get its data attributes and store as variables
//then display picture and caption
$("div#mapcontainer").on('click', 'img.star', function(event){
	event.preventDefault();
	var newPic = $(this).attr("data");
	var newCaption = $(this).attr("data-caption");
	$("#current_pic").css('background-image', 'url('+newPic+')');
	$("#caption p").text(newCaption);
	});

//Turning captions on (by changing caption font color)
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

//Turning captions off (by changing caption font color)
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

//Clicking "?" icon will display "more info" divs
$("#info").click(function(event){
	event.preventDefault();
	$("#explanationback").fadeIn('slow');
	$("#explanation").fadeIn('slow');
});

//Clicking "X" icon will hide "more info" divs
$("#exit").click(function(event){
	event.preventDefault();
	$("#explanationback").fadeOut('slow');
	$("#explanation").fadeOut('slow');
});

//Clicking "update happy map" button will remove old stars and run AJAX again
$("#update").click(function(event){
	event.preventDefault();
	$(".star").remove();
	runAJAX();
});

});