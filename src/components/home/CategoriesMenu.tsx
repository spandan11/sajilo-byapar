"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Categories } from "@/constants/LandingPage-constants";

const CategoriesMenu = () => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="mx-auto flex w-full flex-col items-start justify-between px-4 py-10 md:px-10">
      <h2 className="py-2 text-left text-xl font-semibold">Categories</h2>
      <div className="grid w-full grid-cols-1 gap-4 py-2 md:grid-cols-2 lg:grid-cols-4">
        {Categories.map((category) => (
          <Card key={category.label} className="w-full">
            <CardContent className="h-[300] w-[300]">
              <Image
                src={category.url}
                alt="Product Image"
                width={300}
                height={300}
                onLoad={() => setLoaded(true)}
                className={`aspect-square w-full rounded-md object-cover ${loaded ? "blur-none" : "blur-md"}`}
              />
            </CardContent>
            <CardFooter>{category.label}</CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoriesMenu;
