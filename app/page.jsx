"use client";

import { CategoryList } from "@/components/features/categories/categoryList";
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
      <div className="flex flex-col gap-4 max-h-full">
        <div className="flex flex-1 overflow-hidden max-h-full gap-2">
          <CategoryList />
          <ItemList />
        </div>
        <FooterCart />
      </div>
    );
  }
}
