"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { DataTable } from "@/components/ui/data-table";
import UserDialog, { UserDeleteDialog } from "@/components/users/UserDialog";

import type { User } from "@/types";

interface UserTableProps {
  data: User[];
}

export const columns: ColumnDef<User>[] = [
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
    accessorKey: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      return <Badge variant="outline">{row.original.role}</Badge>;
    },
  },
  {
    id: "actions",
    header: () => <h3 className="text-center">Actions</h3>,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex flex-row items-center justify-center gap-4">
          <UserDialog
            trigger={
              <Pencil2Icon className="stroke h-8 w-8 cursor-pointer rounded-lg bg-slate-200/30 stroke-green-500 stroke-[0.5] p-1 text-green-400 hover:bg-slate-200/40 hover:text-green-500" />
            }
            initialData={user}
          />
          <UserDeleteDialog
            trigger={
              <TrashIcon className="stroke h-8 w-8 cursor-pointer rounded-lg bg-slate-200/30 stroke-red-500 stroke-[0.5] p-1 text-red-400 hover:bg-slate-200/40 hover:text-red-500" />
            }
            user={user}
          />
        </div>
      );
    },
  },
];

const UsersTable = ({ data }: UserTableProps) => {
  return <DataTable columns={columns} data={data} />;
};

export default UsersTable;
