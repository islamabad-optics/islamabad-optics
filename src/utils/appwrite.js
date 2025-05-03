// appwrite.js

import { Client, Account, Databases, ID, Query } from 'appwrite';

// Initialize Appwrite client
const client = new Client();
client
  .setEndpoint('https://fra.cloud.appwrite.io/v1') // ✅ Set your Appwrite endpoint
  .setProject('67fe470600195530ddf2');             // ✅ Set your Appwrite project ID

// Services
export const account = new Account(client);
export const databases = new Databases(client);
export { ID, Query };

// =============================
// ✅ Authentication Helpers
// =============================

// Create email session (login)
export async function loginWithEmail(email, password) {
  try {
    const session = await account.createEmailSession(email, password);
    return session;
  } catch (err) {
    console.error('Login failed:', err.message);
    throw err;
  }
}

// Get current authenticated user
export async function getCurrentUser() {
  try {
    const user = await account.get();
    return user;
  } catch (err) {
    // Likely guest (not logged in)
    return null;
  }
}

// Logout current user
export async function logout() {
  try {
    await account.deleteSession('current');
    return true;
  } catch (err) {
    console.error('Logout failed:', err.message);
    return false;
  }
}
