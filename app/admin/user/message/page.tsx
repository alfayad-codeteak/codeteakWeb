"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Mail, Clock, User, MessageSquare, ChevronRight, X, CheckCircle2, XCircle, RefreshCw, Trash2, CheckCircle } from "lucide-react";

interface Submission {
  id?: string;
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  timestamp: string;
  createdAt?: string;
  status?: 'new' | 'solved';
}

export default function AdminMessagesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Submission | null>(null);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<Submission | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const PREDEFINED_OTP = "5374";

  useEffect(() => {
    // Check if already authenticated
    const authStatus = sessionStorage.getItem("admin_authenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      fetchMessages();
    }
  }, []);

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError("");

    if (otp === PREDEFINED_OTP) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_authenticated", "true");
      fetchMessages();
    } else {
      setOtpError("Invalid OTP. Please try again.");
      setOtp("");
    }
  };

  const fetchMessages = async () => {
    setIsLoadingMessages(true);
    try {
      // Use OTP as Bearer token for API authentication
      const response = await fetch("/api/contact", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${PREDEFINED_OTP}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSubmissions(data.submissions || []);
      } else {
        console.error("Failed to fetch messages");
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_authenticated");
    setOtp("");
    setSelectedMessage(null);
    setSubmissions([]);
  };

  const handleMarkAsSolved = async (submission: Submission) => {
    setIsProcessing(true);
    try {
      const submissionId = submission._id || submission.id;
      if (!submissionId) {
        console.error("No submission ID found");
        return;
      }

      const response = await fetch(`/api/contact/${submissionId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${PREDEFINED_OTP}`,
        },
        body: JSON.stringify({ status: "solved" }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update local state
        setSubmissions((prev) =>
          prev.map((sub) =>
            (sub._id === submissionId || sub.id === submissionId)
              ? { ...sub, status: "solved" as const }
              : sub
          )
        );
        
        // Update selected message if it's the same
        if (selectedMessage && (selectedMessage._id === submissionId || selectedMessage.id === submissionId)) {
          setSelectedMessage({ ...selectedMessage, status: "solved" });
        }
      } else {
        console.error("Failed to update status:", data);
        alert(`Failed to update status: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteClick = (submission: Submission, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation(); // Prevent selecting the message when clicking delete
    }
    setMessageToDelete(submission);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!messageToDelete) return;

    setIsProcessing(true);
    try {
      const submissionId = messageToDelete._id || messageToDelete.id;
      if (!submissionId) return;

      const response = await fetch(`/api/contact/${submissionId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${PREDEFINED_OTP}`,
        },
      });

      if (response.ok) {
        // Remove from local state
        setSubmissions((prev) =>
          prev.filter((sub) => sub._id !== submissionId && sub.id !== submissionId)
        );
        
        // Clear selected message if it was deleted
        if (selectedMessage && (selectedMessage._id === submissionId || selectedMessage.id === submissionId)) {
          setSelectedMessage(null);
        }
        
        setShowDeleteConfirm(false);
        setMessageToDelete(null);
      } else {
        console.error("Failed to delete message");
        alert("Failed to delete message. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setMessageToDelete(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#FC4B01]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-[#FC4B01]" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Admin Access</h1>
              <p className="text-muted-foreground">Enter OTP to view messages</p>
            </div>

            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  OTP Code
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 4));
                    setOtpError("");
                  }}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground text-center text-2xl font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-[#FC4B01] focus:border-transparent"
                  placeholder="0000"
                  maxLength={4}
                  autoFocus
                />
                {otpError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-500 flex items-center gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    {otpError}
                  </motion.p>
                )}
              </div>

              <button
                type="submit"
                disabled={otp.length !== 4}
                className="w-full py-3 bg-[#FC4B01] hover:bg-[#FC4B01]/90 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                Verify OTP
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Message Inbox</h1>
            <p className="text-sm text-muted-foreground">
              {submissions.length} {submissions.length === 1 ? "message" : "messages"}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={fetchMessages}
              disabled={isLoadingMessages}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 disabled:opacity-50"
              title="Refresh messages"
            >
              <RefreshCw className={`w-4 h-4 ${isLoadingMessages ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {isLoadingMessages ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-muted-foreground">Loading messages...</div>
          </div>
        ) : submissions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Mail className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">No messages yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Messages List - Timeline View */}
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-lg font-semibold text-foreground mb-4">Timeline</h2>
              <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                {submissions.map((submission, index) => {
                  const submissionId = submission._id || submission.id || `sub-${index}`;
                  const isSelected = selectedMessage?._id === submission._id || 
                                   selectedMessage?.id === submission.id;
                  const date = new Date(submission.timestamp || submission.createdAt || "");
                  const isToday = date.toDateString() === new Date().toDateString();
                  const isYesterday = date.toDateString() === new Date(Date.now() - 86400000).toDateString();
                  
                  return (
                    <motion.div
                      key={submissionId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedMessage(submission)}
                      className={`relative pl-8 pb-4 border-l-2 cursor-pointer transition-all ${
                        isSelected
                          ? "border-[#FC4B01]"
                          : "border-border hover:border-[#FC4B01]/50"
                      }`}
                    >
                      {/* Timeline Dot */}
                      <div className={`absolute left-0 top-1 w-3 h-3 rounded-full border-2 transform -translate-x-[7px] ${
                        isSelected
                          ? "bg-[#FC4B01] border-[#FC4B01]"
                          : "bg-background border-border"
                      }`} />
                      
                      <div className={`p-4 rounded-lg border transition-all ${
                        isSelected
                          ? "bg-[#FC4B01]/10 border-[#FC4B01] shadow-md"
                          : "bg-card border-border hover:border-[#FC4B01]/50"
                      }`}>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-foreground truncate">
                                {submission.firstName} {submission.lastName}
                              </h3>
                              {submission.status === 'solved' && (
                                <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-xs font-medium rounded-full flex items-center gap-1">
                                  <CheckCircle className="w-3 h-3" />
                                  Solved
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              {submission.email}
                            </p>
                          </div>
                          {isSelected && (
                            <ChevronRight className="w-5 h-5 text-[#FC4B01] flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <Clock className="w-3 h-3" />
                          <span>
                            {isToday 
                              ? `Today, ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`
                              : isYesterday
                              ? `Yesterday, ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`
                              : formatDate(submission.timestamp || submission.createdAt || "")
                            }
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {submission.message}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Message Detail View */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {selectedMessage ? (
                  <motion.div
                    key={selectedMessage._id || selectedMessage.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-card border border-border rounded-lg p-6 shadow-lg"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-2xl font-bold text-foreground">
                            {selectedMessage.firstName} {selectedMessage.lastName}
                          </h2>
                          {selectedMessage.status === 'solved' && (
                            <span className="px-3 py-1 bg-green-500/10 text-green-500 text-sm font-medium rounded-full flex items-center gap-1">
                              <CheckCircle className="w-4 h-4" />
                              Solved
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <a
                              href={`mailto:${selectedMessage.email}`}
                              className="hover:text-[#FC4B01] transition-colors"
                            >
                              {selectedMessage.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>
                              {formatDate(
                                selectedMessage.timestamp || selectedMessage.createdAt || ""
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedMessage(null)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        aria-label="Close"
                      >
                        <X className="w-5 h-5 text-muted-foreground" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                          Message
                        </h3>
                        <div className="bg-muted/50 rounded-lg p-4">
                          <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                            {selectedMessage.message}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-border">
                        <div className="flex items-center gap-3 flex-wrap">
                          <a
                            href={`mailto:${selectedMessage.email}?subject=Re: Your Contact Form Submission`}
                            className="px-4 py-2 bg-[#FC4B01] hover:bg-[#FC4B01]/90 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                          >
                            <Mail className="w-4 h-4" />
                            Reply via Email
                          </a>
                          
                          {selectedMessage.status !== 'solved' && (
                            <button
                              onClick={() => handleMarkAsSolved(selectedMessage)}
                              disabled={isProcessing}
                              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Mark as Solved
                            </button>
                          )}
                          
                          <button
                            onClick={() => handleDeleteClick(selectedMessage)}
                            disabled={isProcessing}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-card border border-border rounded-lg p-12 text-center"
                  >
                    <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Select a message to view details
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {showDeleteConfirm && messageToDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={handleDeleteCancel}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-lg p-6 max-w-md w-full shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Delete Message?</h3>
              </div>
              
              <p className="text-muted-foreground mb-6">
                Are you sure you want to delete this message from{" "}
                <strong>{messageToDelete.firstName} {messageToDelete.lastName}</strong>? This action cannot be undone.
              </p>
              
              <div className="flex items-center gap-3 justify-end">
                <button
                  onClick={handleDeleteCancel}
                  disabled={isProcessing}
                  className="px-4 py-2 text-foreground hover:bg-muted rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={isProcessing}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

