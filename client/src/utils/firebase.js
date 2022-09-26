import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBvIm4awdjTWROGds-dGId7zhqici0Vexk",
  authDomain: "fir-296723.firebaseapp.com",
  databaseURL: "https://fir-296723.firebaseio.com",
  projectId: "firebase-296723",
  storageBucket: "firebase-296723.appspot.com",
  messagingSenderId: "2889986059",
  appId: "1:2889986059:web:46d643403583fdc45c170e",
  measurementId: "G-4DJTT2TTPM",
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey:
      "BB65a8VyiH1Io6kGfVo61pfjWh5i_iRiyJwXcdOXfKZ7iiefwHxkemEdQcWTIM6ir34T9Q1ZxVclwi3HX-vgyXY",
  })
    .then((currentToken) => {
      if (currentToken) {
        return currentToken;
      } else {
        // Show permission request UI
        // ...
      }
    })
    .catch((err) => {
      return err;
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export const storage = getStorage(
  initializeApp(firebaseConfig),
  "gs://storage-296723"
);
