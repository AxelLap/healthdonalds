import { CATEGORIES } from "@/lib/category-data";
import { useCategoryStore } from "@/lib/store/use-category-store";
import { cn } from "@/lib/utils";

export const CategoryList = () => {
  const { category, setCategory } = useCategoryStore();
  return (
    <div className="flex flex-col gap-4 w-full items-center">
      {CATEGORIES.map((cat) => (
        <button
          onClick={() => {
            setCategory(cat.id);
          }}
          id={cat.id}
          key={cat.id}
          className={cn(
            "h-[60px] w-[60px] relative rounded-md border pt-1 shadow-inner flex flex-col jutify-center items-center",
            {
              "bg-accent": category === cat.id,
            }
          )}
        >
          <img
            width={35}
            height={35}
            src={cat.logo}
            alt={`logo de la categorie ${cat.title}`}
          />
          <p className="text-xs">{cat.title}</p>
        </button>
      ))}
    </div>
  );
};
