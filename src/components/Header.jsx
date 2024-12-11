"use client";
import { useCartQuantity } from "@/lib/store/use-cart-store";
import { useUserStore } from "@/lib/store/use-user-store";
import { ShoppingBasket, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <header className="flex items-center gap-2 px-4 py-2 border-b shadow-sm">
      <Link href="/" className="inline-flex items-center gap-2">
        <Image
          src="/healthdonals.png"
          alt="Health donalds Logo"
          width={45}
          height={45}
        />
        <p className="text-sm font-bold">Health Donald's</p>
      </Link>

      <div className="ml-auto"></div>
      <HeaderUserName />
      <ShoppingCart />
    </header>
  );
};

const ShoppingCart = () => {
  const quantity = useCartQuantity();
  return (
    <Button size="sm" variant="outline" className="inline-flex gap-2">
      {quantity}
      <ShoppingBasket size={12} />
    </Button>
  );
};

const HeaderUserName = () => {
  const userName = useUserStore((s) => s.userName);
  const logout = useUserStore((s) => s.logout);

  return (
    <button
      onClick={() => {
        logout();
      }}
      className="inline-flex gap-2 items-center"
    >
      <User size={15} />
      <span className="font-bold">
        {userName !== null ? userName : "Unknown"}
      </span>
    </button>
  );
};
