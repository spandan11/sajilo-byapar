import { ReactNode } from "react";
import { Poppins } from "next/font/google";
import Navbar from "@/components/home/Navbar";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={cn(
        "flex h-full flex-col items-center justify-center",
        poppins.className,
      )}
    >
      <Navbar />
      {children}
    </div>
  );
};

export default HomeLayout;
