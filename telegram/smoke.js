require('dotenv').config()
const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");

const stringSession = process.env.ACCOUNT_SESSION_ID;
const API_ID = parseInt(process.env.API_ID);
const API_HASH = process.env.API_HASH;

const client = new TelegramClient(
  new StringSession(stringSession),
  API_ID,
  API_HASH,
  { connectionRetries: 1 }
);

const sendMessage = async () => {
  await client.connect(); // This assumes you have already authenticated with .start()
  const response = await client.invoke(
    new Api.messages.SendMessage({
      peer: "excelzior_bot",
      message: "Hello there!",
      randomId: BigInt(Math.floor(Math.random() * 999999999999999)),
    })
  );
  console.log(response)
};

sendMessage()