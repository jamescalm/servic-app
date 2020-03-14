loadShift();
function loadShift(){
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
    console.log(obj1)
    for( i = 0 ; i < x ; i++){

      const tr = `
      <option>${obj1.dataset[i].driverInfo.driverName}</option>
      `;
      html += tr;

      document.getElementById("driverName").innerHTML = html;

      var driverName = document.getElementById('driverName').value;
      var compName = obj1.dataset[i].driverInfo.driverName == driverName;
      console.log(compName)

      if(compName){
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

  var x = 0;
  db.collection('overtimeTable').onSnapshot(snapshot =>{
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
      document.getElementById('requestNo').value = requestNo;
    }
  }
}

function loadShiftOnSelect(){
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

      var driverName = document.getElementById('driverName').value;
      var compName = obj1.dataset[i].driverInfo.driverName == driverName;
      //compare date and name
      if(compName){
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
    var timeStart = document.getElementById("shiftTimeTo").value;
    document.getElementById('timeStart').value = timeStart;

  }
}

var submit = document.getElementById('submitOvertime');

submit.addEventListener('submit', (e) =>{
  e.preventDefault();
  var dayoffSet = document.getElementById("dayoff").value;
  var dayoff = dayoffSet.split(',');
  var driverName = document.getElementById('driverName').value;
  var driverID = document.getElementById('driverID').value;
  var licenseNo = document.getElementById('licenseID').value;
  var shiftDateStart = document.getElementById('shiftDateFrom').value;
  var shiftDateEnd = document.getElementById('shiftDateTo').value;
  var shiftTimeStart = document.getElementById('shiftTimeFrom').value;
  var shiftTimeEnd = document.getElementById('shiftTimeTo').value;
  var plateNo = document.getElementById('plateID').value;
  var vehicleType = document.getElementById('vehicleType').value;
  var vehicleModel = document.getElementById('vehicleModel').value;
  var paxNo1 = document.getElementById('paxNoVehicle').value;
  var paxInput1 = Number(paxNo1);
  var vehicleImg = document.getElementById('vehicleImg').src;

  var overtimeRef = document.getElementById('requestNo').value;
  var overtimeDate = document.getElementById('date').value;
  var timeStart = document.getElementById('timeStart').value;
  var timeEnd = document.getElementById('timeEnd').value;
  var purpose = document.getElementById('purpose').value;
  db.collection('overtimeTable').add({
    overtimeRef: overtimeRef,
    overtimeInfo: {
      overtimeDate: overtimeDate ,
      overtime: {
        from: timeStart,
        to: timeEnd
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
      },

    },
    status: 'Pending'
  }).then(function(docRef){
      db.collection('overtimeTable').doc(docRef.id).update({
        id: docRef.id
      }).then(function(){
        window.alert("Data added to Overtime List");
        document.getElementById('date').value = '';
        document.getElementById('timeStart').value = '';
        document.getElementById('timeEnd').value = '';
        document.getElementById('purpose').value = '';
      })

  }).catch(function(error){
  // An error happened.
  var errorCode = error.code;
  var errorMessage = error.message;
  window.alert(errorMessage);
  });
});
