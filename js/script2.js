// ---------------------------------- VANNILA JS
const sendBtn = document.getElementById('messageBtn');
sendBtn.addEventListener('click', (event) => {
  event.preventDefault();

  const username = document.getElementById('usernameInput').value;
  const userContent = document.getElementById('userContentInput').value;
  writeUserData(username, userContent);
})

// ---------------------------------- FIREBASE

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getDatabase, ref, set, onValue, remove, push } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  databaseURL: "https://version-control-69688-default-rtdb.europe-west1.firebasedatabase.app/",
  apiKey: "AIzaSyBj0zSXvkUB_63dkxZfCjA-rdzVJlLh46c",
  authDomain: "version-control-69688.firebaseapp.com",
  projectId: "version-control-69688",
  storageBucket: "version-control-69688.appspot.com",
  messagingSenderId: "677711087595",
  appId: "1:677711087595:web:be5f999cb2d87147edfbae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

//Skriver data till databasen
function writeUserData(userID, userContent) {
  push(ref(db, userID), { //Ska vara push
    username: userID,
    userContent: userContent
  });
}
// Hämtar information från databasen varje gång ändring sker i root-mappen
onValue(ref(db, '/'), (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    // const childData = childSnapshot.val();
    // const childKey = childSnapshot.key;

    childSnapshot.forEach( (childOfTheChildSnapshot)=>{

      const childOfTheChildData = childOfTheChildSnapshot.val();
      const childchildKey = childOfTheChildSnapshot.key;
      
      const userPostContainer = document.createElement('div');
      const userPostUsername = document.createElement('h1');
      userPostUsername.innerText = childOfTheChildData.username;
      const userPostContent = document.createElement('p');
      userPostContent.innerText = childOfTheChildData.userContent;
      userPostContainer.append(userPostContent, userPostUsername);
      document.body.querySelector('#messageboardContainer').append(userPostContainer);
    } )
  })

})

//Läser
// onValue(ref(db, 'Hampus'), (snapshot) => {
//   const data = snapshot.val();
//   // alert(data.message);

// }, { onlyOnce: true });

// onValue(ref(db, '/'), (snapshot) => { //root kolla alla namn i root
//   snapshot.forEach((childSnapshot) => {
//     const childKey = childSnapshot.key;
//     const childData = childSnapshot.val();
//     console.log(childKey, childData);
//   });
// }, {
//   onlyOnce: true
// });

// onchange();

// remove(ref(db, 'Thomas').then(()=>{
//   console.log('thomas removed');
// }));



