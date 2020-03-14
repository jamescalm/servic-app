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
      <tr>
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
