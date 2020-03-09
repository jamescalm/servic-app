// log-in
const loginForm = document.querySelector("#login-form");

loginForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    //get email value
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    auth.signInWithEmailAndPassword(email, password).then(cred =>{
     console.log(cred.user)
     window.alert("Welcome, "+ email);
     window.location.replace("home.html");
    }).catch(function(error){
    // An error happened.
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert(errorMessage);
    });
});
