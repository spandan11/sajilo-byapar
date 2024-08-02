import Link from "next/link";
import { Package2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

const SiteLogo = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/"
      className={cn(
        "flex h-[60px] items-center gap-2 font-semibold",
        className,
      )}
    >
      <Package2Icon className="h-6 w-6 text-primary" />
      <p className="">
        Sajilo <span className="text-base text-primary md:text-lg">B</span>yapar
      </p>
    </Link>
  );
};

export default SiteLogo;
