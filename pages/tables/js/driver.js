buildtable()

function buildtable(){

  db.collection('users').onSnapshot(snapshot =>{
    setupUser(snapshot.docs);
  })

  const userlist = document.querySelector('.users');
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
      if(obj.dataset[i].userTag == "Driver"){
        const tr = `
        <tr>
          <td>${obj.dataset[i].name}</td>
          <td>${obj.dataset[i].licenseNo}</td>
          <td>${obj.dataset[i].department}</td>
          <td>${obj.dataset[i].email}</td>

        </tr>
        `;
        html += tr;
      }

    }
    document.getElementById("tablebody").innerHTML = html;

  }

}
