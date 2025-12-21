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
  User,
  Mail,
  Phone,
  FileText,
  Calendar,
  Link as LinkIcon,
  X,
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { requestService } from "@/services/requestService";
import { PublicRequest } from "@/types";
import { toast } from "sonner";
import { formatDateEn } from "@/lib/utils";

export default function AdminRequestsPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<PublicRequest | null>(null);

  // সব রিকোয়েস্ট ফেচ করা
  const { data, isLoading } = useQuery({
    queryKey: ["adminRequests", page],
    queryFn: () => requestService.getAll(page, 10),
  });

  // স্ট্যাটাস আপডেট মিউটেশন
  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      requestService.updateStatus(id, status),
    onSuccess: () => {
      toast.success("স্ট্যাটাস আপডেট হয়েছে");
      queryClient.invalidateQueries({ queryKey: ["adminRequests"] });
      // Modal এ থাকলে সেখানেও update করা
      if (selectedRequest) {
        setSelectedRequest(null);
      }
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => requestService.delete(id),
    onSuccess: () => {
      toast.success("রিকোয়েস্ট ডিলিট হয়েছে");
      queryClient.invalidateQueries({ queryKey: ["adminRequests"] });
      setDeleteId(null);
    },
  });

  // Request Type Badge Color
  const getTypeColor = (type: string) => {
    switch (type?.toUpperCase()) {
      case "CONTENT":
        return "bg-blue-100 text-blue-700";
      case "PHOTO":
        return "bg-purple-100 text-purple-700";
      case "VIDEO":
        return "bg-pink-100 text-pink-700";
      case "DOCUMENT":
        return "bg-orange-100 text-orange-700";
      case "SUGGESTION":
        return "bg-green-100 text-green-700";
      case "COMPLAINT":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

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
          <p className="font-medium truncate" title={item.subject}>
            {item.subject}
          </p>
          <span className={`text-[10px] uppercase px-2 py-0.5 rounded ${getTypeColor(item.requestType)}`}>
            {item.requestType}
          </span>
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
        <div className="flex justify-end gap-1">
          {/* View Details Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedRequest(item)}
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </Button>

          {/* Status Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" title="Change Status">
                <CheckCircle className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={() => statusMutation.mutate({ id: item.id, status: "REVIEWING" })}
              >
                <Clock className="h-4 w-4 mr-2 text-yellow-500" /> Mark as Reviewing
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => statusMutation.mutate({ id: item.id, status: "COMPLETED" })}
              >
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Mark as Completed
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => statusMutation.mutate({ id: item.id, status: "REJECTED" })}
              >
                <XCircle className="h-4 w-4 mr-2 text-red-500" /> Reject Request
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Delete Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDeleteId(item.id)}
            className="text-red-500 hover:text-red-700"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Public Requests"
        description="সাধারণ মানুষের পাঠানো মেসেজ এবং কন্টেন্ট রিকোয়েস্ট ম্যানেজ করুন"
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

      {/* Request Details Modal */}
      <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Inbox className="h-5 w-5 text-memorial-green" />
              Request Details
            </DialogTitle>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-6">
              {/* Status & Type */}
              <div className="flex items-center gap-3">
                <StatusBadge status={selectedRequest.status?.toLowerCase() as any} />
                <span className={`text-xs uppercase px-2 py-1 rounded ${getTypeColor(selectedRequest.requestType)}`}>
                  {selectedRequest.requestType}
                </span>
              </div>

              <Separator />

              {/* Sender Info */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Sender Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <User className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">Name</p>
                      <p className="font-medium">{selectedRequest.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <a
                        href={`mailto:${selectedRequest.email}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {selectedRequest.email}
                      </a>
                    </div>
                  </div>
                  {selectedRequest.phone && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-xs text-muted-foreground">Phone</p>
                        <a
                          href={`tel:${selectedRequest.phone}`}
                          className="font-medium text-blue-600 hover:underline"
                        >
                          {selectedRequest.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">Received At</p>
                      <p className="font-medium">
                        {formatDateEn(selectedRequest.createdAt || new Date())}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Subject */}
              <div className="space-y-2">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Subject
                </h3>
                <p className="font-medium text-lg">{selectedRequest.subject}</p>
              </div>

              <Separator />

              {/* Message */}
              <div className="space-y-2">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Message
                </h3>
                <div className="p-4 bg-gray-50 rounded-lg whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {selectedRequest.message || "No message provided."}
                </div>
              </div>

              {/* Attachment URL if exists */}
              {selectedRequest.attachmentUrl && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      Attachment
                    </h3>
                    <a
                      href={selectedRequest.attachmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                    >
                      <LinkIcon className="h-4 w-4" />
                      View Attachment
                    </a>
                  </div>
                </>
              )}

              <Separator />

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => statusMutation.mutate({ id: selectedRequest.id, status: "REVIEWING" })}
                  disabled={statusMutation.isPending}
                >
                  <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                  Mark as Reviewing
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => statusMutation.mutate({ id: selectedRequest.id, status: "COMPLETED" })}
                  disabled={statusMutation.isPending}
                  className="border-green-200 hover:bg-green-50"
                >
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Mark as Completed
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => statusMutation.mutate({ id: selectedRequest.id, status: "REJECTED" })}
                  disabled={statusMutation.isPending}
                  className="border-red-200 hover:bg-red-50"
                >
                  <XCircle className="h-4 w-4 mr-2 text-red-500" />
                  Reject
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setDeleteId(selectedRequest.id);
                    setSelectedRequest(null);
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        title="রিকোয়েস্ট ডিলিট করুন"
        description="আপনি কি নিশ্চিত এই রিকোয়েস্টটি ডিলিট করতে চান? এটি পুনরুদ্ধার করা যাবে না।"
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        isLoading={deleteMutation.isPending}
        variant="destructive"
      />
    </AdminLayout>
  );
}
