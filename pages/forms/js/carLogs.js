auth.onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
    carLogForm(user.email);
  } else {
    // No user is signed in.

  }
});

function carLogForm(a){
  //get users form database
  db.collection('users').onSnapshot(snapshot =>{
    setupUser(snapshot.docs);
  })
  const userlist = document.querySelector('.users');
  //create json file
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
      if( a == obj.dataset[i].email){
        document.getElementById('driverName').value = obj.dataset[i].name;
        document.getElementById('userID').value = obj.dataset[i].id;
        document.getElementById('licenseID').value = obj.dataset[i].licenseNo;
      }
    }
  }
  db.collection('vehicleTable').onSnapshot(snapshot =>{
    setupVehicle(snapshot.docs);
  })
  var x = 0;
  var json1 =`{"dataset": [`;
  var obj1;
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
