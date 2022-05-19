const { getMessaging } = require("firebase-admin/messaging");

// Use this function to send push notifications to a specific user
exports.sendFCMMessage = async (sender, nameActivity, fcmToken, type) => {
  let webpush = "";
  console.log(type);

  switch (type) {
    case "challenge":
      webpush = {
        data: {
          Title: "You have been assigned a challenge!",
          Challenger: `${sender}`,
          Challenge: `${nameActivity}`,
          Image: "https://i.ibb.co/jz3nQ4H/tp-short.png",
          Url: "http://localhost:3000/#/activitiesview",
        },
      };
      break;

    case "mission":
      webpush = {
        data: {
          Title: "You have been assigned a Mission!",
          From: `${sender}`,
          Mission: `${nameActivity}`,
          Image: "https://i.ibb.co/jz3nQ4H/tp-short.png",
          Url: "http://localhost:3000/#/activitiesview",
        },
      };
      break;

    case "TPV":
      webpush = {
        data: {
          Title: "You have been assigned a TPV !",
          From: `${sender}`,
          TPV: `${nameActivity}`,
          Image: "https://i.ibb.co/jz3nQ4H/tp-short.png",
          Url: "http://localhost:3000/#/activitiesview",
        },
      };
      break;

    default:
      break;
  }

  console.log(webpush);

  try {
    const res = await getMessaging().send({
      webpush,
      token: fcmToken,
    });
    return res;
  } catch (e) {
    console.error("sendFCMMessage error", e);
  }
};
