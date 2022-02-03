// import admin from 'firebase-admin';
// import serviceAccount from './config/firebase.json';

const admin = require('firebase-admin');
const serviceAccount = require('./firebase.json');

exports.init = () => {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}