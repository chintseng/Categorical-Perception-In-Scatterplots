import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js';
import { getFirestore, collection, getDocs, doc, setDoc, addDoc } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js'

const firebaseConfig = {
    apiKey: "AIzaSyCJsIzy152sIVFZ0zqIoC7b0yeGfphEIcw",
    authDomain: "categorical-scatterplot-study.firebaseapp.com",
    projectId: "categorical-scatterplot-study",
    storageBucket: "categorical-scatterplot-study.appspot.com",
    messagingSenderId: "1000137355550",
    appId: "1:1000137355550:web:1d3f0f47b50c48bfab590f",
    measurementId: "G-Q9XGGPEN2M"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// Get a list of cities from your database
// async function getCities(db) {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }

// await setDoc(doc(db, "cities", "LA"), {
//     name: "Los Angeles",
//     state: "CA",
//     country: "USA"
//   });

async function updateDB() {
    try {
        const docRef = await addDoc(collection(db, "tasks-pilot-2"), JSON.parse(localStorage.getItem('taskData')));
        console.log("Document written with ID: ", docRef.id);

      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export { updateDB };