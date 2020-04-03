buildTable()
function buildTable(){
  db.collection('scheduleTable').where('status','==','Pending').onSnapshot(snapshot =>{
    setupSchedule(snapshot.docs);
  });
  var y;
  var json;
  var obj;
  const setupSchedule = (data) =>{
    json =`{"dataset": [`;
    y = 0;
    let html =' ';
    data.forEach(setup => {
      schedule = setup.data();

      if (y == data.length-1){
        json += JSON.stringify(schedule);
      }else{
        json += JSON.stringify(schedule)+",";
      }
      y++;
    });
    json += `]}`;

    obj = JSON.parse(json);
    console.log(obj);
    for( i = 0 ; i < y ; i++){
      if(obj.dataset[i].requestType == 'Daily'){
        const tr = `
        <tr onclick='moreInfo(this)'>
          <td>
            ${obj.dataset[i].shiftInfo.driverInfo.driverName}<br>
            ${obj.dataset[i].shiftInfo.carInfo.plateNo}
          </td>
          <td>${obj.dataset[i].requestInfo.requesteeInfo.name}</td>
          <td>${obj.dataset[i].requestInfo.requesteeInfo.department}</td>
          <td>${obj.dataset[i].requestInfo.paxNo}</td>
          <td>
            ${obj.dataset[i].requestInfo.requestDate.from}<br>
            ${obj.dataset[i].requestInfo.requestDate.to}
          </td>
          <td>
            ${obj.dataset[i].requestInfo.requestTime.from}<br>
            ${obj.dataset[i].requestInfo.requestTime.to}
          </td>
          <td style ='width: 20%;'>
            <b>From: </b> ${obj.dataset[i].requestInfo.destinationFrom.location}<br>
            <b>To: </b>${obj.dataset[i].requestInfo.destinationTo.location}
          </td>
          <td style ='width: 15%;'>${obj.dataset[i].requestInfo.purpose}</td>
          <td hidden>${obj.dataset[i].id}</td>

        </tr>
        `;
        html += tr;
      }

    }
    document.getElementById("tablebody").innerHTML = html;

    var html1 = '';
    for( j = 0 ; j < y ; j++){
      if(obj.dataset[j].requestType == 'On Call'){
        const tr = `
        <tr onclick='moreInfo(this)'>
          <td>
            ${obj.dataset[j].shiftInfo.driverInfo.driverName}<br>
            ${obj.dataset[j].shiftInfo.carInfo.plateNo}
          </td>
          <td>${obj.dataset[j].requestInfo.requesteeInfo.name}</td>
          <td>${obj.dataset[j].requestInfo.requesteeInfo.department}</td>
          <td>${obj.dataset[j].requestInfo.paxNo}</td>
          <td>
            ${obj.dataset[j].requestInfo.requestDate.from}<br>
            ${obj.dataset[j].requestInfo.requestDate.to}
          </td>
          <td>
            ${obj.dataset[j].requestInfo.requestTime.from}<br>
            ${obj.dataset[j].requestInfo.requestTime.to}
          </td>
          <td style ='width: 25%;'>
            <b>From: </b> ${obj.dataset[j].requestInfo.destinationFrom.location}<br>
            <b>To: </b>${obj.dataset[j].requestInfo.destinationTo.location}
          </td>
          <td style ='width: 15%;'>${obj.datasetj[j].requestInfo.purpose}</td>
          <td hidden>${obj.dataset[j].id}</td>

        </tr>
        `;
        html += tr;
      }

    }
    document.getElementById("tablebody1").innerHTML = html1;
  }

}
function moreInfo(a){
  $('#modal-xl').modal('show');
  var id = a.getElementsByTagName('TD')[8].innerHTML;
  console.log(id)

  db.collection('scheduleTable').where('id','==',id).onSnapshot(snapshot =>{
    setupShifts(snapshot.docs);
  })
  const setupShifts = (data) =>{
    let html ='';
    var y = 0;
    var json =`{"dataset": [`;
    var obj;

    data.forEach(setup => {
      shiftsTable = setup.data();

      if (y == data.length-1){
        json += JSON.stringify(shiftsTable);
      }else{
        json += JSON.stringify(shiftsTable)+",";
      }
      y++;
    });
    json += `]}`;
    obj = JSON.parse(json);
    console.log(obj);
    document.getElementById('requestID').value = obj.dataset[0].requestInfo.requestRef;
    document.getElementById('requesteename').value = obj.dataset[0].requestInfo.requesteeInfo.name;
    document.getElementById('requesteeID').value = obj.dataset[0].requestInfo.requesteeInfo.requesteeID;
    document.getElementById('department').value = obj.dataset[0].requestInfo.requesteeInfo.department;
    document.getElementById('paxNo').value = obj.dataset[0].requestInfo.paxNo;
    document.getElementById('dateStart').value = obj.dataset[0].requestInfo.requestDate.from;
    document.getElementById('dateEnd').value = obj.dataset[0].requestInfo.requestDate.to;
    document.getElementById('timeStart').value = obj.dataset[0].requestInfo.requestTime.from;
    document.getElementById('timeEnd').value = obj.dataset[0].requestInfo.requestTime.to;
    document.getElementById('googleSearchFrom').value = obj.dataset[0].requestInfo.destinationFrom.location;
    document.getElementById('fromLat').value = obj.dataset[0].requestInfo.destinationFrom.latitude;
    document.getElementById('fromLng').value = obj.dataset[0].requestInfo.destinationFrom.longitude;
    document.getElementById('googleSearchTo').value = obj.dataset[0].requestInfo.destinationTo.location;
    document.getElementById('toLat').value = obj.dataset[0].requestInfo.destinationTo.latitude;
    document.getElementById('toLng').value = obj.dataset[0].requestInfo.destinationTo.longitude;
    document.getElementById('purpose').value = obj.dataset[0].requestInfo.purpose;

    document.getElementById('driverName').value = obj.dataset[0].shiftInfo.driverInfo.driverName;
    document.getElementById('licenseID').value = obj.dataset[0].shiftInfo.driverInfo.licenseNo;
    document.getElementById('driverID').value = obj.dataset[0].shiftInfo.driverInfo.driverID;

    document.getElementById('shiftDateFrom').value = obj.dataset[0].shiftInfo.shiftDate.from;
    document.getElementById('shiftDateTo').value = obj.dataset[0].shiftInfo.shiftDate.to;
    document.getElementById('shiftTimeFrom').value = obj.dataset[0].shiftInfo.shiftTime.from;
    document.getElementById('shiftTimeTo').value = obj.dataset[0].shiftInfo.shiftTime.to;
    document.getElementById('dayoff').value = obj.dataset[0].shiftInfo.dayoff;

    document.getElementById('plateID').value = obj.dataset[0].shiftInfo.carInfo.plateNo;
    document.getElementById('vehicleType').value = obj.dataset[0].shiftInfo.carInfo.vehicleType;
    document.getElementById('vehicleModel').value = obj.dataset[0].shiftInfo.carInfo.model;
    document.getElementById('paxNoVehicle').value = obj.dataset[0].shiftInfo.carInfo.paxNo;
    document.getElementById('vehicleImg').src = obj.dataset[0].shiftInfo.carInfo.vehicleImg;
    initMap();
  }

  function initMap(){
    var fromLat = document.getElementById('fromLat').value;
    var fromLat1 = Number(fromLat);
    var fromLng = document.getElementById('fromLng').value;
    var fromLng1 = Number(fromLng);

    var toLat = document.getElementById('toLat').value;
    var toLat1 = Number(toLat);
    var toLng = document.getElementById('toLng').value;
    var toLng1 = Number(toLng);


    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: toLat1, lng: toLng1},
      zoom: 14,

    });

    var directionDisplay = new google.maps.DirectionsRenderer();
    var directionService = new google.maps.DirectionsService();
    directionDisplay.setMap(map);

    var pickLoc = new google.maps.LatLng(fromLat1,fromLng1);
    var destLoc = new google.maps.LatLng(toLat1,toLng1);

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
