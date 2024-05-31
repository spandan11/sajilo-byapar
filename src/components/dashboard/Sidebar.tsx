"use client";

import Link from "next/link";
import { BellIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import SiteLogo from "@/components/global/SiteLogo";
import useRoute from "@/hooks/use-route";
import { cn } from "@/lib/utils";
import Upgrade from "@/components/dashboard/Upgrade";

const DashboardSidebar = () => {
  const routes = useRoute();
  return (
    <div className="sticky top-0 z-50 hidden h-screen border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        {/* Logo section */}
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <SiteLogo />
          <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
            <BellIcon className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        {/* Sidebar Main Links */}
        <div className="scroll-hi flex-1 overflow-y-auto">
          <nav className="grid items-start px-2 py-4 text-sm font-medium lg:px-4">
            <p className="pb-1 text-xs text-muted-foreground">Main Links</p>
            {routes.map((route) => (
              <Link
                key={route.label}
                href={route.href}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-all hover:text-primary",
                  {
                    "bg-primary/10 text-primary": route.active,
                  },
                )}
              >
                <route.icon className="h-6 w-6" />
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
        {/* Sidebar Customization Links */}
        {/* <div className="flex-1">
          <nav className="grid items-start px-2 py-4 text-sm font-medium lg:px-4">
            <p className="text-muted-foreground text-xs pb-1">Main Links</p>
            {routes.map((route) => (
              <Link
                key={route.label}
                href={route.href}
                className={cn(
                  "flex w-full text-sm items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  {
                    "text-primary bg-primary/10": route.active,
                  }
                )}
              >
                <route.icon className="h-6 w-6" />
                {route.label}
              </Link>
            ))}
          </nav>
        </div> */}
        {/* Sidebar lower section */}
        <Upgrade />
      </div>
    </div>
  );
};

export default DashboardSidebar;
