"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Video,
  Image as ImageIcon,
  FileText,
  Heart,
  TrendingUp,
} from "lucide-react";

// সরাসরি ফাইল পাথ থেকে ইম্পোর্ট করুন (Safe Way)
import AdminLayout from "@/components/admin/AdminLayout";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import StatsCard from "@/components/admin/StatsCard";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { dashboardService } from "@/services/dashboardService";
import { tributeService } from "@/services/tributeService";
import { requestService } from "@/services/requestService";
import { formatDateEn } from "@/lib/utils";

export default function DashboardPage() {
  // Fetch stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: () => dashboardService.getStats(),
  });

  // Fetch recent tributes
  const { data: recentTributes, isLoading: tributesLoading } = useQuery({
    queryKey: ["recentTributes"],
    queryFn: () => tributeService.getAll(0, 5),
  });

  // Fetch pending requests
  const { data: pendingRequests, isLoading: requestsLoading } = useQuery({
    queryKey: ["pendingRequests"],
    queryFn: () => requestService.getPending(0, 5),
  });

  const statCards = [
    {
      title: "Total Videos",
      value: stats?.totalVideos || 0,
      icon: Video,
      description: "Published videos",
    },
    {
      title: "Total Photos",
      value: stats?.totalPhotos || 0,
      icon: ImageIcon,      
      description: "Gallery images",
    },
    {
      title: "Total Content",
      value: stats?.totalContent || 0,
      icon: FileText,
      description: "Speeches, writings, poems",
    },
    {
      title: "Pending Tributes",
      value: stats?.pendingTributes || 0,
      icon: Heart,
      description: "Needs approval",
      iconClassName: "bg-red-100 text-red-600",
    },
  ];

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Dashboard"
        description="Overview of your memorial archive statistics and activities"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Tributes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Tributes</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/tributes">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable
              isLoading={tributesLoading}
              data={recentTributes?.content || []}
              columns={[
                {
                  key: "author",
                  header: "Author",
                  cell: (item) => (
                    <div>
                      <p className="font-medium">{item.authorName}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.authorLocation || "Unknown"}
                      </p>
                    </div>
                  ),
                },
                {
                  key: "date",
                  header: "Date",
                  cell: (item) => (
                    <span className="text-sm">
                      {formatDateEn(item.submittedAt || new Date())}
                    </span>
                  ),
                },
                {
                  key: "status",
                  header: "Status",
                  cell: (item) => <StatusBadge status={item.status as any} />,
                },
              ]}
            />
          </CardContent>
        </Card>

        {/* Pending Requests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pending Requests</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/requests">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable
              isLoading={requestsLoading}
              data={pendingRequests?.content || []}
              columns={[
                {
                  key: "subject",
                  header: "Subject",
                  cell: (item) => (
                    <div>
                      <p className="font-medium truncate max-w-[150px]">
                        {item.subject}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {item.requestType.toLowerCase()}
                      </p>
                    </div>
                  ),
                },
                {
                  key: "sender",
                  header: "Sender",
                  cell: (item) => (
                    <div className="text-sm">
                      <p>{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.email}
                      </p>
                    </div>
                  ),
                },
                {
                  key: "status",
                  header: "Status",
                  cell: (item) => <StatusBadge status="pending" />,
                },
              ]}
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}