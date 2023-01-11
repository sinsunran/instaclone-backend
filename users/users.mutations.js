import client from "../client.js";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      _,
      { username, email, name, location, avatarURL, gihubUsername, password }
    ) => {
      const existUser = await client.user.findFirst({
        where: { OR: [{ username }, { email }, { gihubUsername }] },
      });
      if (existUser) {
        throw new Error("$error");
      }
      const hashedPassword = await bcrypt(password, 5);
      return client.user.create({
        data: {
          username,
          email,
          name,
          location,
          avatarURL,
          githubUsername,
          password: hashedPassword,
        },
      });
    },
  },
};
