"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Mail,
  Globe,
  Calendar,
  CheckCircle,
  Copy,
  Search,
  ChevronDown,
  Trash2,
  X,
  Download,
  UserPlus,
  Clock,
  CheckCheck,
  AlertCircle
} from "lucide-react";

// ============================================
// 🎯 SUBSCRIBERS DASHBOARD - APPLE PREMIUM EDITION
// ============================================
const SubscribersDashboard = () => {
  // --------------------------------------------
  // 📦 STATE MANAGEMENT
  // --------------------------------------------
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("newest");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null, email: "" });
  const [copiedEmail, setCopiedEmail] = useState(null);
  const [selectAll, setSelectAll] = useState(false);

  // --------------------------------------------
  // 🔄 MOCK DATA - REPLACE WITH YOUR API
  // --------------------------------------------
  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      // 🔁 REPLACE WITH YOUR ACTUAL API ENDPOINT
      const response = await fetch("/api/Admin/get-subscribers");
      const data = await response.json();
      
      // 📦 HANDLE DIFFERENT RESPONSE FORMATS
      let list = [];
      if (Array.isArray(data)) list = data;
      else if (data.platformsubcribers) list = data.platformsubcribers;
      else list = [];
      
      setSubscribers(list);
    } catch (error) {
      console.error("❌ Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------
  // 🎯 FILTER & SORT LOGIC
  // --------------------------------------------
  const filteredSubscribers = subscribers
    .filter(sub => 
      sub.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.ip?.includes(searchTerm)
    )
    .sort((a, b) => {
      if (filterBy === "newest") {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      } else if (filterBy === "oldest") {
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      } else if (filterBy === "recently") {
        return new Date(b.lastActive || b.createdAt || 0) - new Date(a.lastActive || a.createdAt || 0);
      }
      return 0;
    });

  // --------------------------------------------
  // 📋 BULK SELECTION
  // --------------------------------------------
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredSubscribers.map(sub => sub._id));
    }
    setSelectAll(!selectAll);
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
      setSelectAll(false);
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // --------------------------------------------
  // 📋 COPY EMAIL TO CLIPBOARD
  // --------------------------------------------
  const copyToClipboard = async (email) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // --------------------------------------------
  // 🗑️ DELETE SUBSCRIBER
  // --------------------------------------------
  const deleteSubscriber = async (id) => {
    try {
      const response = await fetch(`/api/Admin/get-subscribers/${id}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        setSubscribers(subscribers.filter(sub => sub._id !== id));
        setDeleteModal({ show: false, id: null, email: "" });
        setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
      }
    } catch (error) {
      console.error("❌ Delete failed:", error);
    }
  };

  const bulkDelete = async () => {
    for (const id of selectedIds) {
      await deleteSubscriber(id);
    }
    setSelectedIds([]);
    setSelectAll(false);
  };

  // --------------------------------------------
  // 📅 FORMAT DATE
  // --------------------------------------------
  const formatDate = (dateString) => {
    if (!dateString) return "—";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch {
      return "—";
    }
  };

  // --------------------------------------------
  // 🛡️ MASK IP ADDRESS (Privacy)
  // --------------------------------------------
  const maskIP = (ip) => {
    if (!ip) return "—";
    if (ip.includes('.')) {
      return ip.replace(/\.\d+$/, '.xxx');
    }
    return ip.slice(0, 6) + '...';
  };

  // --------------------------------------------
  // 📊 STATS
  // --------------------------------------------
  const todayActive = subscribers.filter(sub => {
    const lastActive = sub.lastActive || sub.createdAt;
    if (!lastActive) return false;
    const today = new Date();
    const activeDate = new Date(lastActive);
    return activeDate.toDateString() === today.toDateString();
  }).length;

  // ============================================
  // 🎨 RENDER
  // ============================================
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fbfbfd] to-[#f5f5f7] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1440px] mx-auto">
        
        {/* ========== 🎯 HEADER SECTION ========== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h1 className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight">
                Subscribers
              </h1>
              <span className="px-3 py-1.5 bg-[#f5f5f7] text-[#1d1d1f] text-sm font-medium rounded-full">
                v2.0
              </span>
            </div>
            <p className="text-[#86868b] text-lg max-w-2xl">
              Manage and monitor your newsletter audience with precision
            </p>
          </div>
          
          {/* Quick Actions */}
     
        </div>

        {/* ========== 📊 STATS CARDS ========== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          
          {/* Total Subscribers */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/60 hover:shadow-md transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-[#86868b] mb-1">Total Subscribers</p>
                <p className="text-4xl font-semibold text-[#1d1d1f] tracking-tight">
                  {subscribers.length.toLocaleString()}
                </p>
                <p className="text-xs text-[#86868b] mt-2 flex items-center gap-1">
                  <CheckCheck className="w-3.5 h-3.5" />
                  All time
                </p>
              </div>
              <div className="w-12 h-12 bg-[#0071e3]/5 rounded-2xl flex items-center justify-center">
                <Users className="w-6 h-6 text-[#0071e3]" />
              </div>
            </div>
          </div>

          {/* Active Today */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/60 hover:shadow-md transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-[#86868b] mb-1">Active Today</p>
                <p className="text-4xl font-semibold text-[#1d1d1f] tracking-tight">
                  {todayActive}
                </p>
                <p className="text-xs text-[#86868b] mt-2 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Last 24 hours
                </p>
              </div>
              <div className="w-12 h-12 bg-[#34c759]/5 rounded-2xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[#34c759]" />
              </div>
            </div>
          </div>

          {/* Engagement Rate */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/60 hover:shadow-md transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-[#86868b] mb-1">Engagement Rate</p>
                <p className="text-4xl font-semibold text-[#1d1d1f] tracking-tight">
                  {subscribers.length ? Math.round((todayActive / subscribers.length) * 100) : 0}%
                </p>
                <p className="text-xs text-[#86868b] mt-2 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Above average
                </p>
              </div>
              <div className="w-12 h-12 bg-[#5856d6]/5 rounded-2xl flex items-center justify-center">
                <Users className="w-6 h-6 text-[#5856d6]" />
              </div>
            </div>
          </div>
        </div>

        {/* ========== 🔍 SEARCH & FILTER SECTION ========== */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#f2f2f7] p-5 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            
            {/* Search Bar - Apple Style */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86868b]" />
              <input
                type="text"
                placeholder="Search by email, name, or IP address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-[#f5f5f7] rounded-xl border-0 focus:ring-2 focus:ring-[#0071e3] outline-none text-[#1d1d1f] placeholder:text-[#86868b] text-base"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#86868b] hover:text-[#1d1d1f] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Dropdown - Apple Style */}
            <div className="relative sm:w-48">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="w-full flex items-center justify-between gap-2 px-4 py-3.5 bg-[#f5f5f7] rounded-xl hover:bg-[#e8e8ed] transition-colors text-[#1d1d1f] text-sm font-medium"
              >
                <span>Sort: {filterBy === "newest" ? "Newest" : filterBy === "oldest" ? "Oldest" : "Recently Active"}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilterDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showFilterDropdown && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setShowFilterDropdown(false)}
                  />
                  <div className="absolute right-0 mt-2 w-full bg-white rounded-xl shadow-lg border border-[#f2f2f7] py-1 z-50 animate-fadeIn">
                    {["newest", "oldest", "recently"].map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setFilterBy(option);
                          setShowFilterDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[#f5f5f7] transition-colors ${
                          filterBy === option ? 'text-[#0071e3] font-medium' : 'text-[#1d1d1f]'
                        }`}
                      >
                        {option === "newest" ? "Newest" : option === "oldest" ? "Oldest" : "Recently Active"}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Bulk Actions */}
            {selectedIds.length > 0 && (
              <button
                onClick={bulkDelete}
                className="flex items-center gap-2 px-5 py-3.5 bg-[#ff3b30]/5 text-[#ff3b30] rounded-xl hover:bg-[#ff3b30]/10 transition-colors text-sm font-medium"
              >
                <Trash2 className="w-4 h-4" />
                Delete ({selectedIds.length})
              </button>
            )}
          </div>
        </div>

        {/* ========== 📋 SUBSCRIBERS TABLE ========== */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#f2f2f7] overflow-hidden">
          
          {/* Table Header */}
          <div className="grid grid-cols-[50px_1.2fr_1fr_0.8fr_1fr_0.8fr_100px] gap-4 px-6 py-4 bg-[#fbfbfd] border-b border-[#f2f2f7] text-xs font-medium text-[#86868b] uppercase tracking-wider">
            <div className="flex items-center justify-center">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-[#d2d2d7] text-[#0071e3] focus:ring-0 focus:ring-offset-0"
                />
              </div>
            </div>
            <div>Subscriber</div>
            <div>Email</div>
            <div>IP Address</div>
            <div>Joined Date</div>
            <div>Status</div>
            <div className="text-right">Actions</div>
          </div>

          {/* Table Body */}
          {loading ? (
            <div className="py-32 flex flex-col items-center justify-center">
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-2 border-[#f2f2f7] border-t-[#0071e3] animate-spin"></div>
              </div>
              <p className="mt-4 text-sm text-[#86868b]">Loading subscribers...</p>
            </div>
          ) : filteredSubscribers.length === 0 ? (
            <div className="py-32 px-6 text-center">
              <div className="w-20 h-20 bg-[#f5f5f7] rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-[#86868b]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">
                {searchTerm ? "No subscribers found" : "No subscribers yet"}
              </h3>
              <p className="text-[#86868b] text-base max-w-sm mx-auto">
                {searchTerm 
                  ? "Try adjusting your search criteria" 
                  : "Subscribers will appear here when they sign up for your newsletter"}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#f2f2f7]">
              {filteredSubscribers.map((subscriber, index) => (
                <div
                  key={subscriber._id}
                  className="grid grid-cols-[50px_1.2fr_1fr_0.8fr_1fr_0.8fr_100px] gap-4 px-6 py-4 hover:bg-[#fbfbfd] transition-colors group items-center"
                >
                  {/* Checkbox */}
                  <div className="flex items-center justify-center ">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(subscriber._id)}
                      onChange={() => toggleSelect(subscriber._id)}
                      className="w-4 h-4 rounded border-[#d2d2d7] text-[#0071e3] focus:ring-0 focus:ring-offset-0"
                    />
                  </div>

                  {/* Subscriber Avatar & Name */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0071e3] to-[#0051b3] flex items-center justify-center text-white text-xs font-medium">
                      {subscriber.name?.charAt(0)?.toUpperCase() || subscriber.email?.charAt(0)?.toUpperCase() || 'S'}
                    </div>
                    <span className="text-sm font-medium text-[#1d1d1f] truncate">
                      {subscriber.name || "Anonymous"}
                    </span>
                  </div>

                  {/* Email with Copy */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#0071e3] truncate">{subscriber.email}</span>
                    <button
                      onClick={() => copyToClipboard(subscriber.email)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Copy email"
                    >
                      {copiedEmail === subscriber.email ? (
                        <CheckCircle className="w-4 h-4 text-[#34c759]" />
                      ) : (
                        <Copy className="w-4 h-4 text-[#86868b] hover:text-[#1d1d1f]" />
                      )}
                    </button>
                  </div>

                  {/* IP Address */}
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-[#86868b]" />
                    <span className="text-sm font-mono text-[#1d1d1f]">
                      {maskIP(subscriber.ip)}
                    </span>
                  </div>

                  {/* Joined Date */}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#86868b]" />
                    <span className="text-sm text-[#1d1d1f]">
                      {formatDate(subscriber.createdAt || subscriber.subscribedAt)}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#34c759]/5 text-[#34c759] text-xs font-medium border border-[#34c759]/10">
                      <span className="w-1.5 h-1.5 bg-[#34c759] rounded-full mr-1.5 animate-pulse"></span>
                      Active
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setDeleteModal({
                        show: true,
                        id: subscriber._id,
                        email: subscriber.email
                      })}
                      className="text-[#86868b] hover:text-[#ff3b30] transition-colors p-1.5 hover:bg-[#ff3b30]/5 rounded-lg"
                      title="Delete subscriber"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ========== 📊 TABLE FOOTER ========== */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-[#86868b]">
            {filteredSubscribers.length} {filteredSubscribers.length === 1 ? 'subscriber' : 'subscribers'} • 
            <span className="mx-1">Securely stored with end-to-end encryption</span>
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[#86868b] flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              GDPR Compliant
            </span>
            <span className="text-xs text-[#86868b] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Updated just now
            </span>
          </div>
        </div>
      </div>

      {/* ========== 🗑️ DELETE CONFIRMATION MODAL ========== */}
      {deleteModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scaleIn">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#ff3b30]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-[#ff3b30]" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">
                  Delete Subscriber
                </h3>
                <p className="text-[#86868b] text-base mb-6">
                  Are you sure you want to delete <span className="font-medium text-[#1d1d1f]">{deleteModal.email}</span>? 
                  This action cannot be undone.
                </p>
                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => setDeleteModal({ show: false, id: null, email: "" })}
                    className="px-5 py-2.5 bg-[#f5f5f7] text-[#1d1d1f] text-sm font-medium rounded-full hover:bg-[#e8e8ed] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => deleteSubscriber(deleteModal.id)}
                    className="px-5 py-2.5 bg-[#ff3b30] text-white text-sm font-medium rounded-full hover:bg-[#ff3b30]/90 transition-colors shadow-sm"
                  >
                    Delete Subscriber
                  </button>
                </div>
              </div>
              <button
                onClick={() => setDeleteModal({ show: false, id: null, email: "" })}
                className="text-[#86868b] hover:text-[#1d1d1f] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== 🎨 STYLES ========== */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.25s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SubscribersDashboard;