//load map
var map;
function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 14.818727, lng: 120.279961},
    zoom: 14,

  });

  var marker = new google.maps.Marker({
    position: {lat: 14.818727, lng: 120.279961},
    map: map,
    title: 'Teleempire',
    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
  });
  var marker1 = new google.maps.Marker({
    map: map,
    title: 'Teleempire',
    icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
  });

  var input = document.getElementById('googleSearchFrom');
  var autocomplete = new google.maps.places.Autocomplete(input);
  google.maps.event.addListener(autocomplete, 'place_changed', function(){
    var nearPlace = autocomplete.getPlace();
    document.getElementById('fromLat').value = nearPlace.geometry.location.lat();
    document.getElementById('fromLng').value = nearPlace.geometry.location.lng();
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(nearPlace.geometry.location);
    marker.setPosition(nearPlace.geometry.location);
    map.fitBounds(bounds);
    map.setZoom(14);
    calculateRoute();
  });

  var input1 = document.getElementById('googleSearchTo');
  var autocomplete1 = new google.maps.places.Autocomplete(input1);
  google.maps.event.addListener(autocomplete1, 'place_changed', function(){
    var nearPlace1 = autocomplete1.getPlace();
    document.getElementById('toLat').value = nearPlace1.geometry.location.lat();
    document.getElementById('toLng').value = nearPlace1.geometry.location.lng();
    var boundsTo = new google.maps.LatLngBounds();
    boundsTo.extend(nearPlace1.geometry.location);
    marker1.setPosition(nearPlace1.geometry.location);
    map.fitBounds(boundsTo);
    map.setZoom(14);
    calculateRoute();
  });
  var directionDisplay = new google.maps.DirectionsRenderer();
  var directionService = new google.maps.DirectionsService();
  directionDisplay.setMap(map);
  function calculateRoute(){

    var fromLat = document.getElementById('fromLat').value;
    var fromLatNum = Number(fromLat);
    var fromLng = document.getElementById('fromLng').value;
    var fromLngNum = Number(fromLng);
    var toLat = document.getElementById('toLat').value;
    var toLatNum = Number(toLat);
    var toLng = document.getElementById('toLng').value;
    var toLngNum = Number(toLng);
    var pickLoc = new google.maps.LatLng(fromLatNum,fromLngNum);
    var destLoc = new google.maps.LatLng(toLatNum,toLngNum);

    var request = {
      origin: pickLoc,
      destination: destLoc,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC
    };

    directionService.route(request, function(result,status){
      console.log(result)
      if(status == google.maps.DirectionsStatus.OK){
        console.log(result.routes[0].legs[0].distance)
        directionDisplay.setDirections(result);
      }
    });
  }
}


var resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', reset, false);
function reset(e){
  e.preventDefault();
  document.getElementById('googleSearchFrom').value = ''
  document.getElementById('fromLat').value = ''
  document.getElementById('fromLng').value = ''
  document.getElementById('googleSearchTo').value = ''
  document.getElementById('toLat').value = ''
  document.getElementById('toLng').value = ''
  initMap();
}
