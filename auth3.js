//log-checker
auth.onAuthStateChanged(user => {

  if (user) {
    // User is signed in.
    console.log('user logged in: ', user.email);
    var host = window.location.href
    console.log(host);
    var a = (host =='http://127.0.0.1:3000/index.html');
    var b = (host =='http://127.0.0.1:3000/');
    var x = (a||b);
    var z = (host =='http://127.0.0.1:3000/register.html');
    if(x || z){
      // window.location.href = 'home.html'
    }
  }

});
