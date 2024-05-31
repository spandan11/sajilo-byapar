import { OrderForm } from "@/components/orders/order-form";
import { ProductForm } from "@/components/products/product-form";

interface OrderIdPageProps {
  params: { orderId: string };
}

type ord = {
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

const OrderIdPage = ({ params: { orderId } }: OrderIdPageProps) => {
  const order: ord = {
    id: orderId,
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
  console.log(orderId);
  return (
    <div className="flex flex-col gap-8">
      <OrderForm initialData={order} />
    </div>
  );
};

export default OrderIdPage;
