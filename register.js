//register
const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener('submit', (e) =>{
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
       department: dept,
       email: email,
       phone: phone,
       password: pass,
       userTag: userTag,
       licenseNo: licenseNo,
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
  }else{
    document.getElementById('license-no').disabled = true;
  }
}
