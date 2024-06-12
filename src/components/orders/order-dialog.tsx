"use client";

import { FC, ReactNode, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Order } from "@/types";
import { OrderFormSchema, OrderFormSchemaType } from "@/schemas/order.schema";

interface OrderDetailsProps {
  initialData: Order | null;
  trigger: ReactNode;
}

const OrderDialog: FC<OrderDetailsProps> = ({ initialData, trigger }) => {
  const [edit, setEdit] = useState(false);
  const form = useForm<OrderFormSchemaType>({
    resolver: zodResolver(OrderFormSchema),
    defaultValues: initialData || {},
  });

  function onSubmit(values: OrderFormSchemaType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData
              ? edit
                ? "Edit Order Details"
                : "Order Details"
              : "Create new Order"}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? edit
                ? "Edit customer order details here"
                : "Customers Order details appears here."
              : "Create a new Order."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-center justify-between">
                    <FormLabel>Full Name</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input placeholder="john doe..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-center justify-between">
                    <FormLabel>Email</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button disabled={form.formState.isSubmitting} type="submit">
              Submit
              {form.formState.isSubmitting && (
                <Loader2 className="ml-1 h-8 w-8 animate-spin p-1 text-muted-foreground" />
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialog;
