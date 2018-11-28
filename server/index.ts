import { prisma } from "./generated/prisma-client";
import { GraphQLServer } from "graphql-yoga";
import Expo from "expo-server-sdk";

// Create a new Expo SDK client
let expo = new Expo();

const sendPushNotifications = tokens => {
  let messages = [];
  for (let pushToken of tokens) {
    // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications.html)
    messages.push({
      to: pushToken.token,
      sound: "default",
      title: "🚨 Attention Pokemon 🚨",
      body: "A human escaped from Pokemon Prison",
      data: { route: "emergency", data: "some criminal details" }
    });
  }

  // The Expo push notification service accepts batches of notifications so
  // that you don't need to send 1000 requests to send 1000 notifications. We
  // recommend you batch your notifications to reduce the number of requests
  // and to compress them (notifications with similar content will get
  // compressed).
  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  (async () => {
    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
        // NOTE: If a ticket contains an error code in ticket.details.error, you
        // must handle it appropriately. The error codes are listed in the Expo
        // documentation:
        // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
      } catch (error) {
        console.error(error);
      }
    }
  })();
};

const resolvers = {
  Query: {
    sendNotificationToAll: async (parent, args, context) => {
      let tokens = await context.prisma.pushNotificationses({
        where: { receiveNotifications: true }
      });
      sendPushNotifications(tokens);
      return { done: true };
    },
    sendNotificationById(parent, args, context) {
      return context.prisma.pushNotifications({ token: args.token });
    },
    sendNotificationByIdAndTimezone(parent, args, context) {
      return context.prisma.pushNotifications({ token: args.token });
    }
  },
  Mutation: {
    createNotificationToken(parent, args, context) {
      return context.prisma.createpushNotifications({
        token: args.token,
        platform: args.platform,
        receiveNotifications: args.receiveNotifications
      });
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers,
  context: {
    prisma
  }
});

server.start(() => console.log("Server is running on http://localhost:4000"));
