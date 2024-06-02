"use client";

import { FC, ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { UploadButton, useUploadThing } from "@/lib/uploadthing";

import {
  categoryFormSchema,
  CategoryFormSchemaType,
} from "@/schemas/category.schema";
import type { Category } from "@/types";
import { api } from "@/trpc/react";

interface CategoryDialogProps {
  initialData: Category | null;
  trigger: ReactNode;
}

const CategoryDialog: FC<CategoryDialogProps> = ({ initialData, trigger }) => {
  const router = useRouter();
  const { isUploading } = useUploadThing("imageUploader");
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { mutate: createCategory, isPending: isPendingCreate } =
    api.category.createCategory.useMutation();
  const { mutate: updateCategory, isPending: isPendingUpdate } =
    api.category.updateCategory.useMutation();
  const form = useForm<CategoryFormSchemaType>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: initialData || {},
  });

  function onSubmit(values: CategoryFormSchemaType) {
    console.log(values);
    initialData?.id
      ? updateCategory({
          categoryFormSchema: values,
          categoryId: initialData.id,
        })
      : createCategory({ name: values.name, imageUrl: values.imageUrl });
    form.reset();
    router.refresh();
    setOpen(false);
    toast({
      title: `Category ${initialData?.id ? "Edited" : "Created"} successfully`,
      description: "Please refresh the page to see the new category",
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                  <div className="flex flex-row items-center justify-between">
                    <FormLabel>Category Name</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input placeholder="urban..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-center justify-between">
                    <FormLabel>Image</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <UploadButton
                      {...field}
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        form.setValue("imageUrl", res[0]?.url);
                      }}
                      onUploadError={(error: Error) => {
                        toast({
                          title: "Error uploading image",
                          description: error.message,
                        });
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              disabled={isPendingCreate || isPendingUpdate || isUploading}
              type="submit"
            >
              {initialData ? "Edit Category" : "Add Category"}
              {isPendingCreate ||
                (isPendingUpdate && (
                  <Loader2 className="ml-1 h-8 w-8 animate-spin p-1 text-white" />
                ))}
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
