// register
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
       profileImg: 'https://firebasestorage.googleapis.com/v0/b/finalapp-c0ad4.appspot.com/o/profileImages%2FemptyProfile.png?alt=media&token=c694c17f-9bfa-497d-a864-4b1e1cbfabdf',
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
