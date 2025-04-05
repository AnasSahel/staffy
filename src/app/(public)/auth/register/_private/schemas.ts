import { z } from "zod";

export const RegisterFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export type RegisterFormType = z.infer<typeof RegisterFormSchema>;
export type RegisterFormFlattenErrorType = z.inferFlattenedErrors<
  typeof RegisterFormSchema
>;
export type RegisterFormStateType = Partial<RegisterFormFlattenErrorType>;
