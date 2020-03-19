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
  //get requests from database
  var x = 0;
  db.collection('vehicleLog').onSnapshot(snapshot =>{
    setupRequest(snapshot.docs);
  });
  //count number of request
  const setupRequest = (data) =>{
    x = 0;
    data.forEach(setup => {
      request = setup.data();

      x++;

    });
    var myVar = setInterval(myTimer, 1000);
    function myTimer(){
      var day = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      var hour = new Date().getHours();
      var min = new Date().getMinutes();
      var sec = new Date().getSeconds();
      var months = ('0'+ month).slice(-2);
      var days = ('0'+ day).slice(-2);
      var hrs = ('0'+ hour).slice(-2);
      var mins = ('0'+ min).slice(-2);
      var secs = ('0'+ sec).slice(-2);

      var carLogRef = months + '/' + days +'/' + year + ' ' + hrs + ':'+ mins + ':' + secs + ' '+'#'+ (x+1);
      document.getElementById('carLogRef').value = carLogRef;

      var carLogDate = months + '/' + days +'/' + year;
      document.getElementById('logDate').value = carLogDate;

      var carLogTime = hrs + ':'+ mins + ':' + secs;
      document.getElementById('logTime').value = carLogTime;
    }
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
        const img = `
          <img id="Img" src = '${obj.dataset[i].vehicleImg}' style = "max-width: 100%; max-height: 100%;">
        `;

        document.getElementById("vehicleImg").innerHTML = img;
      }

    }

  }
}
var sMileage =document.getElementById('sMileage');
var eMileage =document.getElementById('eMileage');
var file;
var file2;
sMileage.addEventListener('change', function(e){
  e.preventDefault();
  //get file
  file = e.target.files[0];
  console.log(file)
  document.getElementById('filename').innerHTML = file.name;
});
eMileage.addEventListener('change', function(e){
  e.preventDefault();
  //get file
  file2 = e.target.files[0];
  console.log(file2)
  document.getElementById('filename2').innerHTML = file2.name;
});
function uploadImg(a,b,c){
  // var file = sMileage.target.files[0];
  var day = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var yyyy = new Date().getFullYear();
  var hour = new Date().getHours();
  var min = new Date().getMinutes();
  var sec = new Date().getSeconds();
  var MM = ('0'+ month).slice(-2);
  var dd = ('0'+ day).slice(-2);
  var HH = ('0'+ hour).slice(-2);
  var mm = ('0'+ min).slice(-2);
  var ss = ('0'+ sec).slice(-2);
  var x;
  if(a.id =='sMileage'){
    x = file;
  }
  else if(a.id =='eMileage'){
    x = file2;
  }
  console.log(x)
  var filename = MM + dd + yyyy + HH + mm + ss + x.name;
  console.log(filename,a.id,b);
  var storeRef = storage.ref('vehicle_log/' + filename);

  var task = storeRef.put(x);

  //progress bars
  task.on('state_changed',
    function progress(snapshot){
      var percentage = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
      b.value = percentage;
    },
    function error(err){
      console.log(err);
    },
    function complete(){
      task.snapshot.ref.getDownloadURL().then(function(dlURL){
        document.getElementById(c.id).value = dlURL;
      });
    }
  );
}
