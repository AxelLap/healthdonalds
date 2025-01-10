import { getItems } from "@/lib/items/get-items";
import { useCategoryStore } from "@/lib/store/use-category-store";
import { Loader } from "lucide-react";
import useSWR from "swr";
import { Item } from "./Item";

export const ItemList = () => {
  const category = useCategoryStore((s) => s.category);
  const { data, isLoading } = useSWR(`/items/${category}`, async () => {
    return getItems(category);
  });

  if (isLoading) {
    return <Loader className="animate-spin" />;
  }

  return (
    <div className="grid grid-cols-2 gap-3 overflow-x-auto pb-16">
      {data.map((d) => (
        <Item key={d.id} item={d} />
      ))}
    </div>
  );
};
