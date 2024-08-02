"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronsRight, Heart, ShoppingBag, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SectionHeading from "@/components/home/SectionHeading";
import { api } from "@/trpc/react";
import SkeletonWrapper from "@/components/global/SkeletonWrapper";
import { useRouter } from "next/navigation";

const TrendingProducts = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const { data: products, isLoading } =
    api.product.getTrendingProducts.useQuery();

  return (
    <div className="mx-auto flex w-full flex-col items-start justify-between px-4 py-5 md:px-10">
      <SectionHeading heading="Trending Products" browseHref="/trending" />
      <ScrollArea
        className="flex h-[420px] w-full flex-row items-center justify-center overflow-hidden whitespace-nowrap"
        aria-orientation="horizontal"
      >
        <div className="flex h-[400px] space-x-2 md:space-x-4">
          {products?.map((product) => (
            <SkeletonWrapper isLoading={isLoading}>
              <Card
                // key={product.id}
                onClick={() => router.push(`/products/${product.id}`)}
                className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg"
              >
                <SkeletonWrapper isLoading={isLoading}>
                  <div className="relative h-[300px] w-[300px]">
                    <Image
                      src="https://utfs.io/f/37f249fe-69b3-4db8-bfc4-5011d6bb77a8-3ul91i.jpg"
                      alt="Product Image"
                      width={400}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute right-4 top-4 cursor-pointer rounded-full bg-white/90 p-2 text-gray-800">
                      <Heart className="h-4 w-4" />
                    </div>
                  </div>
                  <CardFooter className="flex w-full flex-row items-start justify-between space-y-2 bg-white p-4 dark:bg-gray-950">
                    <div className="flex w-full flex-col items-start justify-center gap-1">
                      <h3 className="w-48 truncate text-lg font-bold">
                        {product.name}
                      </h3>
                      {/* <Badge className="text-xs font-thin">Fashion statement</Badge> */}
                      {/* <p className="border text-sm text-gray-500 dark:text-gray-400"></p> */}
                      <h4 className="text-sm font-semibold">$89.99</h4>
                      <p className="text-xs">
                        <s className="text-muted-foreground/60 ">$19.99</s> 14%{" "}
                      </p>
                    </div>
                    <Button
                      size="lg"
                      variant="ghost"
                      className="rounded-full border bg-accent/80 p-4 text-primary/90 hover:bg-accent hover:text-primary"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </SkeletonWrapper>
              </Card>
            </SkeletonWrapper>
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default TrendingProducts;
