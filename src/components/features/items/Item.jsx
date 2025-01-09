import { Button, buttonVariants } from "@/components/ui/button";
import { formatPrice } from "@/lib/format-price";
import { useAdminStore } from "@/lib/store/use-admin-store";
import { useCartStore } from "@/lib/store/use-cart-store";
import { cn } from "@/lib/utils";
import { Edit, Minus, Plus, Trash } from "lucide-react";
import Link from "next/link";

export const Item = ({ item, className }) => {
  const adminEnabled = useAdminStore((s) => s.adminEnabled);

  return (
    <div
      className={cn(
        "relative rounded-md border p-3 shadow-inner h-fit group",
        className
      )}
    >
      {adminEnabled ? (
        <div className="absolute top-2 left-2 flex items-center gap-2 opacity-0 transition group-hover:opacity-100 ">
          <Link
            className={buttonVariants({ size: "sm", variant: "outline" })}
            href={`/items/${item.id}`}
          >
            <Edit size={12} />
          </Link>
          <Button size="sm" variant="outline">
            <Trash size={12} />
          </Button>
        </div>
      ) : null}
      <p className="absolute right-2 top-2 font-mono">
        {formatPrice(item.price)}
      </p>
      <img
        src={item.image}
        className="aspect-square w-full rounded-md object-contain"
      />
      <h3>{item.name}</h3>
      <div className="flex">
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
