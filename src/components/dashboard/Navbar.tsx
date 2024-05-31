"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import SiteLogo from "@/components/global/SiteLogo";
import Upgrade from "@/components/dashboard/Upgrade";
import useRoute from "@/hooks/use-route";
import UserAvatar from "@/components/dashboard/UserAvatar";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/global/ThemeToggle";

const DashboardNavbar = () => {
  const [open, setOpen] = useState(false);
  const routes = useRoute();

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between gap-4 border-b bg-muted/40 px-4 backdrop-blur-md md:justify-end lg:h-[60px] lg:px-6">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button className="shrink-0 md:hidden" size="icon" variant="outline">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="flex w-full flex-col">
          <nav className="grid w-full grid-cols-1 items-center justify-center gap-2 px-4 py-4 text-lg font-medium">
            <SiteLogo className="flex items-center justify-center py-4 text-xl" />
            {routes.map((route) => (
              <Link
                key={route.label}
                href={route.href}
                onClick={() => setOpen(false)}
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
          {/* Lower Section */}
          <Upgrade />
        </DrawerContent>
      </Drawer>
      <div className="w-full flex-1 justify-center md:hidden">
        {/* <form>
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
              placeholder="Search products..."
              type="search"
            />
          </div>
        </form> */}
        <SiteLogo />
      </div>
      {/* Theme Toggle button */}
      <ThemeToggle />
      {/* User Avatar */}
      <UserAvatar />
    </header>
  );
};

export default DashboardNavbar;
