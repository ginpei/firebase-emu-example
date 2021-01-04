# Firebase Emu Example

- [Add Firebase to your JavaScript project](https://firebase.google.com/docs/web/setup)
- [Introduction to Firebase Local Emulator Suite](https://firebase.google.com/docs/emulator-suite)
- [Connect your app to the Authentication Emulator  |  Firebase](https://firebase.google.com/docs/emulator-suite/connect_auth)
- [Connect your app to the Cloud Firestore Emulator  |  Firebase](https://firebase.google.com/docs/emulator-suite/connect_firestore)

## Try this example

```console
$ git clone git@github.com:ginpei/firebase-emu-example.git
$ cd firebase-emu-example
$ npm ci
$ npm run start
```

Then open http://localhost:5000/ (if default).

## Connect to emulator

### Authentication

```js
firebase.auth().useEmulator("http://localhost:9099");
```

### Cloud Functions

```js
firebase.functions().useEmulator("localhost", 5001);
```

### Firestore


```js
firebase.firestore().settings({ host: "localhost:8080", ssl: false });
```
