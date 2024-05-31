"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { LoginFormSchema, LoginFormSchemaType } from "@/schemas/auth.schema";
import { useToast } from "@/components/ui/use-toast";

const SignInPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
  });
  function onSubmit(values: LoginFormSchemaType) {
    signIn("credentials", {
      email: values.email,
      password: values.password,
    });
  }
  if (status === "authenticated") {
    router.push("/dashboard");
  }
  return (
    <div className="mx-auto grid w-3/5 gap-6 pt-8">
      <div className="grid gap-4 text-center">
        <h1 className="text-xl font-semibold tracking-tight text-gray-800">
          Log in to Sajilo Byapar
        </h1>
        <Separator />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full gap-8"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Email</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input
                    placeholder="johndoe@gmail.com"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input
                    placeholder="********"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Login
          </Button>
        </form>
      </Form>
      <div className="flex flex-row justify-start text-start text-sm">
        Don&apos;t have an account?&nbsp;
        <Link href="/auth/sign-up" className="underline">
          Sign up
        </Link>
        <Link
          href="/auth/forgot-password"
          className="ml-auto inline-block text-sm underline"
        >
          Forgot your password?
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
