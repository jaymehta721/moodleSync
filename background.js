


chrome.runtime.onMessage.addListener(function (msg, sender, sendRes) {

    console.log("In Side Lister ")

    if (msg.status) {



        console.log("In Status is Ture ")
        chrome.pageAction.show(sender.tab.id);
            

        if (msg.type === "sendQue") {



            console.log("Inside sendQue is Ture ")

            
            console.log(msg.que.question)
            
            console.log(msg.que)

            if (msg.que.question && msg.que.answer) {


                console.log("Inside mag and  is ans tav ")



                let Qlen = msg.que.question.length
                let Alen = msg.que.answer.length

                let Questions = "";
                let Answer = "";

               
                    Questions += msg.que.question[0]                




                for (let i = 0; i < Alen; i++) {
                    Answer += msg.que.answer[i] + " , "
                }


                console.log("Answer: "+Answer)

                console.log("Questions: "+Questions)
                chrome.storage.sync.get(["data"], function (items) {
                    if (items.data) {

                        
                        
                        saveData(items.data.name, Questions, Answer);


                    } else {

                        console.log("Data is not find !");

                    }
                });



            } else {


                // Send Error 

            }



        }
        // else if (msg.type === "searchQue") {

        //     let Questions = "";
        //     let Qlen = msg.que.question.length


        //     for (let i = 0; i < Qlen; i++) {
        //         Questions += msg.que.question[i] + "  "
        //     }


        //     // let datas = searchAnswer(Questions)
        //     // datas.then(function (querySnapshot) {

        //     //     let lists = []

        //     //     querySnapshot.forEach(function (doc) {

        //     //         $(doc.data()).each(function () {

        //     //             console.log(this.question.toString().localeCompare(Questions))
        //     //             if (this.question.toString().localeCompare(Questions) === 0) {

        //     //                 console.log("This Questions : " + this.question)
        //     //                 console.log("This Answer : " + this.answer)
        //     //                 console.log("This Name : " + doc.id)
        //     //                 lists.push({ "name": doc.id, "answer": this.answer })


        //     //             }


        //     //         });

        //     //     });

            

            



        //     //     console.log("Execute Script  !");

        //     //     console.log("lists is sended !");

        //     // });

        // }



//   }

}

});