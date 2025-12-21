"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Eye,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Mail,
  Phone,
  Calendar,
  Link as LinkIcon,
  Inbox,
  FileText,
  MessageSquare,
  UserCheck,
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

  const { data, isLoading } = useQuery({
    queryKey: ["adminRequests", page],
    queryFn: () => requestService.getAll(page, 10),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      requestService.updateStatus(id, status),
    onSuccess: () => {
      toast.success("স্ট্যাটাস আপডেট হয়েছে");
      queryClient.invalidateQueries({ queryKey: ["adminRequests"] });
      setSelectedRequest(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => requestService.delete(id),
    onSuccess: () => {
      toast.success("রিকোয়েস্ট ডিলিট হয়েছে");
      queryClient.invalidateQueries({ queryKey: ["adminRequests"] });
      setDeleteId(null);
    },
  });

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

  const renderField = (label: string, value: any, icon?: React.ReactNode) => {
    if (!value) return null;
    return (
      <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
        {icon && <div className="text-gray-500 mt-0.5">{icon}</div>}
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="font-medium break-words">{String(value)}</p>
        </div>
      </div>
    );
  };

  const columns = [
    {
      key: "sender",
      header: "Sender",
      cell: (item: PublicRequest) => (
        <div>
          <p className="font-bold">{item.name || "N/A"}</p>
          <p className="text-xs text-muted-foreground">{item.email || "N/A"}</p>
        </div>
      ),
    },
    {
      key: "subject",
      header: "Subject & Type",
      cell: (item: PublicRequest) => (
        <div className="max-w-[200px]">
          <p className="font-medium truncate">{item.subject || "No Subject"}</p>
          <div className="flex gap-1 mt-1">
            {item.requestType && (
              <span className={`text-[10px] uppercase px-2 py-0.5 rounded ${getTypeColor(item.requestType)}`}>
                {item.requestType}
              </span>
            )}
            {item.contentType && (
              <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                {item.contentType}
              </span>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "date",
      header: "Received At",
      cell: (item: PublicRequest) => (
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-3 w-3" />
          {item.createdAt ? formatDateEn(item.createdAt) : "N/A"}
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
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedRequest(item)}
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" title="Change Status">
                <CheckCircle className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => statusMutation.mutate({ id: item.id, status: "REVIEWING" })}
              >
                <Clock className="h-4 w-4 mr-2 text-yellow-500" /> Reviewing
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => statusMutation.mutate({ id: item.id, status: "COMPLETED" })}
              >
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Completed
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => statusMutation.mutate({ id: item.id, status: "REJECTED" })}
              >
                <XCircle className="h-4 w-4 mr-2 text-red-500" /> Rejected
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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

      {/* ========== Request Details Modal ========== */}
      <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Inbox className="h-5 w-5 text-memorial-green" />
              Request Details
            </DialogTitle>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4">
              {/* Status & Types */}
              <div className="flex items-center gap-2 flex-wrap">
                <StatusBadge status={selectedRequest.status?.toLowerCase() as any} />
                {selectedRequest.requestType && (
                  <span className={`text-xs uppercase px-2 py-1 rounded ${getTypeColor(selectedRequest.requestType)}`}>
                    {selectedRequest.requestType}
                  </span>
                )}
                {selectedRequest.contentType && (
                  <span className="text-xs uppercase px-2 py-1 rounded bg-gray-100 text-gray-600">
                    {selectedRequest.contentType}
                  </span>
                )}
              </div>

              <Separator />

              {/* Sender Information */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  Sender Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {renderField("Name", selectedRequest.name, <User className="h-4 w-4" />)}
                  {renderField("Email", selectedRequest.email, <Mail className="h-4 w-4" />)}
                  {renderField("Phone", selectedRequest.phone, <Phone className="h-4 w-4" />)}
                  {renderField(
                    "Received At",
                    selectedRequest.createdAt ? formatDateEn(selectedRequest.createdAt) : null,
                    <Calendar className="h-4 w-4" />
                  )}
                </div>
              </div>

              {/* Subject */}
              {selectedRequest.subject && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      Subject
                    </h3>
                    <p className="font-semibold text-lg">{selectedRequest.subject}</p>
                  </div>
                </>
              )}

              {/* Description */}
              {selectedRequest.description && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      Description
                    </h3>
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg whitespace-pre-wrap text-gray-700 leading-relaxed">
                      {selectedRequest.description}
                    </div>
                  </div>
                </>
              )}

              {/* Reference */}
              {selectedRequest.reference && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      Reference
                    </h3>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-blue-700">{selectedRequest.reference}</p>
                    </div>
                  </div>
                </>
              )}

              {/* Attachment URLs */}
              {selectedRequest.attachmentUrls && selectedRequest.attachmentUrls.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      Attachments ({selectedRequest.attachmentUrls.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedRequest.attachmentUrls.map((url, index) => (
                        <a
                          key={index}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-sm"
                        >
                          <LinkIcon className="h-4 w-4" />
                          Attachment {index + 1}
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Admin Notes & Review Info */}
              {(selectedRequest.adminNotes || selectedRequest.reviewedBy) && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                      Admin Review
                    </h3>
                    <div className="space-y-3">
                      {selectedRequest.adminNotes && (
                        <div className="p-3 bg-gray-100 border border-gray-200 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Admin Notes</p>
                          <p className="text-gray-700">{selectedRequest.adminNotes}</p>
                        </div>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {renderField("Reviewed By", selectedRequest.reviewedBy, <UserCheck className="h-4 w-4" />)}
                        {renderField(
                          "Reviewed At",
                          selectedRequest.reviewedAt ? formatDateEn(selectedRequest.reviewedAt) : null,
                          <Calendar className="h-4 w-4" />
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              <Separator />

              {/* Action Buttons */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  Actions
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => statusMutation.mutate({ id: selectedRequest.id, status: "REVIEWING" })}
                    disabled={statusMutation.isPending}
                    className="border-yellow-200 hover:bg-yellow-50"
                  >
                    <Clock className="h-4 w-4 mr-1 text-yellow-500" /> Reviewing
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => statusMutation.mutate({ id: selectedRequest.id, status: "COMPLETED" })}
                    disabled={statusMutation.isPending}
                    className="border-green-200 hover:bg-green-50"
                  >
                    <CheckCircle className="h-4 w-4 mr-1 text-green-500" /> Completed
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => statusMutation.mutate({ id: selectedRequest.id, status: "REJECTED" })}
                    disabled={statusMutation.isPending}
                    className="border-red-200 hover:bg-red-50"
                  >
                    <XCircle className="h-4 w-4 mr-1 text-red-500" /> Rejected
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      setDeleteId(selectedRequest.id);
                      setSelectedRequest(null);
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ========== Delete Confirmation ========== */}
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
