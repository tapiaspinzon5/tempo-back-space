import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyANsokTJLSPb_yJ9484JfoGESh_1eDueQw",
  authDomain: "fcm-test-36ab9.firebaseapp.com",
  projectId: "fcm-test-36ab9",
  storageBucket: "fcm-test-36ab9.appspot.com",
  messagingSenderId: "622382328481",
  appId: "1:622382328481:web:a04da539dbde34a0005ee0",
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey:
      "BMWZMH-KjWzuMb_HmmhAx53RPrJpT7w-Jz-2j8MMG31OeOyO2lXrzK8pdspjxkJpeiT4v27AFIPYSJ6eDWae4YE",
  })
    .then((currentToken) => {
      if (currentToken) {
        // console.log("current token for client: ", currentToken);
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
