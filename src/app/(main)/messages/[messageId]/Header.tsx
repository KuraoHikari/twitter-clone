import Avatar from "@/components/conversation/Avatar";
import { ArrowBigLeftDash, ArrowLeft } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex items-center justify-between border-b-[1px] px-4 py-3 sm:px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <Link
          href="/messages"
          className="block cursor-pointer text-sky-500 transition hover:text-sky-600 lg:hidden"
        >
          <ArrowLeft className="h-8 w-8" />
        </Link>

        <Avatar />

        <div className="flex flex-col">
          <div>Susume</div>
          <div className="text-sm font-light text-neutral-500">Online</div>
        </div>
      </div>
      {/* <HiEllipsisHorizontal
        size={32}
        onClick={() => setDrawerOpen(true)}
        className="cursor-pointer text-sky-500 transition hover:text-sky-600"
      /> */}
    </div>
  );
};

export default Header;
