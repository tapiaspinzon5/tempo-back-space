// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../firebase-messaging-sw.js")
    .then(function (registration) {
      //console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      // console.log("Service worker registration failed, error:", err);
    });
}

const firebaseConfig = {
  apiKey: "AIzaSyANsokTJLSPb_yJ9484JfoGESh_1eDueQw",
  authDomain: "fcm-test-36ab9.firebaseapp.com",
  projectId: "fcm-test-36ab9",
  storageBucket: "fcm-test-36ab9.appspot.com",
  messagingSenderId: "622382328481",
  appId: "1:622382328481:web:a04da539dbde34a0005ee0",
};

// Inicializar firebase
firebase.initializeApp(firebaseConfig);

// instancia dela funcion messaging
const messaging = firebase.messaging();

// esta funcion escucha las notificaciones cuando la app esta en segundo plano.
messaging.onBackgroundMessage(function (payload) {
  //console.log("Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    url: payload.data.url,
    icon: payload.data.image,
  };

  // Muestra la notificacion
  self.registration.showNotification(notificationTitle, notificationOptions);
});
