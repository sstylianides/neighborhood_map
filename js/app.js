/**
* Create a model that stores the data
*/
var Places = [
	{
		name: 'Anaheim Brewery',
 		address: '336 S Anaheim Blvd, Anaheim, CA 92805'
	},
	{
		name: 'Barley Forge Brewery',
 		address: '2957 Randolph Ave, Costa Mesa, CA 92626'
	},
	{
		name: 'Bootleggers Brewery',
 		address: '130 S Highland Ave, Fullerton, CA 92832'
	},
	{
		name: 'Bottle Logic Brewing',
		address: '1072 N Armando St, Anaheim, CA 92806'
	},
	{
		name: 'Hoparazzi Brewing Co',
		address: '2910 E La Palma Ave, Anaheim, CA 92806'
	},
	{
		name: 'Noble Ale Works',
		address: '1621 S Sinclair St B, Anaheim, CA 92806'
	},
	{
		name: 'Phantom Ales',
		address: '1211 N Las Brisas St, Anaheim, CA 92806'
	},
	{
		name: 'Stereo Brewing',
		address: '950 S Vía Rodeo, Placentia, CA 92870'
	},
	{
		name: 'The Bruery',
		address: '717 Dunn Way, Placentia, CA 92870'
	},
	{
		name: 'Newport Beach Brewing Co',
		address: '2920 Newport Blvd, Newport Beach, CA 92663'
	},
	{
		name: 'Native Son Alehouse',
		address: '305 E 4th St #200, Santa Ana, CA 92701'
	}

];

/**
* Generate a random number for use in Yelp API Oauth.
*/
function generateNonce() {
	return (Math.floor(Math.random() * 1e12).toString());
}

/**
* Use Yelp API to search business information.
*/
function getYelpInfo(place) {
	var yelp_url = "https://api.yelp.com/v2/search";
	var consumer_secret = "tJuIiRK3ofSyGrUB0naeQy0urZ0";
	var token_secret = "HcGZLB5oXS6NbbDI0_WyoLTnqvI";

	// Create parameters that are used for Ajax request.
	var params = {
		oauth_consumer_key: "3F_BTxhDD_fmiPnp_lXagA",
		oauth_token: "tE27kYnJw1B0TT3kqBqZSiNQBOb2J1eH",
		oauth_signature_method: 'HMAC-SHA1',
		oauth_timestamp: Math.floor(Date.now()/1000),
		oauth_nonce: generateNonce(),
		oauth_version: '1.0',
		callback: 'cb',
		term: place.name,
		location: 'Orange County, CA',
		limit: 1
	}

	// Generate Oauth signature
	var encodedSignature = oauthSignature.generate('GET', yelp_url, params, consumer_secret, token_secret);
	params.oauth_signature = encodedSignature;

	// Perform an Ajax request
	$.ajax({
		url: yelp_url,
		data: params,
		cache: true,
		dataType: 'jsonp'
	}).done(function(data) {
		var phone = data.businesses[0].display_phone;
		var rating = data.businesses[0].rating_img_url;
		var snippet = data.businesses[0].snippet_text;
		var link = data.businesses[0].url;
		var category = data.businesses[0].categories[0][0];

		// Create info window that displays information of a place.
		var contentString = '<div><h3>'+ place.name + '</h3>'+
			'<p>'+ place.address + '</p>' +
            '<p><strong>Category: </strong>'+ category + '</p>'+
			'<p><strong>Phone: </strong>'+ phone + '</p>' +
			'<p><strong>Yelp Ratings: </strong>'+ '<img src="'+ rating + '"></p>' +
			'<p><strong>Reviews: </strong>'+ snippet +'<a href="'+ link + '">Read more</a></p>'+
			'</div>';
		infoWindow.setContent(contentString);
		infoWindow.open(map, place.marker);

	}).fail(function() {
		// Pop up window that alerts users if Yelp API failed to load.
		alert("Failed to load Yelp.");
	});
}

/**
* Create an infoWindow to display info and an array to store markers.
*/
var markers = [];
var map;
var infoWindow;

/**
* Handle error if Google map failed to load.
*/
function mapError() {
	alert("Failed to load Google Map.");
}

/**
* Initialize Google map.
*/
function initMap() {

	    map = new google.maps.Map(document.getElementById('map'), {
		center: google.maps.LatLng(33.4274, -117.6126),
		zoom: 11,
        mapTypeControl: false
         });

	infoWindow = new google.maps.InfoWindow();

	var geocoder = new google.maps.Geocoder();

	// Call geocodeAddress() on each place in the Places array.
	Places.forEach(function(place) {
		geocodeAddress(geocoder, map, place);
	});

	ko.applyBindings(new ViewModel());



}

/**
* geocodeAddress() converts addresses into geographic coordinates and place markers accordingly.
*/
function geocodeAddress(geocoder, resultsMap, place) {
	var address = place.address;
	var defaultIcon = makeMarkerIcon('0091ff');
	var highlightedIcon = makeMarkerIcon('FFFF24');

	geocoder.geocode({'address': address}, function(results, status) {
		if (status === 'OK') {
			resultsMap.setCenter(results[0].geometry.location);
			place.marker = new google.maps.Marker({
				map: resultsMap,
				animation: google.maps.Animation.DROP,
				icon: defaultIcon,
				position: results[0].geometry.location
			});

			// When a marker was clicked, Yelp API is called.
			google.maps.event.addListener(place.marker, 'click', function() {
				getYelpInfo(place);




			//changes marker color when you mousevoer the icon
			});
			google.maps.event.addListener(place.marker, 'mouseover', function() {
            	this.setIcon(highlightedIcon);
          	});
          	google.maps.event.addListener(place.marker, 'mouseout', function() {
          		this.setIcon(defaultIcon);
          	});

          	// closes the infoWindo when clicking anywhere on the map
          	google.maps.event.addListener(map, 'click', function() {
				infoWindow.close();
			});



			markers.push({
				name: place.name,
				marker: place.marker
			});


		} else {
			alert('Geocode was not successful for the following reason: ' + status);
		}
	});
}

function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerImage;
      }




/**
* Open marker info window when corresponding item was clicked.
*/
function clickedMarker(name) {
	markers.forEach(function(markerItem) {
		if (markerItem.name == name) {
			google.maps.event.trigger(markerItem.marker, 'click');
		}
	});
}

/**
* Create ViewModel.
*/
var ViewModel = function() {
	var self = this;

	this.filter = ko.observable("");

	// Filter places based on user input.
	this.filteredPlaces = ko.computed(function() {
		var filter = self.filter().toLowerCase();
		if (!filter) {
			Places.forEach(function(place) {
				if (place.marker) {
					place.marker.setVisible(true);
				}
			});
			return Places;
		} else {
			return ko.utils.arrayFilter(Places, function(place) {
		 		var match = place.name.toLowerCase().indexOf(filter) !== -1;
		 		if (match) {
		 			place.marker.setVisible(true);
		 		} else {
		 			place.marker.setVisible(false);
		 		}
		 		return match;
		 	});
		}
	});
};
