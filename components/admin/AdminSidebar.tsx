// components/admin/AdminSidebar.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Video,
  Image as ImageIcon,
  Palette,
  Music,
  Mic,
  FileText,
  BookOpen,
  Quote,
  Newspaper,
  Clock,
  MapPin,
  Calendar,
  Heart,
  Inbox,
  Share2,
  File,
  Settings,
  Users,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useUIStore } from "@/store/uiStore";
import { useAuthStore } from "@/store/authStore";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { type: "separator", label: "Content" },
  { href: "/admin/videos", icon: Video, label: "Videos" },
  { href: "/admin/photos", icon: ImageIcon, label: "Photos" },
  { href: "/admin/posters", icon: Palette, label: "Posters" },
  { href: "/admin/audios", icon: Music, label: "Audios" },
  { href: "/admin/speeches", icon: Mic, label: "Speeches" },
  { href: "/admin/writings", icon: FileText, label: "Writings" },
  { href: "/admin/poems", icon: BookOpen, label: "Poems" },
  { href: "/admin/quotes", icon: Quote, label: "Quotes" },
  { href: "/admin/news", icon: Newspaper, label: "News" },
  { type: "separator", label: "Organization" },
  { href: "/admin/timeline", icon: Clock, label: "Timeline" },
  { href: "/admin/locations", icon: MapPin, label: "Locations" },
  { href: "/admin/events", icon: Calendar, label: "Events" },
  { type: "separator", label: "Engagement" },
  { href: "/admin/tributes", icon: Heart, label: "Tributes", badge: true },
  { href: "/admin/requests", icon: Inbox, label: "Requests", badge: true },
  { href: "/admin/social-posts", icon: Share2, label: "Social Posts" },
  { href: "/admin/documents", icon: File, label: "Documents" },
  { type: "separator", label: "System" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
  { href: "/admin/admins", icon: Users, label: "Admins" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { logout, admin } = useAuthStore();

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-white border-r transition-all duration-300 hidden lg:block",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-memorial-green flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg">🕊️</span>
            </div>
            {sidebarOpen && (
              <div className="overflow-hidden">
                <h1 className="font-bold text-memorial-green truncate">
                  Admin Panel
                </h1>
              </div>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="flex-shrink-0"
          >
            {sidebarOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <nav className="p-3 space-y-1">
            {navItems.map((item, index) => {
              if (item.type === "separator") {
                return sidebarOpen ? (
                  <div key={index} className="pt-4 pb-2">
                    <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {item.label}
                    </p>
                  </div>
                ) : (
                  <Separator key={index} className="my-3" />
                );
              }

              const Icon = item.icon!;
              const active = isActive(item.href!);

              const linkContent = (
                <Link
                  href={item.href!}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors",
                    active
                      ? "bg-memorial-green text-white"
                      : "text-gray-600 hover:bg-gray-100",
                    !sidebarOpen && "justify-center"
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {sidebarOpen && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                      )}
                    </>
                  )}
                </Link>
              );

              return sidebarOpen ? (
                <div key={item.href}>{linkContent}</div>
              ) : (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </nav>
        </ScrollArea>

        {/* User & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t bg-white">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-memorial-green/10 flex items-center justify-center">
                <span className="text-memorial-green font-semibold">
                  {admin?.fullName?.charAt(0) || "A"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{admin?.fullName || "Admin"}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {admin?.role || "ADMIN"}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
}
