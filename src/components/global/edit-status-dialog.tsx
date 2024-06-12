"use client";

import { FC, ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, XIcon } from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoadingButton } from "@/components/ui/loading-button";
import { useToast } from "@/components/ui/use-toast";

import {
  ProductStatusSchema,
  ProductStatusSchemaType,
  OrderStatusSchema,
  OrderStatusSchemaType,
  PaymentStatusSchema,
  PaymentStatusSchemaType,
} from "@/schemas/status.schema";
import type { ProductStatus, OrderStatus, PaymentStatus } from "@/types";
import {
  PaymentStatusOptions,
  ProductStatusOptions,
  OrderStatusOptions,
} from "@/constants/status-constants";
import { api } from "@/trpc/react";

type EditStatusDialogProps = {
  // initialData: ProductStatus | OrderStatus | PaymentStatus;
  // dialogType: "product" | "order" | "payment";
  trigger: ReactNode;
} & (ProductStatusProps | OrderStatusProps | PaymentStatusProps);

type ProductStatusProps = {
  initialData: ProductStatus;
  dialogType: "product";
};
type OrderStatusProps = {
  initialData: OrderStatus;
  dialogType: "order";
};
type PaymentStatusProps = {
  initialData: PaymentStatus;
  dialogType: "payment";
};

// interface EditStatusDialogProps {
//   initialData: ProductStatus | OrderStatus | PaymentStatus;
//   dialogType: "product" | "order" | "payment";
//   trigger: ReactNode;
// }

const schemaMapping = {
  product: ProductStatusSchema,
  order: OrderStatusSchema,
  payment: PaymentStatusSchema,
};

const EditStatusDialog: FC<EditStatusDialogProps> = ({
  initialData,
  dialogType,
  trigger,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { mutate: updateProductStatus, isPending: isPendingProductStatus } =
    api.status.changeProductStatus.useMutation({
      onSuccess: () => {
        form.reset();
        setOpen(false);
        router.refresh();
        toast({
          title: `Product Status Updated successfully`,
          description: "Please refresh the page to see the new product",
        });
      },
      onError: (error) => {
        toast({
          title: "Error Upating Product Status",
          description: error.message,
        });
      },
    });
  const { mutate: updateOrderStatus, isPending: isPendingOrderStatus } =
    api.status.changeOrderStatus.useMutation({
      onSuccess: () => {
        form.reset();
        setOpen(false);
        router.refresh();
        toast({
          title: `Order Status Updated successfully`,
          description: "Please refresh the page to see the new product",
        });
      },
      onError: (error) => {
        toast({
          title: "Error Upating Order Status",
          description: error.message,
        });
      },
    });
  const { mutate: updatePaymentStatus, isPending: isPendingPaymentStatus } =
    api.status.changePaymentStatus.useMutation({
      onSuccess: () => {
        form.reset();
        setOpen(false);
        router.refresh();
        toast({
          title: `Payment Status Updated successfully`,
          description: "Please refresh the page to see the new product",
        });
      },
      onError: (error) => {
        toast({
          title: "Error Updating Payment Status",
          description: error.message,
        });
      },
    });
  const schema = schemaMapping[dialogType];
  type schemaType =
    | ProductStatusSchemaType
    | OrderStatusSchemaType
    | PaymentStatusSchemaType;

  const dialogTitle =
    dialogType === "product"
      ? "Edit Product Status"
      : dialogType === "order"
        ? "Edit Order Status"
        : "Edit Payment Status";

  const dialogDescription =
    dialogType === "product"
      ? "Edit product Status carefully"
      : dialogType === "order"
        ? "Edit Order Status carefully"
        : "Edit Payment Status carefully";

  const selectLabel =
    dialogType === "product"
      ? "Product Status"
      : dialogType === "order"
        ? "Order Status"
        : "Payment Status";

  const selectOptions =
    dialogType === "product"
      ? ProductStatusOptions
      : dialogType === "order"
        ? OrderStatusOptions
        : PaymentStatusOptions;

  const form = useForm<schemaType>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  function onSubmit(values: schemaType) {
    console.log(values);
    if (dialogType === "product") {
      updateProductStatus(values as ProductStatus);
    } else if (dialogType === "order") {
      updateOrderStatus(values as OrderStatus);
    } else if (dialogType === "payment") {
      updatePaymentStatus(values as PaymentStatus);
    } else {
      toast({
        title: "Error Updating Status",
        description: "Please refresh the page to see the new product",
      });
    }

    // dialogType === "product"
    //   ? updateProductStatus({
    //       productId: initialData?.productId,
    //       status: values.status as ProductStatus,
    //     })
    //   : dialogType === "order"
    //     ? updateOrderStatus({
    //         orderId: initialData?.orderId,
    //         status: values.status,
    //       })
    //     : updatePaymentStatus({
    //         orderId: initialData.orderId,
    //         status: values.status,
    //       });
    // initialData?.id
    //   ? updateCategory({
    //       CategoryFormSchema: values,
    //       categoryId: initialData.id,
    //     })
    //   : createCategory({ name: values.name, imageUrl: values.imageUrl });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{selectLabel}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger id="statusId" aria-label="Select category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectOptions?.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <LoadingButton
              loading={
                isPendingProductStatus ||
                isPendingOrderStatus ||
                isPendingPaymentStatus
              }
              type="submit"
            >
              Update
              {isPendingProductStatus ||
                isPendingOrderStatus ||
                (isPendingPaymentStatus && (
                  <Loader2 className="ml-1 h-8 w-8 animate-spin p-1 text-white" />
                ))}
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditStatusDialog;

// export const CategoryDeleteDialog = ({
//   trigger,
//   category,
// }: {
//   trigger: ReactNode;
//   category: Category;
// }) => {
//   const { toast } = useToast();
//   const router = useRouter();
//   const { mutate: deleteCategory, isPending: isDeleting } =
//     api.category.deleteCategory.useMutation({
//       onSuccess: () => {
//         router.refresh();
//         toast({
//           title: "Category deleted successfully",
//           description: "Please refresh the page to see the new category",
//         });
//       },
//       onError: (error) => {
//         toast({
//           title: "Error creating category",
//           description: error.message,
//         });
//       },
//     });
//   return (
//     <AlertDialog>
//       <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//           <AlertDialogDescription>
//             This action cannot be undone. This will permanently delete category
//             and remove category data from our servers.
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>Cancel</AlertDialogCancel>
//           <AlertDialogAction
//             onClick={() =>
//               deleteCategory({ categoryId: category.id as string })
//             }
//             asChild
//           >
//             <LoadingButton loading={isDeleting} variant="destructive">
//               Delete
//             </LoadingButton>
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// };
