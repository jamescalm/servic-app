buildtable()

function buildtable(){

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
    console.log(obj);
    for( i = 0 ; i < y ; i++){
      const tr = `
      <tr onclick = 'moreInfo(this)'>
        <td>${obj.dataset[i].driverInfo.driverName}</td>
        <td>${obj.dataset[i].carInfo.plateNo}</td>
        <td>
          <div style ="height: 100px; width: 100px;">
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
        <td id='tdet${i}'></td>
        <td hidden>${obj.dataset[i].id}</td>
      </tr>
      `;
      html += tr;


    }
    document.getElementById("tablebody").innerHTML = html;
    for(j =0; j < y; j++){
      var length = obj.dataset[j].dayoff.length;
      console.log(length)
      var td = ``;
      for(k = 0; k < length; k++){
        if(k == length - 1){
          td += `${obj.dataset[j].dayoff[k]}`
        }else{

          td += `${obj.dataset[j].dayoff[k]}<br>`
        }

      }
      document.getElementById(`tdet${j}`).innerHTML = td;
    }
  }

}

function moreInfo(a){

  $('#modal-xl').modal('show');
  var id = a.getElementsByTagName('TD')[6].innerHTML;
  console.log(id)

  db.collection('shiftsTable').where('id','==',id).onSnapshot(snapshot =>{
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
      <option>${obj.dataset[0].carInfo.plateNo}</option>
      `;
      html += tr;
    }
    document.getElementById("plateID").innerHTML = html;
    document.getElementById('driverName').value = obj.dataset[0].driverInfo.driverName;
    document.getElementById('licenseID').value = obj.dataset[0].driverInfo.licenseNo;
    document.getElementById('userID').value = obj.dataset[0].driverInfo.driverID;

    document.getElementById('dateStart').value = obj.dataset[0].shiftDate.from;
    document.getElementById('dateEnd').value = obj.dataset[0].shiftDate.to;
    document.getElementById('timeStart').value = obj.dataset[0].shiftTime.from;
    document.getElementById('timeEnd').value = obj.dataset[0].shiftTime.to;
    document.getElementById('dayoff').value = obj.dataset[0].dayoff;

    document.getElementById('plateID').value = obj.dataset[0].carInfo.plateNo;
    document.getElementById('vehicleType').value = obj.dataset[0].carInfo.vehicleType;
    document.getElementById('vehicleModel').value = obj.dataset[0].carInfo.model;
    document.getElementById('paxNo').value = obj.dataset[0].carInfo.paxNo;
    document.getElementById('vehicleImg').src = obj.dataset[0].carInfo.vehicleImg;


  }
}
