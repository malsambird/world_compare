$(document).ready( function() {


console.log("startered");

var happytest = $.ajax({
	url: "https://api.instagram.com/v1/tags/100happydays/media/recent?client_id=b8450f13c6f04d21b2d85661cc8a1923",
	data: {"filter": 'Willow'},
	dataType: "jsonp",
	type: "GET",
	})
	.done(function(happytest){
		console.debug("11");
		console.log(happytest);
		$.each(happytest.data, function(i, item){
			console.debug("13");
			console.log(i);
			var showPic = function(){
				var div = $('.container');
				var Picture = item.images.low_resolution.url;
				div.append("<img src =" + Picture +">");
				console.log("got to 21");
			};
			showPic(item);
		});

		
	});

//"https://api.instagram.com/v1/tags/100happydays/media/recent?access_token=ACCESS-TOKEN",
var client_id = "b8450f13c6f04d21b2d85661cc8a1923";
//new google api key AIzaSyDQFaTMrBAaVCQcWr6e1suw9kSYw44cq40
//google API AIzaSyDPb7OwBHpTcv5N_rci1FcQZZiOPvrIZjQ





});