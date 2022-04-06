// import { getMessaging } from 'firebase-admin/messaging';

const {getMessaging} = require('firebase-admin/messaging');

// Use this function to send push notifications to a specific user
exports.sendFCMMessage= async (tlName, nameActivity, fcmToken) => {
    try {
        const res = await getMessaging().send({
            webpush: {
                "data": {
                  "Title": "you have been assigned a challenge !",
                  "Challenger" : `${tlName}`,
                  "Challenge": `${nameActivity}`,
                  "Image": "https://i.ibb.co/jz3nQ4H/tp-short.png",
                  "Url":"http://localhost:3000/#/activitiesview"
               },
            },
            token: fcmToken,
        });
        return res;
    } catch (e) {
        console.error('sendFCMMessage error', e);
    }
}