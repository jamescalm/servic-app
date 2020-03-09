buildtable()

function buildtable(){

  db.collection('vehicleTable').onSnapshot(snapshot =>{
    setupUser(snapshot.docs);
  })

  const vehicleList = document.querySelector('.vehicleTable');
  const setupUser = (data) =>{
    var y = 0;
    var json =`{"dataset": [`;
    var obj;
    let html =' ';

    data.forEach(setup => {
      vehicleTable = setup.data();

      if (y == data.length-1){
        json += JSON.stringify(vehicleTable);
      }else{
        json += JSON.stringify(vehicleTable)+",";
      }
      y++;
    });
    json += `]}`;
    obj = JSON.parse(json);

    for( i = 0 ; i < y ; i++){
      const tr = `
      <tr>
        <td>
          <div style ="height: 150px; width: 200px;">
            <img style ="max-height: 100%; max-width: 100%;"src = "${obj.dataset[i].vehicleImg}">
          </div>
        </td>
        <td>${obj.dataset[i].plateNo}</td>
        <td>${obj.dataset[i].vehicleType}</td>
        <td>${obj.dataset[i].model}</td>
        <td>${obj.dataset[i].paxNo}</td>
        <td>${obj.dataset[i].status}</td>

      </tr>
      `;
      html += tr;

    }
    document.getElementById("tablebody").innerHTML = html;

  }

}
