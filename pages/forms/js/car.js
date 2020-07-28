var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');
var vehicleImg;
var file;

const carForm = document.querySelector("#vehicleForm");

fileButton.addEventListener('change', function(e){
  e.preventDefault();
  //get file
  file = e.target.files[0];
});

carForm.addEventListener('submit', (e) =>{
  e.preventDefault();

  var plateNo = document.getElementById('plate-no').value;
  var vehicleType = document.getElementById('vehicle-type').value;
  var model = document.getElementById('model').value;
  var paxInput = document.getElementById('pax-no').value;
  var paxNo = Number(paxInput);
  var status = document.getElementById('status').value;


  db.collection("vehicleTable").get().then(snapshot =>{
    setupVehicle(snapshot.docs);
  });

  const setupVehicle = (data) =>{
    var flag = 0;
    var y = 0;
    var json =`{"dataset": [`;
    var obj;
    data.forEach(setup => {
      vehicle = setup.data();

      if (y == data.length-1){
        json += JSON.stringify(vehicle);
      }else{
        json += JSON.stringify(vehicle)+",";
      }
      y++;
    });
    json += `]}`;

    obj = JSON.parse(json);
    console.log(y);
    if(y==0){
      //create storage ref
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
      var storeRef = storage.ref('vehicle_image/' + filename);

      //upload file
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
            vehicleImg = dlURL;

            db.collection('vehicleTable').add({

              plateNo: plateNo,
              vehicleType: vehicleType,
              model: model,
              paxNo: paxNo,
              status: status,
              vehicleImg: vehicleImg,

            }).then(function(docRef){
              db.collection('vehicleTable').doc(docRef.id).update({
                id: docRef.id
              });
              console.log("success")
              window.alert("Data added to Vehicle List");
            }).catch(function(error){
            // An error happened.
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert(errorMessage);
            });
          });
        }
      );

    }else{
      for( i = 0 ; i < y ; i++){
        if(plateNo == obj.dataset[i].plateNo){
          flag ++;
        }
      }
      if(flag==0){
        //create storage ref
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
        var storeRef = storage.ref('vehicle_image/'+filename);

        //upload file
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
              vehicleImg = dlURL;

              db.collection('vehicleTable').add({

                plateNo: plateNo,
                vehicleType: vehicleType,
                model: model,
                paxNo: paxNo,
                status: status,
                vehicleImg: vehicleImg,

              }).then(function(docRef){
                db.collection('vehicleTable').doc(docRef.id).update({
                  id: docRef.id
                });
                window.alert("Data added to Vehicle List");
                console.log("success")
              }).catch(function(error){
              // An error happened.
              var errorCode = error.code;
              var errorMessage = error.message;
              window.alert(errorMessage);
              });


            });
          }
        );
      }else{
        window.alert('Vehicle with Plate Number: ' + plateNo + ' already exist in the list');
      }
    }
  }


});
