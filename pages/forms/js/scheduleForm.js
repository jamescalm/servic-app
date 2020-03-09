scheduleForm();
//load form
function scheduleForm(){
  //load request
  db.collection('requestDailyTable').where('status','==','Pending').onSnapshot(snapshot =>{
    setupRequest(snapshot.docs);
  });
  var y;
  var json;
  var obj;
  const setupRequest = (data) =>{
    json =`{"dataset": [`;
    y = 0;
    let html =' ';
    data.forEach(setup => {
      request = setup.data();

      if (y == data.length-1){
        json += JSON.stringify(request);
      }else{
        json += JSON.stringify(request)+",";
      }
      y++;
    });
    json += `]}`;

    obj = JSON.parse(json);
    console.log(obj);
    if(y == 0){
      document.getElementById("requestNo").innerHTML = '';
      document.getElementById("requesteename").innerHTML = '';
      document.getElementById("department").value = '';
      document.getElementById("requesteeID").value = '';
      document.getElementById("paxNo").value = '';
      document.getElementById("dateStart").value = '';
      document.getElementById("dateEnd").value = '';
      document.getElementById("timeStart").value = '';
      document.getElementById("timeEnd").value = '';
      document.getElementById("googleSearchFrom").value = '';
      document.getElementById("fromLat").value = '';
      document.getElementById("fromLng").value = '';
      document.getElementById("googleSearchTo").value = '';
      document.getElementById("toLat").value = '';
      document.getElementById("toLng").value = '';
      document.getElementById("purpose").value = '';
    }
    for( i = 0 ; i < y ; i++){
      const tr = `
      <option>${obj.dataset[i].requestRef}</option>
      `;
      html += tr;
      document.getElementById("requestNo").innerHTML = html;

      var requestID = document.getElementById('requestNo').value;
      if(obj.dataset[i].requestRef == requestID){
        document.getElementById("requesteename").value = obj.dataset[i].requesteeInfo.name;
        document.getElementById("department").value = obj.dataset[i].requesteeInfo.department;
        document.getElementById("requesteeID").value = obj.dataset[i].requesteeInfo.requesteeID;
        document.getElementById("paxNo").value = obj.dataset[i].paxNo;
        document.getElementById("dateStart").value = obj.dataset[i].requestDate.from;
        document.getElementById("dateEnd").value = obj.dataset[i].requestDate.to;
        document.getElementById("timeStart").value = obj.dataset[i].requestTime.from;
        document.getElementById("timeEnd").value = obj.dataset[i].requestTime.to;
        document.getElementById("googleSearchFrom").value = obj.dataset[i].destinationFrom.location;
        document.getElementById("fromLat").value = obj.dataset[i].destinationFrom.latitude;
        document.getElementById("fromLng").value = obj.dataset[i].destinationFrom.longitude;
        document.getElementById("googleSearchTo").value = obj.dataset[i].destinationTo.location;
        document.getElementById("toLat").value = obj.dataset[i].destinationTo.latitude;
        document.getElementById("toLng").value = obj.dataset[i].destinationTo.longitude;
        document.getElementById("purpose").value = obj.dataset[i].purpose;

        initMap(obj);
      }
    }
    loadShiftOnSelect();
  }



}
function initMap(obj){
  var fromLat1 = Number(obj.dataset[i].destinationFrom.latitude);
  var fromLng1 = Number(obj.dataset[i].destinationFrom.longitude);

  var toLat1 = Number(obj.dataset[i].destinationTo.latitude);
  var toLng1 = Number(obj.dataset[i].destinationTo.longitude);

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


function loadShiftOnSelect(){
  //load shift
  db.collection('shiftsTable').onSnapshot(snapshot =>{
    setupShift(snapshot.docs);
  });
  var flag = 0;
  var index;
  var x = 0;
  var json1;
  var obj1;
  const setupShift = (data) =>{
    json1 ='{"dataset": [';
    x = 0;
    let html ='';

    data.forEach(setup => {
      shift = setup.data();

      if (x == data.length-1){
        json1 += JSON.stringify(shift);
      }else{
        json1 += JSON.stringify(shift)+",";
      }
      x++;
    });
    json1 += `]}`;
    obj1 = JSON.parse(json1);

    for( i = 0 ; i < x ; i++){

      var requestDate = document.getElementById('dateStart').value;
      var dateRef = new Date(requestDate);
      var dateFrom = new Date(obj1.dataset[i].shiftDate.from);
      var dateTo = new Date(obj1.dataset[i].shiftDate.to);
      var compDate = (dateRef <= dateTo)&&(dateRef >= dateFrom);
      if(compDate){
        const tr = `
        <option>${obj1.dataset[i].driverInfo.driverName}</option>
        `;
        html += tr;
      }
      document.getElementById("driverName").innerHTML = html;

      var driverName = document.getElementById('driverName').value;
      var compName = obj1.dataset[i].driverInfo.driverName == driverName;
      console.log(compDate, compName)

      if(compName&&compDate){
        flag ++;
        index = i;
      }
    }
    console.log(obj1)
    if(flag > 0){
      document.getElementById("driverID").value = obj1.dataset[index].driverInfo.driverID;
      document.getElementById("licenseID").value = obj1.dataset[index].driverInfo.licenseNo;
      document.getElementById("shiftDateFrom").value = obj1.dataset[index].shiftDate.from;
      document.getElementById("shiftDateTo").value = obj1.dataset[index].shiftDate.to;
      document.getElementById("shiftTimeFrom").value = obj1.dataset[index].shiftTime.from;
      document.getElementById("shiftTimeTo").value = obj1.dataset[index].shiftTime.to;
      document.getElementById("dayoff").value = obj1.dataset[index].dayoff;
      document.getElementById("plateID").value = obj1.dataset[index].carInfo.plateNo;
      document.getElementById("vehicleType").value = obj1.dataset[index].carInfo.vehicleType;
      document.getElementById("vehicleModel").value = obj1.dataset[index].carInfo.model;
      document.getElementById("paxNoVehicle").value = obj1.dataset[index].carInfo.paxNo;
      document.getElementById("vehicleImg").src = obj1.dataset[index].carInfo.vehicleImg;
    }else{
      document.getElementById("driverID").value = '';
      document.getElementById("licenseID").value = '';
      document.getElementById("shiftDateFrom").value = '';
      document.getElementById("shiftDateTo").value = '';
      document.getElementById("shiftTimeFrom").value = '';
      document.getElementById("shiftTimeTo").value = '';
      document.getElementById("dayoff").value = '';
      document.getElementById("plateID").value = '';
      document.getElementById("vehicleType").value = '';
      document.getElementById("vehicleModel").value = '';
      document.getElementById("paxNoVehicle").value = '';
      document.getElementById("vehicleImg").src = '';
    }


  }

}
//load request when selected
function loadRequest(){
  db.collection('requestDailyTable').onSnapshot(snapshot =>{
    setupRequest(snapshot.docs);
  });
  //count number of
  var y = 0;
  var json =`{"dataset": [`;
  var obj;
  const setupRequest = (data) =>{
    y = 0;
    json =`{"dataset": [`;
    data.forEach(setup => {
      request = setup.data();

      if (y == data.length-1){
        json += JSON.stringify(request);
      }else{
        json += JSON.stringify(request)+",";
      }
      y++;
    });
    json += `]}`;

    obj = JSON.parse(json);
    console.log(obj);

    for( i = 0 ; i < y ; i++){

      var requestID = document.getElementById('requestNo').value;
      if(obj.dataset[i].requestRef == requestID){
        document.getElementById("requesteename").value = obj.dataset[i].requesteeInfo.name;
        document.getElementById("department").value = obj.dataset[i].requesteeInfo.department;
        document.getElementById("requesteeID").value = obj.dataset[i].requesteeInfo.requesteeID;
        document.getElementById("paxNo").value = obj.dataset[i].paxNo;
        document.getElementById("dateStart").value = obj.dataset[i].requestDate.from;
        document.getElementById("dateEnd").value = obj.dataset[i].requestDate.to;
        document.getElementById("timeStart").value = obj.dataset[i].requestTime.from;
        document.getElementById("timeEnd").value = obj.dataset[i].requestTime.to;
        document.getElementById("googleSearchFrom").value = obj.dataset[i].destinationFrom.location;
        document.getElementById("fromLat").value = obj.dataset[i].destinationFrom.latitude;
        document.getElementById("fromLng").value = obj.dataset[i].destinationFrom.longitude;
        document.getElementById("googleSearchTo").value = obj.dataset[i].destinationTo.location;
        document.getElementById("toLat").value = obj.dataset[i].destinationTo.latitude;
        document.getElementById("toLng").value = obj.dataset[i].destinationTo.longitude;
        document.getElementById("purpose").value = obj.dataset[i].purpose;

        initMap(obj);
      }
    }
    //change opotions when new request is selected
    loadShiftOnSelect()
  }





}
//load shifts
function loadShift(){
  //load shift
  db.collection('shiftsTable').onSnapshot(snapshot =>{
    setupShift(snapshot.docs);
  });
  var x = 0;
  var json1 =`{"dataset": [`;
  var obj1;
  const setupShift = (data) =>{
    x = 0;
    json1 =`{"dataset": [`;
    let html =' ';
    data.forEach(setup => {
      shift = setup.data();

      if (x == data.length-1){
        json1 += JSON.stringify(shift);
      }else{
        json1 += JSON.stringify(shift)+",";
      }
      x++;
    });
    json1 += `]}`;

    obj1 = JSON.parse(json1);
    console.log(obj1);

    for( i = 0 ; i < x ; i++){
      //get dates
      var requestDate = document.getElementById('dateStart').value;
      var dateRef = new Date(requestDate);
      var dateFrom = new Date(obj1.dataset[i].shiftDate.from);
      var dateTo = new Date(obj1.dataset[i].shiftDate.to);
      var compDate = (dateRef <= dateTo)&&(dateRef >= dateFrom);
      var driverName = document.getElementById('driverName').value;
      var compName = obj1.dataset[i].driverInfo.driverName == driverName;
      //compare date and name
      if(compName&&compDate){
        document.getElementById("driverID").value = obj1.dataset[i].driverInfo.driverID;
        document.getElementById("licenseID").value = obj1.dataset[i].driverInfo.licenseNo;
        document.getElementById("shiftDateFrom").value = obj1.dataset[i].shiftDate.from;
        document.getElementById("shiftDateTo").value = obj1.dataset[i].shiftDate.to;
        document.getElementById("shiftTimeFrom").value = obj1.dataset[i].shiftTime.from;
        document.getElementById("shiftTimeTo").value = obj1.dataset[i].shiftTime.to;
        document.getElementById("dayoff").value = obj1.dataset[i].dayoff;
        document.getElementById("plateID").value = obj1.dataset[i].carInfo.plateNo;
        document.getElementById("vehicleType").value = obj1.dataset[i].carInfo.vehicleType;
        document.getElementById("vehicleModel").value = obj1.dataset[i].carInfo.model;
        document.getElementById("paxNoVehicle").value = obj1.dataset[i].carInfo.paxNo;
        document.getElementById("vehicleImg").src = obj1.dataset[i].carInfo.vehicleImg;

      }

    }

  }
}



var submit = document.getElementById('submitSchedule');

submit.addEventListener('submit', (e) =>{
  e.preventDefault();
  var requestRef = document.getElementById('requestNo').value;
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

  var driverName = document.getElementById('driverName').value;
  var driverID = document.getElementById('driverID').value;
  var licenseNo = document.getElementById('licenseID').value;
  var shiftDateStart = document.getElementById('shiftDateFrom').value;
  var shiftDateEnd = document.getElementById('shiftDateTo').value;
  var shiftTimeStart = document.getElementById('shiftTimeFrom').value;
  var shiftTimeEnd = document.getElementById('shiftTimeTo').value;
  var dayoff = document.getElementById('dayoff').value;
  var plateNo = document.getElementById('plateID').value;
  var vehicleType = document.getElementById('vehicleType').value;
  var vehicleModel = document.getElementById('vehicleModel').value;
  var paxNo1 = document.getElementById('paxNoVehicle').value;
  var paxInput1 = Number(paxNo1);
  var vehicleImg = document.getElementById('vehicleImg').src;


  // var newDocument = db.collection('scheduleTable').document();

  db.collection('scheduleTable').add({
    requestInfo: {
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
      purpose: purpose
    },
    shiftInfo:{
      driverInfo: {
        driverName: driverName,
        licenseNo: licenseNo,
        driverID: driverID
      },
      shiftDate: {
        from: shiftDateStart,
        to: shiftDateEnd
      },
      shiftTime: {
        from: shiftTimeStart,
        to: shiftTimeEnd
      },
      dayoff: dayoff,
      carInfo:{
        plateNo: plateNo,
        vehicleType: vehicleType,
        model: vehicleModel,
        paxNo: paxInput1,
        vehicleImg: vehicleImg
      }
    },
    status: 'Pending',
    requestType: 'Daily'

  }).then(function(docRef){
      db.collection('scheduleTable').doc(docRef.id).update({
        id: docRef.id
      })
      db.collection('requestDailyTable').where('requestRef','==', requestRef).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (docRef) {

          db.collection('requestDailyTable').doc(docRef.id).update({
            status: 'Approved'
          }).then(function(){
            console.log('updated')
            scheduleForm();
            window.alert("Data added to schedule List");
          });
        })
      });

  }).catch(function(error){
  // An error happened.
  var errorCode = error.code;
  var errorMessage = error.message;
  window.alert(errorMessage);
  });
});
