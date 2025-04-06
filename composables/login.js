import { auth, db, provider } from "~/firebase.config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default async function useLogin() {
  const firebaseUser = useState("firebaseUser");
  const googleUser = useState("googleUser");
  const firebaseID = useState("firebaseID");

  const login = async () => {
    const me = await signInWithPopup(auth, provider)
      .then(async (result) => {
        GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        googleUser.value = user;
        const userRef = doc(db, "users", result.user.uid);
        const userRefSnap = await getDoc(userRef);
        if (!userRefSnap.exists()) {
          await setDoc(doc(db, "users", result.user.uid), {
            UID: result.user.uid,
            name: user.displayName,
            admin: false,
            isBanned: false,
            email: result.user.email,
            contributions: 0,
            displayName: "Template User",
          });
          const userRef = doc(db, "users", result.user.uid);
          const userRefSnap = await getDoc(userRef);

          firebaseUser.value = userRefSnap.data();
          firebaseID.value = userRefSnap.id;
        } else {
          firebaseUser.value = userRefSnap.data();
          firebaseID.value = userRefSnap.id;
        }
      })
      .catch((error) => {});
  };
  await login();
}
