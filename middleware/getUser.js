import firebase from "../firebase";
export const postArray = async (param) =>
  await Promise.all(
    param.map(async (post) => {
      const { displayName, photoURL } = await firebase
        .auth()
        .getUser(post.author);
      return { displayName, photoURL, ...post._doc };
    })
  );

export const postObj = async (post) => {
  const { displayName, photoURL } = await firebase.auth().getUser(post.author);
  return { displayName, photoURL, ...post._doc };
};
