import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { getServerAuthSession } from "@/server/auth";
import DashboardNavbar from "@/components/dashboard/Navbar";
import DashboardSidebar from "@/components/dashboard/Sidebar";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerAuthSession();
  if (!session?.user) {
    redirect("/auth/sign-in");
  }
  return (
    <div className="grid min-h-screen w-full scroll-smooth focus:scroll-auto md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <DashboardSidebar />
      <div className="flex flex-col">
        {/* Header */}
        <DashboardNavbar />
        <main className="flex flex-1 flex-col gap-0 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
