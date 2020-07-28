auth.onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
    profileInfo(user);
  } else {
    // No user is signed in.

  }
});

function profileInfo(a){
  //get users form database
  db.collection('users').where('email','==',a.email).onSnapshot(snapshot =>{
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
    document.getElementById('userName').innerHTML = obj.dataset[0].name;
    document.getElementById('email').innerHTML = obj.dataset[0].email;
    document.getElementById('profileImage').src = obj.dataset[0].profileImg;
  }
}
