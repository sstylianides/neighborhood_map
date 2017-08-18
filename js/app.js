//locations
var locations = [
          {title: "Anaheim Brewery", id: "4df90b6c7d8bc4754071ec40", location: {lat: 33.832752, lng: -117.912461}},
          {title: "Native Son Alehouse", id: "53cb1b75498e310834cb6030", location: {lat: 33.748257, lng: -117.865189}},
          {title: "Back Street Brewery", id: "4b6cc5c7f964a5205d532ce3", location: {lat: 33.800626, lng: -117.895979}},
          {title: "Barley Forge Brewery", id: "53deb8f1498ec09a274c4d61", location: {lat: 33.678782, lng: -117.887987}},
          {title: "Beachwood Brewing Taproom", id: "582e4dcb65e7c7635d4e6f61", location: {lat: 33.704465, lng: -117.995350}},
          {title: "Bootlegger's Brewery", id: "4b64d86ff964a5208ed42ae3", location: {lat: 33.869596, lng: -117.928426}},
          {title: "Bottle Logic Brewing", id: "52a7f795498e83ac59623f48", location: {lat: 33.849545, lng: -117.859775}},
          {title: "The Bruery", id: "4ff627bbe4b002d4d2f96e3a", location: {lat: 33.862120, lng: -117.880031}},
          {title: "Noble Ale Works", id: "4ccc94f1ee23a143e72920a8", location: {lat: 33.808483, lng: -117.882833}},
          {title: "Newport Beach Brewing Co", id: "42926e80f964a5201d241fe3", location: {lat: 33.614467, lng: -117.929811}},
          {title: "Stereo Brewing", id: "568a5627498e2d846515c546", location: {lat: 33.863208, lng: -117.819493}}
        ];


//calls FourSquare API
function fourSquare(marker) {
	var foursquare_url = "";
	var CLIENT_ID = "FQNQF5YAUGDBPI13XMVAEJF5TNFHM0G2AFLJPE1H5PIPR3ZR";
	var CLIENT_SECRET = "SY2BMP0Q23FRJU5CAE5A3WKOFDBM2MIATEDXCJU1GO2RN4EE";

for (var i = 0; i < locations.length; i++) {
          // Get the position from the location array.
          var lng = locations[i].location.lng;
          var lat = locations[i].location.lat;
      }




$.ajax({
	url: 'https://api.foursquare.com/v2/venues/' + marker.id,
	datatype: 'json',
	data: {client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        v: 20170809}

//output from data gathered from FourSquare
}).done(function(data) {


	var contentString = '<div><h3>'+ data.response.venue.name + '</h3></div>';
  contentString += '<div><strong>Foursquare Rating: '+ data.response.venue.rating + '</strong></div>';
  contentString += '<div><strong>Phone: ' + data.response.venue.contact.formattedPhone +'</strong></div>';
  contentString += '<div><strong>Address:  '+ data.response.venue.location.address + ', ' + data.response.venue.location.city + ', ' + data.response.venue.location.state + ' ' + data.response.venue.location.postalCode +'</strong></div>';
  contentString += '<div><strong>'+'</strong></div>';
		largeInfowindow.setContent(contentString);
		largeInfowindow.open(map, marker);
 });

}


var map;
var largeInfowindow;
      // Create a new blank array for all the listing markers.
        var markers = [];
        //initiate map
        function initMap() {
        // Constructor creates a new map - only center and zoom are required.
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 33.717471, lng: -117.831143},
          zoom: 11,
          //styles: styles,
          mapTypeControl: false
        });
        largeInfowindow = new google.maps.InfoWindow();
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
            id: locations[i].id
          });
          // Push the marker to our array of markers.
          markers.push(marker);
          locations[i].marker = marker;
        }
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
      // This function populates the infowindow when the marker is clicked. We'll only allow
      // one infowindow which will open at the marker that is clicked, and populate based
      // on that markers position.
    function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          // this is where I plug in foursquare API data to infowindow

          fourSquare(marker);
          //bounce marker
          bounce(marker);
          // fourSquare(brewery)
          // Make sure the marker property is cleared if the infowindow is closed.
          google.maps.event.addListener(map, 'click', function() {
            infowindow.close();

          });

          // infowindow.open(map, marker);
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

// makes marker bounce
function bounce(marker) {
  marker.setAnimation(google.maps.Animation.BOUNCE);
  setTimeout(function() {
      marker.setAnimation(null);
    }, 1400);
  }

//filter function with Kockout
var ViewModel = function() {
var self = this;
this.search = ko.observable('');
this.places = ko.computed(function() {
    var search_value_lowered = self.search().toLowerCase();
    if(search_value_lowered===""){
        locations.forEach(function(location){
            if(location.marker){
                location.marker.setVisible(true);
            }
        });
        return locations;
    } else{
        var filteredList = [];
        var found = [];
        locations.forEach(function(location){
            var location_name_lowered=location.title.toLowerCase();
            var similar = [];
            for(i=0; i<search_value_lowered.length;i++){
               if(search_value_lowered[i]===location_name_lowered[i]){
                    similar.push("1");
                }else{
                    similar.push("0");
                }
            }
            if(similar.indexOf("0")==-1){
                location.marker.setVisible(true);
                    filteredList.push(location);
                }else{
                    location.marker.setVisible(false);
                }
        });
        return filteredList;
    }
});
 this.doSomething = function(place) {
    //fourSquare API
    fourSquare(place.marker);
    //bounce marker
    bounce(place.marker);
};
};
ko.applyBindings(new ViewModel());