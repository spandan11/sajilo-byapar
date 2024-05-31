import Heading from "@/components/dashboard/Heading";
import OrderDetailsDialog from "@/components/orders/order-detail-dialog";
import OrdersTable from "@/components/orders/orders-table";
import { Button } from "@/components/ui/button";
import { Order } from "@/types";

const OrdersPage = () => {
  const data: Order[] = [
    {
      id: "jflakdsf",
      customerName: "Helo world",
      orderStatus: "DELIVERED",
      paymentStatus: "PAID",
      quantity: 12,
      totalPrice: 372,
      createdAt: new Date().getFullYear(),
    },
    {
      id: "jflakdsf",
      customerName: "Helo world",
      orderStatus: "PENDING",
      paymentStatus: "UNPAID",
      quantity: 12,
      totalPrice: 372,
      createdAt: new Date().getFullYear(),
    },
    {
      id: "jflakdsf",
      customerName: "Helo world",
      orderStatus: "PENDING",
      paymentStatus: "UNPAID",
      quantity: 12,
      totalPrice: 372,
      createdAt: new Date().getFullYear(),
    },
    {
      id: "jflakdsf",
      customerName: "Helo world",
      orderStatus: "RETURNED",
      paymentStatus: "UNPAID",
      quantity: 12,
      totalPrice: 372,
      createdAt: new Date().getFullYear(),
    },
    {
      id: "jflakdsf",
      customerName: "Helo world",
      orderStatus: "PROCESSING",
      paymentStatus: "PAID",
      quantity: 12,
      totalPrice: 372,
      createdAt: new Date().getFullYear(),
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
