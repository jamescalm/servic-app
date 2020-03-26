buildTable();
function buildTable(){
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
    for( i = 0 ; i < y ; i++){
      const tr = `
      <tr>
        <td>${obj.dataset[i].requesteeInfo.name}</td>
        <td>${obj.dataset[i].requesteeInfo.department}</td>
        <td>${obj.dataset[i].paxNo}</td>
        <td>
          ${obj.dataset[i].requestDate.from}<br>
          ${obj.dataset[i].requestDate.to}
        </td>
        <td>
          ${obj.dataset[i].requestTime.from}<br>
          ${obj.dataset[i].requestTime.to}
        </td>
        <td style ='width: 25%;'>
          <b>From: </b> ${obj.dataset[i].destinationFrom.location}<br>
          <b>To: </b>${obj.dataset[i].destinationTo.location}
        </td>
        <td style ='width: 20%;'>${obj.dataset[i].purpose}</td>
        <td hidden>${obj.dataset[i].id}</td>

      </tr>
      `;
      html += tr;
    }
    document.getElementById("tablebody").innerHTML = html;
  }

  db.collection('requestDailyTable').where('status','==','Approved').onSnapshot(snapshot =>{
    setupRequest1(snapshot.docs);
  });
  var x;
  var json1;
  var obj1;
  const setupRequest1 = (data) =>{
    json1 =`{"dataset": [`;
    x = 0;
    let html =' ';
    data.forEach(setup => {
      request = setup.data();

      if (x == data.length-1){
        json1 += JSON.stringify(request);
      }else{
        json1 += JSON.stringify(request)+",";
      }
      x++;
    });
    json1 += `]}`;

    obj1 = JSON.parse(json1);
    console.log(obj1);
    for( i = 0 ; i < x ; i++){
      const tr = `
      <tr onclick='moreInfo(this)'>
        <td>${obj1.dataset[i].requesteeInfo.name}</td>
        <td>${obj1.dataset[i].requesteeInfo.department}</td>
        <td>${obj1.dataset[i].paxNo}</td>
        <td>
          ${obj1.dataset[i].requestDate.from}<br>
          ${obj1.dataset[i].requestDate.to}
        </td>
        <td>
          ${obj1.dataset[i].requestTime.from}<br>
          ${obj1.dataset[i].requestTime.to}
        </td>
        <td style ='width: 25%;'>
          <b>From: </b> ${obj1.dataset[i].destinationFrom.location}<br>
          <b>To: </b>${obj1.dataset[i].destinationTo.location}
        </td>
        <td style ='width: 20%;'>${obj1.dataset[i].purpose}</td>
        <td hidden>${obj1.dataset[i].id}</td>

      </tr>
      `;
      html += tr;
    }
    document.getElementById("tablebody2").innerHTML = html;
  }
}
function moreInfo(a){
  $('#modal-xl').modal('show');
  var id = a.getElementsByTagName('TD')[7].innerHTML;
  console.log(id)

  db.collection('requestDailyTable').where('id','==',id).onSnapshot(snapshot =>{
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
    document.getElementById('requestID').value = obj.dataset[0].requestRef;
    document.getElementById('requesteename').value = obj.dataset[0].requesteeInfo.name;
    document.getElementById('requesteeID').value = obj.dataset[0].requesteeInfo.requesteeID;
    document.getElementById('department').value = obj.dataset[0].requesteeInfo.department;
    document.getElementById('paxNo').value = obj.dataset[0].paxNo;
    document.getElementById('dateStart').value = obj.dataset[0].requestDate.from;
    document.getElementById('dateEnd').value = obj.dataset[0].requestDate.to;
    document.getElementById('timeStart').value = obj.dataset[0].requestTime.from;
    document.getElementById('timeEnd').value = obj.dataset[0].requestTime.to;
    document.getElementById('googleSearchFrom').value = obj.dataset[0].destinationFrom.location;
    document.getElementById('fromLat').value = obj.dataset[0].destinationFrom.latitude;
    document.getElementById('fromLng').value = obj.dataset[0].destinationFrom.longitude;
    document.getElementById('googleSearchTo').value = obj.dataset[0].destinationTo.location;
    document.getElementById('toLat').value = obj.dataset[0].destinationTo.latitude;
    document.getElementById('toLat').value = obj.dataset[0].destinationTo.longitude;
    document.getElementById('purpose').value = obj.dataset[0].purpose;
  }
}
