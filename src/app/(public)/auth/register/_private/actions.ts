"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { registerFormSchema, RegisterFormStateType } from "./schemas";

export async function registerUserAction(
  previousState: RegisterFormStateType,
  formData: FormData,
): Promise<RegisterFormStateType> {
  const parsedFormData = registerFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsedFormData.success) {
    return parsedFormData.error.flatten();
  }
  const { name, email, password } = parsedFormData.data;

  const { token, user } = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
  });

  if (!user) {
    return {
      formErrors: ["User registration failed"],
      fieldErrors: {},
    };
  }

  return redirect("/auth/login");
}
