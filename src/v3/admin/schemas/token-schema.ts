import { z } from "zod";

const accessTokenField = z.string();

const tokenSchema = z.object({
  access_token: accessTokenField,
});

type TTokenSchema = z.infer<typeof tokenSchema>;

export { tokenSchema };
export type { TTokenSchema };
