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
import { loginUserAction } from "./actions";
import { LoginFormSchema, LoginFormType } from "./schemas";

const DEFAULT_STATE = {
  fieldErrors: {},
  formErrors: [],
};

const DEFAULT_VALUES = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(loginUserAction, DEFAULT_STATE);

  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={form.handleSubmit(() => {
          formRef.current?.submit();
        })}
        className="flex flex-col gap-4"
      >
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
          Connect
        </Button>
      </form>
      <div className="mt-4 flex items-center justify-center space-x-1 text-sm">
        <span className="text-muted-foreground">Don't have an account?</span>
        <Link
          href="/auth/register"
          className="text-primary hover:text-primary/80 font-medium transition-colors"
        >
          Create one here
        </Link>
      </div>
    </Form>
  );
}
