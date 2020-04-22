auth.onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
    updateProfile(user.email);
  } else {
    // No user is signed in.

  }
});

function updateProfile(a){
  
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
