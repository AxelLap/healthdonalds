"use client";
import { ItemsCart } from "@/components/features/cart/itemsCart";
import { Item } from "@/components/features/items/Item";
import { buttonVariants } from "@/components/ui/button";
import { getItems } from "@/lib/items/get-item";
import { useCartStore } from "@/lib/store/use-cart-store";
import { Loader } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 max-h-full">
      <ItemsCart />
      <UpSellDessert />
      <Link
        href="/checkout/success"
        className={buttonVariants({
          size: "sm",
          className: "w-full",
        })}
      >
        Confirm checkout
      </Link>
    </div>
  );
}

const UpSellDessert = () => {
  const isDessert = useCartStore(
    (s) =>
      Object.values(s.items).filter((i) => i.item.category === "dessert")
        .length > 0
  );
  if (isDessert) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-bold">Would you like to try a dessert ?</p>
      <DessertList />
    </div>
  );
};

const DessertList = () => {
  const category = "dessert";
  const { data } = useSWR(`/items/${category}`, async () => {
    return getItems(category);
  });

  if (!data) {
    return <Loader className="animate spin" />;
  }

  return (
    <div className="flex w-full gap-4 overflow-x-auto">
      {data.map((cartItem) => (
        <Item
          className="h-fit shrink-0 grow w-32"
          key={cartItem.id}
          item={cartItem}
        />
      ))}
    </div>
  );
};
