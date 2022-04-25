let firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB4szkpPQuQgo9f6x2knBH4_ikO0t-rjbo",
    authDomain: "todo-app-e085b.firebaseapp.com",
    databaseURL:
      "https://todo-app-e085b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "todo-app-e085b",
    storageBucket: "todo-app-e085b.appspot.com",
    messagingSenderId: "812199395594",
    appId: "1:812199395594:web:ec37cffcd306d66448baf3",
    measurementId: "G-VGP64NR6D4",
  });
  
  let db = firebaseApp.firestore();
  let auth = firebaseApp.auth();
  let All = document.querySelector(".All");
  let Completed = document.querySelector(".Completed");
  let Missed = document.querySelector(".Missed");
  let allTasks = document.querySelector(".allTasks");
  let missedTasks = document.querySelector(".missedTasks");
  let completedTasks = document.querySelector(".completedTasks");
  let addTaskBtn = document.querySelector(".addtasks");
  let addTaskVisible = document.querySelector(".addtask");
  let taskContent = document.querySelector(".taskContent");
  let content = document.querySelector(".content");
  let times = document.querySelector(".times");
  content.classList.add("hide");
  document.querySelector(".submitBtn").classList.add("hide");
  
  
  All.addEventListener("click", () => {
    createTabs(allTasks);
    removeTabs(missedTasks, completedTasks);
    addTaskVisible.classList.remove("hide");
    document.querySelector(".submitBtn").classList.remove("hide");
    content.classList.remove("hide");
    getAllData()
  });
  
  Missed.addEventListener("click", () => {
    createTabs(missedTasks);
    removeTabs(allTasks, completedTasks);
    addTaskVisible.classList.add("hide");
    content.classList.add("hide");
    document.querySelector(".submitBtn").classList.add("hide");
    getAllMissedData()
  });
  Completed.addEventListener("click", () => {
    
    createTabs(completedTasks);
    removeTabs(missedTasks, allTasks);
    document.querySelector(".submitBtn").classList.add("hide");
    content.classList.add("hide");
    addTaskVisible.classList.add("hide");
    taskContent.classList.add("hide");
    getAllCompletedData()
  });
  addTaskBtn.addEventListener("click", () => {
    content.classList.toggle("hide");
    document.querySelector(".submitBtn").classList.toggle("hide");
  });
  function createTabs(item) {
    item.classList.remove("hide");
  }
  function removeTabs(item1, item2) {
    item1.classList.add("hide");
    item2.classList.add("hide");
  }
  
  let saveData = () => {
    let content = document.querySelector(".content").value;
    let thatTime = new Date().toLocaleTimeString();
    let scheduledTime = document.querySelector(".timeToComplete").value;
    console.log(scheduledTime);
    db.collection("task-content")
      .add({
        content: content,
        time: thatTime,
        scheduledTime: scheduledTime,
        status: "notDone",
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };
  let rescheduleTask=()=>{
    for (let j = 0; j < reschedule.length; j++) {
      reschedule[j].addEventListener("click",()=>{
  
        db.collection("missed-task").doc(missedTasksArray[j]).delete()
      })
      
    }
  }
  // let allmissedtask = [];
  // let allcompletedtask = [];
  // // let gone = document.querySelectorAll(".gone");
  let usersArray = [];
  let missedTasksArray=[]
  db.collection("task-content")
    .get()
    .then((e) => {
      e.forEach((doc) => {
        console.log(`${doc.id}`);
        usersArray.push(doc.id);
      });
    });
  console.log(usersArray);
  db.collection("missed-task")
    .get()
    .then((e) => {
      e.forEach((doc) => {
        console.log(`${doc.id}`);
        missedTasksArray.push(doc.id);
      });
    });
    
  console.log(missedTasksArray);
  let readData = () => {
    db.collection("task-content")
      .get()
      .then((data) => {
        let getdata = data.docs.map((item) => {
          return { ...item.data() };
        });
        
        // for (let i = 0; i < getdata.length; i++) {
        //   let done = document.querySelectorAll(".done");
        //   let gone = document.querySelectorAll(".gone");
        //   console.log(getdata[0])
        //   showDataAll(
        //     getdata[i].content,
        //     getdata[i].time,
        //     getdata[i].scheduledTime
        //   );
        getdata.forEach((e)=>{
          let done = document.querySelectorAll(".done");
          let gone = document.querySelectorAll(".gone");
          let reschedule=document.querySelectorAll(".reschedule")
          console.log(reschedule)
          console.log(gone)
          showDataAll(
            e.content,
            e.time,
            e.scheduledTime
          )
          // document.querySelector(".done").addEventListener("click",()=>{
          //   db.collection("task-content").doc(usersArray[i]).update({status: "done"});
          // })
  
          // done.forEach((e)=>{
          //   e.addEventListener("click",()=>{
          //     if(db.collection("task-content").doc(usersArray[i]).status!="fone"){
  
          //       db.collection("task-content").doc(usersArray[i]).update({status: "dned"});
          //     }
          //     else{
          //       return
          //     }
          //   })
          //     })
          for (let j = 0; j < done.length; j++) {
            // reschedule.forEach((e)=>{
              // e.addEventListener(()=>{
                // db.collection("missed-task").doc(missedTasksArray[0]).delete()
            
              // })
            // })
            
            done[j].addEventListener("click", () => {
           
              setTimeout(() => {
      
                location.reload()
              }, 1000);
               
            db.collection("task-content")
              .doc(usersArray[j])
              .get().then((d)=>{
                let content=d.data().content
                let t=d.data().scheduledTime
                console.log(t);
                db.collection("task-content").doc(usersArray[j]).delete()
   
                db.collection("done-task")
                .add({
                  content: content,
                  scheduledTime: t
                 
                })
                .then((docRef) => {
                  console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                  console.error("Error adding document: ", error);
                });
              });
  
                // db.collection("task-content")
                //   .doc(usersArray[j])
                //   .update({ status: "Done" });
                  
               
            });
            gone[j].addEventListener("click", () => {
          
               db.collection("task-content")
              .doc(usersArray[j])
              .get().then((d)=>{
                let content=d.data().content
                let t=d.data().scheduledTime
                console.log(t);
                db.collection("task-content").doc(usersArray[j]).delete()
   
                db.collection("missed-task")
                .add({
                  content: content,
                  scheduledTime: t
                 
                })
                .then((docRef) => {
                  console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                  console.error("Error adding document: ", error);
                });
              });
  
                // db.collection("task-content")
                //   .doc(usersArray[j])
                //   .update({ status: "Done" });
                  
            
            });
            missedTasks.addEventListener("click", (e) => {
              if(e.target && e.target.matches("button.reschedule")){
                e.target.preventDefault()
               console.log("object");
              db.collection("missed-task")
              .doc(missedTasksArray[j])
              .get().then((f)=>{
                let contents=f.data().content
                let m=document.querySelector(".datetime").value
                db.collection("missed-task").doc(missedTasksArray[j]).delete()
   
                db.collection("task-content")
                .add({
                  content: contents,
                  scheduledTime: m,            
                  time: new Date().toLocaleTimeString(),
                  status: "notDone",
  
                 
                })
                .then((docRef) => {
                  console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                  console.error("Error adding document: ", error);
                });
              });
  
                // db.collection("task-content")
                //   .doc(usersArray[j])
                //   .update({ status: "Done" });
                  
              }
            
            });
            //  done[j].addEventListener("click", () => {
            //   if (
            //     db.collection("task-content").doc(usersArray[j]).status != "Done"
            //   ) {
            //     db.collection("task-content")
            //       .doc(usersArray[j])
            //       .update({ status: "Done" });
            //       allcompletedtask.push(usersArray[i])
            //   } else {
            //     console.log("good");
            //   }
            // });
            // gone[j].addEventListener("click", () => {
            //   if (
            //     db.collection("task-content").doc(usersArray[j]).status != "Missed"
            //   ) {
            //     db.collection("task-content")
            //       .doc(usersArray[j])
            //       .update({ status: "Missed" });
            //      allmissedtask.push(usersArray[i]);
               
            //   } else {
            //     console.log("good");
            //   }
            // });
            
   
  
            // gone[i].addEventListener("click", () => {
            //   if (
            //     db.collection("task-content").doc(usersArray[i]).status !=
            //     "missed"
            //   ) {
            //     db.collection("task-content")
            //       .doc(usersArray[i])
            //       .update({ status: "missed" });
            //   } else {
            //     return;
            //   }
            // });
          }
        })
  
      });
  };
  
  
  let readMissedData = () => {
    db.collection("missed-task")
      .get()
      .then((data) => {
        let getdata = data.docs.map((item) => {
          return { ...item.data() };
        });
  
        for (let i = 0; i < getdata.length; i++) {
          showDataMissed(getdata[i].content, getdata[i].scheduledTime);
        }
        console.log(getdata);
      });
  };
  let readCompletedData = () => {
    db.collection("done-task")
      .get()
      .then((data) => {
        let getdata = data.docs.map((item) => {
          return { ...item.data() };
        });
        
  
        for (let i = 0; i < getdata.length; i++) {
          showDataCompleted(getdata[i].content, getdata[i].scheduledTime);
          
          
        }
        
      });
    };
    
  document.querySelector(".submitBtn").addEventListener("click", () => {
    saveData();
    content.value = "";
    setTimeout(() => {
      
      location.reload()
    }, 1000);
  });
  taskContent.addEventListener("click", (e) => {
    e.preventDefault();
  });
  readData();
  function showDataAll(itemContent, itemTime, scheduledTime) {
    let div = document.createElement("div");
    div.innerHTML = ` 
    <div class="newAllTasks">
    <button class="done">done</button>
    <button class="gone">gone</button>
    <div class="taskName">${itemContent}</div>
    
    </div>
    <div class="times">
    <div class="time">Time scheduled: ${itemTime}</div>
    <div class="toComplete">To be done in: ${scheduledTime}</div>        
    </div>
    `;
    allTasks.appendChild(div);
  }
  function showDataCompleted(itemContent, scheduledTime) {
    let div = document.createElement("div");
    div.innerHTML = ` 
    <div class="newAllTasks">
    <i class="fa fa-2x fa-regular fa-circle done"></i>
    <div class="taskName">${itemContent}</div>
    <div class="time">Time scheduled: ${scheduledTime}</div>
    `;
    completedTasks.appendChild(div);
  }
  function showDataMissed(itemContent, scheduledTime) {
    let div = document.createElement("div");
    div.innerHTML = ` 
    <div class="newAllTasks hide">
          
    <div class="taskName">${itemContent}</div>
    
    <input type="datetime-local" required class="datetime">
    <button type="submit" class="reschedule">reschedule</button>
  </div>
    
    `;
    missedTasks.appendChild(div);
  }
  document.querySelector(".newAllTasks")
  .addEventListener("click", (e) => {
    
      if(e.target && e.target.matches("div.times")){
        times.classList.toggle("hide");
      }
  
  });
  
  let updateData = (id) => {
    db.collection("task-content")
      .doc(id)
      .update({
        status: "done",
      })
      .then(() => {
        alert("Data Updated");
      });
  };
  
  
  console.log(missedTasksArray);
  
  //getting the id's
  
  function showComp(){
    
  
     }
  showComp()
  function once(fn, context) { 
    var result;
    return function() { 
        if (fn) {
            result = fn.apply(context || this, arguments);
            fn = null;
        }
        return result;
    };
  }
  let getAllData=once(readData)
  let getAllMissedData=once(readMissedData)
  let getAllCompletedData=once(readCompletedData)
  $(window).load(function() {
          // Animate loader off screen
          $(".se-pre-con").fadeOut("slow");;
      });
    // let redo=document.querySelector(".redo")
    // if(redo){
  
    //   addEventListener("click",(e)=>{
    //     e.preventDefault()
    //   })
    // }
  
  
  // missedTasks.addEventListener("click",(e)=>{
  //   if(e.target && e.target.matches("button.reschedule")){
  //     console.log("object");
  //     e.preventDefault()
  //   }
  // })
  // missedTasks.addEventListener("click",(e)=>{
  //   if(e.target && e.target.matches("form.redo")){
  //     console.log("object");
  //     e.preventDefault()
  //   }
  // })