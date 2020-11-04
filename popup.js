

// const getAnswers = ans => {

//   console.log("Ans is come !");
//   console.log(data)

// };


const getQueastion = data => {

  //  console.log("Data is Comme")
  // console.log(data.question)

  let mainQue = "";
  if (data.question) {




    if (data.qtype === "select") {

      let que = ""

      for (let i = 0; i < data.question.length; i++) {

        que += (i + 1) + " ) " + data.question[i] + "\n\n";
        
      }

      mainQue += data.question[0];

      document.getElementById("Que").innerText = que;
      //  mainQue = que;
      //console.log(que);

    }
    else if (data.qtype === "text") {


      let que = ""

      for (let i = 0; i < data.question.length; i++) {

        que += (i + 1) + " ) " + data.question[i] + "\n\n";
        mainQue += data.question[i];
      }

      document.getElementById("Que").innerText = que;
      //mainQue = que;

    }
    else if (data.qtype === "tradio") {

      let que = ""

      que += " 1 ) " + data.question[0] + "\n\n";
      mainQue = data.question[0];

      document.getElementById("Que").innerText = que;
      // console.log(que);


    }
    else if (data.qtype === "mradio") {


      let que = ""

      que += " 1 ) " + data.question[0] + "\n\n";
      mainQue = data.question[0];
      document.getElementById("Que").innerText = que;
      //   console.log(que);
      //     mainQue = que;

    }
    else {

      //Error Msg

    }

  } else {


    document.getElementById('Que').textContent = "Not able to detect question !";
    $("#tabls").hide();

  }

  // chrome.tabs.query({
  //   active: true,
  //   currentWindow: true
  // }, tabs => {
  //   chrome.tabs.sendMessage(
  //     tabs[0].id,
  //     { from: 'popup', subject: 'ans', question: mainQue },
  //     getAnswers);
  // });


  // querySnapshot => {


  //   querySnapshot.forEach((doc) => {

  //     $(doc.data()).each(function () {

  //       console.log(this.question.toString().trim().localeCompare(mainQue.trim()))
  //   //    if (this.question.toString().localeCompare(mainQue) === 0) {

  //   console.log(this.question.toString().trim()+"==="+ mainQue.toString().trim())
  //         console.log("This Questions : " + this.question)
  //         console.log("This Answer : " + this.answer)
  //         console.log("This Name : " + doc.id)

  //    //   }


  //     })


  let  hasData =false;

  searchAnswer().on('value', function (snapshort) {

    //snapshort.val()

    snapshort.forEach((val) => {

      if (val.val().que.toString().trim().localeCompare(mainQue.trim()) === 0) {
        $('#tables').append('<tr><td>' + val.val().name + '</td><td>' + val.val().ans + '</td></tr>');
        hasData = true;
      }
      // console.log("----------------------------------------------------------------------");
      // console.log(val.val().que.toString().trim().localeCompare(mainQue.trim()));
      // console.log(val.val().que);
      // console.log(val.val().ans);
      // console.log(val.val().name);
      // console.log("----------------------------------------------------------------------");



      //  //   console.log(this.question.toString().trim().localeCompare(mainQue.trim()))

    });


  });


  // if(hasData === false){
  //   $('#tables').hide();
  //   $('#msg').text("Not Repate Question !")
  //   $('#msg').show();
   
  // }else{

  //   $('#tables').show();
  //   $('#msg').hide();
  // }

};

//document.getElementById('Que').textContent = data.question;




// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', () => {
  // ...query for the active tab...
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(
      tabs[0].id,
      { from: 'popup', subject: 'question' },
      getQueastion)




  });
});






// chrome.runtime.onMessage.addListener(
//   function (request, sender, sendResponse) {
//     if (request.msg === "getAns") {
//       //  To do something
//       alert(request.data)

//     }
//   }
// );




$(function () {




  chrome.storage.sync.get(/* String or Array */["data"], function (items) {
    if (items.data) {

      $("#sections_login").hide();
      $("#sections_display").show();

    }
  });


  $("#subData").click(function () {


    let name = document.getElementById("first_name").value
    let email = document.getElementById("email").value

    let dat = {

      "name": name,
      "email": email

    }

    chrome.storage.sync.set({ "data": dat }, function () {
      $("#sections_login").hide();
      $("#sections_display").show();
    });




  });





});
