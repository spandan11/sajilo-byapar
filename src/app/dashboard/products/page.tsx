import Link from "next/link";
import Heading from "@/components/dashboard/Heading";
import ProductsTable from "@/components/products/products-table";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";

const ProductsPage = () => {
  const data: Product[] = [
    {
      id: "product_1",
      name: "Product 1",
      price: 100,
      inventory: "60 for 4 variants",
      status: "ACTIVE",
      createdAt: new Date(),
    },
  ];
  return (
    <>
      <Heading
        title="Products"
        description="all store products are listed below"
      />
      <Button size="lg" className="self-end" asChild>
        <Link href="/dashboard/products/add">Add Product</Link>
      </Button>
      <ProductsTable data={data} />
    </>
  );
};

export default ProductsPage;
