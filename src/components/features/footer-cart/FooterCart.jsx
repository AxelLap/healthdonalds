"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { useCartPrice } from "@/lib/store/use-cart-store";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ItemsCart } from "../cart/itemsCart";

export const FooterCart = () => {
  const [open, setOpen] = useState(false);

  //Récupératiion de la methode de calcul du prix
  const price = useCartPrice();

  return (
    <div className="max-h-42  max-w-md m-auto pt-8 px-2 pb-4 rounded-t-lg bg-card border fixed inset-x-0 bottom-0  ">
      <Button
        className="absolute inset-x-4 top-2 hover:bg-transparent m-auto"
        variant="outline"
        size="tile"
        onClick={() => {
          setOpen((s) => !s);
        }}
      >
        {open ? <ChevronDown size={15} /> : <ChevronUp size={15} />}
      </Button>

      {open ? <ItemsCart /> : null}
      <div>
        <Link
          href="/checkout"
          className={buttonVariants({
            size: "sm",
            className: "w-full",
          })}
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};
