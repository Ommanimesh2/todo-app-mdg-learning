const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB4szkpPQuQgo9f6x2knBH4_ikO0t-rjbo",
    authDomain: "todo-app-e085b.firebaseapp.com",
    databaseURL: "https://todo-app-e085b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "todo-app-e085b",
    storageBucket: "todo-app-e085b.appspot.com",
    messagingSenderId: "812199395594",
    appId: "1:812199395594:web:ec37cffcd306d66448baf3",
    measurementId: "G-VGP64NR6D4"
  });
  
  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();

const register = () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    auth.createUserWithEmailAndPassword(email, password)
    .then((res) => {
        console.log(res.user)
    })
    .catch((err) => {
        alert(err.message)
        console.log(err.code)
        console.log(err.message)
    })
}
const saveData = () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    db.collection('todo-content')
    .add({
        email: email,
        password: password
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

document.getElementById("sub").addEventListener("click",()=>{
    register()
    saveData()
})
