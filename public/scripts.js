import firebase from "./imports/firebase/app.js";
import { $ } from "./misc.js";

// ----------------------------------------------------------------

main();

// ----------------------------------------------------------------

async function main() {
  initializeFirebase();

  setUpAuthenticationUi();
  setUpFunctionsUi();
  setUpFirestoreUi();
}

function initializeFirebase() {
  firebase.initializeApp({
    apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    appId: "x-local-emu",
    authDomain: "x-local-emu.firebaseapp.com",
    projectId: "x-local-emu",
  });

  const isEmulating = window.location.hostname === "localhost";
  if (isEmulating) {
    firebase.auth().useEmulator("http://localhost:9099");
    firebase.functions().useEmulator("localhost", 5001);
    firebase.firestore().settings({ host: "localhost:8080", ssl: false });
  }
}

function setUpAuthenticationUi() {
  const auth = firebase.auth();

  $("#logIn").onclick = () =>
    auth.signInWithEmailAndPassword("test@example.com", "123456");
  $("#logOut").onclick = () => auth.signOut();

  firebase.auth().onAuthStateChanged((user) => {
    // eslint-disable-next-line no-console
    console.log("onAuthStateChanged", user?.email, user);
  });
}

function setUpFunctionsUi() {
  const functions = firebase.functions();
  const helloWorld = functions.httpsCallable("helloWorld");

  $("#kickFunction").onclick = async () => {
    const res = await helloWorld();
    // eslint-disable-next-line no-console
    console.log("Kick a function", res);
  };
}

function setUpFirestoreUi() {
  const db = firebase.firestore();

  $("#getItems").onclick = async () => {
    const ssItems = await db.collection("items").get();
    const items = ssItems.docs.map((v) => ({ id: v.id, ...v.data() }));
    // eslint-disable-next-line no-console
    console.log("Get items", items);
  };
}
