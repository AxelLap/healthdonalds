"use client";

import { buttonVariants } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { useAdminStore } from "@/lib/store/use-admin-store";
import Link from "next/link";

export const AdminAction = () => {
  const adminStore = useAdminStore();
  return (
    <div className="fixed bottom-4 left-4 rounded-md p-2 border flex items-center gap-2">
      <Link className={buttonVariants({ size: "sm" })} href="/items/new">
        New
      </Link>
      <Toggle
        pressed={adminStore.adminEnabled}
        onPressedChange={() => adminStore.toggleAdminEnabled()}
      >
        Admin
      </Toggle>
    </div>
  );
};
