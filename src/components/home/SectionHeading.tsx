import Link from "next/link";
import { ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SectionHeadingProps {
  heading: string;
  browseHref: string;
  browseLabel?: string;
}

const SectionHeading = ({
  heading,
  browseHref,
  browseLabel,
}: SectionHeadingProps) => {
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <h2 className="py-3 text-left text-xl font-semibold">{heading} </h2>
      <Button variant="ghost" asChild>
        <Link href={browseHref} className="text-xs underline">
          {browseLabel || "Browse all"}
          <ChevronsRight className="stroke ml-1 h-4 w-4 stroke-[1.5] text-primary" />
        </Link>
      </Button>
    </div>
  );
};

export default SectionHeading;
