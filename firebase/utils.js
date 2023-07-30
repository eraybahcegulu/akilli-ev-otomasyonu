import { database } from "./firebase";
import { ref, set, onValue } from "firebase/database";

export function addHomeDataFirebase(uid, homeState) {
  set(ref(database, "users/" + uid), homeState);
}

export function listenHomeDataFirebase(uid, setState, setIsLoaded) {
  const homeRef = ref(database, "users/" + uid);
  onValue(homeRef, (snapshot) => {
    const data = snapshot.val();
    setState(data);
    setIsLoaded(true);
  });
}
