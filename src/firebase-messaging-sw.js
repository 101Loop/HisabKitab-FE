importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');


// Initialize Firebase
var config = {
apiKey: "AIzaSyCwepaQw8OSU8fLUyHrPnLjQCIOS-1OBWI",
  authDomain: "jyessonline.firebaseapp.com",
  databaseURL: "https://jyessonline.firebaseio.com",
  projectId: "jyessonline",
  storageBucket: "jyessonline.appspot.com",
  messagingSenderId: "963057387762"
};

firebase.initializeApp(config);

var messaging = firebase.messaging();


// If you would like to customize notifications that are received in the background (Web app is closed or not in browser focus) then you should implement this optional method
messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  var notificationTitle = 'Background Message Title';
  var notificationOptions = {
    body: 'Background Message body.'

  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
