"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { DataTable } from "@/components/ui/data-table";
import { EyeOpenIcon, TrashIcon } from "@radix-ui/react-icons";
import OrderDeleteDialog from "@/components/orders/order-delete-dialog";
import OrderDialog from "@/components/orders/order-dialog";
import { Badge } from "@/components/ui/badge";
import EditStatusDialog from "@/components/global/edit-status-dialog";
import type { Order, PaymentStatus, OrderStatus } from "@/types";

interface UserTableProps {
  data: Order[];
}

export const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Name" />
    ),
  },
  {
    accessorKey: "customerAddress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => {
      const { product } = row.original;
      let totalVariants = 0;
      product.forEach((item) => {
        totalVariants += item.variants.length;
      });
      return (
        <Badge variant="outline">
          {product.length} items / {totalVariants} variants
        </Badge>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const { product } = row.original;
      let totalVariants = 0;
      let totalPrice = 0;
      product.forEach((item) => {
        item.variants.forEach((element) => {
          totalPrice += element.price;
        });
      });
      return totalPrice;
    },
  },
  {
    accessorKey: "paymentStatus",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Status" />
    ),
    cell: ({ row }) => {
      return (
        <EditStatusDialog
          trigger={
            <Badge variant="outline" className="cursor-pointer">
              {row.original.paymentStatus}
            </Badge>
          }
          initialData={
            {
              orderId: row.original.id,
              status: row.original.paymentStatus,
            } as PaymentStatus
          }
          dialogType="payment"
        />
      );
    },
  },
  {
    accessorKey: "orderStatus",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Status" />
    ),
    cell: ({ row }) => {
      return (
        <EditStatusDialog
          trigger={
            <Badge variant="outline" className="cursor-pointer">
              {row.original.orderStatus}
            </Badge>
          }
          initialData={
            {
              orderId: row.original.id,
              status: row.original.orderStatus,
            } as OrderStatus
          }
          dialogType="order"
        />
      );
    },
  },
  {
    id: "actions",
    header: () => <h3 className="text-center">Actions</h3>,
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="flex flex-row items-center justify-center gap-4">
          <OrderDialog
            trigger={
              <EyeOpenIcon className="stroke h-8 w-8 cursor-pointer rounded-lg bg-slate-200/30 stroke-green-500 stroke-[0.5] p-1 text-green-400 hover:bg-slate-200/40 hover:text-green-500" />
            }
            initialData={order}
          />
          <OrderDeleteDialog
            trigger={
              <TrashIcon className="stroke h-8 w-8 cursor-pointer rounded-lg bg-slate-200/30 stroke-red-500 stroke-[0.5] p-1 text-red-400 hover:bg-slate-200/40 hover:text-red-500" />
            }
            order={order}
          />
        </div>
      );
    },
  },
];

const OrdersTable = ({ data }: UserTableProps) => {
  return <DataTable columns={columns} data={data} />;
};

export default OrdersTable;
