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


//console.log(firebase);

var db = firebase.database();


// db.collection("cities").doc("LA").set({
//     name: "Los Angeles",
//     state: "CA",
//     country: "USA"
// })
//     .then(function () {
//         console.log("Document successfully written!");
//     })
//     .catch(function (error) {
//         console.error("Error writing document: ", error);
//     });


function searchAnswer(){



        let gat =  db.ref("questions/");
    
    
        return gat;

    // db.collection("moodle").get().then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //         // doc.data() is never undefined for query doc snapshots

    //             $(doc.data()).each(function(){

    //                            if(this.question.toString().includes(que))
    //                             {
                                    
    //                                     console.log("This Questions : "+this.question)
    //                                     console.log("This Answer : "+this.answer)
    //                                     console.log("This Name : "+doc.id)
    //                                     lists.push({"name":doc.id,"answer":this.answer})
                                    

    //                             }
    //             });


    //     });
    // });


 
    
}



function saveData(name,que,ans){


    db.ref("questions/").push({
        name:name,
        que:que,
        ans:ans
    });




    console.log("Data is Saved !");

}

