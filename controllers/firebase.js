import admin from 'firebase-admin';

import serviceAccount from '../firebase/safeguardapplication-firebase-adminsdk-ye5ve-2d88f6e5d6.json' with { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function sendPushNotification(notification) {
  admin.messaging().send(notification)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
});
  }


async function sendNotificationToUser(user, catastrophe) {
    const { deviceToken} = user;

    const notificationMessage = {
        name: 'You are in the radius of a catastrophe!',
        data: {
            catastropheId: 'test',
        },
        topic: 'general',
        
    };

    console.log("sending notif to" + user.UserName)
    // Use FCM or another push notification service to send the notification
    try {
      
        await sendPushNotification(notificationMessage);
       
    } catch (error) {
        console.error(`Error sending notification to user ${user._id}:`, error);
    }
}


  export {
    sendPushNotification,
    sendNotificationToUser
};