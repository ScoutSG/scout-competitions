import { User } from "@prisma/client";
import bigInt from "big-integer";
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
  if (typeof num === "string") {
    return bigInt(num);
  } else {
    return bigInt(num);
  }
};

const generateRandomId = () => {
  return Math.floor(Math.random() * 999999999999999);
};

export const addContact = async (user: User) => {
  await client.invoke(
    new Api.contacts.AddContact({
      id: user.telegramUrl,
      firstName: user.name,
      lastName: "",
      phone: "",
    })
  );
};

export const createGroup = async (title: string, user: User) => {
  await client.connect();
  try {
    await addContact(user);
    const result = (await client.invoke(
      new Api.messages.CreateChat({
        users: ["me", user.telegramUrl],
        title,
      })
    )) as Api.Updates;
    const chatId = result.chats[0].id.toJSNumber();
    await client.invoke(
      new Api.messages.EditChatAdmin({
        chatId: toBigInt(chatId),
        userId: user.telegramUrl,
        isAdmin: true,
      })
    );
    return chatId;
  } catch (err) {
    if (err.errorMessage === "USERS_TOO_FEW") {
      try {
        await client.invoke(
          new Api.messages.SendMessage({
            peer: user.telegramUrl,
            message:
              "Hello from ScoutSG! I wasn't able to add you to a group chat due to your privacy settings.\nCould you add @scoutsg as a contact? Then I'll be able to add you to a Telegram group!\nAlternatively, you could also add @scoutsg as an exception under Privacy and Security > Groups & Channels.",
            randomId: toBigInt(generateRandomId()),
          })
        );
      } catch (err) {
        // should be a peer flood error if we cannot send as a message
        // but we have told them in the following error message to add @scoutsg as a contact
      }

      throw new Error(
        "Please add @scoutsg as a contact on Telegram so that we can set up a Telegram group for you!"
      );
    } else if (
      err.message === `No user has "${user.telegramUrl}" as username`
    ) {
      throw new Error(
        `I couldn't find anyone with the Telegram username you've indicated, @${user.telegramUrl}. Please add a valid Telegram username so that I can create a Telegram group for your team.`
      );
    } else {
      throw new Error(
        "Unknown error encountered. Please ensure that you've entered a valid Telegram username and added @scoutsg as a contact on Telegram so that we can set up a telegram group for you."
      );
    }
  } finally {
    client.disconnect();
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
    `Review requests to join your team at ${process.env.NEXTAUTH_URL}/competitions/${competitionId}/groups/${groupId}.`,
    `When new members are approved, they will automatically be added (if they have indicated their Telegram username and if their privacy settings allow).`,
  ].join("\n\n");

  await notifyGroup(telegramGroupId, message);
};

export const addToGroup = async (groupId: string | number, user: User) => {
  await client.connect();
  await addContact(user);
  await client.invoke(
    new Api.messages.AddChatUser({
      chatId: toBigInt(groupId),
      userId: user.telegramUrl,
    })
  );
  await client.disconnect();
};

export const getInviteLink = async (groupId: string | number) => {
  await client.connect();
  const result = (await client.invoke(
    new Api.messages.GetExportedChatInvites({
      peer: new Api.InputPeerChat({ chatId: toBigInt(groupId) }),
      adminId: "me",
      limit: 2,
      revoked: false,
    })
  )) as Api.messages.ExportedChatInvites;
  if (result.invites.length > 0 && "link" in result.invites[0]) {
    return result.invites[0].link;
  }
  client.disconnect();
  return "";
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
  await client.disconnect();
};

export const attemptToAddToGroup = async (
  groupId: string | number,
  member: User
): Promise<string> => {
  let warningMessage = "";
  // add to Telegram group if there is one
  if (!member.telegramUrl) {
    warningMessage = `They did not indicate their Telegram username on their Scout profile. Please contact them at ${member.email}.`;
  } else {
    try {
      await addToGroup(groupId, member);
      await notifyGroup(
        groupId,
        `Welcome to the group, ${member.name ? member.name : "Anonymous"}!`
      );
    } catch (err) {
      if (
        ["USER_PRIVACY_RESTRICTED", "USER_IS_BLOCKED"].includes(
          err.errorMessage
        )
      ) {
        warningMessage = `They have enabled privacy settings and we are unable to add them to the group. Please add @${member.telegramUrl} to this group yourself.`;
      } else if (
        err.message === `No user has "${member.telegramUrl}" as username`
      ) {
        warningMessage = `The Telegram username they indicated in their profile is incorrect. Please contact them at ${member.email}.`;
      } else {
        warningMessage = `Failed to add ${
          member.name ? member.name : "Anonymous"
        } to the group. Please add @${
          member.telegramUrl
        } to this group yourself.`;
      }
    }
  }

  if (warningMessage !== "") {
    await notifyGroup(
      groupId,
      `You've approved a new member ${
        member.name ? member.name : "Anonymous"
      } to join your team. ${warningMessage}`
    );
  }

  return warningMessage;
};
