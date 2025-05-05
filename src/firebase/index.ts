// firebaseDB.ts
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, get, onValue, update, remove, off, DatabaseReference, Unsubscribe } from "firebase/database";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCinwkzBSxSxtNvGlv1LVikqyAlwG-CSKM",
    authDomain: "weather-app-3088e.firebaseapp.com",
    databaseURL: "https://weather-app-3088e-default-rtdb.firebaseio.com",
    projectId: "weather-app-3088e",
    storageBucket: "weather-app-3088e.appspot.com",
    messagingSenderId: "33642833278",
    appId: "1:33642833278:web:3fb358224b28eb36e4bf2f"
};

// Initialize app & db
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

/**
 * Add a new record (auto-generated key)
 */
export const addRecord = async <T>(collection: string, data: T): Promise<string> => {
    const newRef = push(ref(db, collection));
    await set(newRef, data);
    return newRef.key!;
};

/**
 * Set data at a specific path (overwrites existing)
 */
export const setRecord = async <T>(path: string, data: T): Promise<void> => {
    await set(ref(db, path), data);
};

/**
 * Get data once from a path
 */
export const getRecord = async <T = any>(path: string): Promise<T | null> => {
    const snapshot = await get(ref(db, path));
    return snapshot.exists() ? (snapshot.val() as T) : null;
};

/**
 * Subscribe to live changes from a path
 * Returns an unsubscribe function
 */
export const subscribeToRecord = <T = any>(
    path: string,
    callback: (data: T | null) => void
): Unsubscribe => {
    const dbRef: DatabaseReference = ref(db, path);
    const listener = onValue(dbRef, (snapshot) => {
        callback(snapshot.exists() ? (snapshot.val() as T) : null);
    });
    return () => off(dbRef, "value", listener);
};

/**
 * Update data at a path (merges)
 */
export const updateRecord = async (path: string, updates: Partial<any>): Promise<void> => {
    await update(ref(db, path), updates);
};

/**
 * Delete data at a path
 */
export const deleteRecord = async (path: string): Promise<void> => {
    await remove(ref(db, path));
};

export default db;
