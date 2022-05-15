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
      console.log(getdata);
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

      console.log(getsdata);
    });
}
function readData(user) {
  db.collection("task-content")
    .where("uid", "==", user.uid)
    .get()
    .then((data) => {
      console.log(user.uid);
      let getdata = data.docs.map((item) => {
        return { ...item.data() };
      });
      getdata.forEach((e) => {
        showDataAll(e.content, e.time, e.scheduledTime);
      });
      console.log(allTasksArray);
      let done = document.querySelectorAll(".done");
      let gone = document.querySelectorAll(".gone");
      for (let j = 0; j < done.length; j++) {
        done[j].addEventListener("click", () => {
          db.collection("task-content")
            .doc(allTasksArray[j])
            .get()
            .then(async (d) => {
              if (d) {
                let content = await d.data();
                let t = await d.data();
                console.log(content);
                console.log(t);
                db.collection("task-content").doc(allTasksArray[j]).delete();

                db.collection("done-task")
                  .add({
                    content: content.content,
                    scheduledTime: t.scheduledTime,
                    uid: user.uid,
                    status: "done",
                  })
                  .then((docRef) => {
                    completedTasksArray.push(docRef.id);
                    console.log("Document written with ID: ", docRef.id);
                  })
                  .catch((error) => {
                    console.error("Error adding document: ", error);
                  });
              } else {
                console.log("gotit");
              }
            });
        });
      }
      for (let j = 0; j < gone.length; j++) {
        gone[j].addEventListener("click", () => {
          
            db.collection("task-content")
            .doc(allTasksArray[j])
            .get()
            .then(async (d) => {
              let content =await d.data().content;
              let t =await d.data().scheduledTime;
              console.log(t);
              db.collection("task-content").doc(allTasksArray[j]).delete();
       

              db.collection("missed-task")
                .add({
                  content: content,
                  scheduledTime: t,
                  uid: user.uid,
                  status: "missed",
                })
                .then((docRef) => {
                  console.log("Document written with ID: ", docRef.id);
                  missedTasksArray.push(docRef.id)
             
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
    console.log(`${doc.id}`);
    allTasksArray.push(doc.id);
  });
});
db.collection("done-task")
.get()
.then((e) => {
  e.forEach((doc) => {
    console.log(`${doc.id}`);
    completedTasksArray.push(doc.id);
  });
});
db.collection("missed-task")
.get()
.then((e) => {
  e.forEach((doc) => {
    console.log(`${doc.id}`);
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
      console.log(e);
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
