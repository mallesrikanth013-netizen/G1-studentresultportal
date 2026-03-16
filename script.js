function getResult(){

let roll = document.getElementById("roll").value;

db.collection("students").doc(roll).get().then((doc)=>{

if(doc.exists){

let data = doc.data();

document.getElementById("result").innerHTML=

"Name: "+data.name+"<br>"+
"Maths: "+data.maths+"<br>"+
"Science: "+data.science;

}

else{

document.getElementById("result").innerHTML="No Result Found";

}

});

}


function addResult(){

let roll=document.getElementById("roll").value;

db.collection("students").doc(roll).set({

name:document.getElementById("name").value,

maths:document.getElementById("maths").value,

science:document.getElementById("science").value

});

alert("Result Updated");

}


function sendFeedback(){

db.collection("feedback").add({

name:document.getElementById("name").value,

message:document.getElementById("message").value

});

alert("Feedback Sent");

}


function login(){

let email=document.getElementById("email").value;

let password=document.getElementById("password").value;

firebase.auth().signInWithEmailAndPassword(email,password)

.then(()=>{

window.location="dashboard.html";

});

}


function forgot(){

let email=document.getElementById("email").value;

firebase.auth().sendPasswordResetEmail(email);

alert("Password reset email sent");

}
