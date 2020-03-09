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
        <tr>
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
        <tr>
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
