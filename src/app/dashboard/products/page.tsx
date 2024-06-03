import Link from "next/link";
import Heading from "@/components/dashboard/Heading";
import ProductsTable from "@/components/products/products-table";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/server";
import type { Product } from "@/types";

const ProductsPage = async () => {
  const products = await api.product.getallProducts();
  // const data: Product[] = [
  //   {
  //     id: "product_1",
  //     name: "Product 1",
  //     description: "Product 1 description",
  //     variants: [
  //       {
  //         stock: 10,
  //         size: "S",
  //         color: "RED",
  //         price: 100,
  //         discount: 0,
  //       },
  //     ],
  //     categoryId: "fasdf",
  //     status: "ACTIVE",
  //     isFeatured: true,
  //     allowOrderWhenEmpty: true,
  //     createdAt: new Date(),
  //   },
  //   // inventory: "60 for 4 variants",
  // ];
  return (
    <>
      <Heading
        title="Products"
        description="all store products are listed below"
      />
      <Button size="lg" className="self-end" asChild>
        <Link href="/dashboard/products/add">Add Product</Link>
      </Button>
      <ProductsTable data={products as Product[]} />
    </>
  );
};

export default ProductsPage;
