

chrome.runtime.onMessage.addListener(function (msg, sender, sendRes) {

    /**
     * This event is occer when any content script or popup script message or data 
     * that data is recive by this event and aftar recive data this data send on 
     * data base.
     */

    if (msg.type === "notify" && msg.status) {

        // Notify content is loded 
        console.log("Message : ", msg.data);


    } else if (msg.type === "sendAns" && msg.status) {

        /**
         *  Send Data To Data Base 
         */

        chrome.storage.sync.get(["data"], function (items) {



            if (items.data) {


                console.log(msg.data);
                for(let i=0;i<msg.data.length;i++){
                    console.log(msg.data[i].que," : ",msg.data[i].ans);
                saveQuestionAnswer({ "name": items.data.name, "question": msg.data[i].que, "answer": msg.data[i].ans });
                }

            }


        });




    }










});