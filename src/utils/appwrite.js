import { Client, Account, Databases, ID,Query } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://fra.cloud.appwrite.io/v1') // ✅ Set your endpoint
  .setProject('67fe470600195530ddf2');             // ✅ Set your project ID
export const account = new Account(client);
export const databases = new Databases(client);
console.log(databases)
export { ID,Query }; // ✅ Correct way to export ID (it's not created with `new`, just exported)

export async function getCurrentUser() {
  try {
    const user = await account.get();
    console.log("---------->");
    return user;
  } catch (err) {
    return null;
  }
}
