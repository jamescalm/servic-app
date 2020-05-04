//load form
function shiftForm(){
  //load driver
  db.collection('users').where('userTag','==','Driver').onSnapshot(snapshot =>{
    setupUser(snapshot.docs);
  })


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

    db.collection('shiftsTable').where('status','==','Pending').onSnapshot(snapshot =>{
      setupShifts(snapshot.docs);
    })

    const setupShifts = (data) =>{
      var z = 0;
      var json3 =`{"dataset": [`;
      var obj3;

      data.forEach(setup => {
        shiftsTable = setup.data();
        console.log(data.length);
        if (z == data.length-1){
          json3 += JSON.stringify(shiftsTable);
        }else{
          json3 += JSON.stringify(shiftsTable)+",";
        }
        z++;
      });
      json3 += `]}`;
      obj3 = JSON.parse(json3);
      console.log(obj)
      console.log(obj3)
      var driverName;
      for( i = 0 ; i < y ; i++){
        var flag = 0;
        for(k = 0; k < z; k++){
          var requestDate = document.getElementById('dateStart').value;
          var compareName = obj3.dataset[k].driverInfo.driverName == obj.dataset[i].name;

          var dateRef = new Date(requestDate);
          var dateFrom = new Date(obj3.dataset[k].shiftDate.from);
          var dateTo = new Date(obj3.dataset[k].shiftDate.to);
          var compDate = (dateRef <= dateTo)&&(dateRef >= dateFrom);

          var compare = compareName&&compDate;
          console.log(compareName,compDate);
          if(compare){
            flag = 1;
          }
        }
        if(flag == 0){
          const tr = `
          <option>${obj.dataset[i].name}</option>
          `;
          html += tr;

          document.getElementById("driverSelect").innerHTML = html;
          driverName = document.getElementById('driverSelect').value;
          if(obj.dataset[i].name == driverName){
            document.getElementById("licenseID").value = obj.dataset[i].licenseNo;
            document.getElementById("userID").value = obj.dataset[i].id;
            console.log(document.getElementById("userID").value)
          }
        }
      }
      document.getElementById("driverSelect").innerHTML = html;
    }
  }
}

function loadVehicle(){
  //load vehicle
  db.collection('vehicleTable').onSnapshot(snapshot =>{
    setupVehicle(snapshot.docs);
  })

  const setupVehicle = (data) =>{
    var x = 0;
    var json1 =`{"dataset": [`;
    var obj1;
    let html =' ';

    data.forEach(setup => {
      vehicle = setup.data();

      if (x == data.length-1){
        json1 += JSON.stringify(vehicle);
      }else{
        json1 += JSON.stringify(vehicle)+",";
      }
      x++;
    });
    json1 += `]}`;

    obj1 = JSON.parse(json1);
    console.log(obj1)

    db.collection('shiftsTable').where('status','==','Pending').onSnapshot(snapshot =>{
      setupShifts(snapshot.docs);
    })

    const setupShifts = (data) =>{
      var z = 0;
      var json2 =`{"dataset": [`;
      var obj2;

      data.forEach(setup => {
        shiftsTable = setup.data();
        console.log(data.length);
        if (z == data.length-1){
          json2 += JSON.stringify(shiftsTable);
        }else{
          json2 += JSON.stringify(shiftsTable)+",";
        }
        z++;
      });
      json2 += `]}`;
      obj2 = JSON.parse(json2);


      for( i = 0 ; i < x ; i++){
        var flag = 0;
        // if(z==0){
        //   const tr = `
        //   <option>${obj1.dataset[i].plateNo}</option>
        //   `;
        //   html += tr;
        //   document.getElementById("plateID").innerHTML = html;
        //
        //   var plate = document.getElementById('plateID').value;
        //   if(obj1.dataset[i].plateNo == plate){
        //     document.getElementById("vehicleType").value = obj1.dataset[i].vehicleType;
        //     document.getElementById("vehicleModel").value = obj1.dataset[i].model;
        //     document.getElementById("paxNo").value = obj1.dataset[i].paxNo;
        //     const img = `
        //       <img id="Img" src = '${obj1.dataset[i].vehicleImg}' style = "max-width: 100%; max-height: 100%;">
        //     `;
        //
        //     document.getElementById("vehicleImg").innerHTML = img;
        //   }
        // }
        for(k = 0; k < z; k++){
          var comparePlate = (obj1.dataset[i].plateNo==obj2.dataset[k].carInfo.plateNo);
          var requestDate = document.getElementById('dateStart').value;
          var dateRef = new Date(requestDate);
          var dateFrom = new Date(obj2.dataset[k].shiftDate.from);
          var dateTo = new Date(obj2.dataset[k].shiftDate.to);
          var compDate = (dateRef <= dateTo)&&(dateRef >= dateFrom);

          var requestTime = document.getElementById('timeStart').value;
          var requestTime1 = document.getElementById('timeEnd').value;
          var timeRef = new Date('01/01/2000'+' '+requestTime);
          var timeRef1 = new Date('01/01/2000'+' '+requestTime1);
          if(timeRef>=timeRef1){
            timeRef1 = new Date('01/02/2000'+' '+requestTime1);
          }
          var timeFrom = new Date('01/01/2000'+' '+obj2.dataset[k].shiftTime.from);
          var timeTo = new Date('01/01/2000'+' '+obj2.dataset[k].shiftTime.to);
          if(timeFrom>=timeTo){
            timeTo = new Date('01/02/2000'+' '+requestTime1);
          }
          var compTime = (timeRef < timeTo)&&(timeRef >= timeFrom);
          var compTime1 = (timeRef1 <= timeTo)&&(timeRef1 > timeFrom);
          var compTime2 = (timeRef <= timeFrom)&&(timeRef1 >= timeTo);
          var compareTime = compTime||compTime1||compTime2
          var compDateTime = compDate && compareTime;

          var compare1 = (comparePlate&&compDateTime)
          console.log(compare1)
          if(compare1){
            flag = 1;
          }
        }
        if(flag==0){
          const tr = `
          <option>${obj1.dataset[i].plateNo}</option>
          `;
          html += tr;
          document.getElementById("plateID").innerHTML = html;

          var plate = document.getElementById('plateID').value;
          if(obj1.dataset[i].plateNo == plate){
            document.getElementById("vehicleType").value = obj1.dataset[i].vehicleType;
            document.getElementById("vehicleModel").value = obj1.dataset[i].model;
            document.getElementById("paxNo").value = obj1.dataset[i].paxNo;
            document.getElementById("vehicleImg").src = obj1.dataset[i].vehicleImg;
          }
        }
      }
    }

  }
}

var setDate = document.getElementById('setDate');
setDate.addEventListener('click', (e) =>{
  e.preventDefault();
  var compstart = document.getElementById('dateStart').value == '';
  var compend = document.getElementById('dateEnd').value == '';
  if(!(compstart||compend)){
    document.getElementById('driverSelect').disabled = false;
    document.getElementById('timeStart').disabled = false;
    document.getElementById('timeEnd').disabled = false;
    document.getElementById('dayoff').disabled = false;
    document.getElementById('dutyType').disabled = false;
    document.getElementById('shiftType').disabled = false;
    document.getElementById('reliever').disabled = false;
    shiftForm();
    shiftTime();
    loadReliever();
  }else{
    document.getElementById('driverSelect').disabled = true;
    document.getElementById('timeStart').disabled = true;
    document.getElementById('timeEnd').disabled = true;
    document.getElementById('dayoff').disabled = true;
    document.getElementById('dutyType').disabled = true;
    document.getElementById('shiftType').disabled = true;
    document.getElementById('reliever').disabled = true;
  }

});

var setDriver = document.getElementById('setDriver');
setDriver.addEventListener('click', (e) =>{
  e.preventDefault();
  var comptimestart = document.getElementById('timeStart').value == '';
  var comptimeend = document.getElementById('timeEnd').value == '';
  var dutyType = document.getElementById('dutyType').value;
  if(!(comptimestart||comptimeend)){
    document.getElementById('plateID').disabled = false;
    document.getElementById('submitShift').disabled = false;
    if(dutyType == 'Assigned Duty'){
      loadVehicle()
    }
  }else{
    document.getElementById('plateID').disabled = true;
    document.getElementById('submitShift').disabled = true;
  }

});


//show driver info
function licenseShow(){
  var driverName = document.getElementById('driverSelect').value;
  db.collection('users').onSnapshot(snapshot =>{
    setupUser(snapshot.docs);
  })

  const setupUser = (data) =>{
    var y = 0;
    var json =`{"dataset": [`;
    var obj;
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
      if(obj.dataset[i].userTag == "Driver"){
        if(obj.dataset[i].name == driverName){
          document.getElementById("licenseID").value = obj.dataset[i].licenseNo;
          document.getElementById("userID").value = obj.dataset[i].id;
        }
      }
    }
  }
}
//show vehicle infos
function showVehicleDetails(){
  db.collection('vehicleTable').onSnapshot(snapshot =>{
    setupVehicle(snapshot.docs);
  })

  const vehicleList = document.querySelector('.vehicleTable');
  const setupVehicle = (data) =>{
    var x = 0;
    var json =`{"dataset": [`;
    var obj;
    let html =' ';

    data.forEach(setup => {
      vehicle = setup.data();

      if (x == data.length-1){
        json += JSON.stringify(vehicle);
      }else{
        json += JSON.stringify(vehicle)+",";
      }
      x++;
    });
    json += `]}`;

    obj = JSON.parse(json);
    console.log(obj)

    for( i = 0 ; i < x ; i++){

      var plate = document.getElementById('plateID').value;
      if(obj.dataset[i].plateNo == plate){
        document.getElementById("vehicleType").value = obj.dataset[i].vehicleType;
        document.getElementById("vehicleModel").value = obj.dataset[i].model;
        document.getElementById("paxNo").value = obj.dataset[i].paxNo;
        document.getElementById("vehicleImg").src = obj.dataset[i].vehicleImg;
      }

    }

  }
}
function loadReliever(){
  var dutyType = document.getElementById('dutyType').value;
  if(dutyType == 'Assigned Duty'){
    db.collection('shiftsTable').where('status','==','Pending').where('dutyType','==','Reliever Duty').onSnapshot(snapshot =>{
      setupShifts(snapshot.docs);
    })

    const setupShifts = (data) =>{
      var y = 0;
      var json =`{"dataset": [`;
      var obj;
      var html;

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
      for( i = 0 ; i < y ; i++){
        var dayoff = document.getElementById('dayoff').value;
        var compDayOff = obj.dataset[i].dayoff == dayoff;
        if(!compDayOff){
          const name = `
          <option>${obj.dataset[i].driverInfo.driverName}</option>
          `
          html += name
        }
      }
      document.getElementById("reliever").innerHTML = html;
    }
  }else{
    document.getElementById("reliever").value = '';
    document.getElementById("reliever").innerHTML = '';
  }
}
function shiftTime(){
  var shiftType = document.getElementById('shiftType').value;
  var n = shiftType.localeCompare('Day Shift')
  var htmlShift;
  if (n==0){
    htmlShift = `
    <option>06:00</option>
    <option>07:00</option>
    <option>08:00</option>
    <option>09:00</option>
    <option>10:00</option>
    <option>11:00</option>
    <option>12:00</option>
    <option>13:00</option>
    <option>14:00</option>
    <option>15:00</option>
    <option>16:00</option>
    <option>17:00</option>
    <option>18:00</option>
    `
  }else{
    htmlShift = `
    <option>18:00</option>
    <option>19:00</option>
    <option>20:00</option>
    <option>21:00</option>
    <option>22:00</option>
    <option>23:00</option>
    <option>00:00</option>
    <option>01:00</option>
    <option>02:00</option>
    <option>03:00</option>
    <option>04:00</option>
    <option>05:00</option>
    <option>06:00</option>
    `
  }
  document.getElementById("timeStart").innerHTML = htmlShift;
  document.getElementById("timeEnd").innerHTML = htmlShift;
}

//choosing different dayoffs
function chooseDayoff(){
  var dateData1 = document.getElementById('dateStart').value;
  var month1 = new Date(dateData1).getMonth()+1;
  var day1 = new Date(dateData1).getDate();
  var year1 = new Date(dateData1).getFullYear();
  var dateData2 = document.getElementById('dateEnd').value;
  var month2 = new Date(dateData2).getMonth()+1;
  var day2 = new Date(dateData2).getDate();
  var year2 = new Date(dateData2).getFullYear();
  var opt;
  console.log(day2)
  for(i = day1; i < day2; i++){
    var mm = ('0'+ month1).slice(-2);
    var dd = ('0'+ i).slice(-2);

    opt += `
    <option>${mm}/${dd}/${year1}</option>
    `

  }
  document.getElementById("dayoff").innerHTML = opt;
}

//multiple select
function test(){

  var x = document.querySelectorAll('#dayoff option:checked');
  var y = [];
  for(i = 0; i < x.length; i++){
    y.push(document.querySelectorAll('#dayoff option:checked')[i].innerHTML);
  }
  console.log(y);
}

//add data to shiftsTable
var submit = document.getElementById('submitShift');

submit.addEventListener('click', (e) =>{
  e.preventDefault();
  var driverName = document.getElementById('driverSelect').value;
  var licenseNo = document.getElementById('licenseID').value;
  var uid = document.getElementById("userID").value;
  var dateStart = document.getElementById('dateStart').value;
  var dateEnd = document.getElementById('dateEnd').value;
  var dutyType = document.getElementById('dutyType').value;
  var shiftType = document.getElementById('shiftType').value;
  var timeStart = document.getElementById('timeStart').value;
  var timeEnd = document.getElementById('timeEnd').value;
  var dayoff = document.getElementById('dayoff').value;
  var reliever = document.getElementById('reliever').value;
  var plateNo = document.getElementById('plateID').value;
  var vehicleType = document.getElementById('vehicleType').value;
  var vehicleModel = document.getElementById('vehicleModel').value;
  var paxNo = document.getElementById('paxNo').value;
  var paxInput = Number(paxNo);
  var vehicleImg = document.getElementById('vehicleImg').src;

  db.collection('shiftsTable').add({
    driverInfo: {
      driverName: driverName,
      licenseNo: licenseNo,
      driverID: uid,
      status: ''
    },
    shiftDate: {
      from: dateStart,
      to: dateEnd
    },
    dutyType: dutyType,
    shiftType: shiftType,
    shiftTime: {
      from: timeStart,
      to: timeEnd
    },
    dayoff: dayoff,
    reliever: reliever,
    carInfo:{
      plateNo: plateNo,
      vehicleType: vehicleType,
      model: vehicleModel,
      paxNo: paxInput,
      vehicleImg: vehicleImg
    },
    status: 'Pending'

  }).then(function(docRef){
      db.collection('shiftsTable').doc(docRef.id).update({
        id: docRef.id
      }).then(function(){
        window.alert("Data added to Shift List");
        location.reload()
      }).catch(function(error){
      // An error happened.
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert(errorMessage);
      });

  }).catch(function(error){
  // An error happened.
  var errorCode = error.code;
  var errorMessage = error.message;
  window.alert(errorMessage);
  });

});
