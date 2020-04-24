auth.onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
    changePassword(user.email);
  } else {
    // No user is signed in.

  }
});

function changePassword(a){
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
        document.getElementById('uid').value = obj.dataset[i].id;
      }
    }
  }
}


var update = document.getElementById('update');
update.addEventListener('click', updatepass, false);
function updatepass(e){
  e.preventDefault();
  var oldPass = document.getElementById('oldPass').value
  var newPass = document.getElementById('newPass').value
  var conPass = document.getElementById('conPass').value
  var uid = document.getElementById('uid').value

  db.collection('users').where('id','==',uid).get().then(snapshot =>{
    setupUser(snapshot.docs);
  })
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

    var n = oldPass.localeCompare(obj.dataset[0].password);
    if(n == 0){
      console.log(obj)
      var n1 = newPass.localeCompare(conPass);
      if(n1 == 0){
        window.alert("Are you sure you want to change your password?")

        var user = firebase.auth().currentUser;
        var credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            oldPass
        );

        // Prompt the user to re-provide their sign-in credentials

        user.reauthenticateWithCredential(credential).then(function() {
          // User re-authenticated.
          user.updatePassword(newPass).then(function() {
            // Update successful.
            db.collection('users').doc(uid).update({
              password: newPass
            }).then(function(docRef){
              window.alert("Password changed successfully");
              console.log("success")
            }).catch(function(error){
              // An error happened.
              var errorCode = error.code;
              var errorMessage = error.message;
              window.alert(errorMessage);
            });

          }).catch(function(error){
            // An error happened.
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert(errorMessage);
          });
        }).catch(function(error) {
          // An error happened.
          var errorCode = error.code;
          var errorMessage = error.message;
          window.alert(errorMessage);
        });

      }else{
        window.alert("Your password doesn't match")
      }
    }else{
      window.alert("The old password you entered is incorrect")
    }

  }
}
