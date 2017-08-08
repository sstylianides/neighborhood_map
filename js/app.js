// function fourSquare(brewery) {
// 	var foursquare_url = "https://api.yelp.com/v2/search";
// 	var CLIENT_ID = "FQNQF5YAUGDBPI13XMVAEJF5TNFHM0G2AFLJPE1H5PIPR3ZR";
// 	var CLIENT_SECRET = "SY2BMP0Q23FRJU5CAE5A3WKOFDBM2MIATEDXCJU1GO2RN4EE";




// $.ajax({
// 	url: 'https://api.foursquare.com/v2/venues/explore?',
// 	datatype: 'json'
// 	data: 'll='+ locations[0].location +','+ locations[1].location +
//                 '&?client_id='+ CLIENT_ID +
//                 '&client_secret='+ CLIENT_SECRET +
//                 '&query=beer',

// });

// }

// var Places = [
// 	{
// 		name: 'Anaheim Brewery',
//  		address: '336 S Anaheim Blvd, Anaheim, CA 92805'
// 	},
// 	{
// 		name: 'Barley Forge Brewery',
//  		address: '2957 Randolph Ave, Costa Mesa, CA 92626'
// 	},
// 	{
// 		name: 'Bootleggers Brewery',
//  		address: '130 S Highland Ave, Fullerton, CA 92832'
// 	},
// 	{
// 		name: 'Bottle Logic Brewing',
// 		address: '1072 N Armando St, Anaheim, CA 92806'
// 	},
// 	{
// 		name: 'Hoparazzi Brewing Co',
// 		address: '2910 E La Palma Ave, Anaheim, CA 92806'
// 	},
// 	{
// 		name: 'Noble Ale Works',
// 		address: '1621 S Sinclair St B, Anaheim, CA 92806'
// 	},
// 	{
// 		name: 'Phantom Ales',
// 		address: '1211 N Las Brisas St, Anaheim, CA 92806'
// 	},
// 	{
// 		name: 'Stereo Brewing',
// 		address: '950 S Vía Rodeo, Placentia, CA 92870'
// 	},
// 	{
// 		name: 'The Bruery',
// 		address: '717 Dunn Way, Placentia, CA 92870'
// 	},
// 	{
// 		name: 'Newport Beach Brewing Co',
// 		address: '2920 Newport Blvd, Newport Beach, CA 92663'
// 	},
// 	{
// 		name: 'Native Son Alehouse',
// 		address: '305 E 4th St #200, Santa Ana, CA 92701'
// 	}

// ];

var map;
      // Create a new blank array for all the listing markers.
        var markers = [];
        function initMap() {
        // Constructor creates a new map - only center and zoom are required.
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 33.717471, lng: -117.831143},
          zoom: 10,
          //styles: styles,
          mapTypeControl: false
        });
        var locations = [
          {title: 'Anaheim Brewery', location: {lat: 33.832752, lng: -117.912461}},
          {title: 'Artifex Brewery', location: {lat: 33.449277, lng: -117.605670}},
          {title: 'Back Street Brewery', location: {lat: 33.800626, lng: -117.895979}},
          {title: 'Barley Forge Brewery', location: {lat: 33.678782, lng: -117.887987}},
          {title: 'Beachwood Brewing Taproom', location: {lat: 33.704465, lng: -117.995350}},
          {title: 'Bootlegger&#39s Brewery', location: {lat: 33.869596, lng: -117.928426}}
        ];
        var largeInfowindow = new google.maps.InfoWindow();
       // The following group uses the location array to create an array of markers on initialize.

        var defaultIcon = makeMarkerIcon('0091ff');
        var highlightedIcon = makeMarkerIcon('FFFF24');
        for (var i = 0; i < locations.length; i++) {
          // Get the position from the location array.
          var position = locations[i].location;
          var title = locations[i].title;
          // Create a marker per location, and put into markers array.
          var marker = new google.maps.Marker({
            position: position,
            title: title,
            map: map,
            icon: defaultIcon,
            animation: google.maps.Animation.DROP,
            id: i
          });
          // Push the marker to our array of markers.
          markers.push(marker);


          // Create an onclick event to open an infowindow at each marker.
          marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
          });
          marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
          });
          marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
          });
        }
      }
      // This function populates the infowindow when the marker is clicked. We'll only allow
      // one infowindow which will open at the marker that is clicked, and populate based
      // on that markers position.
    function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          // this is where I plug in foursquare API data to infowindow
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          google.maps.event.addListener(map, 'click', function() {
            infowindow.close();

          });

          infowindow.open(map, marker);
        }
      }
      // This function takes in a COLOR, and then creates a new marker
      // icon of that color. The icon will be 21 px wide by 34 high, have an origin
      // of 0, 0 and be anchored at 10, 34).
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
