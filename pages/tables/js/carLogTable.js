buildtable();

function buildtable(){

  db.collection('carLogsTable').onSnapshot(snapshot =>{
    setupUser(snapshot.docs);
  })

  const setupUser = (data) =>{
    var y = 0;
    var json =`{"dataset": [`;
    var obj;
    let html =' ';

    data.forEach(setup => {
      carLogsTable = setup.data();

      if (y == data.length-1){
        json += JSON.stringify(carLogsTable);
      }else{
        json += JSON.stringify(carLogsTable)+",";
      }
      y++;
    });
    json += `]}`;
    obj = JSON.parse(json);
    console.log(obj)
    for( i = 0 ; i < y ; i++){
      const tr = `
      <tr onclick='moreInfo(this)'>
        <td>${obj.dataset[i].driverInfo.driverName}</td>
        <td>${obj.dataset[i].carInfo.plateNo}</td>
        <td>
          ${obj.dataset[i].logDate}<br>
        </td>
        <td>
          ${obj.dataset[i].logTime}<br>
        </td>
        <td>
          ${obj.dataset[i].mileage.startMileage}<br>
          ${obj.dataset[i].mileage.endMileage}
        </td>
        <td>
          ${obj.dataset[i].mileage.mileDiff}
        </td>
        <td>
          ${obj.dataset[i].fuel.fuelUsed}<br>
          ${obj.dataset[i].fuel.fuelTanked}
        </td>
        <td>
          ${obj.dataset[i].fuel.fuelType}
        </td>
        <td>
          PHP ${obj.dataset[i].fuel.fuelPrice}<br>
          PHP ${obj.dataset[i].fuel.fuelProduct}
        </td>
        <td hidden>${obj.dataset[i].id}</td>
      </tr>
      `;
      html += tr;

    }
    document.getElementById("tablebody").innerHTML = html;

  }

}

function moreInfo(a){
  $('#modal-xl').modal('show');
  var id = a.getElementsByTagName('TD')[9].innerHTML;
  console.log(id)

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
        document.getElementById('vehicleImg').src = obj1.dataset[i].vehicleImg;
      }
    }
  }

  db.collection('carLogsTable').where('id','==',id).onSnapshot(snapshot =>{
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
    document.getElementById('driverName').value = obj.dataset[0].driverInfo.driverName;
    document.getElementById('userID').value = obj.dataset[0].driverInfo.driverID;
    document.getElementById('licenseID').value = obj.dataset[0].driverInfo.licenseNo;

    document.getElementById('plateID').value = obj.dataset[0].carInfo.plateNo;
    document.getElementById('vehicleType').value = obj.dataset[0].carInfo.vehicleType;
    document.getElementById('vehicleModel').value = obj.dataset[0].carInfo.vehicleModel;
    document.getElementById('paxNo').value = obj.dataset[0].carInfo.paxNo;
    document.getElementById('vehicleImg').src = obj.dataset[0].carInfo.vehicleImg;

    document.getElementById('carLogRef').value = obj.dataset[0].carLogRef;
    document.getElementById('logDate').value = obj.dataset[0].logDate;
    document.getElementById('logTime').value = obj.dataset[0].logTime;
    document.getElementById('startMileage').value = obj.dataset[0].mileage.startMileage;
    document.getElementById('startMileageURL').value = obj.dataset[0].mileage.startMileageURL;
    document.getElementById('startMileageImg').src = obj.dataset[0].mileage.startMileageURL;
    document.getElementById('endMileage').value = obj.dataset[0].mileage.endMileage;
    document.getElementById('endMileageURL').value = obj.dataset[0].mileage.endMileageURL;
    document.getElementById('endMileageImg').src = obj.dataset[0].mileage.endMileageURL;
    document.getElementById('mileDiff').value = obj.dataset[0].mileage.mileDiff;
    document.getElementById('liters').value = obj.dataset[0].fuel.fuelUsed;
    document.getElementById('fuelTanked').value = obj.dataset[0].fuel.fuelTanked;
    document.getElementById('fuelType').value = obj.dataset[0].fuel.fuelType;
    document.getElementById('fuelPrice').value = obj.dataset[0].fuel.fuelPrice;
    document.getElementById('fuelTotal').value = obj.dataset[0].fuel.fuelProduct;
    document.getElementById('recieptImg').src = obj.dataset[0].fuel.fuelRecieptURL;

  }
}

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
        document.getElementById("vehicleImg").src= obj.dataset[i].vehicleImg;
      }

    }

  }
}
