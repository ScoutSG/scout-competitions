import { User } from "@prisma/client";
import { Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";

const stringSession = process.env.ACCOUNT_SESSION_ID;
const API_ID = parseInt(process.env.API_ID);
const API_HASH = process.env.API_HASH;

const client = new TelegramClient(
  new StringSession(stringSession),
  API_ID,
  API_HASH,
  { connectionRetries: 1 }
);

const toBigInt = (num: number | string): bigInt.BigInteger => {
  return BigInt(num) as unknown as bigInt.BigInteger;
};

const generateRandomId = () => {
  return Math.floor(Math.random() * 999999999999999);
};

export const createGroup = async (title: string, userId: string) => {
  await client.connect();
  try {
    const result = (await client.invoke(
      new Api.messages.CreateChat({
        users: ["me", userId],
        title,
      })
    )) as Api.Updates;
    const chatId = result.chats[0].id.toJSNumber();
    await client.invoke(
      new Api.messages.EditChatAdmin({
        chatId: toBigInt(chatId),
        userId,
        isAdmin: true,
      })
    );
    return chatId;
  } catch (err) {
    if (err.errorMessage === "USERS_TOO_FEW") {
      client.invoke(
        new Api.messages.SendMessage({
          peer: userId,
          message:
            "Hello from ScoutSG! I wasn't able to add you to a group chat due to your privacy settings.\nCould you add @scoutsg as a contact? Then I'll be able to add you to a Telegram group!\nAlternatively, you could also add @scoutsg as an exception under Privacy and Security > Groups & Channels.",
          randomId: toBigInt(generateRandomId()),
        })
      );
      throw new Error(
        "Please add @scoutsg as a contact on Telegram so that we can set up a Telegram group for you!"
      );
    } else if (err.message === `No user has "${userId}" as username`) {
      throw new Error(
        `I couldn't find anyone with the Telegram username you've indicated, @${userId}. Please add a valid Telegram username so that I can create a Telegram group for your team.`
      );
    }
  }
};

export const sendWelcomeMessage = async (
  telegramGroupId: string | number,
  name: string,
  competitionId: number,
  groupId: number
) => {
  const message = [
    `Welcome to the group chat for your team ${name}!`,
    `You may review requests to join your team at ${process.env.NEXTAUTH_URL}/competitions/${competitionId}/groups/${groupId}.`,
    `When you approve new members to join the team, they will automatically be added to this group chat if they have indicated their Telegram username and if their privacy settings allow.`,
  ].join("\n\n");

  await notifyGroup(telegramGroupId, message);
};

export const addToGroup = async (groupId: string | number, userId: string) => {
  await client.connect();
  const result = await client.invoke(
    new Api.messages.AddChatUser({
      chatId: toBigInt(groupId),
      userId,
    })
  );
};

export const notifyGroup = async (
  groupId: string | number,
  message: string
) => {
  await client.connect();
  const result = await client.invoke(
    new Api.messages.SendMessage({
      peer: new Api.InputPeerChat({ chatId: toBigInt(groupId) }),
      message,
      randomId: toBigInt(generateRandomId()),
    })
  );
};

export const attemptToAddToGroup = async (
  groupId: string | number,
  member: User
) => {
  let warningMessage = "";
  // add to Telegram group if there is one
  if (!member.telegramUrl) {
    warningMessage = `They did not indicate their Telegram username on their Scout profile. Please contact them at ${member.email} to get their Telegram username to add them to this group.`;
  } else {
    try {
      await addToGroup(groupId, member.telegramUrl);
      return notifyGroup(
        groupId,
        `Welcome to the group, ${member.name ? member.name : "Anonymous"}!`
      );
    } catch (err) {
      if (err.errorMessage === "USER_PRIVACY_RESTRICTED") {
        warningMessage = `They have enabled privacy settings and we are unable to add them to the group. Please add @${member.telegramUrl} to this group yourself.`;
      } else if (
        err.message === `No user has "${member.telegramUrl}" as username`
      ) {
        warningMessage = `The Telegram username they indicated in their profile is incorrect. Please contact them at ${member.email} to get their Telegram username to add them to this group.`;
      }
    }
  }

  if (warningMessage !== "") {
    return notifyGroup(
      groupId,
      `You've approved a new member ${
        member.name ? member.name : "Anonymous"
      } to join your team. ${warningMessage}`
    );
  }
};
