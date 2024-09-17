"use client";

import { Bell, Home } from "lucide-react";

import MenuBarItem from "./MenuBarItem";

interface MenuBarProps {
  className?: string;
}

export default function MenuBar({ className }: MenuBarProps) {
  return (
    <div className={className}>
      <MenuBarItem href="/" title="Home" icon={Home} />
      <MenuBarItem href="/notifications" title="Notifications" icon={Bell} />
    </div>
  );
}
