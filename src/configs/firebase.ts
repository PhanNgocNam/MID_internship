import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { IUser } from "../services/login/loginService";

const firebaseConfig = {
  apiKey: "AIzaSyAAK-d1TYciwEViS7r-pVGIGmxxefr5Cpc",
  authDomain: "pet-music-ccd25.firebaseapp.com",
  projectId: "pet-music-ccd25",
  storageBucket: "pet-music-ccd25.appspot.com",
  messagingSenderId: "344841158505",
  appId: "1:344841158505:web:d2e02de9ec748ec02047f8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<IUser> => {
  const { user } = await signInWithPopup(auth, provider);
  const { displayName, email, uid, photoURL } = user;
  return { status: 202, displayName, email, uid, photoURL };
};
