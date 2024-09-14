import { app } from "./server";
import { getFirestore, Firestore } from "firebase-admin/firestore";

let db: Firestore | null = null;

export function getDb(): Firestore {
  if (!db) {
    db = getFirestore(app);
  }
  return db;
}

export function getFriendById(id: string) {
  const friendsRef = getDb().collection("friends");
  return friendsRef.doc(id).get();
}
