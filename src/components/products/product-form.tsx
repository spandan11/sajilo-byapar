"use client";

import React, { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { Upload, PlusCircle, Check, BadgeCheck } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { TrashIcon } from "@radix-ui/react-icons";

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
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { colorOptions } from "@/constants/product-constants";
import { useToast } from "@/components/ui/use-toast";
import type { Product } from "@/types";

import {
  productFormSchema,
  ProductFormSchemaType,
} from "@/schemas/product.schema";
import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { LoadingButton } from "@/components/ui/loading-button";

interface ProductFormProps {
  initialData: Product | null;
}

export const ProductForm: FC<ProductFormProps> = ({ initialData }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: allCategories } = api.category.getallCategories.useQuery();
  const { mutate: createProduct, isPending: isPendingCreate } =
    api.product.createProduct.useMutation();
  const { mutate: updateProduct, isPending: isPendingUpdate } =
    api.product.updateProduct.useMutation();
  const form = useForm<ProductFormSchemaType>({
    resolver: zodResolver(productFormSchema),
    defaultValues: initialData || {
      // variants: [
      //   // {
      //   //   size: "S",
      //   //   color: "BLACK",
      //   //   stock: 20,
      //   //   price: 50,
      //   //   discount: 30,
      //   // },
      //   // {
      //   //   size: "S",
      //   //   color: "RED",
      //   //   stock: 20,
      //   //   price: 50,
      //   //   discount: 30,
      //   // },
      //   // {
      //   //   size: "S",
      //   //   color: "RED",
      //   //   stock: 20,
      //   //   price: 50,
      //   //   discount: 30,
      //   // },
      // ],
      allowOrderWhenEmpty: true,
      // name: "",
      // description: "",
      // category: "",
      // price: 0,
      // quantity: 0,
      // discount: 0,
      // status: "DRAFTED",
      // isFeatured: false,
      // createdAt: "21st May",
      // variants: [
      //   {
      //     size: "S",
      //     stock: 0,
      //     // price: 0,
      //   },
      //   {
      //     size: "M",
      //     stock: 0,
      //     // price: 0,
      //   },
      //   {
      //     size: "L",
      //     stock: 0,
      //     // price: 0,
      //   },
      // ],
    },
  });

  console.log(initialData);

  console.log(form.getValues("variants"));

  function onSubmit(values: ProductFormSchemaType) {
    // console.log(
    //   "values and variants",
    //   values.variants.map((variant) => variant.variantId),
    // );
    console.log(form.getValues("variants"));
    values.variants = form.getValues("variants");

    initialData?.id
      ? updateProduct({
          productFormSchema: {
            ...values,
            variants: form.getValues("variants").map((variant) => ({
              ...variant,
              variantId: variant.variantId, // Ensure variantId is included
            })),
          },
          productId: initialData.id,
        })
      : createProduct(values);
    form.reset();
    router.refresh();
    toast({
      title: `Product ${initialData?.id ? "Edited" : "Created"} successfully`,
      description: "Please refresh the page to see the new product",
    });
  }

  return (
    <>
      <div className="flex items-center justify-end gap-4">
        <Button type="button" variant="outline">
          Discard
        </Button>
        <LoadingButton
          loading={isPendingCreate || isPendingUpdate}
          type="submit"
          onClick={async () => {
            await form.handleSubmit(onSubmit)();
          }}
        >
          {initialData?.id ? "Edit Product" : "Save Product"}
        </LoadingButton>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-8 lg:grid-cols-3"
        >
          <div className="col-span-1 flex flex-col gap-8 lg:col-span-2">
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
                          <div className="flex flex-row items-center justify-between">
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
                          <div className="flex flex-row items-center justify-between">
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
            <div className="gird-cols-1 grid gap-8 md:grid-cols-2">
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
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger
                                id="categoryId"
                                aria-label="Select category"
                              >
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {allCategories?.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                              {/* <SelectItem value="clothing">Clothing</SelectItem>
                              <SelectItem value="electronics">
                                Electronics
                              </SelectItem>
                              <SelectItem value="accessories">
                                Accessories
                              </SelectItem> */}
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
                              <SelectItem value="DRAFTED">Draft</SelectItem>
                              <SelectItem value="ACTIVE">Active</SelectItem>
                              <SelectItem value="ARCHIVED">Archive</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="w-full">
              {/* Feature Product button */}
              <Card>
                <CardHeader>
                  <CardTitle>Feature Product</CardTitle>
                  <CardDescription>
                    Make this product featured on the homepage.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="isFeatured"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Feature this product</FormLabel>
                          <FormDescription>
                            featured products will be shown on the homepage.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
            {/* variants table was here */}
          </div>
          <div className="col-span-1 flex flex-col gap-8">
            {/* Image Uploading section */}
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
            {/* allowOrderWhenEmpty button */}
            <Card>
              <CardHeader>
                <CardTitle>Allow Order When Empty</CardTitle>
                <CardDescription>
                  Allow order for this product when it is not available in
                  stock.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="allowOrderWhenEmpty"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Allow Order when empty</FormLabel>
                        <FormDescription>
                          You can allow order for this product when it is not
                          available in stock.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
          <div className="col-span-3 w-full">
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
                      <TableHead>Color</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Discount</TableHead>
                      <TableHead> </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="w-full">
                    <AnimatePresence>
                      {form?.watch("variants")?.map((_, index) => {
                        return (
                          <TableRow key={index}>
                            {/* Size section */}
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
                                          value={field.value}
                                          onValueChange={field.onChange}
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
                                          <ToggleGroupItem value="XL">
                                            XL
                                          </ToggleGroupItem>
                                          <ToggleGroupItem value="XXL">
                                            XXL
                                          </ToggleGroupItem>
                                        </ToggleGroup>
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </motion.div>
                            </TableCell>
                            {/* Color Section */}
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
                                  name={`variants.${index}.color`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <ToggleGroup
                                          type="single"
                                          variant="outline"
                                          {...field}
                                          value={field.value}
                                          onValueChange={field.onChange}
                                        >
                                          {colorOptions.map((option) => (
                                            <ToggleGroupItem
                                              key={option.value}
                                              value={option.value}
                                              asChild
                                            >
                                              <Button
                                                variant="outline"
                                                className={cn(
                                                  "flex h-8 w-8 items-center justify-center rounded-full p-0 ring-0",
                                                  {
                                                    [option.backgroundColor]:
                                                      option.value,
                                                    [option.ring]:
                                                      field.value ===
                                                      option.value,
                                                  },
                                                )}
                                              >
                                                <Check
                                                  className={cn(
                                                    "h-4 w-4 opacity-0",
                                                    {
                                                      "opacity-1 text-gray-700":
                                                        field.value ===
                                                        option.value,
                                                    },
                                                  )}
                                                />
                                              </Button>
                                            </ToggleGroupItem>
                                          ))}
                                          {/* <ToggleGroupItem value="RED" asChild>
                                            <Button
                                              variant="outline"
                                              className="h-8 w-8 rounded-full bg-red-500 hover:ring-1 hover:ring-black"
                                            />
                                          </ToggleGroupItem>
                                          <ToggleGroupItem
                                            value="GREEN"
                                            asChild
                                          >
                                            <Button
                                              variant="outline"
                                              className="h-8 w-8 rounded-full bg-green-500"
                                            />
                                          </ToggleGroupItem>
                                          <ToggleGroupItem value="BLUE" asChild>
                                            <Button
                                              variant="outline"
                                              className="h-8 w-8 rounded-full bg-blue-500"
                                            />
                                          </ToggleGroupItem>
                                          <ToggleGroupItem
                                            value="WHITE"
                                            asChild
                                          >
                                            <Button
                                              variant="outline"
                                              className="h-8 w-8 rounded-full bg-white"
                                            />
                                          </ToggleGroupItem>
                                          <ToggleGroupItem
                                            value="BLACK"
                                            asChild
                                          >
                                            <Button
                                              variant="outline"
                                              className="h-8 w-8 rounded-full bg-black"
                                            />
                                          </ToggleGroupItem>
                                          <ToggleGroupItem
                                            value="ORANGE"
                                            asChild
                                          >
                                            <Button
                                              variant="outline"
                                              className="h-8 w-8 rounded-full bg-orange-500"
                                            />
                                          </ToggleGroupItem> */}
                                        </ToggleGroup>
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </motion.div>
                            </TableCell>
                            {/* Stock Section */}
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
                            {/* Price section */}
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
                            {/* Discount section */}
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
                                  name={`variants.${index}.discount`}
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
                            {/* Options */}
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
                                        .filter((_, i) => i !== index),
                                    );
                                  }}
                                  className="stroke h-8 w-8 cursor-pointer rounded-lg bg-slate-200/30 stroke-red-500 stroke-[0.5] p-1 text-red-400 hover:bg-slate-200/40 hover:text-red-500"
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
                        size: "S",
                        color: "RED",
                        stock: 0,
                        price: 0,
                        discount: 0,
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
          </div>
        </form>
      </Form>
    </>
  );
};
