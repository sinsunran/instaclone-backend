import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    join: async (
      _,
      { username, email, name, location, avatarURL, gihubUsername, password }
    ) => {
      try {
        const existUser = await client.user.findFirst({
          where: { OR: [{ username }, { email }, { gihubUsername }] },
        });
        if (existUser) {
          return {
            ok: false,
            error:
              "there is user already has samw username/email/githubUsername",
          };
        }
        const hashedPassword = await bcrypt.hash(password, 5);
        const user = await client.user.create({
          data: {
            username,
            email,
            name,
            ...(location && { location }),
            ...(avatarURL && { avatarURL }),
            ...(gihubUsername && { gihubUsername }),
            password: hashedPassword,
          },
        });
        return {
          ok: true,
          id: user.id,
        };
      } catch (e) {
        return {
          ok: false,
          error: e.message,
        };
      }
    },
  },
};
