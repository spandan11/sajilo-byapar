"use client";

import {
  BadgePercent,
  Banknote,
  Layers3,
  LayoutDashboard,
  LucideIcon,
  Package,
  PieChart,
  ShoppingCartIcon,
  UsersIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

type RoutesType = {
  label: string;
  href: string;
  icon: LucideIcon;
  active: boolean;
};

const useRoute = () => {
  const pathname = usePathname();
  const Routes: RoutesType[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
    {
      label: "Users",
      href: "/dashboard/users",
      icon: UsersIcon,
      active: pathname.startsWith("/dashboard/users"),
    },
    {
      label: "Products",
      href: "/dashboard/products",
      icon: Package,
      active: pathname.startsWith("/dashboard/products"),
    },
    {
      label: "Categories",
      href: "/dashboard/categories",
      icon: Layers3,
      active: pathname.startsWith("/dashboard/categories"),
    },
    {
      label: "Orders",
      href: "/dashboard/orders",
      icon: ShoppingCartIcon,
      active: pathname.startsWith("/dashboard/orders"),
    },
    {
      label: "Discount Coupons",
      href: "/dashboard/coupons",
      icon: BadgePercent,
      active: pathname.startsWith("/dashboard/coupons"),
    },
    {
      label: "Analytics",
      href: "/dashboard/analytics",
      icon: PieChart,
      active: pathname.startsWith("/dashboard/analytics"),
    },
    {
      label: "Transactions",
      href: "/dashboard/transactions",
      icon: Banknote,
      active: pathname.startsWith("/dashboard/transactions"),
    },
  ];
  return Routes;
};

export default useRoute;
