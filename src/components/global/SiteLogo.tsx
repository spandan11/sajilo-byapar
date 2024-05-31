import Link from "next/link";
import { Package2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

const SiteLogo = ({ className }: { className?: string }) => {
  return (
    <Link
      href="#"
      className={cn(
        "flex items-center gap-2 font-semibold h-[60px]",
        className
      )}
    >
      <Package2Icon className="h-6 w-6 text-primary" />
      <p className="">
        Sajilo <span className="text-primary text-lg">B</span>yapar
      </p>
    </Link>
  );
};

export default SiteLogo;
