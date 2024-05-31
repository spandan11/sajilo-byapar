"use client";

import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Upload, ArrowUpRight, PlusCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/app/dashboard/products/page";
import { TrashIcon } from "@radix-ui/react-icons";

const OrderFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  variants: z.array(
    z.object({
      size: z.enum(["S", "M", "L", "XL", "XXL"]),
      stock: z.number().positive("Stock quantity is required"),
      price: z.number().positive("Price is required"),
    })
  ),
  category: z.string().min(1, "Category is required"),
  status: z.enum(["archived", "drafted", "published"]),
});

type OrderFormSchemaType = z.infer<typeof OrderFormSchema>;

interface OrderFormProps {
  initialData: Product | null;
}

export const OrderForm: FC<OrderFormProps> = ({ initialData }) => {
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
    <>
      <div className="flex items-center justify-end gap-4">
        <Button type="button" variant="outline">
          Discard
        </Button>
        <Button
          type="submit"
          onClick={async () => {
            await form.handleSubmit(onSubmit)();
          }}
        >
          Save Product
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="col-span-1 md:col-span-2 flex flex-col gap-8">
            {/* Product name & description part */}
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>
                  Give your product a catchy and descriptive name
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between flex-row">
                            <FormLabel>Product Name</FormLabel>
                            <FormMessage />
                          </div>
                          <FormControl>
                            <Input placeholder="product name" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is your product's public name.
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between flex-row">
                            <FormLabel>Product Description</FormLabel>
                            <FormMessage />
                          </div>
                          <FormControl>
                            <Textarea
                              id="description"
                              className="min-h-32 resize-none"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Prices with variants table */}
            <Card>
              <CardHeader>
                <CardTitle>Stock</CardTitle>
                <CardDescription>
                  Fill each stock variant with size, available quantity and
                  price
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Size</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead> </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="w-full">
                    <AnimatePresence>
                      {form?.watch("variants")?.map((_, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{
                                  opacity: { duration: 0.2 },
                                  height: { duration: 0.2 },
                                }}
                              >
                                <FormField
                                  control={form.control}
                                  name={`variants.${index}.size`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <ToggleGroup
                                          type="single"
                                          variant="outline"
                                          {...field}
                                        >
                                          <ToggleGroupItem value="S">
                                            S
                                          </ToggleGroupItem>
                                          <ToggleGroupItem value="M">
                                            M
                                          </ToggleGroupItem>
                                          <ToggleGroupItem value="L">
                                            L
                                          </ToggleGroupItem>
                                        </ToggleGroup>
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </motion.div>
                            </TableCell>
                            <TableCell>
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{
                                  opacity: { duration: 0.2 },
                                  height: { duration: 0.2 },
                                }}
                              >
                                <FormField
                                  control={form.control}
                                  name={`variants.${index}.stock`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </motion.div>
                            </TableCell>
                            <TableCell>
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{
                                  opacity: { duration: 0.2 },
                                  height: { duration: 0.2 },
                                }}
                              >
                                <FormField
                                  control={form.control}
                                  name={`variants.${index}.price`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </motion.div>
                            </TableCell>
                            <TableCell>
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{
                                  opacity: { duration: 0.2 },
                                  height: { duration: 0.2 },
                                }}
                              >
                                <Label htmlFor="price-1" className="sr-only">
                                  Delete
                                </Label>
                                <TrashIcon
                                  onClick={() => {
                                    form.setValue(
                                      "variants",
                                      form
                                        .getValues("variants")
                                        .filter((_, i) => i !== index)
                                    );
                                  }}
                                  className="p-1 h-8 w-8 stroke stroke-red-500 stroke-[0.5] text-red-400 hover:text-red-500 cursor-pointer bg-slate-200/30 hover:bg-slate-200/40 rounded-lg"
                                />
                              </motion.div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="justify-center border-t p-4">
                <Button
                  onClick={() => {
                    form.setValue("variants", [
                      ...form.watch("variants"),
                      {
                        stock: 0,
                        price: 0,
                        size: "S",
                      },
                    ]);
                  }}
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="gap-1"
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  Add Variant
                </Button>
              </CardFooter>
            </Card>
            <div className="grid gird-cols-1 md:grid-cols-2 gap-8">
              {/* Product Category Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Product Category</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* <div className="grid gap-6"> */}
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger
                                id="category"
                                aria-label="Select category"
                              >
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="clothing">Clothing</SelectItem>
                              <SelectItem value="electronics">
                                Electronics
                              </SelectItem>
                              <SelectItem value="accessories">
                                Accessories
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* <div className="grid gap-3">
                    <Label htmlFor="subcategory">Subcategory (optional)</Label>
                    <Select>
                      <SelectTrigger
                        id="subcategory"
                        aria-label="Select subcategory"
                      >
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="t-shirts">T-Shirts</SelectItem>
                        <SelectItem value="hoodies">Hoodies</SelectItem>
                        <SelectItem value="sweatshirts">Sweatshirts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div> */}
                  {/* </div> */}
                </CardContent>
              </Card>
              {/* Product status select menu */}
              <Card>
                <CardHeader>
                  <CardTitle>Product Status</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* <div className="grid gap-6"> */}
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger
                                id="status"
                                aria-label="Select status"
                              >
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="drafted">Draft</SelectItem>
                              <SelectItem value="published">Active</SelectItem>
                              <SelectItem value="archived">Archive</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    {/* <Select>
                      <SelectTrigger id="status" aria-label="Select status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="drafted">Draft</SelectItem>
                        <SelectItem value="published">Active</SelectItem>
                        <SelectItem value="archived">Archive</SelectItem>
                      </SelectContent>
                    </Select> */}
                  </div>
                  {/* </div> */}
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="col-span-1 gap-8 flex flex-col">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>
                  Upload all images related to this product. Accepts .jpg, .png
                  up to 5MB each.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Image
                    alt="Product image"
                    className="aspect-square w-full rounded-md object-cover"
                    height="300"
                    src="/placeholder.svg"
                    width="300"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <button>
                      <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="84"
                        src="/placeholder.svg"
                        width="84"
                      />
                    </button>
                    <button>
                      <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="84"
                        src="/placeholder.svg"
                        width="84"
                      />
                    </button>
                    <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                      <Upload className="h-4 w-4 text-muted-foreground" />
                      <span className="sr-only">Upload</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Feature Product button */}
            <Card>
              <CardHeader>
                <CardTitle>Feature Product</CardTitle>
                <CardDescription>
                  Make this product featured on the homepage.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" variant="secondary">
                  Feature Product
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </>
  );
};

const SingleTableRow = () => {
  return (
    <TableRow>
      <TableCell>
        <ToggleGroup type="single" defaultValue="s" variant="outline">
          <ToggleGroupItem value="s">S</ToggleGroupItem>
          <ToggleGroupItem value="m">M</ToggleGroupItem>
          <ToggleGroupItem value="l">L</ToggleGroupItem>
        </ToggleGroup>
      </TableCell>
      {/* <TableCell className="font-semibold">GGPC-001</TableCell> */}
      <TableCell>
        <Label htmlFor="stock-1" className="sr-only">
          Stock
        </Label>
        <Input id="stock-1" type="number" defaultValue="100" />
      </TableCell>
      <TableCell>
        <Label htmlFor="price-1" className="sr-only">
          Price
        </Label>
        <Input id="price-1" type="number" defaultValue="99.99" />
      </TableCell>
      <TableCell>
        <Label htmlFor="price-1" className="sr-only">
          Delete
        </Label>
        <TrashIcon className="p-1 h-8 w-8 stroke stroke-red-500 stroke-[0.5] text-red-400 hover:text-red-500 cursor-pointer bg-slate-200/30 hover:bg-slate-200/40 rounded-lg" />
      </TableCell>
    </TableRow>
  );
};
