import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();
  if (session) {
    return <div>Logged in as {session.user.name}</div>;
  }
  return (
    <div className="flex h-screen items-center justify-center">
      <Link
        href="/dashboard"
        className="mx-2 rounded-lg bg-indigo-500 p-2 text-white"
      >
        Dashboard
      </Link>
      <Link
        href="/auth/sign-in"
        className="mx-2 rounded-lg bg-indigo-500 p-2 text-white"
      >
        signin
      </Link>
      <Link
        href="/auth/sign-up"
        className="mx-2 rounded-lg bg-indigo-500 p-2 text-white"
      >
        signup
      </Link>
    </div>
  );
}
