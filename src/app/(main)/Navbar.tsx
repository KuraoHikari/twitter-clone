import SearchField from "@/components/SearchField";
import UserButton from "@/components/UserButton";
import { TwitterIcon } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-5 px-5 py-3">
        <Link href="/" className="flex gap-3 text-2xl font-bold text-primary">
          <TwitterIcon className="h-8 pt-1" />
          twitter-clone
        </Link>
        <SearchField />
        <UserButton className="sm:ms-auto" />
      </div>
    </header>
  );
};

export default Navbar;
