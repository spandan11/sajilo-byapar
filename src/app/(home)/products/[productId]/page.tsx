import ProductComponent from "@/components/home/ProductComponent";
import { api } from "@/trpc/server";

interface ProductIdPageProps {
  params: { productId: string };
}

const ProductPage = async ({ params: { productId } }: ProductIdPageProps) => {
  const productData = await api.product.getProductById({ productId });
  return <ProductComponent productData={productData} />;
};

export default ProductPage;
