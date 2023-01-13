import client from "../../client";
import bcrypt from "bcrypt";
import { createWriteStream } from "fs";
import { GraphQLUpload } from "graphql-upload";

export default {
  Upload: GraphQLUpload,
  Mutation: {
    editProfile: async (
      _,
      {
        email,
        name,
        location,
        avatarURL,
        gihubUsername,
        password: newPassword,
      },
      { loggedInUser, protectResolver }
    ) => {
      protectResolver(loggedInUser);
      const { filename, createReadStream } = await avatarURL;
      const readStream = createReadStream();
      const writeStream = createWriteStream(
        process.cwd() + "/uploads/" + filename
      );
      readStream.pipe(writeStream);
      let hashedPassword = null;
      if (newPassword) {
        hashedPassword = await bcrypt.hash(newPassword, 5);
      }
      const updatedUser = await client.user.update({
        where: { id: loggedInUser.id },
        data: {
          email,
          name,
          location,
          avatarURL,
          gihubUsername,
          ...(newPassword && { newPassword: hashedPassword }),
        },
      });
    },
  },
};
