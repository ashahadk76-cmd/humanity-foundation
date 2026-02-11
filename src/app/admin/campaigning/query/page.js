"use client";
import { useState, useEffect } from "react";
import {
  Search,
  MessageSquare,
  User,
  Mail,
  Phone,
  Calendar,
  Filter,
  Trash2,
  ChevronDown,
  Eye,
  ChevronRight,
  CheckCircle,
  Clock,
  AlertCircle,
  Download
} from "lucide-react";

export default function Page() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Fetch all contact queries
  useEffect(() => {
    fetchQueries();
  }, []);
  const fetchQueries = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/Admin/get-queries");
      const data = await response.json();

      // ✅ CHANGE HERE: Use 'contact' instead of 'queries'
      setQueries(data.contact || []);

    } catch (error) {
      console.error("Error fetching queries:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter queries based on search and filter
  const filteredQueries = queries.filter(query => {
    const matchesSearch =
      query.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.message.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterType === "all") return matchesSearch;
    return matchesSearch && query.contactType === filterType;
  });

  // Handle query deletion
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/Admin/get-queries/${id}`, {
        method: "DELETE",
      });

      // Remove from state
      setQueries(prev => prev.filter(q => q._id !== id));
      setConfirmDelete(null);
      if (selectedQuery?._id === id) setSelectedQuery(null);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // Contact type colors mapping
  const typeColors = {
    "General Inquiry": "bg-blue-100 text-blue-800",
    "Donation Related": "bg-green-100 text-green-800",
    "Campaign Support": "bg-purple-100 text-purple-800",
    "Technical Issue": "bg-red-100 text-red-800",
    "Partnership/Collaboration": "bg-yellow-100 text-yellow-800",
    "Volunteer Opportunity": "bg-indigo-100 text-indigo-800"
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Export queries to CSV
  const exportToCSV = () => {
    const headers = ["Name", "Email", "Phone", "Contact Type", "Message", "Date"];
    const csvData = queries.map(query => [
      query.name,
      query.email,
      query.phone,
      query.contactType,
      query.message.replace(/,/g, ';'),
      new Date(query.createdAt).toLocaleDateString()
    ]);

    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contact_queries_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading contact queries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Queries</h1>
              <p className="text-gray-600">Manage and respond to user messages and inquiries</p>
            </div>

            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all hover:shadow-sm"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Total Queries</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{queries.length}</div>
            <div className="text-sm text-gray-500 mt-1">All time queries</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Today's Queries</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {queries.filter(q => {
                const today = new Date();
                const queryDate = new Date(q.createdAt);
                return queryDate.toDateString() === today.toDateString();
              }).length}
            </div>
            <div className="text-sm text-gray-500 mt-1">New today</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <AlertCircle className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Donation Related</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {queries.filter(q => q.contactType === "Donation Related").length}
            </div>
            <div className="text-sm text-gray-500 mt-1">Priority queries</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Pending</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {queries.filter(q => !q.responded).length}
            </div>
            <div className="text-sm text-gray-500 mt-1">Awaiting response</div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Search className="w-5 h-5 text-gray-500" />
                <h3 className="font-semibold text-gray-900">Search Queries</h3>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, email, or message..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>

            {/* Filter by Type */}
            <div className="lg:w-80">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-gray-500" />
                <h3 className="font-semibold text-gray-900">Filter by Type</h3>
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="all">All Types</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Donation Related">Donation Related</option>
                <option value="Campaign Support">Campaign Support</option>
                <option value="Technical Issue">Technical Issue</option>
                <option value="Partnership/Collaboration">Partnership</option>
                <option value="Volunteer Opportunity">Volunteer</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Queries List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-6 h-6 text-gray-700" />
                    <h2 className="text-xl font-bold text-gray-900">All Queries</h2>
                  </div>
                  <div className="text-sm text-gray-500">
                    Showing {filteredQueries.length} of {queries.length} queries
                  </div>
                </div>
              </div>

              <div className="overflow-y-auto max-h-[600px]">
                {filteredQueries.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {filteredQueries.map((query) => (
                      <div
                        key={query._id}
                        className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${selectedQuery?._id === query._id ? 'bg-blue-50' : ''}`}
                        onClick={() => setSelectedQuery(query)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <User className="w-5 h-5 text-blue-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-900 truncate">
                                  {query.name}
                                </h3>
                                <p className="text-sm text-gray-500 truncate flex items-center gap-1">
                                  <Mail className="w-3 h-3" />
                                  {query.email}
                                </p>
                              </div>
                            </div>

                            <div className="ml-13 space-y-2">
                              <p className="text-sm text-gray-600 line-clamp-2">
                                {query.message}
                              </p>

                              <div className="flex flex-wrap items-center gap-3">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${typeColors[query.contactType]}`}>
                                  {query.contactType}
                                </span>

                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {formatDate(query.createdAt)}
                                </span>
                              </div>
                            </div>
                          </div>

                          <ChevronRight className="w-5 h-5 text-gray-400 ml-2 flex-shrink-0" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <div className="text-gray-400 mb-4">
                      <MessageSquare className="w-16 h-16 mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No queries found</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      {searchTerm
                        ? `No results found for "${searchTerm}"`
                        : "No contact queries available"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Query Details Panel */}
          <div className="lg:col-span-1">
            {selectedQuery ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 sticky top-24">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Query Details</h2>
                    <button
                      onClick={() => setConfirmDelete(selectedQuery._id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete query"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{selectedQuery.name}</h3>
                          <p className="text-sm text-gray-500">{selectedQuery.email}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">{selectedQuery.phone}</span>
                        </div>

                        <div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeColors[selectedQuery.contactType]}`}>
                            {selectedQuery.contactType}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(selectedQuery.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Message</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedQuery.message}</p>
                  </div>

                  <div className="mt-8 space-y-3">
                    <a
                      href={`mailto:${selectedQuery.email}?subject=Re: Your Query - ${selectedQuery.contactType}`}
                      className="block w-full bg-blue-600 text-white py-3 rounded-lg text-center font-medium hover:bg-blue-700 transition-colors"
                    >
                      Reply via Email
                    </a>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(selectedQuery.email);
                        alert("Email copied to clipboard!");
                      }}
                      className="block w-full border border-gray-300 text-gray-700 py-3 rounded-lg text-center font-medium hover:bg-gray-50 transition-colors"
                    >
                      Copy Email Address
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Eye className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Select a Query</h3>
                <p className="text-gray-500">Click on any query from the list to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Query?</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this query? This action cannot be undone.
              </p>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(confirmDelete)}
                  className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}