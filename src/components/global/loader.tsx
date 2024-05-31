import { ReactNode } from "react";
import { Spinner } from "@/components/global/spinner";
import { cn } from "@/lib/utils";

type LoaderProps = {
  loading: boolean;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
};

export const Loader = ({
  loading,
  children,
  noPadding,
  className,
}: LoaderProps) => {
  return loading ? (
    <div className={cn(className || "flex w-full justify-center py-5")}>
      <Spinner noPadding={noPadding} />
    </div>
  ) : (
    children
  );
};
