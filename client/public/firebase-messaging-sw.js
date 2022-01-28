// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}

const firebaseConfig = {
  apiKey: "AIzaSyBzqoDI7GaiigRRAX1n9-uaGptCXIM8X3c",
  authDomain: "client-cde78.firebaseapp.com",
  projectId: "client-cde78",
  storageBucket: "client-cde78.appspot.com",
  messagingSenderId: "761212195026",
  appId: "1:761212195026:web:0a31aeeed3e92bc074dd0b",
};

// Inicializar firebase
firebase.initializeApp(firebaseConfig);

// instancia dela funcion messaging
const messaging = firebase.messaging();

// esta funcion escucha las notificaciones cuando la app esta en segundo plano.
messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    url: payload.notification.url,
  };

  // Muestra la notificacion
  self.registration.showNotification(notificationTitle, notificationOptions);
});
