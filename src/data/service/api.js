import {
  doc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  setDoc,
  collection,
  serverTimestamp,
  query,
  where,
  limit,
} from "firebase/firestore";

import db from "../../uath/firebase";
import { v4 as uuidv4 } from "uuid";

async function get({ statement, table }) {
    let unsubscribe;
    const data = [];
    const collectionRef = collection(db, table);

    try {
        if (statement) {
            const q = query(collectionRef, statement, limit(10));

            // Wrap the onSnapshot in a Promise
            const querySnapshot = await new Promise((resolve, reject) => {
                unsubscribe = onSnapshot(q, (snapshot) => {
                    resolve(snapshot);
                }, reject);
            });

            querySnapshot.forEach((doc) => {
                console.log("Returned data from database is: ", doc.data());
                data.push(doc.data());
            });
        } else {
            const querySnapshot = await new Promise((resolve, reject) => {
                unsubscribe = onSnapshot(collectionRef, (snapshot) => {
                    resolve(snapshot);
                }, reject);
            });

            querySnapshot.forEach((doc) => {
                data.push(doc.data());
                console.log("Returned data from database is---: ", doc.data());
            });
        }

        // Return the fetched data
        return data;
    } catch (error) {
        console.error("Error fetching data: ", error);
        return [];
    } finally {
        // Clean up the snapshot listener if needed
        if (unsubscribe) {
            unsubscribe();
        }
    }
}

function post({ table, record }) {
    return new Promise(async (resolve, reject) => {
        try {
            const collectionRef = collection(db, table);
            const id = uuidv4();
            record = {
                ...record,
                id,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };
            const newRecord = doc(collectionRef, id);

            await setDoc(newRecord, record);
            console.log("User added successfully");
            resolve(record);
        } catch (e) {
            console.error(e);
            reject(e);
        }
    });
}

async function put({ table, id, updateRecord }) {
    debugger
    if (id) {
        try {
            const timeStamp = {
                updatedAt: serverTimestamp(),
            };

            const collectionRef = collection(db, table);
            const record = doc(collectionRef, id);

            await updateDoc(record, { ...updateRecord, timeStamp });
          
            console.log("User updated successfully", updateRecord);
        } catch (e) {
            console.error(e);
        }
    }
    // otherwise error page with missing ID
}

async function remove({ id, table }) {
    try {
        console.log("User ID ", id);
        if (id) {
            const collectionRef = collection(db, table);
            const record = doc(collectionRef, id);

            await deleteDoc(record);
         
            console.log("User deleted successfully");
        }
    } catch (e) {
    console.error(e);
    }
}

export { get, post, put, remove };
