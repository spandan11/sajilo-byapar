import { ProductForm } from "@/components/products/product-form";

interface ProductIdPageProps {
  params: { productId: string };
}

type Prod = {
  id: string;
  name: string;
  price: number;
  description: string;
  variants: {
    size: "S" | "M" | "L" | "XL" | "XXL";
    stock: number;
    price: number;
  }[];
  category: string;
  inventory: number;
  status: "archived" | "drafted" | "published";
  createdAt: number;
};

const ProductIdPage = ({ params: { productId } }: ProductIdPageProps) => {
  const product: Prod = {
    id: productId,
    name: "Product name",
    description: "Produdejfkshdfad",
    variants: [
      {
        stock: 10,
        price: 320,
        size: "L",
      },
    ],
    category: "electronics",
    price: 123,
    status: "drafted",
    inventory: 10,
    createdAt: new Date().getUTCFullYear(),
  };
  console.log(productId);
  return (
    <div className="flex flex-col gap-8">
      <ProductForm initialData={product} />
    </div>
  );
};

export default ProductIdPage;
