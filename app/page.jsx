"use client";

import { ItemList } from "@/components/features/items/itemsList";
import { useUserStore } from "@/lib/store/use-user-store";
import Login from "./login/page";

export default function Home() {
  const userName = useUserStore((s) => s.userName);

  if (userName === null) {
    return <Login />;
  } else {
    return (
      <div>
        Hello Healthdonalds<ItemList></ItemList>
      </div>
    );
  }
}
