// Your web app's Firebase configuration
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCOdiPwMRNM2StK_E-9b6ZMgHb74mfLqEA",
    authDomain: "moodlesync-20204.firebaseapp.com",
    databaseURL: "https://moodlesync-20204.firebaseio.com",
    projectId: "moodlesync-20204",
    storageBucket: "moodlesync-20204.appspot.com",
    messagingSenderId: "740049223325",
    appId: "1:740049223325:web:8c6471ae70bde4352c9e74"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();



function saveUserName(name){
    
 
    db.collection("quesions").doc(name).set({counter:0})
    .then(function() {
        console.log("login  successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
    

}

function saveQuestionAnswer(obj){

    let que = obj.question.toString().replaceAll(/[^a-zA-Z ]/g, "");
    db.collection("quesions").doc(obj.name).update({[que]:obj.answer})
    .then(function() {
        console.log("Quesion  successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    }); 


}


function searchAnswer(){

    return db.collection("quesions").get();

}

function userAuthoction(email , password){

    console.log("Inside User Authoction !");



 return firebase.auth().signInWithEmailAndPassword(email, password);
       
   

}

