import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;
export type LoginFormFlattenErrorType = z.inferFlattenedErrors<
  typeof LoginFormSchema
>;
export type LoginFormStateType = Partial<LoginFormFlattenErrorType>;
