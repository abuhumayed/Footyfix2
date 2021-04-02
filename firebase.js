import * as firebase from "firebase";

import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLv4kwKyU4-FhwxRasdU3C4ubLbOiYg7U",
  authDomain: "footyfixapp.firebaseapp.com",
  projectId: "footyfixapp",
  storageBucket: "footyfixapp.appspot.com",
  messagingSenderId: "48876726851",
  appId: "1:48876726851:web:cb82b30b19324e365802f6"
  };
  
  let app;

  //If APP hasn't been initialized  update app variable to firebase instant
  if ( firebase.apps.length === 0){

    app = firebase.initializeApp(firebaseConfig);
  }

  //else us the firebase app which has been initialized so you dont have to keep initializing app uneccessarily
  else{
      app = firebase.app();
  }

  const db = app.firestore();    // Setting up database access variable
  const auth = firebase.auth();  // Setting up database Authentication variable

export {db, auth}; // gives aceess to Firebase Varialbles