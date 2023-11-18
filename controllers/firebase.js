import admin from 'firebase-admin';

import serviceAccount from './firebase/safeguardapplication-firebase-adminsdk-ye5ve-2d88f6e5d6.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function sendPushNotification(deviceToken, notification) {
    try {
      await admin.messaging().send(deviceToken, { notification });
    } catch (error) {
      throw new Error(`Error sending push notification: ${error.message}`);
    }
  }