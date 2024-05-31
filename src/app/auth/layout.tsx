import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { ReactNode } from "react";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerAuthSession();
  if (session && session.user) {
    redirect("/dashboard");
  }
  return (
    <div className="h-screen w-full lg:grid lg:grid-cols-2 ">
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex flex-col items-center justify-start py-12">
        <Image
          src="/logo.png"
          alt="Logo"
          width={300}
          height={100}
          className="h-[100px] w-[300px]"
        />
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
