import { Injectable } from '@angular/core';
import QB from 'quickblox';

@Injectable({
  providedIn: 'root',
})
export class QuickbloxService {
  constructor() {
    // Initialize QuickBlox SDK with your app credentials
    this.initializeQB();
  }

  // Initialize QuickBlox
  initializeQB() {
    const appId = 'YOUR_APP_ID';
    const authKey = 'YOUR_AUTH_KEY';
    const authSecret = 'YOUR_AUTH_SECRET';
    const accountKey = 'YOUR_ACCOUNT_KEY'; // Add this key

    // Initialize with all required parameters
    QB.init(appId, authKey, authSecret, accountKey);

    console.log('QuickBlox initialized');
  }

  // Create a session
  createSession() {
    return new Promise((resolve, reject) => {
      const params = { login: 'YOUR_LOGIN', password: 'YOUR_PASSWORD' };
      QB.createSession(params, (error, session) => {
        if (error) {
          console.error('Error creating session:', error);
          reject(error);
        } else {
          console.log('Session created:', session);
          resolve(session);
        }
      });
    });
  }

  // Other methods remain unchanged
}
