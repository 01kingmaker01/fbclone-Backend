import admin from "firebase-admin";
import serviceAccount from "./fb.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
