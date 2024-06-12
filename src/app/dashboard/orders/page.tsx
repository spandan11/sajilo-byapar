import Heading from "@/components/dashboard/Heading";
import OrderDetailsDialog from "@/components/orders/order-dialog";
import OrdersTable from "@/components/orders/orders-table";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/server";
import type { Order } from "@/types";

const OrdersPage = () => {
  // const data=await api.
  // const data: Order[] = [
  //   {
  //     id: "jflakdsf",
  //     customerId: "Helo world",
  //     orderStatus: "DELIVERED",
  //     paymentStatus: "PAID",
  //     quantity: 12,
  //     amount: 372,
  //     paymentMethod:"BANK_TRANSFER",
  //     product:[{}],
  //     createdAt: new Date(),
  //   },
  //   {
  //     id: "jflakdsf",
  //     customerId: "Helo world",
  //     orderStatus: "PENDING",
  //     paymentStatus: "UNPAID",
  //     quantity: 12,
  //     amount: 372,
  //     paymentMethod:"BANK_TRANSFER"
  //     createdAt: new Date(),
  //   },
  //   {
  //     id: "jflakdsf",
  //     customerId: "Helo world",
  //     orderStatus: "PENDING",
  //     paymentStatus: "UNPAID",
  //     quantity: 12,
  //     amount: 372,
  //     paymentMethod:"BANK_TRANSFER"
  //     createdAt: new Date(),
  //   },
  //   {
  //     id: "jflakdsf",
  //     customerId: "Helo world",
  //     orderStatus: "RETURNED",
  //     paymentStatus: "UNPAID",
  //     quantity: 12,
  //     amount: 372,
  //     paymentMethod:"BANK_TRANSFER"
  //     createdAt: new Date(),
  //   },
  //   {
  //     id: "jflakdsf",
  //     customerId: "Helo world",
  //     orderStatus: "PROCESSING",
  //     paymentStatus: "PAID",
  //     quantity: 12,
  //     amount: 372,
  //     paymentMethod:"BANK_TRANSFER"
  //     createdAt: new Date(),
  //   },
  // ];
  const data: Order[] = [
    {
      id: "jflakdsf",
      customerName: "Helo world",
      customerAddress: "123 Main St",
      amount: 372,
      quantity: 12,
      paymentMethod: "BANK_TRANSFER",
      paymentStatus: "PAID",
      orderStatus: "DELIVERED",
      product: [
        {
          id: "product_1",
          name: "Product 1",
          description: "Product 1 description",
          variants: [
            {
              stock: 10,
              price: 320,
              size: "L",
              color: "BLACK",
              discount: 0,
            },
            {
              stock: 10,
              price: 320,
              size: "L",
              color: "BLACK",
              discount: 0,
            },
            {
              stock: 10,
              price: 320,
              size: "L",
              color: "BLACK",
              discount: 0,
            },
            {
              stock: 10,
              price: 320,
              size: "L",
              color: "BLACK",
              discount: 0,
            },
          ],
          categoryId: "fasdfasfs",
          status: "DRAFTED",
          isFeatured: true,
          allowOrderWhenEmpty: true,
          createdAt: new Date(),
        },
        {
          id: "product_2",
          name: "Product 1",
          description: "Product 1 description",
          variants: [
            {
              stock: 10,
              price: 320,
              size: "L",
              color: "BLACK",
              discount: 0,
            },
            {
              stock: 10,
              price: 320,
              size: "L",
              color: "BLACK",
              discount: 0,
            },
            {
              stock: 10,
              price: 320,
              size: "L",
              color: "BLACK",
              discount: 0,
            },
            {
              stock: 10,
              price: 320,
              size: "L",
              color: "BLACK",
              discount: 0,
            },
          ],
          categoryId: "fasdfasfs",
          status: "DRAFTED",
          isFeatured: true,
          allowOrderWhenEmpty: true,
          createdAt: new Date(),
        },
      ],
      createdAt: new Date(),
    },
  ];
  return (
    <>
      <Heading title="Orders" description="Orders of the store appear here" />
      <OrderDetailsDialog
        trigger={
          <Button size="lg" className="self-end">
            Create Order
          </Button>
        }
        initialData={null}
      />
      <OrdersTable data={data} />
    </>
  );
};

export default OrdersPage;
