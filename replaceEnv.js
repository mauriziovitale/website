require('dotenv').config( { path: '.env' });
const fs = require('fs');

const args = require('minimist')(process.argv.slice(2))
let envValue = false;
let fileName = "environment";

if (args['prod'] === "true") {
  envValue = true;
  fileName = "environment.prod"
}

const FIREBASE_CONFIG_API_KEY = process.env.FIREBASE_CONFIG_API_KEY || "FIREBASE_CONFIG_API_KEY";
const FIREBASE_CONFIG_AUTH_DOMAIN = process.env.FIREBASE_CONFIG_AUTH_DOMAIN;
const FIREBASE_CONFIG_DATABASE_URL = process.env.FIREBASE_CONFIG_DATABASE_URL;
const FIREBASE_CONFIG_PROJECT_ID = process.env.FIREBASE_CONFIG_PROJECT_ID;
const FIREBASE_CONFIG_STORAGE_BUCKET = process.env.FIREBASE_CONFIG_STORAGE_BUCKET;
const FIREBASE_CONFIG_MESSAGING_SENDER_ID = process.env.FIREBASE_CONFIG_MESSAGING_SENDER_ID;

fs.readFile(`./src/environments/${fileName}.ts`, (err) => {
    if (err) throw err;

    const config = {
      production: envValue,
      firebaseConfig: {
        apiKey: FIREBASE_CONFIG_API_KEY,
        authDomain: FIREBASE_CONFIG_AUTH_DOMAIN,
        databaseURL: FIREBASE_CONFIG_DATABASE_URL,
        projectId: FIREBASE_CONFIG_PROJECT_ID,
        storageBucket: FIREBASE_CONFIG_STORAGE_BUCKET,
        messagingSenderId: FIREBASE_CONFIG_MESSAGING_SENDER_ID
      }
    }

    console.log(config)

    fs.writeFileSync(`./src/environments/${fileName}.ts`, "export const environment =" + JSON.stringify(config));

});
