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

function get({ statement, setIsLoading, table }, setData) {
    
    let unsubscribe;
    const data = [];
    const collectionRef = collection(db, table);

    try {
        if (statement) {
            const q = query(collectionRef, statement, limit(10));

            unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log("returned data from database is ", data);
                    data.push(doc.data());
                });
                setIsLoading(false);
                debugger
                setData(data[0].theme);
            });
        } else {
            unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    
                    data.push(doc.data());
                    console.log("returned data from database is ", data);
                });
                setIsLoading(false);
                debugger
                setData(data);
            });
        }

        
        return unsubscribe;
    } catch (error) {
        console.error(error);
    }
}

async function post({ record, table }) {
    try {
        const collectionRef = collection(db, table);
        const id = uuidv4();
        const timeStamp = {
            id,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        };
        const newRecord = doc(collectionRef, id);

        await setDoc(newRecord, { ...record, timeStamp });
        console.log("User added successfully", timeStamp);
    } catch (e) {
        console.error(e);
    }
}

async function put({ updateRecord, setIsLoading, table, id }) {
    if (id) {
        try {
            const timeStamp = {
                updatedAt: serverTimestamp(),
            };

            const collectionRef = collection(db, table);
            const record = doc(collectionRef, id);

            await updateDoc(record, { ...updateRecord, timeStamp });
            setIsLoading(false);
            console.log("User updated successfully", updateRecord);
        } catch (e) {
            console.error(e);
        }
    }
}

async function remove({ id, table, setIsLoading }) {
    try {
        console.log("User ID ", id);
        if (id) {
            const collectionRef = collection(db, table);
            const record = doc(collectionRef, id);

            await deleteDoc(record);
            setIsLoading(false);
            console.log("User deleted successfully");
        }
    } catch (e) {
    console.error(e);
    }
}

export { get, post, put, remove };
