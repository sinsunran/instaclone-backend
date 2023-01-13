import client from "../../client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      try {
        const user = await client.user.findUnique({ where: { username } });
        const passwordCheck = await bcrypt.compare(password, user.password);
        const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
        if (!user) {
          throw new Error("there is no user with that username");
        }
        if (!passwordCheck) {
          throw new Error("please input right password");
        }
        return {
          ok: true,
          token,
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
