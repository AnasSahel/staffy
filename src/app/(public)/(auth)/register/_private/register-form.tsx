"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useActionState, useRef } from "react";
import { useForm } from "react-hook-form";
import { registerUserAction } from "./actions";
import { RegisterFormSchema, RegisterFormType } from "./schemas";

const DEFAULT_STATE = {
  fieldErrors: {},
  formErrors: [],
};

const DEFAULT_VALUES = {
  name: "",
  email: "",
  password: "",
};

export default function RegisterForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(registerUserAction, DEFAULT_STATE);

  const form = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  return (
    <Form {...form}>
      {state.formErrors}
      <form
        ref={formRef}
        action={formAction}
        onSubmit={form.handleSubmit(() => {
          formRef.current?.submit();
        })}
        className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} autoFocus />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  {...field}
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                  autoComplete="new-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
      <div className="mt-4 flex items-center justify-center space-x-1 text-sm">
        <span className="text-muted-foreground">Already have an account?</span>
        <Link
          href="/auth/login"
          className="text-primary hover:text-primary/80 font-medium transition-colors">
          Login here
        </Link>
      </div>
    </Form>
  );
}
