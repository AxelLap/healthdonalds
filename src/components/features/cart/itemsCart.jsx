import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format-price";
import { useCartPrice, useCartStore } from "@/lib/store/use-cart-store";
import { Minus, Trash2 } from "lucide-react";

export const ItemsCart = () => {
  //récupération du panier depuis useCartStore
  const items = useCartStore((s) => s.items);

  //Récupératiion de la methode de calcul du prix
  const price = useCartPrice();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4 mb-3">
        <h2 className="text-xl font-bold">Cart</h2>
        <p className="ml-auto text-lg font-mono">{formatPrice(price)}</p>
      </div>
      <div className="w-fulll flex flex-col gap-3 mb-2 max-h-44 overflow-y-auto">
        {
          //récuperation des lignes du panier
          Object.values(items).map((cartItem) => (
            <CartLineItem
              key={cartItem.item.id}
              item={cartItem.item}
              quantity={cartItem.quantity}
            />
          ))
        }
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
