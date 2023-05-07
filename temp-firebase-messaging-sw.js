importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');


const firebaseConfig = {
  apiKey: "AIzaSyCdTCQCmGVAkgute62epB1A8qAL5X8DEsU",
  authDomain: "chatapp-c0ee4.firebaseapp.com",
  databaseURL: "https://chatapp-c0ee4-default-rtdb.firebaseio.com",
  projectId: "chatapp-c0ee4",
  storageBucket: "chatapp-c0ee4.appspot.com",
  messagingSenderId: "716512719757",
  appId: "1:716512719757:web:4bfc2c064d0b3354d083c4"
};

firebase.initializeApp(firebaseConfig);

firebase.messaging();