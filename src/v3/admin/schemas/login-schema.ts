import { z } from "zod";

const usernameField = z.string();
const passwordField = z.string();

const loginSchema = z.object({
  username: usernameField,
  plain_pwd: passwordField,
});

type TLoginSchema = z.infer<typeof loginSchema>;

export { loginSchema };
export type { TLoginSchema };
