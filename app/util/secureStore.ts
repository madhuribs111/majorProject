import * as SecureStore from "expo-secure-store";

// Save a value in Secure Store
export async function saveToSecureStore(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

// Retrieve a value from Secure Store
export async function getFromSecureStore(key: string): Promise<string | null> {
  return await SecureStore.getItemAsync(key);
}

// Delete a value from Secure Store
export async function deleteFromSecureStore(key: string) {
  await SecureStore.deleteItemAsync(key);
}
