import { ReactNode } from "react";
import { useRouter } from "next/navigation";
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
import { useToast } from "@/components/ui/use-toast";
import { LoadingButton } from "@/components/ui/loading-button";
import type { Product } from "@/types";
import { api } from "@/trpc/react";

const ProductDeleteDialog = ({
  trigger,
  product,
}: {
  trigger: ReactNode;
  product: Product;
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const { mutate: deleteProduct, isPending: isDeleting } =
    api.product.deleteProduct.useMutation({
      onSuccess: () => {
        router.refresh();
        toast({
          title: "Product deleted",
          description: "The product has been deleted",
        });
      },
      onError: (error) => {
        toast({
          title: "Failed to delete product",
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
            This action cannot be undone. This will permanently delete your
            product and remove all product related data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteProduct({ productId: product.id as string })}
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

export default ProductDeleteDialog;
