buildtable();

function buildtable(){

  db.collection('overtimeTable').where('status','==','Pending').onSnapshot(snapshot =>{
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
    for( i = 0 ; i < y ; i++){
      const tr = `
      <tr onclick = 'moreInfo(this)'>
        <td>${obj.dataset[i].shiftInfo.driverInfo.driverName}</td>
        <td>${obj.dataset[i].shiftInfo.carInfo.plateNo}</td>
        <td>
          ${obj.dataset[i].shiftInfo.shiftDate.from}<br>
          ${obj.dataset[i].shiftInfo.shiftDate.to}
        </td>

        <td>
          ${obj.dataset[i].shiftInfo.shiftTime.from}<br>
          ${obj.dataset[i].shiftInfo.shiftTime.to}
        </td>
        <td>
          ${obj.dataset[i].overtimeInfo.overtimeDate}
        </td>
        <td>
          ${obj.dataset[i].overtimeInfo.overtime.from}<br>
          ${obj.dataset[i].overtimeInfo.overtime.to}
        </td>
        <td>
          ${obj.dataset[i].overtimeInfo.purpose}
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
  var id = a.getElementsByTagName('TD')[7].innerHTML;
  console.log(id)

  db.collection('overtimeTable').where('id','==',id).onSnapshot(snapshot =>{
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

    document.getElementById('requestNo').value = obj.dataset[0].overtimeRef;
    document.getElementById('date').value = obj.dataset[0].overtimeInfo.overtimeDate;
    document.getElementById('timeStart').value = obj.dataset[0].overtimeInfo.overtime.from;
    document.getElementById('timeEnd').value = obj.dataset[0].overtimeInfo.overtime.to;
    document.getElementById('purpose').value = obj.dataset[0].overtimeInfo.purpose;
  }
}
