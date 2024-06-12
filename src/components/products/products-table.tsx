"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { DataTable } from "@/components/ui/data-table";

import EditStatusDialog from "@/components/global/edit-status-dialog";
import ProductDeleteDialog from "@/components/products/product-delete-dialog";

import type { Product, ProductStatus } from "@/types";

interface UserTableProps {
  data: Product[];
}

export const columns: ColumnDef<Product>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "Quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => {
      const { variants } = row.original;
      let totalStock = 0;
      variants.forEach((variant) => {
        totalStock += variant.stock;
      });
      return (
        <Badge variant="outline">
          {totalStock} for {variants.length} variants
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <EditStatusDialog
          trigger={
            <Badge variant="outline" className="cursor-pointer">
              {row.original.status}
            </Badge>
          }
          initialData={
            {
              productId: row.original.id,
              status: row.original.status,
            } as ProductStatus
          }
          dialogType="product"
        />
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CreatedAt" />
    ),
    cell: ({ row }) => {
      return (
        <p className="text-sm">
          {format(new Date(row.original.createdAt as Date), "MMM d, yyyy")}
        </p>
      );
    },
  },
  {
    id: "actions",
    header: () => <h3 className="text-center">Actions</h3>,
    cell: ({ row }) => {
      const router = useRouter();
      const product = row.original;
      return (
        <div className="flex flex-row items-center justify-center gap-4">
          <Pencil2Icon
            onClick={() => router.push(`/dashboard/products/${product.id}`)}
            className="stroke h-8 w-8 cursor-pointer rounded-lg bg-slate-200/30 stroke-green-500 stroke-[0.5] p-1 text-green-400 hover:bg-slate-200/40 hover:text-green-500"
          />
          <ProductDeleteDialog
            trigger={
              <TrashIcon className="stroke h-8 w-8 cursor-pointer rounded-lg bg-slate-200/30 stroke-red-500 stroke-[0.5] p-1 text-red-400 hover:bg-slate-200/40 hover:text-red-500" />
            }
            product={product}
          />
        </div>
      );
    },
  },
];

const ProductsTable = ({ data }: UserTableProps) => {
  return <DataTable columns={columns} data={data} />;
};

export default ProductsTable;
