"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Inbox, 
  Eye, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Clock,
  ExternalLink
} from "lucide-react";
import {
  AdminLayout,
  AdminPageHeader,
  DataTable,
  StatusBadge,
  ConfirmDialog,
  Pagination,
} from "@/components/admin";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { requestService } from "@/services/requestService";
import { PublicRequest } from "@/types";
import { toast } from "sonner";
import { formatDateEn } from "@/lib/utils";

export default function AdminRequestsPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // সব রিকোয়েস্ট ফেচ করা
  const { data, isLoading } = useQuery({
    queryKey: ["adminRequests", page],
    queryFn: () => requestService.getAll(page, 10),
  });

  // স্ট্যাটাস আপডেট মিউটেশন (Review/Complete/Reject)
  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      requestService.updateStatus(id, status),
    onSuccess: () => {
      toast.success("স্ট্যাটাস আপডেট হয়েছে");
      queryClient.invalidateQueries({ queryKey: ["adminRequests"] });
    },
  });

  const columns = [
    {
      key: "sender",
      header: "Sender",
      cell: (item: PublicRequest) => (
        <div>
          <p className="font-bold">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.email}</p>
        </div>
      ),
    },
    {
      key: "subject",
      header: "Subject & Type",
      cell: (item: PublicRequest) => (
        <div className="max-w-[200px]">
          <p className="font-medium truncate" title={item.subject}>{item.subject}</p>
          <p className="text-[10px] uppercase bg-gray-100 w-fit px-1 rounded text-gray-600">
            {item.requestType}
          </p>
        </div>
      ),
    },
    {
      key: "date",
      header: "Received At",
      cell: (item: PublicRequest) => (
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-3 w-3" />
          {formatDateEn(item.createdAt || new Date())}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (item: PublicRequest) => (
        <StatusBadge status={item.status?.toLowerCase() as any} />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      cell: (item: PublicRequest) => (
        <div className="flex justify-end gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Eye className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => statusMutation.mutate({ id: item.id, status: "REVIEWING" })}>
                <Clock className="h-4 w-4 mr-2" /> Mark as Reviewing
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => statusMutation.mutate({ id: item.id, status: "COMPLETED" })}>
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Mark as Completed
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => statusMutation.mutate({ id: item.id, status: "REJECTED" })}>
                <XCircle className="h-4 w-4 mr-2 text-red-500" /> Reject Request
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Public Requests"
        description="সাধারণ মানুষের পাঠানো মেসেজ এবং কন্টেন্ট রিকোয়েস্ট ম্যানেজ করুন"
      />

      <DataTable
        columns={columns}
        data={data?.content || []}
        isLoading={isLoading}
      />

      {data && data.totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={page + 1}
            totalPages={data.totalPages}
            onPageChange={(p) => setPage(p - 1)}
          />
        </div>
      )}
    </AdminLayout>
  );
}