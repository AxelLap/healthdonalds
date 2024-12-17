"use client";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format-price";
import { useCartPrice, useCartStore } from "@/lib/store/use-cart-store";
import {
  ChevronDownCircle,
  ChevronUpCircle,
  Minus,
  Trash2,
} from "lucide-react";
import { useState } from "react";

export const FooterCart = () => {
  const [open, setOpen] = useState(false);

  //récupération du panier depuis useCartStore
  const cart = useCartStore();

  //Récupératiion de la methode de calcul du prix
  const price = useCartPrice();

  return (
    <div className="max-h-42  max-w-md m-auto p-4 rounded-t-lg bg-card border fixed inset-x-0 bottom-0  ">
      <div className="flex items-center gap-4 mb-3">
        <h2 className="text-xl font-bold">Cart</h2>
        <p className="ml-auto text-lg font-mono">{formatPrice(price)}</p>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setOpen((s) => !s);
          }}
        >
          {open ? (
            <ChevronDownCircle size={12} />
          ) : (
            <ChevronUpCircle size={12} />
          )}
        </Button>
      </div>

      {open ? (
        <div className="w-fulll flex flex-col gap-3 mb-2 max-h-32 overflow-y-auto">
          {
            //récuperation des lignes du panier
            Object.values(cart.items).map((cartItem) => (
              <CartLineItem
                key={cartItem.item.id}
                item={cartItem.item}
                quantity={cartItem.quantity}
              />
            ))
          }
        </div>
      ) : null}
      <div>
        <Button className="w-full" size="sm">
          Checkout
        </Button>
      </div>
    </div>
  );
};

const CartLineItem = ({ item, quantity }) => {
  const removeItem = useCartStore((s) => s.removeItem);
  return (
    <div className="flex gap-4 p-1 items-center">
      <div className="size-14 p-1 bg-accent rounded-md border relative">
        <img src={item.image} alt={`${item.name}'s image`} />
        <span className="-left-2 -top-2 text-md size-4 rounded-full bg-white border p-2 flex items-center justify-center absolute">
          {quantity}
        </span>
      </div>
      <p className="text-md font-bold">{item.name}</p>
      <div className="ml-auto flex items-center gap-2">
        <p className="font-mono">{formatPrice(item.price * quantity)}</p>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            removeItem(item);
          }}
        >
          {quantity === 1 ? <Trash2 size={12} /> : <Minus size={12} />}
        </Button>
      </div>
    </div>
  );
};
