import { auth } from "../firebase_config";
import { createUserWithEmailAndPassword } from "firebase/auth";
export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return doCreateUserWithEmailAndPassword(auth, email, password);
};
