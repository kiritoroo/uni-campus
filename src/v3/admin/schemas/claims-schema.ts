import { z } from "zod";

const userIdField = z.string();
const usernameField = z.string();
const nicknameField = z.string();
const roleField = z.enum(["guest", "admin", "superadmin"]);
const expField = z.number();
const iatField = z.number();
const tokenTypeField = z.string();

const claimsSchema = z.object({
  user_id: userIdField,
  username: usernameField,
  nickname: nicknameField,
  role: roleField,
  exp: expField,
  iat: iatField,
  token_type: tokenTypeField,
});

type TClaimsSchema = z.infer<typeof claimsSchema>;

export { claimsSchema };
export type { TClaimsSchema };
