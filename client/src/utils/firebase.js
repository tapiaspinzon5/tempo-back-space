import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBzqoDI7GaiigRRAX1n9-uaGptCXIM8X3c",
  authDomain: "client-cde78.firebaseapp.com",
  projectId: "client-cde78",
  storageBucket: "client-cde78.appspot.com",
  messagingSenderId: "761212195026",
  appId: "1:761212195026:web:0a31aeeed3e92bc074dd0b",
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey:
      "BPVcCg4Xp1BhrA26ojb3HhU4nca4zu-bjirVi_YfrcUEds6-ZkrdCsFAUtlN6xk6ThkqyRznxNMe_e73a1Y4jtA",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        // Send the token to your server and update the UI if necessary
        return currentToken;
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
        // ...
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      return err;
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      resolve(payload);
    });
  });
