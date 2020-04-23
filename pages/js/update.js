auth.onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
    updateProfile(user.email);
  } else {
    // No user is signed in.

  }
});

function updateProfile(a){
  var user = firebase.auth().currentUser;
  console.log(user)
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
    console.log(obj)
    for( i = 0 ; i < y ; i++){
      if( a == obj.dataset[i].email){

        document.getElementById('signup-name').value = obj.dataset[i].name;
        document.getElementById('userID').value = obj.dataset[i].id;
        document.getElementById('profileImg').src = obj.dataset[i].profileImg;
        document.getElementById('department').value = obj.dataset[i].department;
        document.getElementById('userTag').value = obj.dataset[i].userTag;
        console.log(document.getElementById('userTag'))
        licenseHide();
        document.getElementById('license-no').value = obj.dataset[i].licenseNo;
        document.getElementById('driverType').value = obj.dataset[i].driverType;
        console.log(document.getElementById('driverType'))
        document.getElementById('phone-number').value = obj.dataset[i].phone;

      }
    }
  }
}

function licenseHide() {
  var userTag = document.getElementById('userTag').value;

  if(userTag == "Driver"){
    document.getElementById('license-no').disabled = false;
    document.getElementById('driverType').disabled = false;
    var option = `
      <option>Dispatcher</option>
      <option>Operations Driver</option>
      <option>Executive Driver</option>
      <option>Mechanic</option>
    `
    document.getElementById('driverType').innerHTML = option;
  }else{
    document.getElementById('license-no').disabled = true;
    document.getElementById('driverType').disabled = true;
    document.getElementById('driverType').innerHTML = "";
    document.getElementById('driverType').value = '';
  }
}

document.getElementById('fileButton').addEventListener('change', handleFileSelect, false);

function handleFileSelect(evt) {
    var files = evt.target.files;
    var f = files[0];
    var img = document.getElementById("profileImg");
    var reader = new FileReader();
    console.log(reader.result)
    reader.onloadend = function() {
       img.src = reader.result;
    }
    reader.readAsDataURL(f);
}


//upload img
var fileButton = document.getElementById('fileButton');
var uploader = document.getElementById('uploader');
var file;
fileButton.addEventListener('change', function(e){
  e.preventDefault();
  //get file
  file = e.target.files[0];
  console.log(file)
});
var update = document.getElementById('update');
update.addEventListener('click', uploadImg, false);
function uploadImg(e){
  e.preventDefault();
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

  var filename = MM + dd + yyyy + HH + mm + ss + file.name;
  console.log(filename);
  var storeRef = storage.ref('profileImages/' + filename);

  var task = storeRef.put(file);

  //progress bars
  task.on('state_changed',
    function progress(snapshot){
      var percentage = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
      uploader.value = percentage;
    },
    function error(err){
      console.log(err);
    },
    function complete(){
      task.snapshot.ref.getDownloadURL().then(function(dlURL){
        document.getElementById("profileURL").value = dlURL;
      });
    }
  );
}
