"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Category, Prisma, Product, Store, Variant } from "@prisma/client";
import { CalendarIcon, ClockIcon } from "@radix-ui/react-icons";
import {
  Award,
  Check,
  CircleCheckIcon,
  RefreshCwIcon,
  ShieldCheckIcon,
  StarIcon,
  TruckIcon,
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  stockColorOptions,
  stockSizeOptions,
} from "@/constants/product-constants";
import Image from "next/image";

interface ProductComponentProps {
  productData: Prisma.ProductGetPayload<{
    include: {
      variants: true;
      Category: true;
      Store: true;
    };
  }>;
}

const ProductComponent = ({ productData }: ProductComponentProps) => {
  console.log(productData);
  const [toggleColorId, settoggleColorId] = useState(
    productData?.variants[0]?.id,
  );
  const [toggleSizeId, settoggleSizeId] = useState(
    productData?.variants[0]?.id,
  );
  const availableSizes = productData.variants.map((variant) => variant.size);
  // const main=stockSizeOptions.find(item=>!availableSizes.includes(item.value))?.value;

  return (
    <div className="mx-auto min-w-full px-0 md:my-12 md:px-10">
      <div className="flex w-full flex-col items-start space-y-6 md:flex-row md:space-x-6 md:space-y-0">
        <div className="flex w-full flex-col items-start space-y-6 rounded-lg px-2 py-6 md:w-4/5 md:flex-row md:space-x-10 md:space-y-0 md:px-4">
          <div className="relative w-full md:w-2/4">
            <Image
              // src={productData?.}
              // src="https://utfs.io/f/37f249fe-69b3-4db8-bfc4-5011d6bb77a8-3ul91i.jpg"
              // src="https://utfs.io/f/89b6e00c-e658-47e4-8e8e-a48aebd2e1c9-fxxw1j.jpg"
              // http://localhost:3000/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2F0afdc2b0-68ce-4ed0-9fc3-b35e14547bbd-bn7ddp.jpg&w=32&q=75
              src="https://utfs.io/f/0afdc2b0-68ce-4ed0-9fc3-b35e14547bbd-bn7ddp.jpg"
              alt="MNC Natural Coffee"
              width={400}
              height={600}
              className="h-auto w-full rounded-md object-cover"
            />
            {productData.isFeatured && (
              <Badge className="absolute right-2 top-2">
                <Award className="mr-1 h-4 w-4" />
                <span className="text-xs font-light">Featured</span>
              </Badge>
            )}
          </div>
          <div className="w-full space-y-6 p-4 md:w-3/5">
            {/* Name and Reviews */}
            <div className="flex flex-col items-start justify-center space-y-2">
              <h1 className="text-2xl font-bold">{productData.name}</h1>
              <div className="flex items-start justify-center space-x-1">
                <StarIcon className="h-4 w-4 text-yellow-500" />
                <StarIcon className="h-4 w-4 text-yellow-500" />
                <StarIcon className="h-4 w-4 text-yellow-500" />
                <StarIcon className="h-4 w-4 text-yellow-500" />
                <StarIcon className="h-4 w-4 text-yellow-500" />
                <span className="text-xs text-gray-500">246 Reviews</span>
              </div>
            </div>
            {/* Description */}
            <div className="space-y-2">
              {/* <h2 className="text-lg font-semibold">Description</h2> */}
              <p className="text-sm text-gray-500">{productData.description}</p>
              {/* <div className="flex space-x-2">
                <Button variant="outline">Powder</Button>
                <Button variant="default">Whole Bean</Button>
                <Button variant="outline">Ground</Button>
              </div> */}
            </div>
            {/* Sizes */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Sizes</h2>
              <div className="flex space-x-2">
                <ToggleGroup
                  type="single"
                  variant="outline"
                  value={toggleSizeId}
                  onValueChange={settoggleSizeId}
                  className="space-x-1"
                >
                  {stockSizeOptions.map((size) => (
                    <ToggleGroupItem
                      key={size.value}
                      value={size.value}
                      // disabled={
                      //   size.value === toggleSizeId ||
                      //   !availableSizes.includes(size.value)
                      // }
                      // disabled={!availableSizes.includes(size.value)}
                    >
                      {size.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            </div>
            {/* Colors */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Colors</h2>
              <div className="flex space-x-2">
                <ToggleGroup
                  type="single"
                  variant="outline"
                  value={toggleColorId}
                  onValueChange={settoggleColorId}
                >
                  {productData.variants.map((option) => (
                    <ToggleGroupItem key={option.id} value={option.id} asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full p-0 ring-0",
                          {
                            // [option.backgroundColor]: option.value,
                            // [option.ring]: field.value === option.value,
                          },
                        )}
                      >
                        <Check
                          className={cn("h-4 w-4 opacity-0", {
                            // "opacity-1 text-gray-700":
                            //   field.value === option.value,
                          })}
                        />
                      </Button>
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
                {/* <Button variant="outline">2</Button>
                <Button variant="default">4</Button>
                <Button variant="outline">6</Button> */}
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">
                Choose Your Subscription
              </h2>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline">
                  4 Months
                  <br />
                  $80.50/mo
                </Button>
                <Button variant="default">
                  8 Months
                  <br />
                  $148.85/mo
                  <Badge variant="secondary" className="ml-2">
                    Popular
                  </Badge>
                </Button>
                <Button variant="outline">
                  Annual
                  <br />
                  $84.50/mo
                </Button>
              </div>
            </div>
            <div className="text-2xl font-bold">
              $78.50<span className="text-sm font-normal">/monthly</span>
            </div>
            <Button className="w-full">Add to Cart</Button>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <TruckIcon className="h-4 w-4" />
              <span>Free Shipping</span>
              <CircleCheckIcon className="h-4 w-4" />
              <span>Cancel Anytime</span>
            </div>
          </div>
        </div>
        <div className="mx-auto space-y-4 rounded-lg border p-4 shadow-md md:w-1/5">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Delivery</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <CalendarIcon className="h-4 w-4" />
              <span>Delivered every 4 weeks</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <ClockIcon className="h-6 w-6" />
              <span>Estimated delivery in 5-7 business days</span>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Other</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <ShieldCheckIcon className="h-4 w-4" />
              <span>100% Satisfaction Guarantee</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <RefreshCwIcon className="h-4 w-4" />
              <span>Easy Cancellation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
