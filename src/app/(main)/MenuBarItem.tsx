import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react"; // Importing the icon type
import { cn } from "@/lib/utils";

interface MenuBarItemProps {
  href: string;
  title: string;
  icon: LucideIcon; // To allow passing different icons
  className?: string;
}

const MenuBarItem = ({
  href,
  title,
  icon: Icon,
  className,
}: MenuBarItemProps) => {
  const pathname = usePathname();

  // Determine if this menu item is active
  const isActive = pathname === href;

  return (
    <Button
      variant="ghost"
      className={cn(
        "flex items-center justify-start gap-3",
        isActive ? "text-primary" : "text-foreground",
        className,
      )}
      title={title}
      asChild
    >
      <Link href={href}>
        <Icon />
        <span className="hidden lg:inline">{title}</span>
      </Link>
    </Button>
  );
};

export default MenuBarItem;
