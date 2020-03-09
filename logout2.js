//log-out
const logout = document.querySelector("#log-out");

logout.addEventListener('click', (e) => {
  e.preventDefault();

  auth.signOut().then(() => {
    window.location.replace("../index.html");
  }).catch(function(error){
  // An error happened.
  var errorCode = error.code;
  var errorMessage = error.message;
  window.alert(errorMessage);
  });
});
