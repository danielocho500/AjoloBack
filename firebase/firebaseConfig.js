const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
    apiKey: "AIzaSyAj9F2wMSqJxM6q04RZLhq-zIKuwdrsAMk",
    authDomain: "ajoloferia-1080c.firebaseapp.com",
    projectId: "ajoloferia-1080c",
    storageBucket: "ajoloferia-1080c.appspot.com",
    messagingSenderId: "29168254468",
    appId: "1:29168254468:web:e7b6acea185a64553e7f51",
    measurementId: "G-CFC13GSKGY"
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  module.exports = {
    storage
  }