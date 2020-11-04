console.log("Chrome Extension is Loded !");




 
//Get Question Type 
function getQuestionType() {

    var control = document.querySelectorAll('.clearfix input[type=text]')
    var CTYPE = "text"

    if (control.length <= 0) {

        control = document.querySelectorAll('.clearfix input[type=radio]')
        CTYPE = "radio"

        if (control.length === 0) {


            control = document.querySelectorAll('.clearfix select')
            CTYPE = "select"


        }


    }


    // For Check How Meny Array of Input Type is Return
    //  console.log(control)

    let QType = CTYPE
    let CLen = control.length


    if (QType === 'radio') {



        if (CLen > 2) {

            console.log("Insiede Queastion type functinon -> This is option type")
            return { type: 'mradio', len: CLen }

        } else if (CLen === 2) {

            console.log(" Insiede Queastion type functinon -> This is true false")
            return { type: 'tradio', len: CLen }

        }
        else {


            console.log("Insiede Queastion type functinon -> unknow question type !")
            return 'null'


        }

    }
    else if (QType === 'text') {

        //  console.log("Insiede Queastion type functinon -> This is TextBox")
        //   console.log(QType)
        //   console.log(CLen)


        return { type: 'text', len: CLen }
    }
    else if (QType === 'select') {

        //   console.log("Insiede Queastion type functinon -> This is Multi Value ! ")
        return { type: 'select', len: CLen }

    }
    else {

        //  console.log("Insiede Queastion type functinon -> unknow question type !")
        return 'null'

    }


}

let getType = getQuestionType().type;

let getLen = getQuestionType().len;

//Get Question Text
function getQuestionText() {


    if (getType === 'select') {

        let queList = []

        // Get Question For Selection
        if (getLen === 1) {


            // Get Queastion text for one multi val

            let Que = $(".subquestion").parent().contents().filter(function () {
                return this.nodeType == 3;
            })[0].nodeValue

            console.log("Inside getQuestionText -> " + Que)

            queList.push(Que);

            return queList;

        }
        else if (getLen === 2) {


            // Get Queastion text for tow multi val

            for (let i = 0; i < getLen; i++) {

                if ($(".subquestion")[0]) {
                    let Que = $(".subquestion").parent().contents().filter(function () {
                        return this.nodeType == 3;
                    })[i].nodeValue
                    queList.push(Que);
                }
                else if ($(".qtext")[0]) {



                    let Que = $($(".qtext p")[i]).clone().children().remove().end().text();
                    queList.push(Que);
                }


                // console.log(queList)

            }

            return queList;

        }
        else if (getLen === 3) {


            // Get Queastion text for three multi val

            for (let i = 0; i < getLen; i++) {

                let Que = $(".subquestion").parent().contents().filter(function () {
                    return this.nodeType == 3;
                })[i].nodeValue


                console.log("Inside getQuestionText -> " + Que)
                queList.push(Que);
            }


            return queList;

        }
        else {


            console.log("Inside getQuestionText -> Unspecify length type")
            return null;

        }


    }
    else if (getType === 'text') {

        //   console.log("Inseid Question Text For text-> "+getLen)
        //Here Comes For Text Value

        let queList = []
        if (getLen === 1) {
            let Que = document.getElementsByClassName("qtext")[0].innerText
            queList.push(Que);
            // Here Comes For Ture Or False

            return queList;
        }
        else if (getLen >= 2) {

            let Que = $(".clearfix p").text().replaceAll("Answer", "______");
            queList.push(Que);
            return queList;
        }


    }
    else if (getType === 'tradio') {


        let queList = []


        let Que = document.getElementsByClassName("qtext")[0].innerText
        queList.push(Que);
        // Here Comes For Ture Or False

        return queList;

    }
    else if (getType === 'mradio') {

        //Here Comes For Multi Radio Buttons
        let queList = []
        let Que = document.getElementsByClassName("qtext")[0].innerText
        queList.push(Que);
        // Here Comes For Ture Or False

        return queList;

    }
    else {

        console.log("Not able to identify type of question !")

        let Que = "Not able to identify type of question !"
        queList.push(Que);

        return queList;

    }

    return null;
    //   console.log(document.getElementsByClassName("qtext")[0].innerText)
}




function getAnswers() {

    let list = [];
    if (getType === "mradio" || getType === "tradio") {


        if ($('input[type=radio]:checked').length > 0) {

            $('input[type=radio]:checked').each(function () {


               

                if (this) {
                    let selectedVal = document.querySelectorAll('[for="' + this.id + '"]')[0].innerText
                    if (selectedVal.toString().includes(".")) {
                        let val = selectedVal.toString().split(".")[1].trim();
                        list.push(val);
                    } else {

                        let val = selectedVal.toString();
                        list.push(val);

                    }

                    console.log(list);
                  

                } else {
                    // Other Error
                    console.log("Error Is Occur !")
                
                }
            });
        } else {
            console.log("plase select queation")
            
        }

    }
    else if (getType === "text") {

        
        console.log("Inside get value  !");
        $(".clearfix input[type=text]").each(function () {
            var input = $(this).val();
            list.push(input);
        });
        console.log(list)
        

    }
    else if (getType === "select") {

        for(let i=0;i< getLen;i++){
          list.push($( $(".clearfix :selected")[i]).text());
        }
        console.log(list)

    }


    //    });

    return list;

}


 
//chrome.runtime.sendMessage({ status: true, type: "searchQue", que: { question: getQuestionText(), qtype: getType } });


$(".submitbtns .mod_quiz-next-nav").click(function () {

    
    console.log("See this - >")
    console.log(getAnswers())
  
    chrome.runtime.sendMessage({ status: true, type: "sendQue", que: { question: getQuestionText(),answer:  getAnswers() , qtype: getType } });



});



chrome.runtime.sendMessage({ status: true, text: "script loded !" });



chrome.runtime.onMessage.addListener((msg, sender, response) => {
    // First, validate the message's structure.
    if ((msg.from === 'popup') && (msg.subject === 'question')) {


        var sendQue = {
            question: getQuestionText(),
            qtype: getType
        };

        // Directly respond to the sender (popup), 
        // through the specified callback.
        response(sendQue);
    }
});



