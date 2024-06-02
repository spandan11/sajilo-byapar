import { ProductForm } from "@/components/products/product-form";
import { Product } from "@/types";
import { db } from "@/server/db";

interface ProductIdPageProps {
  params: { productId: string };
}

const ProductIdPage = async ({ params: { productId } }: ProductIdPageProps) => {
  const product = await db.product.findFirst({
    where: {
      id: productId,
    },
    include: {
      variants: true,
      Category: true,
    },
  });
  return (
    <div className="flex flex-col gap-8">
      <ProductForm initialData={product as Product | null} />
    </div>
  );
};

export default ProductIdPage;
