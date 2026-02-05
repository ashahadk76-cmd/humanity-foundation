"use client";
import React, { useState, useEffect } from 'react'
import {
  RefreshCw,
  Download,
  Users,
  TrendingUp,
  DollarSign,
  Target,
  CheckCircle,
  BarChart3,
  Calendar,
  Search,
  Filter,
  ChevronRight
} from 'lucide-react'

export default function DashboardPage() {
  const [donations, setDonations] = useState([])
  const [campaign, setCampaign] = useState([])
  const [filter, setFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [searchBar, setSearchBar] = useState("")
  const [stats, setStats] = useState({
    totalDonations: 0,
    successfulCampaigns: 0,
    avgDonation: 0,
    totalDonors: 0,
    monthlyGrowth: 0,
  })

  useEffect(() => {
    fetch('/api/donations')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setDonations(data.donations)
        } else {
          setDonations([])
        }

        const total = data.donations?.reduce(
          (sum, d) => sum + (d.amount || 0),
          0
        ) || 0;

        const donors = new Set(
          data.donations?.map(d => d.email)
        ).size || 0;
        setStats({
          totalDonations: total,
          totalDonors: donors,
          avgDonation: donors > 0 ? total / donors : 0,
          successfulCampaigns: 0,
          monthlyGrowth: 0,
        });
      })
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    fetch('/api/campaign/getcampaign')
      .then(res => res.json())
      .then(data => {
        setCampaign(data.campaigns)
      })
      .catch(err => console.log(err));
  }, [])

  // Filtered Campaigns
  const Filtercampaign = campaign
    ? campaign.filter((item) => {
      if (filter === "all") return item.raisedAmount < item.targetAmount
      if (filter === "Completed") return item.raisedAmount >= item.targetAmount
      return true
    })
    : []

  const totalCampaign = campaign ? campaign.length : 0;
  const activeCampaign = campaign.filter((item) => item.raisedAmount < item.targetAmount).length;
  const completedCampaign = campaign.filter((item) => item.raisedAmount >= item.targetAmount).length;
  const totalDonations = donations ? donations.length : 0;
  const totalRaisedAmount = donations ? donations.reduce((total, item) => total + (item.amount || 0), 0) : 0;

  // Format amount
  const formatAmount = (num) => {
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)}Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
    if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`;
    return `₹${Math.round(num)}`;
  }

  // Export CSV
  const exportCSV = () => {
    const headers = ["Name", "Email", "Amount", "Razorpay Order ID", "Date"]
    const rows = donations.map(d => [d.name, d.email, d.amount, d.razorpayOrderId, new Date(d.createdAt).toLocaleDateString()])
    const csvcontent = [headers, ...rows].map(e => e.join(",")).join("\n")
    const blob = new Blob([csvcontent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `donations_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  // Date filters
  const today = new Date();
  const startOfToday = new Date(); startOfToday.setHours(0, 0, 0, 0);
  const last7Days = new Date(); last7Days.setDate(today.getDate() - 7);
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const filteredDonations = donations.filter((item) => {
    const itemDate = new Date(item.createdAt);
    if (dateFilter === "today") return itemDate >= startOfToday;
    if (dateFilter === "last7") return itemDate >= last7Days;
    if (dateFilter === "month") return itemDate >= startOfMonth;
    return true;
  });

  const filteredDonationsBySearch = filteredDonations.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchBar.toLowerCase()) ||
      item.email.toLowerCase().includes(searchBar.toLowerCase())
    );
  });

  const refreshData = () => {
    window.location.reload();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8 mt-13 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage campaigns and track donations</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={refreshData}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all hover:shadow-sm"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button
                onClick={exportCSV}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:shadow-sm"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Donors</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{new Set(donations.map(d => d.email)).size}</div>
            <div className="text-sm text-gray-500 mt-1">Total unique donors</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Total Raised</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{formatAmount(totalRaisedAmount)}</div>
            <div className="text-sm text-gray-500 mt-1">All time donations</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Avg Donation</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{formatAmount(stats.avgDonation)}</div>
            <div className="text-sm text-gray-500 mt-1">Per donor average</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-50 rounded-lg">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Active Campaigns</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{activeCampaign}</div>
            <div className="text-sm text-gray-500 mt-1">Of {totalCampaign} total</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Completed</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{completedCampaign}</div>
            <div className="text-sm text-gray-500 mt-1">Campaigns finished</div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Date Filters */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-gray-500" />
                <h3 className="font-semibold text-gray-900">Date Filter</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "all", label: "All Time", color: "gray" },
                  { key: "today", label: "Today", color: "blue" },
                  { key: "last7", label: "Last 7 Days", color: "green" },
                  { key: "month", label: "This Month", color: "purple" },
                ].map((btn) => (
                  <button
                    key={btn.key}
                    onClick={() => setDateFilter(btn.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${dateFilter === btn.key
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Campaign Filters */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-gray-500" />
                <h3 className="font-semibold text-gray-900">Campaign Status</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === "all"
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  All ({totalCampaign})
                </button>
                <button
                  onClick={() => setFilter("active")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === "active"
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                >
                  Active ({activeCampaign})
                </button>
                <button
                  onClick={() => setFilter("completed")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === "completed"
                    ? 'bg-green-600 text-white'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                >
                  Completed ({completedCampaign})
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="lg:w-80">
              <div className="flex items-center gap-2 mb-4">
                <Search className="w-5 h-5 text-gray-500" />
                <h3 className="font-semibold text-gray-900">Search Donations</h3>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchBar}
                  onChange={(e) => setSearchBar(e.target.value)}
                  placeholder="Name or email..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Donations Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-gray-700" />
                <h2 className="text-xl font-bold text-gray-900">Recent Donations</h2>
              </div>
              <div className="text-sm text-gray-500">
                Showing {filteredDonationsBySearch.length} of {donations.length} donations
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredDonationsBySearch.length > 0 ? (
                  filteredDonationsBySearch.map((item, index) => (
                    <tr key={item._id || index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <DollarSign className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="font-bold text-gray-900">{formatAmount(item.amount)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono text-gray-700">
                          {item.razorpayOrderId?.slice(0, 12)}...
                        </code>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">
                          {new Date(item.createdAt).toLocaleDateString('en-IN')}
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(item.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Completed
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="text-gray-400 mb-2">No donations found</div>
                      <div className="text-sm text-gray-500">Try adjusting your filters</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          {filteredDonationsBySearch.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-medium">{filteredDonationsBySearch.length}</span> donations
                </div>
                <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View all donations
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}