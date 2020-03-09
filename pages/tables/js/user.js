buildtable()

function buildtable(){

  db.collection('users').onSnapshot(snapshot =>{
    setupUser(snapshot.docs);
  })
  var y = 0;
  var json =`{"dataset": [`;
  var obj;
  const userlist = document.querySelector('.users');
  const setupUser = (data) =>{
    y = 0;
    let html =' ';

    json =`{"dataset": [`;

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
      if(obj.dataset[i].userTag == "Client"||obj.dataset[i].userTag =="Admin"){
        const tr = `
        <tr>
          <td>${obj.dataset[i].name}</td>
          <td>${obj.dataset[i].department}</td>
          <td>${obj.dataset[i].userTag}</td>
          <td>${obj.dataset[i].email}</td>
        </tr>
        `;
        html += tr;
      }

    }
    document.getElementById("tablebody").innerHTML = html;

  }

}
