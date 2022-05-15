function doReschedule(user){
    console.log("ty");
    let reschedule = document.querySelectorAll(".reschedule");
    console.log(reschedule)
    for (let i = 0; i < reschedule.length; i++) {
    
     
        reschedule[i].addEventListener("click", (e) => {
          console.log(document.getElementById("timeStamp").value);
          db.collection("missed-task")
            .doc(missedTasksArray[i])
            .get()
            .then((f) => {
              console.log(missedTasksArray[i]);
              let contents = f.data().content;
              let timeStamp =document.getElementById("timeStamp").value;
  
              db.collection("missed-task").doc(missedTasksArray[i]).delete();
              newfunc(contents,timeStamp,user)
            });
  
        });
     
      
    }
  }