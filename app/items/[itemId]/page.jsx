"use client";

import { ImageInput } from "@/components/features/images/ImageInput";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES } from "@/lib/category-data";
import { getId } from "@/lib/get-id";
import { getItem } from "@/lib/items/get-item";
import { setItem } from "@/lib/items/set-items";
import { useUserStore } from "@/lib/store/use-user-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";
import { z } from "zod";

const formSchema = z.object({
  id: z.string().min(2).max(50),
  name: z.string().min(2).max(50),
  category: z.string().min(2).max(50),
  price: z.coerce.number().min(0).max(1000),
  image: z.any(),
});
// si itemId = new on créé un nouveau Item
// Si itemId = à un id on modifie un produit existant
export default function ItemIdPage({ params }) {
  const isAdmin = useUserStore((s) => s.isAdmin);

  //React.use() pour résoudre params
  const [itemId, setItemId] = useState(null);

  useEffect(() => {
    async function resolveParams() {
      const resolvedParams = await params;
      setItemId(resolvedParams.itemId);
    }
    resolveParams();
  }, [params]);

  const { data, isLoading } = useSWR(`/item/${itemId}`, async () => {
    if (itemId === "new") return null;

    return getItem(itemId);
  });

  console.log({ data, isLoading, itemId });

  if (!isAdmin) {
    return (
      <Alert className="flex items-center">
        <X size={12} />
        <AlertTitle>Unauthorized : only Admin can create Item</AlertTitle>
      </Alert>
    );
  }

  if (isLoading) {
    return <Loader className="animate-spin"></Loader>;
  }

  return (
    <div>
      <h2 className="font-bold text-2xl">Create Item</h2>
      <ItemForm defaultItem={data} />
    </div>
  );
}

const ItemForm = ({ defaultItem }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultItem
      ? {
          ...defaultItem,
          price: defaultItem.price / 100,
        }
      : {
          name: "",
          category: "",
          price: 0,
          image: null,
        },
  });

  const router = useRouter();

  function onSubmit(values) {
    const id = defaultItem ? defaultItem.id : getId(values.name);
    setItem(id, {
      name: values.name,
      price: values.price * 100,
      category: values.category,
      image: values.image,
    });

    mutate((key) => typeof key === "string" && key.startsWith("/item"));
    mutate(`/item/${id}`);
    router.push("/");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem
                      className="flex items-center gap-2"
                      value={c.id}
                      key={c.id}
                    >
                      <div className="flex items-center gap-2">
                        <Image src={c.logo} alt={c.id} width={20} height={20} />
                        <p>{c.title}</p>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="Price" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <ImageInput image={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={form.formState.isSubmitting}
          className="w-full"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};
