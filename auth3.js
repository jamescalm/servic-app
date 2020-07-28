//log-checker
auth.onAuthStateChanged(user => {

  if (user) {
    // User is signed in.
    console.log('user logged in: ', user.email);
    var host = window.location.href
    var hostsplit = host.split('/').pop();
    console.log(hostsplit);
    var a = (hostsplit =='');
    var b = (hostsplit =='index.html');
    var x = (a||b);
    var z = (hostsplit =='register.html');
    if(x || z){
      // window.location.href = 'home.html'
    }
  }

});
