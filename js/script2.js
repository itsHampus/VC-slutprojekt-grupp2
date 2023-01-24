// ---------------------------------- VANNILA JS
console.log('tjenahejsan');
const sendBtn = document.getElementById('messageBtn');
sendBtn.addEventListener('click', (event) => {
  event.preventDefault();

  const username = document.getElementById('usernameInput').value;
  const userContent = document.getElementById('userContentInput').value;

  // console.log(userContent);

  writeUserData(username, userContent);
})

// -----------------------FIREBASE

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getDatabase, ref, set, onValue, remove } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

//Skriver
function writeUserData(userID, userContent) {
  set(ref(db, userID), {
    username: userID,
    userContent: userContent
  });
}
// writeUserData();
onValue(ref(db, '/'), (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    const data = childSnapshot.val();
    console.log(childSnapshot.key);
    const userPostContainer = document.createElement('div');
    const userPostUsername = document.createElement('h1');
    userPostUsername.innerText = data.username;
    const userPostContent = document.createElement('p');
    userPostContent.innerText = data.userContent;
    userPostContainer.append(userPostContent, userPostUsername);
    document.body.querySelector('#messageboardContainer').append(userPostContainer);
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



