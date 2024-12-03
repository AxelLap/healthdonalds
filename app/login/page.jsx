"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/lib/store/use-user-store";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Login() {
  const userStore = useUserStore();
  const router = useRouter();
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-4 py-4">
      <div className="absolute -rotate-12 left-0 top-4">
        <Image src="/categories/burger.png" alt="" height={60} width={60} />
      </div>
      <div className="absolute rotate-12 right-0 top-4">
        <Image src="/categories/dessert.png" alt="" height={60} width={60} />
      </div>
      <div className="absolute -rotate-6 left-0 bottom-4">
        <Image src="/categories/fries.png" alt="" height={60} width={60} />
      </div>
      <div className="absolute rotate-12 right-0 bottom-4">
        <Image src="/categories/nuggets.png" alt="" height={60} width={60} />
      </div>
      <h1 className="text-2xl font-bold">Welcome to Healthdonald's !</h1>
      <p>Login first to access our application</p>
      <form
        action={(formData) => {
          const userName = formData.get("userName");
          userStore.login(userName);
          router.push("/");
        }}
        className="flex items-center justify-center gap-2"
      >
        <Input name="userName" type="text" placeholder="User Name" />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
