"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronsRight, Heart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SectionHeading from "@/components/home/SectionHeading";
import { api } from "@/trpc/react";

const TrendingProducts = () => {
  const [loaded, setLoaded] = useState(false);
  const { data: products, isLoading } = api.product.getallProducts.useQuery();

  return (
    <div className="mx-auto flex w-full flex-col items-start justify-between px-4 py-5 md:px-10">
      <SectionHeading heading="Trending Products" browseHref="/trending" />
      <ScrollArea
        className="flex h-[420px] w-full flex-row items-center justify-center overflow-hidden whitespace-nowrap"
        aria-orientation="horizontal"
      >
        <div className="flex h-[400px] w-max space-x-2 md:space-x-4">
          {products?.map((product) => (
            <Card
              key={product.id}
              className="relative h-[400px] w-1/4 cursor-pointer px-0 py-4 transition hover:shadow-xl"
            >
              <CardContent className=" h-[200px] w-full overflow-hidden">
                <Image
                  src={
                    "https://utfs.io/f/157bf1f5-e4fe-465e-91ec-10fd32d319b7-3ul91i.jpg"
                  }
                  alt="Product Image"
                  width={300}
                  height={300}
                  onLoad={() => setLoaded(true)}
                  className={`h-full w-full object-cover ${loaded ? "blur-none" : "blur-md"}`}
                />
                <div className="absolute right-2 top-2 rounded-full bg-gray-900 p-2 text-white">
                  <Heart
                    className="h-6 w-6 cursor-pointer"
                    // onClick={() => setImage("")}
                  />
                </div>
                <CardFooter className="p-4 dark:bg-gray-950">
                  <h3 className="text-lg font-bold">Designer Handbag</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Fashion statement
                  </p>
                  <h4 className="text-base font-semibold md:text-lg">$89.99</h4>
                </CardFooter>
              </CardContent>
              {/* <p className="text-center text-sm">{product.name}</p> */}
            </Card>
            // <div className="group relative overflow-hidden rounded-lg shadow-lg">
            //   <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            //     <span className="sr-only">View Product</span>
            //   </Link>
            //   <Image
            //     src="/placeholder.svg"
            //     alt="Product Image"
            //     width={400}
            //     height={400}
            //     className="aspect-square w-full object-cover"
            //   />
            //   <div className="absolute right-4 top-4 rounded-full bg-gray-900 p-2 text-white">
            //     <Heart className="h-4 w-4" />
            //   </div>
            //   <div className="bg-white p-4 dark:bg-gray-950">
            //     <h3 className="text-lg font-bold">Designer Handbag</h3>
            //     <p className="text-sm text-gray-500 dark:text-gray-400">
            //       Fashion statement
            //     </p>
            //     <h4 className="text-base font-semibold md:text-lg">$89.99</h4>
            //   </div>
            // </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default TrendingProducts;
