// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");
import firebaseConfig from "../src/utils/firebase";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../firebase-messaging-sw.js")
    .then(function (registration) {})
    .catch(function (err) {});
}

// Inicializar firebase
firebase.initializeApp(firebaseConfig);

// instancia dela funcion messaging
const messaging = firebase.messaging();

// esta funcion escucha las notificaciones cuando la app esta en segundo plano.
messaging.onBackgroundMessage(function (payload) {
  // Customize notification here
  const notificationTitle = payload.data.Title;
  const notificationOptions = {
    body: payload.data.Challenge,
    url: payload.data.Url,
    icon: payload.data.Image,
  };
  // Muestra la notificacion
  self.registration.showNotification(notificationTitle, notificationOptions);
});
