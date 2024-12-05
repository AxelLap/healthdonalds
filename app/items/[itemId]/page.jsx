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
import { setItem } from "@/lib/items/set-items";
import { useUserStore } from "@/lib/store/use-user-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  id: z.string().min(2).max(50),
  name: z.string().min(2).max(50),
  category: z.string().min(2).max(50),
  price: z.coerce.number().min(0).max(1000),
  image: z.any(),
});

export default function ItemIdPage() {
  const isAdmin = useUserStore((s) => s.isAdmin);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "xx",
      name: "",
      category: "",
      price: 0,
      image: null,
    },
  });

  const router = useRouter();

  if (!isAdmin) {
    return (
      <Alert className="flex items-center">
        <X size={12} />
        <AlertTitle>Unauthorized : only Admin can create Item</AlertTitle>
      </Alert>
    );
  }

  async function onSubmit(values) {
    console.log(values);
    const id = getId(values.name);
    console.log(id);
    await setItem(id, {
      name: values.name,
      price: values.price * 100,
      category: values.category,
      image: values.image,
    });
    router.push("/");
  }
  return (
    <div>
      <h2 className="font-bold text-2xl">Create Item</h2>
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
                          <Image
                            src={c.logo}
                            alt={c.id}
                            width={20}
                            height={20}
                          />
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
    </div>
  );
}
