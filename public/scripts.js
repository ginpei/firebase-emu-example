import firebase from "./imports/firebase/app.js";
import { $ } from "./misc.js";

// ----------------------------------------------------------------

main();

// ----------------------------------------------------------------

async function main() {
  firebase.initializeApp({
    apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    appId: "x-local-emu",
    authDomain: "x-local-emu.firebaseapp.com",
    projectId: "x-local-emu",
  });

  initializeAuthUis();
  initializeFirestore();
}

function initializeAuthUis() {
  const isEmulating = window.location.hostname === "localhost";
  if (isEmulating) {
    firebase.auth().useEmulator("http://localhost:9099");
  }

  const auth = firebase.auth();
  $("#logIn").onclick = () =>
    auth.signInWithEmailAndPassword("test@example.com", "123456");
  $("#logOut").onclick = () => auth.signOut();

  firebase.auth().onAuthStateChanged((user) => {
    console.log("onAuthStateChanged", user?.email, user);
  });
}

function initializeFirestore() {
  const db = firebase.firestore();

  const isEmulating = window.location.hostname === "localhost";
  if (isEmulating) {
    db.settings({ host: "localhost:8080", ssl: false });
  }

  $("#getItems").onclick = async () => {
    const ssItems = await db.collection("items").get();
    const items = ssItems.docs.map((v) => v.data());
    console.log("Get items", items);
  };
}
