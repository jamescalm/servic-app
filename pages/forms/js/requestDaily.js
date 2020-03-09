auth.onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
    requestForm(user.email);
  } else {
    // No user is signed in.

  }
});

requestForm();
function requestForm(a){
  //get users form database
  db.collection('users').onSnapshot(snapshot =>{
    setupUser(snapshot.docs);
  })
  const userlist = document.querySelector('.users');
  //create json file
  const setupUser = (data) =>{
    var y = 0;
    var json =`{"dataset": [`;
    var obj;
    let html =' ';
    data.forEach(setup => {
      users = setup.data();

      if (y == data.length-1){
        json += JSON.stringify(users);
      }else{
        json += JSON.stringify(users)+",";
      }
      y++;
    });
    json += `]}`;

    obj = JSON.parse(json);

    for( i = 0 ; i < y ; i++){
      if( a == obj.dataset[i].email){
        document.getElementById('requesteename').value = obj.dataset[i].name;
        document.getElementById('department').value = obj.dataset[i].department;
        document.getElementById('requesteeID').value = obj.dataset[i].id;
      }
    }
  }

  //get requests from database
  var x = 0;
  db.collection('requestDailyTable').onSnapshot(snapshot =>{
    setupRequest(snapshot.docs);
  });
  //count number of request
  const setupRequest = (data) =>{
    x = 0;
    data.forEach(setup => {
      request = setup.data();

      x++;

    });
    var myVar = setInterval(myTimer, 1000);
    function myTimer(){
      var day = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      var hour = new Date().getHours();
      var min = new Date().getMinutes();
      var sec = new Date().getSeconds();
      var months = ('0'+ month).slice(-2);
      var days = ('0'+ day).slice(-2);
      var hrs = ('0'+ hour).slice(-2);
      var mins = ('0'+ min).slice(-2);
      var secs = ('0'+ sec).slice(-2);

      var requestNo = months + '/' + days +'/' + year + ' ' + hrs + ':'+ mins + ':' + secs + ' '+'#'+ (x+1);
      document.getElementById('requestID').value = requestNo;
    }
  }
}


//load map
var map;
function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 14.818727, lng: 120.279961},
    zoom: 13,

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
    map.setZoom(13);
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
    map.setZoom(13);
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
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionService.route(request, function(result,status){
      console.log(result)
      if(status == google.maps.DirectionsStatus.OK){
        directionDisplay.setDirections(result);
      }
    });
  }
}

//submit
var submit = document.getElementById('submitRequest');

submit.addEventListener('submit', (e) =>{
  e.preventDefault();

  var requestRef = document.getElementById('requestID').value;
  var name = document.getElementById('requesteename').value;
  var requesteeID = document.getElementById('requesteeID').value;
  var department = document.getElementById('department').value;
  var paxNo = document.getElementById('paxNo').value;
  var paxInput = Number(paxNo);
  var dateStart = document.getElementById('dateStart').value;
  var dateEnd = document.getElementById('dateEnd').value;
  var timeStart = document.getElementById('timeStart').value;
  var timeEnd = document.getElementById('timeEnd').value;
  var destFromAdd = document.getElementById('googleSearchFrom').value;
  var destFromLat = document.getElementById('fromLat').value;
  var destFromLng = document.getElementById('fromLng').value;
  var destToAdd = document.getElementById('googleSearchTo').value;
  var destToLat = document.getElementById('toLat').value;
  var destToLng = document.getElementById('toLng').value;
  var purpose = document.getElementById('purpose').value;

  db.collection('requestDailyTable').add({
    requestRef: requestRef,
    requesteeInfo:{
      name: name,
      department: department,
      requesteeID: requesteeID
    },
    paxNo: paxInput,
    requestDate: {
      from: dateStart,
      to: dateEnd
    },
    requestTime: {
      from: timeStart,
      to: timeEnd
    },
    destinationFrom: {
      location: destFromAdd,
      latitude: destFromLat,
      longitude: destFromLng
    },
    destinationTo: {
      location: destToAdd,
      latitude: destToLat,
      longitude: destToLng
    },
    purpose: purpose,
    status: 'Pending'

  }).then(function(docRef){

    db.collection('requestDailyTable').doc(docRef.id).update({
      id: docRef.id
    });
    document.getElementById('paxNo').value = '';

    document.getElementById('dateStart').value = '';
    document.getElementById('dateEnd').value = '';
    document.getElementById('timeStart').value = '';
    document.getElementById('timeEnd').value = '';
    document.getElementById('googleSearchFrom').value = '';
    document.getElementById('fromLat').value = '';
    document.getElementById('fromLng').value = '';
    document.getElementById('googleSearchTo').value = '';
    document.getElementById('toLat').value = '';
    document.getElementById('toLng').value = '';
    document.getElementById('purpose').value = '';
    window.alert("Data added to Request List");
    requestForm();


  }).catch(function(error){
  // An error happened.
  var errorCode = error.code;
  var errorMessage = error.message;
  window.alert(errorMessage);
  });
});
