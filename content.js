/*                Work On Content                             */
//ToDo
//0) get info about page is single page or one que page 
//1) get Type of question
//2) get Question text
//3) get Answer text


console.log("Chrome Extension is Loded !");


function isPageMultiQuestions() {

    /**
     * This Function is Check How Meny Question in a singal page if multipal 
     * questions in a single page this function return true other wise this 
     * function return false
     */


    const howMenyQue = document.getElementsByClassName("qtext").length

    if (howMenyQue > 1) {
        return true

    } else {

        return false
    }

}



// Check if Page Consist MultiPal Questions

if (isPageMultiQuestions()) {



    /***************  Initilization  **************/


    console.log("This is Page Consis Multipal Questions !");
    let myQuesions = [];
    getQuestionSelect();
    getQuestions();
    const element = document.getElementsByClassName("formulation clearfix");

    document.onmouseup = document.onkeyup = element.onselectionchange = function () {
        getSeletdTexts(getSelectionText());
    };


    chrome.runtime.onMessage.addListener((msg, sender, response) => {
        
        if ((msg.from === 'popup') && (msg.subject === 'question')) {
            
    
            var sendQue = {
                question: myQuesions
            };
    
            // Directly respond to the sender (popup), 
            // through the specified callback.
            response(sendQue);
            console.log("Send Response !")
        }
    });


    

    /***************  Functions  **************/

    function getSelectAnsEvent(e) {

        /**
         *  This event is occer when user select answer from drop down 
         *  and return question text and answer of contorl  
         */
        let que  = e.target.previousElementSibling.parentNode.previousElementSibling.innerText.toString();
        let ans  = e.target.options[e.target.options.selectedIndex].innerText.toString();
        sendDataToBackgroud([que],[ans]);
        delete que;
        delete ans;
       

    }


    //Get Question Type 
    function getQuestionSelect() {


        /**
         *  This  function is place change events on all drop-down 
         *  if user is select ans this event return question and 
         *  answer also this function return count of select funtions
         */



        let selectLen = document.querySelectorAll('.clearfix select').length
        let selectControls = document.querySelectorAll('.clearfix select')


        // Here we place simple event on every function
        for (let i = 0; i < selectLen; i++) {

            selectControls[i].addEventListener("change", getSelectAnsEvent);

        }

        (selectLen > 0) ? console.log("Event is placed on all selects !") : console.log("")

        return selectLen

    }


    function getQuestions() {


        /**
         *  This function place events on text or radio button 
         *  both events are different so first we check control 
         *  type and after assign event.
         */

        let allInput = document.getElementsByTagName('input')
        let allInputLen = document.querySelectorAll('input').length
        let radioLen = 0
        let textLen = 0

        for (let i = 0; i < allInputLen; i++) {


            if (allInput[i].type === "text") {


                allInput[i].addEventListener("change", getTextInputAnsEvent)
                textLen++;

            }
            else if (allInput[i].type === "radio") {


                allInput[i].addEventListener("change", getRadioSelectAnsEvent)

                radioLen++;


            }

        }



        console.log("Event is placed in radio and text inputs !")

        return { "radio": radioLen, "txtInput": textLen }



    }


    function getRadioSelectAnsEvent(e) {


        /**
         *  This event is occure when user select radio button and send 
         *  question and answer in background script 
         */

        let que =  e.target.parentElement.parentElement.parentElement.previousElementSibling.innerText.toString();
        let ans = e.target.nextElementSibling.innerText.toString();

        if (ans.includes(".")) {
            ans = ans.split(".")[1];
        } 
        sendDataToBackgroud([que],[ans]);
        delete que;
        delete ans;


    }




    function getTextInputAnsEvent(e) {

        /**
         *  This event Occure when user type in text box and leave from this control
         *  after user leave this function ,function is run and  sned answer and text
         *  value to background script  but if text box is more than one this function
         *  is not able to get answer of  both inputs 
         */
       
        let question = e.target.parentElement.innerText.toString().replace("Answer", "").replaceAll("\"", "");
        let answers = e.target.value;
        if (answers) {

            sendDataToBackgroud([question],[answers]);

        }

        delete question;
        delete answers;

    }







    function getSelectionText() {

        /**
         *      This Function is return seletd text by mouse i use this function
         *      for search specific question from data base if user have multipal
         *      question on single page 
         *      Scroces : https://stackoverflow.com/questions/5379120/get-the-highlighted-selected-text
         */

        var text = "";
        var activeEl = document.activeElement;
        var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
        if (
            (activeElTagName == "textarea") || (activeElTagName == "input" &&
                /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
            (typeof activeEl.selectionStart == "number")
        ) {
            text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
        } else if (window.getSelection) {
            text = window.getSelection().toString();
        }
        return text;
    }
 

    function getSeletdTexts(val) {

        if (val.toString() != " " && val.toString() != "" && val.toString().length > 1) {
           myQuesions = [val];
        }

    }







} else {

    console.log("This  page consist one question on single page !");


    chrome.runtime.onMessage.addListener((msg, sender, response) => {
        
        if ((msg.from === 'popup') && (msg.subject === 'question')) {
            
    
            var sendQue = {
                question: getQuestionText()
            };
    
            // Directly respond to the sender (popup), 
            // through the specified callback.
            response(sendQue);
            console.log("Send Response !")
        }
    });
    
    

    if (document.querySelectorAll(".submitbtns .mod_quiz-next-nav").length > 0) {
        document.querySelectorAll(".submitbtns .mod_quiz-next-nav")[0].addEventListener("click", function () {
            console.log("Click");
            sendDataToBackgroud(getQuestionText(),getAnswers());
        });
    }

    // Return Type of Question on Page 
    function getQuestionType() {

        /**
         * This function return type of quesion on single page 
         * if page consist radio button this function return "tradio" or "mradio"
         * if page consist text input this function return "text"
         * if page consist select this function retun select 
         */

        // First we check page conist  radio button
        var control = document.querySelectorAll('.clearfix input[type=radio]')
        var CTYPE = "radio"

        // If radio button is not consist than
        if (control.length === 0) {

            control = document.querySelectorAll('.clearfix input[type=text]')
            CTYPE = "text"

            // If text field not consist than
            if (control.length === 0) {


                control = document.querySelectorAll('.clearfix select')
                CTYPE = "select"


            }

        }


        // Now Check Questions Type Which Type Of Question is Given
        let QType = CTYPE
        let CLen = control.length
        if (QType === 'radio') {


            // If Page Consist More then Two Radio Buton So Is Multi Option Quesion 
            if (CLen > 2) {

                return { type: 'mradio', len: CLen }

            } else if (CLen === 2) { // If Page Consist  Two Radio Buton So Is True or False Quesion 

                        return { type: 'tradio', len: CLen }

            }
            else {


                console.log("Insiede Queastion type functinon -> unknow question type !")
                return 'null'


            }

        }
        else if (QType === 'text') {

            //  If Page Consist Input Fileds this return  length or type text
            return { type: 'text', len: CLen }
        }
        else if (QType === 'select') {

            //If Page Consist Select Control This Return Type as "select" and that lenght 
            return { type: 'select', len: CLen }

        }
        else {

            // If Any Control Not Found This will retun null
            return 'null'

        }


    }




    // Get question text 
    function getQuestionText() {

        /**
         *  Basically this function detect question text from single page quiz 
         *  and return this text for searching purpose 
         */

        // Gloabe variables that consist question type and length
        let getType = getQuestionType().type;
        let getLen = getQuestionType().len;


        // Check questionis multi radio 
        let queList = []
        if (getType === 'mradio') {

            //Here Comes For Multi Radio Buttons
            queList = [];
            let Que = document.getElementsByClassName("qtext")[0].innerText.toString();
            queList.push(Que);
            delete Que;
            return queList;

        }
        else if (getType === 'tradio') {


            queList = [];
            let Que = document.getElementsByClassName("qtext")[0].innerText.toString();
            queList.push(Que);

            delete Que;
            return queList;

        }
        else if (getType === 'text') {

            //Here Comes For Text Value
            queList = []
            if (getLen === 1) {
                let Que = document.getElementsByClassName("qtext")[0].innerText.toString().replaceAll("/[^a-zA-Z ]/g", "")
                queList.push(Que);
                delete Que;
                return queList;
            }
            else if (getLen >= 2) {

                let Que = document.querySelectorAll(".clearfix p")[0].innerText.toString().replaceAll("Answer", "");
                queList.push(Que);
                delete Que;
                return queList;
            }


        }
        else if (getType === 'select') {

            //Here we get quesions of drop down
            queList = [];
            const matchString = "Match the followings:";
            const currentQue = document.getElementsByClassName("qtext")[0].innerText.toString();
            if (currentQue.includes(matchString)) {

                for (let i = 0; i < getLen; i++) {
                    let Que = document.querySelectorAll("select")[i].parentElement.previousElementSibling.innerText.toString();
                    queList.push(Que);
                    delete Que;
                }
                return queList;

            } else {


                let Que = document.getElementsByClassName("qtext")[0].innerText.toString();
                queList.push(Que);
                delete Que;
                return queList;


            }




        }
        else { // What if this not able to find question 

            console.log("Not able to identify type of question !");

            let Que = "Not able to identify type of question !"
            queList.push(Que);

            return queList;

        }

    }


    function getAnswers() {

        let getType = getQuestionType().type;
        let getLen = getQuestionType().len;

        /**
         *  This function is get answers that user select when user go to next page this  
         *  function is responsible to get answer text 
         * 
         */

        // Empty Array for store answers
        let Alist = [];

        if (getType === "mradio" || getType === "tradio") {


            // Get All Radio Buttons  Value That Checkd
            let seletedAns = (document.querySelectorAll("input[type=radio]:checked")[0] != "undefined")? document.querySelectorAll("input[type=radio]:checked")[0] : null;
            

            if (seletedAns !=null ) {

                let selectedVal = document.querySelectorAll('[for="' + seletedAns.id + '"]')[0].innerText.toString();
                
                // Check ans is consist "." 
                if (selectedVal.toString().includes(".")) {
                    // Here we remove . from ans 
                    let val = selectedVal.toString().split(".")[1].trim();
                    Alist.push(val);
                    delete val;
                } else {

                    let val = selectedVal.toString();
                    Alist.push(val);
                    delete val;

                }


            }

        }
        else if (getType === "text") {

            // Take Ans From Text Input 
            const ansInputLen = document.querySelectorAll(".clearfix input[type=text]").length;
            const ansInputs = document.querySelectorAll(".clearfix input[type=text]");
            for (let i = 0; i < ansInputLen; i++) {
                var input = ansInputs[0].value;
                Alist.push(input);
            }


        }
        else if (getType === "select") {

            for (let i = 0; i < getLen; i++) {
                let Que = document.querySelectorAll("select")[i].options[document.querySelectorAll("select")[i].selectedIndex].innerText.toString();
                Alist.push(Que);
                delete Que;

            }


        }

        return Alist;
    }




    


}


function sendDataToBackgroud(que,ans){

    let QueAns = []

    if(que.length == ans.length){

        for(let i = 0; i < ans.length;i++){
            QueAns.push({"que":que[i],"ans":ans[i]})
        }

    }
    else{

        if(que.length == 1 && ans.length >= 1)
        {

            let tempString= "";
            for(let i = 0; i < ans.length;i++){
                tempString += ans[i]+","
            }

            QueAns.push({"que":que[0],"ans":tempString});
            delete tempString;

        }
       else if(que.length > 1 && ans.length > 1){

        
        let tempQuestion= "";
        let tempAnswer= "";

        for(let i = 0; i < ans.length;i++){
            tempAnswer += ans[i]+","
        }

        for(let i = 0; i < que.length;i++){
            tempQuestion += que[i]+","
        }
        QueAns.push({"que":tempQuestion,"ans":tempAnswer});
        delete tempQuestion;
        delete tempAnswer;
       } 


    }

    console.log(QueAns);


    chrome.runtime.sendMessage({ type:"sendAns" ,status: true, data: QueAns});



}




chrome.runtime.sendMessage({ type:"notify" ,status: true, data: "script loded !" });

