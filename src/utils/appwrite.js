import { Client, Account, Databases } from 'appwrite';

const client = new Client();

// Set your Appwrite endpoint and project ID
client
  .setEndpoint('https://fra.cloud.appwrite.io/v1') // ✅ REQUIRED: Set the endpoint
  .setProject('67fe470600195530ddf2');         // ✅ Your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export async function getCurrentUser() {
    try {
      const user = await account.get();
      console.log(user)
      return user;
    } catch (err) {
      return null;
    }
  }