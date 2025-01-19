import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

// Check if a username exists in the users collection
export async function isUsernameExists(username) {
  const q = query(collection(db, "users"), where("username", "==", username));
  const querySnapshot = await getDocs(q);
  return querySnapshot.size > 0;
}

// Check if a writer exists in the articles collection
export async function isWriter_nameExists(writer_name) {
  const q = query(collection(db, "Articles"), where("writer_name", "==", writer_name));
  const querySnapshot = await getDocs(q);
  return querySnapshot.size > 0;
}

// Check if a user is an admin
export function ifUserAdmin(user) {
  return (user?.email === "maznaviofficial@gmail.com") && user?.password === "maznavi786";
}
