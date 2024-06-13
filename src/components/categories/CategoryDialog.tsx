"use client";

import { FC, ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, XIcon } from "lucide-react";

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
import { LoadingButton } from "@/components/ui/loading-button";
import { useToast } from "@/components/ui/use-toast";
import { UploadButton, useUploadThing } from "@/lib/uploadthing";

import {
  CategoryFormSchema,
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
  const [image, setImage] = useState<string>(initialData?.imageUrl || "");
  const [loaded, setLoaded] = useState(false);
  const { mutate: createCategory, isPending: isPendingCreate } =
    api.category.createCategory.useMutation({
      onSuccess: () => {
        form.reset();
        setOpen(false);
        router.refresh();
        toast({
          title: `Category Created successfully`,
          description: "Please refresh the page to see the new category",
        });
      },
      onError: (error) => {
        toast({
          title: "Error creating category",
          description: error.message,
        });
      },
    });
  const { mutate: updateCategory, isPending: isPendingUpdate } =
    api.category.updateCategory.useMutation({
      onSuccess: () => {
        form.reset();
        setOpen(false);
        router.refresh();
        toast({
          title: `Category Updated successfully`,
          description: "Please refresh the page to see the new category",
        });
      },
      onError: (error) => {
        toast({
          title: "Error creating category",
          description: error.message,
        });
      },
    });
  const form = useForm<CategoryFormSchemaType>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: initialData || {},
  });

  function onSubmit(values: CategoryFormSchemaType) {
    initialData?.id
      ? updateCategory({
          CategoryFormSchema: values,
          categoryId: initialData.id,
        })
      : createCategory({ name: values.name, imageUrl: values.imageUrl });
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
                  <FormControl className="mx-auto my-auto h-[300px] w-[300px]">
                    {image ? (
                      <div className="group relative mx-auto my-auto overflow-hidden rounded-lg shadow-lg">
                        <Image
                          src={image}
                          alt="Product Image"
                          width={400}
                          height={400}
                          onLoad={() => setLoaded(true)}
                          className={`aspect-square w-full object-cover ${loaded ? "blur-none" : "blur-md"}`}
                        />
                        <div className="absolute right-4 top-4 rounded-full bg-gray-900 p-2 text-white">
                          <XIcon
                            className="h-4 w-4 cursor-pointer"
                            onClick={() => setImage("")}
                          />
                        </div>
                      </div>
                    ) : (
                      <UploadButton
                        {...field}
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          form.setValue("imageUrl", res[0]?.url);
                          setImage(res[0]?.url as string);
                        }}
                        onUploadError={(error: Error) => {
                          toast({
                            title: "Error uploading image",
                            description: error.message,
                          });
                        }}
                      />
                    )}
                  </FormControl>
                </FormItem>
              )}
            />
            <LoadingButton
              loading={isPendingCreate || isPendingUpdate || isUploading}
              type="submit"
            >
              {initialData ? "Edit Category" : "Create Category"}
              {isPendingCreate ||
                (isPendingUpdate && (
                  <Loader2 className="ml-1 h-8 w-8 animate-spin p-1 text-white" />
                ))}
            </LoadingButton>
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
  const { toast } = useToast();
  const router = useRouter();
  const { mutate: deleteCategory, isPending: isDeleting } =
    api.category.deleteCategory.useMutation({
      onSuccess: () => {
        router.refresh();
        toast({
          title: "Category deleted successfully",
          description: "Please refresh the page to see the new category",
        });
      },
      onError: (error) => {
        toast({
          title: "Error creating category",
          description: error.message,
        });
      },
    });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete category
            and remove category data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              deleteCategory({ categoryId: category.id as string })
            }
            asChild
          >
            <LoadingButton loading={isDeleting} variant="destructive">
              Delete
            </LoadingButton>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
