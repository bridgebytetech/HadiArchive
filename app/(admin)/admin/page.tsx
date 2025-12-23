// app/(admin)/admin/page.tsx
"use client";

import { AdminLayout } from "@/components/admin";
import Link from "next/link";
import { 
  Image, 
  FileText, 
  Video, 
  LayoutDashboard,
  TrendingUp,
  Users,
  Eye
} from "lucide-react";

const menuItems = [
  { 
    title: "Posters", 
    href: "/admin/posters", 
    icon: Image,
    description: "Manage posters & graphics",
    color: "bg-blue-500"
  },
  { 
    title: "Photos", 
    href: "/admin/photos", 
    icon: FileText,
    description: "Manage photo gallery",
    color: "bg-green-500"
  },
  { 
    title: "Videos", 
    href: "/admin/videos", 
    icon: Video,
    description: "Manage video content",
    color: "bg-purple-500"
  },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <LayoutDashboard className="h-8 w-8" />
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your memorial archive content
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Image className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Posters</p>
                <p className="text-2xl font-bold">--</p>
              </div>
            </div>
          </div>
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Photos</p>
                <p className="text-2xl font-bold">--</p>
              </div>
            </div>
          </div>
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Video className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Videos</p>
                <p className="text-2xl font-bold">--</p>
              </div>
            </div>
          </div>
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Eye className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">--</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-all hover:border-gray-300"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 ${item.color} rounded-lg text-white`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
