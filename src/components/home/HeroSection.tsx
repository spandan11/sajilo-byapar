"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { type CarouselApi } from "@/components/ui/carousel";
import { CarouselItems } from "@/constants/LandingPage-constants";

const HeroSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const plugin = useRef(Autoplay({ playOnInit: false, delay: 2500 }));

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const autoplay = api?.plugins()?.autoplay;
    autoplay?.play();
  }, [api, plugin.current]);

  return (
    <Carousel
      setApi={setApi}
      plugins={[plugin.current]}
      //   plugins={[Autoplay({ playOnInit: false, delay: 3000 })]}
      opts={{
        loop: true,
        //   duration: 3000,
      }}
      className="h-full w-full pb-5"
      //   onMouseEnter={plugin.current.stop}
      //   onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {CarouselItems.map((item, index) => (
          <CarouselItem key={index} className="h-1/2 w-full">
            <div className="pt-1">
              <Image
                src={item.url}
                alt={item.label}
                width={3480}
                height={400}
                className={`aspect-square h-[200px] w-[3480px] rounded-md object-center md:aspect-auto md:h-[400px] ${loaded ? "blur-none" : "blur-md"}`}
                onLoad={() => setLoaded(true)}
                priority
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default HeroSection;
