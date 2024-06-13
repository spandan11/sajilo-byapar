"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import SearchProductDialog from "@/components/home/SearchProductDialog";
import { NavItems as Routes } from "@/constants/LandingPage-constants";
import SiteLogo from "@/components/global/SiteLogo";
import Cart from "@/components/home/Cart";

const Navbar = () => {
  const { data } = useSession();
  return (
    <header className="sticky top-0 z-50 flex h-14 w-full items-center justify-between gap-4 border-b-2 bg-muted px-4 backdrop-blur-md md:px-10 lg:h-20 lg:px-20">
      <SiteLogo />
      {/* <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <Package2Icon className="h-6 w-6" />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        shadcn/ui
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Beautifully designed components that you can copy and
                        paste into your apps. Accessible. Customizable. Open
                        Source.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/docs" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href="/docs/installation" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Documentation
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu> */}
      <div className="hidden flex-1 gap-8 px-10 md:flex md:flex-row md:items-center md:justify-center">
        {Routes.map((route) => (
          <Link
            href={route.href}
            className="text-base text-muted-foreground hover:text-primary"
            key={route.label}
          >
            {route.label}
          </Link>
        ))}
      </div>
      {/* <div className="relative hidden flex-1 px-20 md:flex">
        <Input placeholder="Search..." className="h-12" />
        <Button
          size="icon"
          className="absolute right-20 top-1 transition-all"
          asChild
        >
          <Search className="h-10 w-10 cursor-pointer stroke-2 p-1 text-foreground transition" />
        </Button>
      </div> */}
      <div className="flex items-center justify-center gap-0 md:gap-2">
        <SearchProductDialog
          trigger={
            <Search className="h-7 w-7 p-1 text-foreground transition" />
          }
        />
        <Button size="icon" variant="ghost" asChild>
          <Link href={data?.user ? "/dashboard" : "/auth/sign-in"}>
            <User2 className="h-7 w-7 p-1 text-foreground transition" />
          </Link>
        </Button>
        <Cart
          trigger={
            <Button size="icon" variant="ghost" className="relative">
              <ShoppingCart className="h-7 w-7 p-1 text-foreground transition" />
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {0}
              </span>
            </Button>
          }
        />
      </div>
    </header>
  );
};

export default Navbar;

// const ListItem = forwardRef<
//   React.ElementRef<"a">,
//   React.ComponentPropsWithoutRef<"a">
// >(({ className, title, children, ...props }, ref) => {
//   return (
//     <li>
//       <NavigationMenuLink asChild>
//         <a
//           ref={ref}
//           className={cn(
//             "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//             className,
//           )}
//           {...props}
//         >
//           <div className="text-sm font-medium leading-none">{title}</div>
//           <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//             {children}
//           </p>
//         </a>
//       </NavigationMenuLink>
//     </li>
//   );
// });
// ListItem.displayName = "ListItem";
