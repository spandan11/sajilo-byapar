import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Categories } from "@/constants/LandingPage-constants";

const ScrollableCard = () => {
  const [loaded, setLoaded] = useState(false);
  return (
    <ScrollArea
      className="flex h-[235px] w-full flex-row items-center justify-center overflow-hidden whitespace-nowrap"
      aria-orientation="horizontal"
    >
      <div className="flex h-[230px] w-max space-x-2 md:space-x-4">
        {Categories.map((category) => (
          <Card
            key={category.label}
            className="h-[200px] cursor-pointer border-2 border-transparent px-0 py-4 transition hover:border-primary/50 hover:shadow-xl md:px-4"
          >
            <CardContent className="h-[150px] w-[150px]">
              <Image
                src={category.url}
                alt="Product Image"
                width={150}
                height={150}
                onLoad={() => setLoaded(true)}
                className={`aspect-[3/4] h-fit w-fit rounded-md object-cover ${loaded ? "blur-none" : "blur-md"}`}
              />
            </CardContent>
            <p className="text-center text-sm">{category.label}</p>
          </Card>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default ScrollableCard;
