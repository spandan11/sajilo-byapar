"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import type { Category } from "@/app/dashboard/categories/page";
import { DataTable } from "@/components/ui/data-table";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import CategoryDialog, { CategoryDeleteDialog } from "./CategoryDialog";

interface UserTableProps {
  data: Category[];
}

export const columns: ColumnDef<Category>[] = [
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
    accessorKey: "imageUrl",
    header: "Image",
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    id: "actions",
    header: () => <h3 className="text-center">Actions</h3>,
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="flex flex-row items-center justify-center gap-4">
          <CategoryDialog
            trigger={
              <Pencil2Icon className="p-1 h-8 w-8 stroke stroke-green-500 stroke-[0.5] text-green-400 hover:text-green-500 cursor-pointer bg-slate-200/30 hover:bg-slate-200/40 rounded-lg" />
            }
            initialData={category}
          />
          <CategoryDeleteDialog
            trigger={
              <TrashIcon className="p-1 h-8 w-8 stroke stroke-red-500 stroke-[0.5] text-red-400 hover:text-red-500 cursor-pointer bg-slate-200/30 hover:bg-slate-200/40 rounded-lg" />
            }
            category={category}
          />
        </div>
      );
    },
  },
];

const CategoriesTable = ({ data }: UserTableProps) => {
  return <DataTable columns={columns} data={data} />;
};

export default CategoriesTable;
