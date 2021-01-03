import firebase from "./imports/firebase/app.js";
import { $ } from "./misc.js";

/**
 * @typedef {{
 *   name: string;
 * }} Item
 */

// ----------------------------------------------------------------

main();

// ----------------------------------------------------------------

async function main() {
  init();
  initializeAuthUis();

  const items = await getItemList();
  renderItemList(items);
}

function init() {
  firebase.initializeApp({
    apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    appId: "x-local-emu",
    authDomain: "x-local-emu.firebaseapp.com",
    projectId: "x-local-emu",
  });

  initializeAuthUis();

  const isEmulating = window.location.hostname === "localhost";
  if (isEmulating) {
    // eslint-disable-next-line no-console
    console.log("[Firebase] Using local emulator");

    firebase.firestore().settings({
      host: "localhost:8080",
      ssl: false,
    });
  }
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

async function getItemList() {
  const db = firebase.firestore();

  const ssItems = await db.collection("items").get();
  const items = ssItems.docs.map((v) => createItem(v.data()));
  return items;
}

/**
 * @param {Item[]} items
 */
function renderItemList(items) {
  const elList = document.querySelector("#item-list");
  // eslint-disable-next-line no-restricted-syntax
  for (const item of items) {
    const elItem = document.createElement("li");
    elItem.textContent = item.name || "(No name)";
    elList?.appendChild(elItem);
  }
}

/**
 * @param {Partial<Item>} [initial]
 * @returns {Item}
 */
function createItem(initial) {
  return {
    name: "",
    ...initial,
  };
}
