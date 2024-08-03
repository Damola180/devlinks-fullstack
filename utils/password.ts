import bcrypt from "bcrypt";

export async function saltAndHashPassword(password: string) {
  const saltRounds = 10; // You can adjust this number based on your security requirements
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
