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
      window.location.href = 'home.html'
    }
  } else {
    // No user is signed in.
    console.log('user logged out');
    var host1 = window.location.href;
    var hostsplit1 = host1.split('/').pop();
    console.log(hostsplit1);
    var y = (hostsplit1 =='index.html');
    if(!y){
      window.location.href = '../index.html'
    }

  }

})
