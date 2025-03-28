import { db } from "../config/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const saveUserToFirestore = async (user) => {
  if (!user || !user.uid) return;

  try {
    const userRef = doc(db, "users", user.uid);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      const userData = {
        createdAt: new Date().toISOString(),
        email: user.email || "",
        name: user.displayName || "",
        phone: user.phoneNumber || "", 
        role: "user",
        status: "active",
      };

      await setDoc(userRef, userData);
      console.log("✅ User successfully saved to Firestore:", userData);
    } else {
      console.log("⚠️ User already exists in Firestore.");
    }
  } catch (error) {
    console.error("❌ Error saving user to Firestore:", error);
  }
};
