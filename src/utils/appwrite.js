import { Client, Account, Databases, ID } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://fra.cloud.appwrite.io/v1') // ✅ Set your endpoint
  .setProject('67fe470600195530ddf2');             // ✅ Set your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export { ID }; // ✅ Correct way to export ID (it's not created with `new`, just exported)

export async function getCurrentUser() {
  try {
    const user = await account.get();
    console.log(user);
    return user;
  } catch (err) {
    return null;
  }
}
