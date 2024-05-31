"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { DataTableFacetedFilter } from "@/components/ui/data-table-faceted-filters";
import { ORDER_STATUS, PAYMENT_STATUS, PRODUCT_STATUS } from "@prisma/client";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const pathname = usePathname();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      pagination,
    },
  });

  const isProductsPage = pathname.startsWith("/dashboard/products");
  const isOrdersPage = pathname.startsWith("/dashboard/orders");

  const productStatusColumn = table.getColumn("status");
  const paymentStatusColumn = table.getColumn("paymentStatus");
  const orderStatusColumn = table.getColumn("orderStatus");

  const renderPaymentStatusFilter = () =>
    paymentStatusColumn && (
      <DataTableFacetedFilter
        title="Payment Status"
        column={paymentStatusColumn}
        options={paymentStatusOptions}
      />
    );

  const renderOrderStatusFilter = () =>
    orderStatusColumn && (
      <DataTableFacetedFilter
        title="Order Status"
        column={orderStatusColumn}
        options={orderStatusOptions}
      />
    );

  const renderProductStatusFilter = () =>
    productStatusColumn && (
      <DataTableFacetedFilter
        title="Status"
        column={productStatusColumn}
        options={productStatusOptions}
      />
    );

  const productStatusOptions: Array<{ label: string; value: PRODUCT_STATUS }> =
    [
      { label: "Archived", value: "ARCHIVED" },
      { label: "Drafted", value: "DRAFTED" },
      { label: "Active", value: "ACTIVE" },
    ];

  const paymentStatusOptions: Array<{ label: string; value: PAYMENT_STATUS }> =
    [
      { label: "Paid", value: "PAID" },
      { label: "Unpaid", value: "UNPAID" },
      { label: "Refunded", value: "REFUNDED" },
    ];

  const orderStatusOptions: Array<{ label: string; value: ORDER_STATUS }> = [
    { label: "Pending", value: "PENDING" },
    { label: "Processing", value: "PROCESSING" },
    { label: "Dispatched", value: "DISPATCHED" },
    { label: "Delivered", value: "DELIVERED" },
    { label: "Cancelled", value: "CANCELLED" },
    { label: "Returned", value: "RETURNED" },
  ];
  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Search..."
          value={globalFilter}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <div className="ml-auto flex flex-row items-center justify-center gap-4">
          {isOrdersPage && (
            <>
              {renderPaymentStatusFilter()}
              {renderOrderStatusFilter()}
            </>
          )}
          {isProductsPage && renderProductStatusFilter()}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto hidden h-8 lg:flex">
                <MixerHorizontalIcon className="mr-2 h-4 w-4" />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value: any) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
