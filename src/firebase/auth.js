import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import bcrypt from 'bcryptjs';

const saltRounds = 10;

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Add user to Firestore
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    passwordHash: hashedpassword, // store the hashed password
  });

  return user;
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

// Fetch the stored hashed password from Firestore (assuming you have a function to do so)
const userDoc = await getUserFromFirestore(user.uid); // You'll need to implement this function
const storedHashedPassword = userDoc.passwordHash;

// Verify the password using bcrypt
const isMatch = await bcrypt.compare(password, storedHashedPassword);
if (!isMatch) {
  throw new Error('Invalid password');
}

return user;
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  // Add user to Firestore
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    provider: "google",
  });

  return user;
};


export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = async (password) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  await updatePassword(auth.currentUser, hashedPassword);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};

// Example function to get user data from Firestore
const getUserFromFirestore = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error('No such user!');
  }
};