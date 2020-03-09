shiftForm();
//load form
function shiftForm(){
  //load driver
  db.collection('users').onSnapshot(snapshot =>{
    setupUser(snapshot.docs);
  })

  const userlist = document.querySelector('.users');
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
      if(obj.dataset[i].userTag == "Driver"){
        const tr = `
        <option>${obj.dataset[i].name}</option>
        `;
        html += tr;
      }
      document.getElementById("driverSelect").innerHTML = html;
      var driverName = document.getElementById('driverSelect').value;
      if(obj.dataset[i].name == driverName){
        document.getElementById("licenseID").value = obj.dataset[i].licenseNo;
        document.getElementById("userID").value = obj.dataset[i].id;
        console.log(document.getElementById("userID").value)
      }
    }

  }

  //load vehicle
  db.collection('vehicleTable').onSnapshot(snapshot =>{
    setupVehicle(snapshot.docs);
  })
  var x = 0;
  var json1 =`{"dataset": [`;
  var obj1;
  const vehicleList = document.querySelector('.vehicleTable');
  const setupVehicle = (data) =>{

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

    for( i = 0 ; i < x ; i++){
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
        const img = `
          <img id="Img" src = '${obj1.dataset[i].vehicleImg}' style = "max-width: 100%; max-height: 100%;">
        `;

        document.getElementById("vehicleImg").innerHTML = img;
      }
    }

  }

}

//show driver info
function licenseShow(){
  var driverName = document.getElementById('driverSelect').value;
  db.collection('users').onSnapshot(snapshot =>{
    setupUser(snapshot.docs);
  })
  var y = 0;
  var json =`{"dataset": [`;
  var obj;
  const userlist = document.querySelector('.users');
  const setupUser = (data) =>{

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
  var x = 0;
  var json =`{"dataset": [`;
  var obj;
  const vehicleList = document.querySelector('.vehicleTable');
  const setupVehicle = (data) =>{

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
        const img = `
          <img id="Img" src = '${obj.dataset[i].vehicleImg}' style = "max-width: 100%; max-height: 100%;">
        `;

        document.getElementById("vehicleImg").innerHTML = img;
      }

    }

  }
}
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

submit.addEventListener('submit', (e) =>{
  e.preventDefault();
  console.log()
  var driverName = document.getElementById('driverSelect').value;
  var licenseNo = document.getElementById('licenseID').value;
  var uid = document.getElementById("userID").value;
  console.log(uid)
  var dateStart = document.getElementById('dateStart').value;
  var dateEnd = document.getElementById('dateEnd').value;
  var timeStart = document.getElementById('timeStart').value;
  var timeEnd = document.getElementById('timeEnd').value;
  var x = document.querySelectorAll('#dayoff option:checked');
  var y = [];
  for(i = 0; i < x.length; i++){
    y.push(document.querySelectorAll('#dayoff option:checked')[i].innerHTML);
  }
  var plateNo = document.getElementById('plateID').value;
  var vehicleType = document.getElementById('vehicleType').value;
  var vehicleModel = document.getElementById('vehicleModel').value;
  var paxNo = document.getElementById('paxNo').value;
  var paxInput = Number(paxNo);
  var vehicleImg = document.getElementById('Img').src;

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
    shiftTime: {
      from: timeStart,
      to: timeEnd
    },
    dayoff: y,
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
      })
      document.getElementById('dateStart').value = "";
      document.getElementById('dateEnd').value = "";
      document.getElementById('timeStart').value = "";
      document.getElementById('timeEnd').value = "";
      document.getElementById('plateID').value = "";

      window.alert("Data added to Shift List");
  }).catch(function(error){
  // An error happened.
  var errorCode = error.code;
  var errorMessage = error.message;
  window.alert(errorMessage);
  });

});
