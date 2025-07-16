import bcrypt from "bcrypt";

export const comparePassword = async (
  password: string,
  comparePassword: string,
) => {
  const res = await bcrypt.compare(password, comparePassword);
  return res;
};
