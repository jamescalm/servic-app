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
      <tr>
        <td>${obj.dataset[i].driverInfo.driverName}</td>
        <td>${obj.dataset[i].carInfo.plateNo}</td>
        <td>
          <div style ="height: 150px; width: 150px;">
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
        <td>${obj.dataset[i].dayoff}</td>

      </tr>
      `;
      html += tr;

    }
    document.getElementById("tablebody").innerHTML = html;

  }

}
