/** @type {import("firebase/app").default} */
// @ts-ignore
// eslint-disable-next-line prefer-destructuring
const firebase = globalThis.firebase;

if (!firebase) {
  throw new Error(
    'Add `<script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js"></script>`'
  );
}

export default firebase;
