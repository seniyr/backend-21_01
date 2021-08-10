
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

document.getElementById('registerform').addEventListener('submit',async (e)=>{
    e.preventDefault();
    console.log(e.target)
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
        const { email,password } = data;
        useful_data.email = email;   
        useful_data.password = password;



    console.log(useful_data)
    
    let options = {
        method :"POST",
        headers : {
            "Content-type":"application/json",
        },
        body : JSON.stringify(useful_data),
        Credential:'include'
    }
    let status;
    let responsedata =await fetch("/signin/register",options)
    .then( (res)=>{
        status = res.status
        return res.json();
    })
    .catch ((e)=>{
        console.log(e);
    });

    // if(res.redirected){
    //     window.location.href = res.url;
    // };
    
    console.log("RESGISTER",responsedata);
    if(responsedata.msg != undefined){
        document.getElementsByClassName('username')[0].innerHTML  = `Email | <b>${responsedata.msg} </b> <a href='/signin'>LOGIN</a>`   
    }
    
    
    return false;
});

var cf = document.getElementById('pass2');
var pass = document.getElementById('pass');

cf.addEventListener('change' , function(){
    // console.log("changed",pass.value ,cf.value )
    if(cf.value == pass.value){
        document.getElementsByClassName('confirm')[0].style.color = 'green';
    }
    else{
        document.getElementsByClassName('confirm')[0].style.color = 'red';
    }
})
pass.addEventListener('change' , function(){
    // console.log("changed",pass.value ,cf.value )
    if(cf.value == pass.value){
        document.getElementsByClassName('confirm')[0].style.color = 'green';
    }
    else{
        document.getElementsByClassName('confirm')[0].style.color = 'red';
    }
})
 

console.log("hi")