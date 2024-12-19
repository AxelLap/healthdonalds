"use client";
import { ItemsCart } from "@/components/features/cart/itemsCart";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 max-h-full">
      <ItemsCart />
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
