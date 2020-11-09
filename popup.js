

/*********  Diffrent Section Variables    ******** */
let loginSection = document.getElementsByClassName("login")[0];
let processSection = document.getElementsByClassName("process")[0];
let displaySection = document.getElementsByClassName("display_Sections")[0];
let bgPage = chrome.extension.getBackgroundPage();




const getQueastion = data => {

    try {
        if (data.question) {
            // Get Question Text From Content Scritpt
            let quesionText = document.getElementsByClassName("quiz-question")[0];
            quesionText.innerText = "";

            if (data.question.length > 1) {

                for (let i = 0; i < data.question.length; i++) {


                    quesionText.innerText += ("Q" + (i + 1) + " : " + data.question[i]).toString().substr(0, 45) + "...\n\n";
                }
                bgPage.searchAnswer().then(allDoc => {
                    let counter = 0;
                    allDoc.docs.map((doc) => {
                        let ansers = "";

                        for (const obj in doc.data()) {

                            let quesionsdata = data.question.reverse();
                            console.log(quesionsdata)

                            for (let i = 0; i < data.question.length; i++) {

                                if (obj.toString().trim().includes(quesionsdata[i].toString().replaceAll(/[^a-zA-Z ]/g, "").trim())) {
                                    ansers += doc.data()[obj] + " , ";
                                    console.log(obj.toString().trim(),ansers)
                                    counter++;
                                }
                            }
                        }
                        if(ansers != ""){
                        let e = document.createElement('tr')
                        e.innerHTML = "<tr> <td>"+doc.id+"</td> <td>"+ansers.replace(/\ , $/, '');+"</td> </tr>";
                        document.getElementsByTagName("tbody")[0].appendChild(e);
                        console.log(doc.id, " ", );
                        }
                    });

                    if(counter === 0){
                                 let e = document.createElement('tr')
                                 e.innerHTML = "<tr> <td colspan='2'> No Answer Found ! </td></tr>";
                                document.getElementsByTagName("tbody")[0].appendChild(e);
                                
                    }
                });




            } else {

                quesionText.innerText += ("Q1 : " + data.question[0]).toString().substr(0, 45) + "...\n\n";
                bgPage.searchAnswer().then(allDoc => {
                    let counter = 0;
                    allDoc.docs.map((doc) => {

                        console.log(doc.data())
                       
                        for (const obj in doc.data()) {
                            if (obj.toString().trim().includes(data.question[0].toString().replaceAll(/[^a-zA-Z ]/g, "").trim())) {
                              
                                let e = document.createElement('tr')
                                e.innerHTML = "<tr> <td>"+doc.id+"</td> <td>"+doc.data()[obj].toString().substr(0, 45)+"</td> </tr>";
                                document.getElementsByTagName("tbody")[0].appendChild(e);
                                console.log(doc.data()[obj], doc.id);
                                counter++;
                            }

                        }
                        

                    });

                    if(counter === 0){
                                 let e = document.createElement('tr')
                                e.innerHTML = "<tr> <td colspan='2'> No Answer Found ! </td></tr>";
                                document.getElementsByTagName("tbody")[0].appendChild(e);
                                
                    }
                });

            }

        } else {

            console.log("Data Is Not Get From Content Page !");

        }
    } catch (e) {
        if (e instanceof TypeError) {
            console.log(e, true);
        } else {
            console.log(e, false);
        }
    }


};




chrome.storage.sync.get(["data"], function (items) {

    /**
     *  This event is check if user is login or not once user login
     *  thair data is store in local storage if user is not register
     *  or login else condation execute that take data from user
     */

    if (items.data) {





        console.log("This is a valide user ");
        loginSection.style.display = 'none';
        processSection.style.display = 'none';
        displaySection.style.display = "block";

        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, tabs => {
            try {
                chrome.tabs.sendMessage(tabs[0].id, { from: 'popup', subject: 'question' }, getQueastion)
            }
            catch (e) {
                if (e instanceof TypeError) {
                    console.log(e, true);
                } else {
                    console.log(e, false);
                }

            }
        });




    } else {

        loginSection.style.display = 'block';
        processSection.style.display = 'none';

        document.getElementById("login_btn").addEventListener("click", function () {

            /**
             *  This event is occur when usr  click on login button
             *  
             */

            let name = document.getElementById("name").value.toString();
            let email = document.getElementById("email").value.toString();
            let password = document.getElementById("password").value.toString();
            let errorMsg = document.getElementById("errMsg");

            if (name != "" && email != "" && password != null) {

                console.log("Name :-", name);
                console.log("Email :-", email);
                console.log("Password :-", password);
                loginSection.style.display = 'none';
                processSection.style.display = 'block';
                displaySection.style.display = "none";
                bgPage.userAuthoction(email, password).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    if (errorCode === 'auth/wrong-password') {
                        errorMsg.innerText = 'Wrong password.';
                        //chrome.runtime.sendMessage({ type:"loginResponseError" ,status: true, data:"Wrong password."});
                    } else {
                        errorMsg.innerText = errorMessage.toString();  //chrome.runtime.sendMessage({ type:"loginResponseError" ,status: true, data:errorMessage});


                    }


                }).then((data) => {


                    if (data) {

                        console.log("This is a valide user ");

                        bgPage.saveUserName(name);

                        let data = {

                            "name": name,
                            "email": email

                        }

                        chrome.storage.sync.set({ "data": data }, function () {

                            console.log("Data Save in local !");
                        });

                        loginSection.style.display = 'none';
                        processSection.style.display = 'none';
                        displaySection.style.display = "block";


                    } else {


                        console.log("This is not a valide user ");
                        loginSection.style.display = 'block';
                        processSection.style.display = 'none';
                        displaySection.style.display = "none";

                    }



                });


                //chrome.runtime.sendMessage({ type:"loginDetails" ,status: true, data:{"name":name,"email":email,"password":password}});



            } else {

                console.log("First fill all details !");
            }


        });
    }
});







