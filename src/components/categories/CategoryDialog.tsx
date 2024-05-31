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
import type { Category } from "@/app/dashboard/categories/page";

const categoryFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  imageUrl: z.string().min(1, "Image is required"),
});

type CategoryFormSchemaType = z.infer<typeof categoryFormSchema>;

interface CategoryDialogProps {
  initialData: Category | null;
  trigger: ReactNode;
}

const CategoryDialog: FC<CategoryDialogProps> = ({ initialData, trigger }) => {
  const form = useForm<CategoryFormSchemaType>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: initialData || {},
  });

  function onSubmit(values: CategoryFormSchemaType) {
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
            {initialData ? "Edit Category" : "Add new Category"}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? "Edit Category carefully."
              : "Add category simply by giving name in the field below."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between flex-row">
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
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between flex-row">
                    <FormLabel>Image</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input placeholder="your image" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button disabled={form.formState.isSubmitting} type="submit">
              {initialData ? "Edit Category" : "Add Category"}
              {form.formState.isSubmitting && (
                <Loader2 className="p-1 w-8 h-8 text-muted-foreground animate-spin ml-1" />
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDialog;

export const CategoryDeleteDialog = ({
  trigger,
  category,
}: {
  trigger: ReactNode;
  category: Category;
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
            Username: {category.name}
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
