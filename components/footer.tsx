import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/unibui.png";

export function Footer() {
  return (
    <footer className="flex-1 w-full bg-muted border-t px-4 md:px-6 py-6 text-sm">
      <div className="flex flex-col items-start justify-between gap-4">
        <div className="w-full flex justify-between  ">
          <Link href="/" className="flex items-center gap-2 ">
            <Image
              src={Logo}
              width={90}
              height={90}
              alt="Unibui Company Logo"
            />
            <span className="mt-1 p-3 text-sm italic underline underline-offset-4">
              job board
            </span>
          </Link>

          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-2">
            <Link href="#" className="hover:underline underline-offset-4">
              Browse Jobs
            </Link>
            <Link href="/" className="hover:underline underline-offset-4">
              Post a Job
            </Link>
            <Link href="#" className="hover:underline underline-offset-4">
              Employers
            </Link>
            <Link href="#" className="hover:underline underline-offset-4">
              About
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4 text-muted-foreground">
          <Link href="#" className="hover:underline underline-offset-4">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <div>&copy; 2024 Unibui. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
