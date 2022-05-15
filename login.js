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

addTaskBtn.addEventListener("click", () => {
  content.classList.toggle("hide");
  document.querySelector(".timeToComplete").classList.toggle("hide");

  document.querySelector(".submitBtn").classList.toggle("hide");
});
function createTabs(item) {
  item.classList.remove("hide");
}
function removeTabs(item1, item2) {
  item1.classList.add("hide");
  item2.classList.add("hide");
}

const submit = document.querySelector("#submit");
const signup = document.querySelector(".signup");
const log = document.querySelector(".log");
const login = document.querySelector(".login");
login.classList.add("hide");
signup.classList.add("hide");
let signuppop = document.querySelector(".signuppop");
let loginpop = document.querySelector(".loginpop");
signuppop.addEventListener("click", () => {
  signup.classList.remove("hide");
  login.classList.add("hide");
});
loginpop.addEventListener("click", () => {
  signup.classList.add("hide");
  login.classList.remove("hide");
  console.log("object");
});
let db = firebaseApp.firestore();
document.querySelector(".pageContent").classList.add("hide");

submit.addEventListener("click", (e) => {
  e.preventDefault();
});
log.addEventListener("click", (e) => {
  e.preventDefault();
});

async function sign(e) {
  let email = document.querySelector("#email");
  let password = document.querySelector("#password");
  try {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
async function logins(e) {
  let email = document.querySelector(".email");
  let password = document.querySelector(".password");

  try {
    const result = await firebase
      .auth()
      .signInWithEmailAndPassword(email.value, password.value);
    console.log(result);

    document.querySelector(".pageContent").classList.remove("hide");
    document.querySelector(".formContent").classList.add("hide");
    readData(result.user);
    document.querySelector(".submitBtn").addEventListener("click", () => {
      if(document.querySelector(".timeToComplete").value==null){
        alert("please set the time")
      }
      else{
      setTimeout(() => {
        removeall();
      }, 100);
      setTimeout(() => {
        readData(result.user);
      }, 200);
             
      saveData(result.user);
      content.value = "";
      console.log("done");
    }
    });

    All.addEventListener("click", () => {
      setTimeout(() => {
        removeall()
      }, 1000);
      setTimeout(() => {
        readData(result.user);
      }, 1100);
      createTabs(allTasks);
      removeTabs(missedTasks, completedTasks);
      addTaskVisible.classList.remove("hide");
      
      document.querySelector(".submitBtn").classList.remove("hide");
      content.classList.remove("hide");
      All.classList.add("highlight");
      Missed.classList.remove("highlight");
      Completed.classList.remove("highlight");
      document.querySelector(".timeToComplete").classList.remove("hide");
    });

    Missed.addEventListener("click", () => {
      createTabs(missedTasks);     
      removemiss()
        readMissedData(result.user);
      removeTabs(allTasks, completedTasks);
      addTaskVisible.classList.add("hide");
      content.classList.add("hide");
      document.querySelector(".submitBtn").classList.add("hide");
      All.classList.remove("highlight");
      Missed.classList.add("highlight");
      Completed.classList.remove("highlight");
    });
    Completed.addEventListener("click", () => {
      setTimeout(() => {
       removecomp()
      }, 500);
      setTimeout(() => {
        readCompletedData(result.user);
      }, 600);
      createTabs(completedTasks);
      removeTabs(missedTasks, allTasks);
      document.querySelector(".submitBtn").classList.add("hide");
      content.classList.add("hide");
      addTaskVisible.classList.add("hide");
      taskContent.classList.add("hide");
      All.classList.remove("highlight");
      Missed.classList.remove("highlight");
      Completed.classList.add("highlight");
    });
  } catch (error) {
    console.log(error);
  }
}
async function logout(e) {
  console.log("objects");

  document.querySelector(".pageContent").classList.add("hide");
  document.querySelector(".formContent").classList.remove("hide");
  setTimeout(() => {
    removeall();
  }, 100);
  await firebase.auth().signOut();
}

let saveData = (user) => {
  let content = document.querySelector(".content").value;
  let thatTime = new Date().toLocaleTimeString();
  let scheduledTime = document.querySelector(".timeToComplete").value;
  

    console.log(scheduledTime);
    db.collection("task-content").add({
      uid: user.uid,
      content: content,
      time: thatTime,
      scheduledTime: scheduledTime,
      status: "addedNow",
    });
  
  };
$(window).load(function () {
  $(".se-pre-con").fadeOut("slow");
});