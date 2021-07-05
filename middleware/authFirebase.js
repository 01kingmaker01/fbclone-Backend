import firebase from "../firebase";

export const authMiddleware = async (req, res, next) => {
  try {
    if (!res.locals.currentUser || res.locals.currentUser == undefined) {
      console.log({ currentUser: res.locals.currentUser });
      // console.log(req.headers);
      const headerToken = await req.headers.authorization;

      if (!headerToken) {
        return console.error({ message: "No Token Provided" });
      }

      if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
        console.error({ message: "Invalid token" }).status(401);
      }

      const token = headerToken.split(" ")[1];

      const decodedToken = await firebase.auth().verifyIdToken(token);

      res.locals.currentUser = decodedToken.uid;
      console.log({ uid: res.locals.currentUser });
      // console.log({ decodedToken });/
    }
    next();
  } catch (e) {
    console.error(e);
  }
};
