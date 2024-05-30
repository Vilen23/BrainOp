import zod from "zod";

export const signupValidation = zod.object({
    username: zod.string().min(3, "Username must be at least 3 characters long"),
    password: zod.string().min(8, "Password must be at least 8 characters long"),
    name: zod.string().optional(),
    profilepicture: zod.string().optional(),
  });
