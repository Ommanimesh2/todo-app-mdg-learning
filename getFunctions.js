let completedTasksArray = [];
let missedTasksArray = [];
let allTasksArray = [];
async function readCompletedData(user){
  let data = await db.collection("done-task")
    .where("uid", "==", user.uid)
    .get().then((data) => {
      let getdata = data.docs.map((item) => {
        return { ...item.data() };
      });
      for (let i = 0; i < getdata.length; i++) {
        if (getdata[i].status === "done") {
          showDataCompleted(getdata[i].content, getdata[i].scheduledTime);
        } else {
          alert("nothing to show");
        }
      }
    });
}
function readMissedData(user) {
  db.collection("missed-task")
    .where("uid", "==", user.uid)
    .get()
    .then((data) => {
      let getsdata = data.docs.map((item) => {
        return { ...item.data() };
      });
      for (let i = 0; i < getsdata.length; i++) {
        if (getsdata[i].status === "missed") {
          showDataMissed(getsdata[i].content, getsdata[i].scheduledTime);
        } else {
          alert("nothing to show!");
        }
      }
      doReschedule(user)

    });
}
function readData(user) {
  db.collection("task-content")
    .where("uid", "==", user.uid)
    .get()
    .then((data) => {
      let getdata = data.docs.map((item) => {
        return { ...item.data() };
      });
      getdata.forEach((e) => {
        showDataAll(e.content, e.time, e.scheduledTime);
      });
      let done = document.querySelectorAll(".done");
      let gone = document.querySelectorAll(".gone");
      for (let j = 0; j < done.length; j++) {
        done[j].addEventListener("click", () => {
          removeall()
          
         
          db.collection("task-content")
            .doc(allTasksArray[j])
            .get()
            .then(async (d) => {
                let content = await d.data().content;
                let t = await d.data().scheduledTime;
                db.collection("task-content").doc(allTasksArray[j]).delete();

                db.collection("done-task")
                  .add({
                    content: content,
                    scheduledTime: t,
                    uid: user.uid,
                    status: "done",
                  })
                  .then((docRef) => {
                    completedTasksArray.push(docRef.id);
                    setTimeout(() => {
                      readData(user)
                    }, 0.0000001);
                    console.log("callde");
                  })
                  .catch((error) => {
                    console.error("Error adding document: ", error);
                  });
              
            });
        });
      }
      for (let j = 0; j < gone.length; j++) {
        gone[j].addEventListener("click", () => {
        
           removeall()
      
    
           
           
           db.collection("task-content")
           .doc(allTasksArray[j])
            .get()
            .then(async (d) => {
              let content =await d.data().content;
              let t =await d.data().scheduledTime;
              db.collection("task-content").doc(allTasksArray[j]).delete();
       

              db.collection("missed-task")
              .add({
                  content: content,
                  scheduledTime: t,
                  uid: user.uid,
                  status: "missed",
                })
                .then((docRef) => {
                  missedTasksArray.push(docRef.id)
                  setTimeout(() => {
                    readData(user)
                  }, 0.0000001);
             
                })
                .catch((error) => {
                  console.error("Error adding document: ", error);
                });  
              });





          
        });
      }
    });

}


db.collection("task-content")
.get()
.then((e) => {
  e.forEach((doc) => {
    allTasksArray.push(doc.id);
  });
});
db.collection("done-task")
.get()
.then((e) => {
  e.forEach((doc) => {
    completedTasksArray.push(doc.id);
  });
});
db.collection("missed-task")
.get()
.then((e) => {
  e.forEach((doc) => {
    missedTasksArray.push(doc.id);
  });
});
let updateData = (id) => {
  db.collection("task-content")
    .doc(id)
    .delete()
    .then(() => {
      alert("Data Updated");
    });
      db.collection("missed-task").add;
};
function addData(contents,timeStamp,user){
  db.collection("task-content")
  .add({
      content: contents,
      scheduledTime: timeStamp,
      time: new Date().toLocaleTimeString(),
      status: "addedNow",
      uid: user.uid,
    })
    .then((e) => {
    })
    .catch((error) => {
      console.error(error);
    });
    alert("done")
}

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
let newfunc=once(addData)
let readFunctionOnce=once(readData)
