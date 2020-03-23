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
      <tr onclick='moreInfo()'>
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

function moreInfo(){
  $('#modal-xl').modal('show');
}
