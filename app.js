$(document).ready( function() {




var happytest = $.ajax({
	url: "https://api.instagram.com/v1/tags/100happydays/media/recent?access_token=ACCESS-TOKEN",
	dataType: "jsonp",
	type: "GET",
	})
	.done(function(happytest){
		console.debug("11");
		console.log(happytest);
		$.each(function(i, item){
			console.debug("13");
			var showPic = function(){
				var div = $('.container');
				var Picture = item.data.images.lowresolution;
				div.append(Picture);
			};
			showPic(item);
		});

		
	});








});