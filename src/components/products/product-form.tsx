"use client";

import React, { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { Upload, PlusCircle, Check } from "lucide-react";
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
import {
  stockColorOptions,
  stockSizeOptions,
  ProductStatusOptions,
} from "@/constants/product-constants";
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
    api.product.createProduct.useMutation({
      onSuccess: () => {
        toast({
          title: `Product created successfully`,
          description: "Please refresh the page to see the new product",
        });
        router.push("/dashboard/products");
      },
      onError: (error) => {
        toast({
          title: "Error creating product",
          description: error.message,
        });
      },
    });
  const { mutate: updateProduct, isPending: isPendingUpdate } =
    api.product.updateProduct.useMutation({
      onSuccess: () => {
        toast({
          title: `Product updated successfully`,
          description: "Please refresh the page to see the new product",
        });
        router.push("/dashboard/products");
      },
      onError: (error) => {
        console.log(error.message);
        toast({
          title: "Error updating product",
          description: error.message,
        });
      },
    });
  const form = useForm<ProductFormSchemaType>({
    resolver: zodResolver(productFormSchema),
    defaultValues: initialData || {
      allowOrderWhenEmpty: true,
    },
  });

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  function onSubmit(values: ProductFormSchemaType) {
    initialData?.id
      ? updateProduct({
          productFormSchema: {
            ...values,
            variants: values.variants.map((variant) => ({
              ...variant,
              variantId: variant.id,
            })),
          },
          productId: initialData.id,
        })
      : createProduct(values);
    form.reset();
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
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
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
                              {ProductStatusOptions.map((status) => (
                                <SelectItem
                                  key={status.value}
                                  value={status.value}
                                >
                                  {status.label}
                                </SelectItem>
                              ))}
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
                      {variantFields.map((field, index) => {
                        return (
                          <TableRow key={field.id}>
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
                                          {stockSizeOptions.map((size) => (
                                            <ToggleGroupItem
                                              key={size.value}
                                              value={size.value}
                                            >
                                              {size.label}
                                            </ToggleGroupItem>
                                          ))}
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
                                          {stockColorOptions.map((option) => (
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
                                  onClick={() => removeVariant(index)}
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
                  onClick={() =>
                    appendVariant({
                      size: "S",
                      color: "RED",
                      stock: 0,
                      price: 0,
                      discount: 0,
                    })
                  }
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
