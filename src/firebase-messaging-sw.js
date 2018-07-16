importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');


// Initialize Firebase
var config = {
  apiKey: "AIzaSyBSPoo7dYUK5QyGCNk_vfdyIEevwq4A8Co",
  authDomain: "hisabkitabin.firebaseapp.com",
  databaseURL: "https://hisabkitabin.firebaseio.com",
  projectId: "hisabkitabin",
  storageBucket: "hisabkitabin.appspot.com",
  messagingSenderId: "1011998306961"
};

firebase.initializeApp(config);

var messaging = firebase.messaging();


// If you would like to customize notifications that are received in the background (Web app is closed or not in browser focus) then you should implement this optional method
messaging.setBackgroundMessageHandler(function (payload) {
  // console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  var notificationTitle = 'Background Message Title';
  var notificationOptions = {
    body: 'Background Message body.'

  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
