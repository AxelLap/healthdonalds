import { ShoppingBasket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <header className="flex items-center gap-2 px-4 py-2 border-b shadow-sm">
      <Link href="/" className="inline-flex items-center gap-2">
        <Image
          src="/healthdonals.png"
          alt="Health donalds Logo"
          width={45}
          height={45}
        />
        <p className="text-sm font-bold">Health Donald's</p>
      </Link>

      <div className="ml-auto"></div>
      <Button size="sm" variant="outline" className="inline-flex gap-2">
        0
        <ShoppingBasket size={12} />
      </Button>
    </header>
  );
};
