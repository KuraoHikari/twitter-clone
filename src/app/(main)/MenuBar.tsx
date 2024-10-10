"use client";

import { Bell, Bookmark, Home, MessageCircle } from "lucide-react";

import MenuBarItem from "./MenuBarItem";
import { NotificationCountInfo } from "@/lib/types";
import NotificationsButton from "./notifications/NotificationsButton";

interface MenuBarProps {
  className?: string;
  initialState: NotificationCountInfo;
}

export default function MenuBar({ className, initialState }: MenuBarProps) {
  return (
    <div className={className}>
      <MenuBarItem href="/" title="Home" icon={Home} />
      <NotificationsButton
        href="/notifications"
        initialState={{ unreadCount: initialState.unreadCount }}
      />
      <MenuBarItem href="/bookmarks" title="Bookmarks" icon={Bookmark} />
      <MenuBarItem href="/messages" title="Messages" icon={MessageCircle} />
    </div>
  );
}
