const functions = require("firebase-functions");

exports.helloWorld = functions.https.onRequest((res, req) => {
  functions.logger.info("Hello logs!", { structuredData: true });

  req.header("Access-Control-Allow-Origin", "*");
  req.header("Access-Control-Allow-Headers", "*");

  if (res.method === "OPTIONS") {
    req.end();
    return;
  }

  req.json({ data: { message: "Hello from Firebase!" } });
});
