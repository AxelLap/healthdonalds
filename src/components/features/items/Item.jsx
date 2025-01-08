import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format-price";
import { useCartStore } from "@/lib/store/use-cart-store";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";

export const Item = ({ item, className }) => {
  return (
    <div
      className={cn(
        "relative rounded-md border p-3 shadow-inner h-fit",
        className
      )}
    >
      <p className="absolute right-2 top-2 font-mono">
        {formatPrice(item.price)}
      </p>
      <img
        src={item.image}
        className="aspect-square w-full rounded-md object-contain"
      />
      <h3>{item.name}</h3>
      <div className="flex items-end justify-end">
        <CartButton item={item} />
      </div>
    </div>
  );
};

const CartButton = ({ item }) => {
  const quantity = useCartStore((s) => s.items[item.id]?.quantity ?? 0);
  const add = useCartStore((s) => s.addItem);
  const remove = useCartStore((s) => s.removeItem);

  if (quantity === 0) {
    return (
      <Button
        className="flex items-center justify-center gap-2"
        size="sm"
        onClick={() => add(item)}
      >
        <p>Add</p>
      </Button>
    );
  } else {
    return (
      <div className="flex items-center justify-center gap-1">
        <Button variant="outline" size="sm" onClick={() => remove(item)}>
          <Minus size={12} />
        </Button>
        <span>{quantity}</span>
        <Button variant="outline" size="sm" onClick={() => add(item)}>
          <Plus size={12} />
        </Button>
      </div>
    );
  }
};
