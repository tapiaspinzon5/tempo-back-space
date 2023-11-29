// import admin from 'firebase-admin';
// import serviceAccount from './config/firebase.json';

const admin = require("firebase-admin");
const serviceAccount = require("./firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "firebase-296723.appspot.com",
});

const bucket = admin.storage().bucket("gs://storage-296723");

module.exports = {
  bucket,
};
