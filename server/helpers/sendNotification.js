// import { getMessaging } from 'firebase-admin/messaging';

const {getMessaging} = require('firebase-admin/messaging');

// Use this function to send push notifications to a specific user
exports.sendFCMMessage= async (fcmToken, msg) => {
    try {
        const res = await getMessaging().send({
            webpush: {
                // notification: {
                //     ...msg,
                //     icon: 'https://your-website.com/favicon.png',
                //     requireInteraction: msg.requireInteraction ?? false,
                //     actions: [{
                //         title: 'Open',
                //         action: 'open',
                //     }],
                //     data: {
                //         link: msg.link,
                //     },
                // },
                "data": {
                  "title": "Te asiganron un reto !",
                  "body":"",
                  "image": "https://i.ibb.co/jz3nQ4H/tp-short.png",
                  "url":"http://localhost:3000/#/activitiesview"
               },
            },
            token: fcmToken,
        });
        return res;
    } catch (e) {
        console.error('sendFCMMessage error', e);
    }
}