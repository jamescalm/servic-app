// //upload img
// var fileButton = document.getElementById('fileButton');
// var uploader = document.getElementById('uploader');
// var file;
// fileButton.addEventListener('change', function(e){
//   e.preventDefault();
//   //get file
//   file = e.target.files[0];
//   console.log(file)
// });
// var imageUpload = document.getElementById('imageUpload');
// imageUpload.addEventListener('click', uploadImg, false);
// function uploadImg(e){
//   e.preventDefault();
//   var day = new Date().getDate();
//   var month = new Date().getMonth() + 1;
//   var yyyy = new Date().getFullYear();
//   var hour = new Date().getHours();
//   var min = new Date().getMinutes();
//   var sec = new Date().getSeconds();
//   var MM = ('0'+ month).slice(-2);
//   var dd = ('0'+ day).slice(-2);
//   var HH = ('0'+ hour).slice(-2);
//   var mm = ('0'+ min).slice(-2);
//   var ss = ('0'+ sec).slice(-2);
//
//   var filename = MM + dd + yyyy + HH + mm + ss + file.name;
//   console.log(filename);
//   var storeRef = storage.ref('profileImages/' + filename);
//
//   var task = storeRef.put(file);
//
//   //progress bars
//   task.on('state_changed',
//     function progress(snapshot){
//       var percentage = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
//       uploader.value = percentage;
//     },
//     function error(err){
//       console.log(err);
//     },
//     function complete(){
//       task.snapshot.ref.getDownloadURL().then(function(dlURL){
//         document.getElementById("profileURL").value = dlURL;
//       });
//     }
//   );
// }
//register
var register = document.getElementById("register");

register.addEventListener('click', (e) =>{
  e.preventDefault();

  var email = document.getElementById('signup-email').value;
  var pass = document.getElementById('signup-password').value;
  var conpass = document.getElementById('confirm-password').value;
  var fname = document.getElementById('signup-name').value;
  var dept = document.getElementById('department').value;
  var userTag = document.getElementById('user-tag').value;
  var licenseNo = document.getElementById('license-no').value;
  var phone = document.getElementById('phone-number').value;
  var n = pass.localeCompare(conpass);
  var driverType = document.getElementById('driverType').value;
  //confirm pass
  if(n == 0){
    //create user
    auth.createUserWithEmailAndPassword(email, pass).then(cred =>{
     console.log(cred)
     //adduser to database
     var user = firebase.auth().currentUser.uid;
     db.collection('users').doc(user).set({
       id: user,
       name: fname,
       profileImg: 'https://firebasestorage.googleapis.com/v0/b/finalapp-c0ad4.appspot.com/o/profileImages%2FemptyProfile.png?alt=media&token=aecc57a4-9ed4-42bc-b1b9-bfa5c8ec023d',
       department: dept,
       email: email,
       phone: phone,
       password: pass,
       userTag: userTag,
       licenseNo: licenseNo,
       driverType: driverType
     }).then(function(){
       alert('User successfully added');
       window.location.replace('home.html');
     }).catch(function(error){
     // An error happened.
     var errorCode = error.code;
     var errorMessage = error.message;
     window.alert(errorCode);
     });

    }).catch(function(error){
    // An error happened.
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert(errorMessage);
    });
  }else{
    //password mismatch
    window.alert("Password does not match");
  }


})

// document.getElementById('fileButton').addEventListener('change', handleFileSelect, false);
//
// function handleFileSelect(evt) {
//     var files = evt.target.files;
//     var f = files[0];
//     var img = document.getElementById("profileImg");
//     var reader = new FileReader();
//     console.log(reader.result)
//     reader.onloadend = function() {
//        img.src = reader.result;
//     }
//     reader.readAsDataURL(f);
// }

function licenseHide() {
  var userTag = document.getElementById('user-tag').value;

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
