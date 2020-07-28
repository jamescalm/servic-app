
buildTable();
buildtable1();

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
      <tr  onclick = 'mapRoute(this)'>
        <td>
          ${obj.dataset[i].shiftInfo.driverInfo.driverName}<br>
          ${obj.dataset[i].shiftInfo.carInfo.plateNo}
        </td>
        <td>${obj.dataset[i].requestInfo.requesteeInfo.name}<br>
        ${obj.dataset[i].requestInfo.requesteeInfo.department}</td>
        <td>${obj.dataset[i].requestInfo.paxNo}</td>
        <td>
          ${obj.dataset[i].requestInfo.requestDate.from}<br>
          ${obj.dataset[i].requestInfo.requestDate.to}
        </td>
        <td>
          ${obj.dataset[i].requestInfo.requestTime.from}<br>
          ${obj.dataset[i].requestInfo.requestTime.to}
        </td>
        <td style ='width: 40%;'>
          <b>From: </b> ${obj.dataset[i].requestInfo.destinationFrom.location}<br>
          <b>To: </b>${obj.dataset[i].requestInfo.destinationTo.location}
        </td>
        <td hidden>${obj.dataset[i].requestInfo.destinationFrom.latitude}</td>
        <td hidden>${obj.dataset[i].requestInfo.destinationFrom.longitude}</td>
        <td hidden>${obj.dataset[i].requestInfo.destinationTo.latitude}</td>
        <td hidden>${obj.dataset[i].requestInfo.destinationTo.longitude}</td>
        <td hidden>${obj.dataset[i].id}</td>

        </tr>
        `;
        html += tr;
      }

    }
    document.getElementById("tablebody").innerHTML = html;


    //print total schedule
    document.getElementById('scheduleTotal').innerHTML = y;
    //print complete schedule
    var complete = 0;
    for( j = 0 ; j < y ; j++){
      if(obj.dataset[j].status == 'Complete'){
        complete ++;
      }
    }
    document.getElementById('scheduleComplete').innerHTML = complete;
    //print pending schedule
    var pending = 0;
    for( k = 0 ; k < y ; k++){
      if(obj.dataset[k].status == 'Pending'){
        pending ++;
      }
    }
    document.getElementById('schedulePending').innerHTML = pending;
    //print pending schedule
    var cancel = 0;
    for( l = 0 ; l < y ; l++){
      if(obj.dataset[l].status == 'Canceled'){
        cancel ++;
      }
    }
    document.getElementById('scheduleCancel').innerHTML = cancel;
    //print schedule table
    document.getElementById("tablebody").innerHTML = html;



  }
}

function mapRoute(a){
  map1 = new google.maps.Map(document.getElementById('map'));
  var fromLat = a.getElementsByTagName('td')[6].innerHTML;
  var fromLng = a.getElementsByTagName('td')[7].innerHTML;
  var toLat = a.getElementsByTagName('td')[8].innerHTML;
  var toLng = a.getElementsByTagName('td')[9].innerHTML;

  var fromLat1 = Number(fromLat);
  var fromLng1 = Number(fromLng);
  var toLat1 = Number(toLat);
  var toLng1 = Number(toLng);

  var directionDisplay = new google.maps.DirectionsRenderer();
  var directionService = new google.maps.DirectionsService();
  directionDisplay.setMap(map1);

  var pickLoc = new google.maps.LatLng(fromLat1,fromLng1);
  var destLoc = new google.maps.LatLng(toLat1,toLng1);

  var request = {
    origin: pickLoc,
    destination: destLoc,
    travelMode: google.maps.TravelMode.DRIVING
  };

  directionService.route(request, function(result,status){
    if(status == google.maps.DirectionsStatus.OK){
      directionDisplay.setDirections(result);
    }
  });
}



function buildtable1(){

  db.collection('shiftsTable').where('status','==','Pending').onSnapshot(snapshot =>{
    setupShifts(snapshot.docs);
  })

  const shiftList = document.querySelector('.shiftsTable');
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

    for( i = 0 ; i < y ; i++){
      const tr = `
      <tr>
        <td>${obj.dataset[i].driverInfo.driverName}</td>
        <td>${obj.dataset[i].carInfo.plateNo}</td>
        <td>
          <div style ="height: 150px; width: 150px;">
            <img style ="max-height: 100%; max-width: 100%;"src = "${obj.dataset[i].carInfo.vehicleImg}">
          </div>
        </td>
        <td>
          ${obj.dataset[i].shiftDate.from}<br>
          ${obj.dataset[i].shiftDate.to}
        </td>

        <td>
          ${obj.dataset[i].shiftTime.from}<br>
          ${obj.dataset[i].shiftTime.to}
        </td>
        <td>${obj.dataset[i].dayoff}</td>

      </tr>
      `;
      html += tr;

    }
    document.getElementById("tablebody1").innerHTML = html;

  }

}

var updateShift = document.getElementById('updateShift');
updateShift.addEventListener('click', update, false);
function update(e){
  e.preventDefault();
  db.collection('shiftsTable').where('status','==','Pending').onSnapshot(snapshot =>{
    setupShifts(snapshot.docs);
  })

  const setupShifts = (data) =>{
    var y = 0;
    var json =`{"dataset": [`;
    var obj;

    data.forEach(setup => {
      shiftsTable = setup.data();
      console.log(data.length);
      if (y == data.length-1){
        json += JSON.stringify(shiftsTable);
      }else{
        json += JSON.stringify(shiftsTable)+",";
      }
      y++;
    });
    json += `]}`;
    obj = JSON.parse(json);
    console.log(obj)
    for(i = 0 ; i < y ; i++){
      var dateRef = new Date();
      var dateFrom = new Date(obj.dataset[i].shiftDate.from);
      var dateTo = new Date(obj.dataset[i].shiftDate.to);
      var compDate = (dateRef <= dateTo)&&(dateRef >= dateFrom);
      if(!compDate){
        db.collection('shiftsTable').doc(obj.dataset[i].id).update({
          status: "Done"
        }).then(function(docRef){
          console.log("success")
        }).catch(function(error){
          // An error happened.
          var errorCode = error.code;
          var errorMessage = error.message;
          window.alert(errorMessage);
        });
      }
    }
  }
}
