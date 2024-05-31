"use client";

import { FC, ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

const orderDetailsFormSchema = z.object({
  customerName: z.string().min(1, "Name is required"),
  //   quantity: z.number().positive(),
  quantity: z.coerce.number(),

  //   role: z.enum(["owner", "manager"]),
});

type OrderDetailsFormSchemaType = z.infer<typeof orderDetailsFormSchema>;

interface OrderDetailsProps {
  initialData: Order | null;
  trigger: ReactNode;
}

const OrderDetailSheet: FC<OrderDetailsProps> = ({ initialData, trigger }) => {
  const form = useForm<OrderDetailsFormSchemaType>({
    resolver: zodResolver(orderDetailsFormSchema),
    defaultValues: initialData || {},
  });

  function onSubmit(values: OrderDetailsFormSchemaType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {initialData ? "Order Details sheet" : "Create new Order"}
          </SheetTitle>
          <SheetDescription>
            {initialData
              ? "Customers Order details appears here."
              : "Create a new Order."}
          </SheetDescription>
        </SheetHeader>
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
              name="quantity"
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
      </SheetContent>
    </Sheet>
  );
};

export default OrderDetailSheet;
