import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

// Check if a username exists in the users collection
export async function isUsernameExists(username) {
  const q = query(collection(db, "users"), where("username", "==", username));
  const querySnapshot = await getDocs(q);
  return querySnapshot.size > 0;
}

// Check if a user is an admin
export function ifUserAdmin(user) {
  return user?.email === "maznaviofficial@gmail.com" || user?.password === "maznavi786";
}

// export default async function isQuote_writerExists(Quote_writer) {
//     const q = query(collection(db, "quotes"), where("Quote_writer", "==", Quote_writer));
//     const querySnapshot = await getDocs(q);
//     return querySnapshot.size > 0;
// }
// export default async function isAuthorExists(author) {
//     const q = query(collection(db, "poems"), where("author", "==", author));
//     const querySnapshot = await getDocs(q);
//     return querySnapshot.size > 0;
// }
// export default async function isTopicExists(topic) {
//     const q = query(collection(db, "Articles"), where("topic", "==", topic));
//     const querySnapshot = await getDocs(q);
//     return querySnapshot.size > 0;
// }