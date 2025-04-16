"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LoginFormSchema, LoginFormStateType } from "./schemas";

export async function loginUserAction(
  previousState: LoginFormStateType,
  formData: FormData,
): Promise<LoginFormStateType> {
  const parsedFormData = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsedFormData.success) {
    return parsedFormData.error.flatten();
  }
  const { email, password } = parsedFormData.data;

  const response = await auth.api.signInEmail({
    body: { email, password },
    //asResponse: true
  });

  // const { token, user } = await auth.api.signUpEmail({
  //   body: {
  //     name,
  //     email,
  //     password,
  //   },
  //   headers: await headers(),
  // });

  // if (!user) {
  //   return {
  //     formErrors: ["User registration failed"],
  //     fieldErrors: {},
  //   };
  // }

  return redirect("/home");
}
