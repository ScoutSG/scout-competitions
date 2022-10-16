require('dotenv').config()
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");

const API_ID = parseInt(process.env.API_ID);
const API_HASH = process.env.API_HASH;

console.log(`Using API_ID ${API_ID} and API_HASH ${API_HASH}`)

const client = new TelegramClient(
  new StringSession(""),
  API_ID,
  API_HASH,
  { connectionRetries: 1 });

const authenticateHuman = async () => {
  await client.start({
    phoneNumber: async () => await input.text("number ?"),
    password: async () => await input.text("password?"),
    phoneCode: async () => await input.text("Code ?"),
    onError: (err) => console.log(err),
  });
  console.log("You should now be connected.");
  const sessionString = client.session.save();
  console.log(sessionString); // Save this string to avoid logging in again
  await client.sendMessage("me", { message: sessionString });
};

authenticateHuman();