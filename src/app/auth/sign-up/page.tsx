"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import {
  RegisterFormSchema,
  RegisterFormSchemaType,
} from "@/schemas/auth.schema";
import { cn } from "@/lib/utils";
import { USER_ROLE } from "@prisma/client";

const SignUpPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [view, setView] = useState(false);
  const form = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(RegisterFormSchema),
  });
  function onSubmit(values: RegisterFormSchemaType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const options = [
    {
      label: "Owner",
      value: "OWNER",
    },
    {
      label: "Manager",
      value: "MANAGER",
    },
    {
      label: "Worker",
      value: "WORKER",
    },
  ];
  return (
    <div className="mx-auto grid w-1/2 gap-6 pt-8">
      <div className="grid gap-4 text-center">
        <h1 className="text-xl font-semibold tracking-tight text-gray-800">
          Sign Up to Sajilo Byapar
        </h1>
        <Separator />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full gap-8"
        >
          {currentStep === 0 && (
            <>
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Choose your role</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value || "OWNER"}
                        className="flex flex-col gap-2 space-y-1"
                      >
                        {options.map((option) => (
                          <FormItem
                            key={option.value}
                            className={cn(
                              "flex w-full cursor-pointer items-center space-x-3 space-y-1 p-4",
                              {
                                "rounded-md border-2 border-primary/50":
                                  field.value === option.value,
                              },
                            )}
                            onClick={() =>
                              (field.value = option.value as USER_ROLE)
                            }
                          >
                            <FormControl>
                              <RadioGroupItem value={option.value} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {option.label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-row items-center justify-between">
                      <FormLabel>
                        Store Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormMessage className="text-xs" />
                    </div>
                    <FormControl>
                      <Input placeholder="e.g. Hamro Pasal" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs">
                      You can change this from dashboard settings later
                    </FormDescription>
                  </FormItem>
                )}
              />
            </>
          )}

          <Button type="submit">Login</Button>
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

export default SignUpPage;
