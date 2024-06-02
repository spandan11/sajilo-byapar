"use client";

import { FC, ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { User } from "@/types";

const userFormSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.string().email("Must be a valid email"),
  role: z.enum(["OWNER", "MANAGER", "WORKER"]),
});

type userFormSchemaType = z.infer<typeof userFormSchema>;

interface UserDialogProps {
  initialData: User | null;
  trigger: ReactNode;
}

const UserDialog: FC<UserDialogProps> = ({ initialData, trigger }) => {
  const form = useForm<userFormSchemaType>({
    resolver: zodResolver(userFormSchema),
    defaultValues: initialData || {},
  });

  function onSubmit(values: userFormSchemaType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit User" : "Add new User"}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? "Edit user details carefully."
              : "Add user's simply by adding their name, email and role below."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-center justify-between">
                    <FormLabel>Full Name</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input placeholder="john doe..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-center justify-between">
                    <FormLabel>Email</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input placeholder="johndoe@gmail.com" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-center justify-between">
                    <FormLabel>Role</FormLabel>
                    <FormMessage />
                  </div>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="OWNER" disabled>
                        Owner
                      </SelectItem>
                      <SelectItem value="MANAGER">Manager</SelectItem>
                      <SelectItem value="WORKER">Worker</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button disabled={form.formState.isSubmitting} type="submit">
              {initialData ? "Edit" : "Add"}
              {form.formState.isSubmitting && (
                <Loader2 className="ml-1 h-8 w-8 animate-spin p-1 text-muted-foreground" />
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UserDialog;

export const UserDeleteDialog = ({
  trigger,
  user,
}: {
  trigger: ReactNode;
  user: User;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
            <br />
            Username: {user.fullName}
            <br />
            email: {user.email}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
