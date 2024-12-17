"use client";

import { FooterCart } from "@/components/features/footer-cart/FooterCart";
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
        <ItemList></ItemList>
        <FooterCart></FooterCart>
      </div>
    );
  }
}
