import Logo from "@/public/unibui.png";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export function Navbar() {
  return (
    <header className=" bg-background border-b px-4 md:px-6 flex items-center h-16 shrink-0">
      <Link href="/" className="flex items-center gap-2 ">
        <Image src={Logo} width={90} height={90} alt="Unibui Company Logo" />
        <span className="mt-1 p-3 text-sm italic underline underline-offset-4">
          job board
        </span>
      </Link>
      <nav className="ml-auto flex items-center gap-6 text-sm font-medium hidden md:flex">
        <Link href="/" className="hover:underline underline-offset-4">
          Browse Jobs
        </Link>
      </nav>
      <Button variant="ghost" size="icon" className="ml-auto md:hidden">
        <HamburgerMenuIcon className="w-6 h-6" />
        <span className="sr-only">Toggle menu</span>
      </Button>
    </header>
  );
}
