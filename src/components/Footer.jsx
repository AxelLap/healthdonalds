import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 items-center gap-2 px-4 py-2 border-t">
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

      <div className="flex flex-col gap-2 items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()}</p>
        <p className="text-xs">HealthDonald's All right reserved</p>
      </div>
    </footer>
  );
};
