$(document).ready(function() {
  var icon_blue = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
  var icon_red = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
 	function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 13
        });
        // var infoWindow = new google.maps.InfoWindow({map: map});
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            // infoWindow.setPosition(pos);
            // infoWindow.setContent('Location found.');
            map.setCenter(pos);
            var marker = new google.maps.Marker({
                        icon: icon_red,
                        animation: google.maps.Animation.DROP,
                        position: new google.maps.LatLng(pos.lat,pos.lng),
                        map: map,
                        title: 'Nơi bắt đầu'
                    });

          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }
      setTimeout(function() {initMap()}, 1000);
});