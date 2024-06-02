"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { DataTable } from "@/components/ui/data-table";
import ProductDeleteDialog from "@/components/products/product-delete-dialog";

import type { Product } from "@/types";

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
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
  },
  {
    accessorKey: "Quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => {
      return (
        <Badge variant="outline">
          {/* {row.original.variants} */}
          {/* for {row.original.variants.length} variants */}
          variants
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
      return <Badge variant="outline">{row.original.status}</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CreatedAt" />
    ),
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
