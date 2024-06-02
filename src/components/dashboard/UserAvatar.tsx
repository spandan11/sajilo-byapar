"use client";

import { signOut } from "next-auth/react";
import { CircleUserIcon, LogOut, Settings } from "lucide-react";

import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const UserAvatar = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full" size="icon" variant="secondary">
          <CircleUserIcon className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-2"
          onClick={() => signOut()}
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
