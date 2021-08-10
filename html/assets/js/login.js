
function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    Google_data_handler(profile)
}; // For google sign in 

function Google_data_handler(profile){
console.log(".............")
}; // for data which comes from google

var servermsg = document.getElementById("servermsg")
document.getElementById('loginform').addEventListener('submit',async (e)=>{
    e.preventDefault();
    // console.log(e.target)
    let form =  e.target;
    let data = {};
    for(i=0 ; i<form.elements.length ;i++){
        let input = form.elements[i]
        if(input.name != "submit"){
            data[input.name]  = input.value;

        }
    
    }
    // console.log(data);
    useful_data = {};
    const {email,password} = data;
    useful_data.email = email;
    useful_data.password = password;

    let options = {
        method :"POST",
        headers : {
            "Content-type":"application/json",
        },
        body :JSON.stringify(useful_data),
        Credential:'include'
    }
    var status ;
    let redirect;
    let responsedata =await fetch("/signin",options)
    .then( (res)=>{
        status = res.status;
        console.log(res,'\n')
        if(res.redirected){
            redirect = res.url
        }
        return res;
    })
    .catch ((e)=>{
        console.log(e);
    });


    console.log("LOGIN : \n ",responsedata);
    if(status == 401){ // passport standandard for unsucceful attempt on login. means wrong password or username
        document.getElementsByClassName('user')[0].innerHTML  = `Email | <b>Wrong username or password</b>`   
    }
    if(status==200){
        document.getElementsByClassName('user')[0].innerHTML  = `Email | SUCESSFUL!`
    }
    if(redirect){
        setTimeout(() => {
            window.location.href = redirect;
        }, 1000);
    }
    return false;
});



console.log("hi")