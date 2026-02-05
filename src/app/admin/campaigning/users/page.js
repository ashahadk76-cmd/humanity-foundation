"use client";
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Search, 
  Filter, 
  Download,
  Eye,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  XCircle,
  ChevronRight,
  IndianRupee
} from 'lucide-react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDonors: 0,
    totalDonations: 0,
    avgDonation: 0,
    activeThisMonth: 0
  });

  useEffect(() => {
    // Mock data - Replace with actual API call
    const mockUsers = [
      {
        id: 1,
        name: 'Rahul Sharma',
        email: 'rahul@example.com',
        phone: '+91 98765 43210',
        city: 'Mumbai',
        totalDonations: 5,
        totalAmount: 25000,
        lastDonation: '2024-12-15',
        campaignsSupported: ['Medical Aid', 'Education Fund'],
        joinedDate: '2024-01-15',
        isActive: true
      },
      {
        id: 2,
        name: 'Priya Patel',
        email: 'priya@example.com',
        phone: '+91 87654 32109',
        city: 'Delhi',
        totalDonations: 12,
        totalAmount: 75000,
        lastDonation: '2024-12-10',
        campaignsSupported: ['Disaster Relief', 'Animal Welfare', 'Education Fund'],
        joinedDate: '2023-11-20',
        isActive: true
      },
      {
        id: 3,
        name: 'Amit Kumar',
        email: 'amit@example.com',
        phone: '+91 76543 21098',
        city: 'Bangalore',
        totalDonations: 3,
        totalAmount: 15000,
        lastDonation: '2024-11-28',
        campaignsSupported: ['Medical Aid'],
        joinedDate: '2024-03-10',
        isActive: true
      },
      {
        id: 4,
        name: 'Sneha Gupta',
        email: 'sneha@example.com',
        phone: '+91 65432 10987',
        city: 'Chennai',
        totalDonations: 8,
        totalAmount: 45000,
        lastDonation: '2024-12-05',
        campaignsSupported: ['Education Fund', 'Community Development'],
        joinedDate: '2023-12-05',
        isActive: true
      },
      {
        id: 5,
        name: 'Vikram Singh',
        email: 'vikram@example.com',
        phone: '+91 54321 09876',
        city: 'Kolkata',
        totalDonations: 1,
        totalAmount: 5000,
        lastDonation: '2024-10-15',
        campaignsSupported: ['Medical Aid'],
        joinedDate: '2024-09-01',
        isActive: false
      }
    ];

    setUsers(mockUsers);
    
    // Calculate stats
    const totalUsers = mockUsers.length;
    const totalDonors = mockUsers.filter(u => u.totalDonations > 0).length;
    const totalDonations = mockUsers.reduce((sum, user) => sum + user.totalAmount, 0);
    const avgDonation = totalDonors > 0 ? totalDonations / totalDonors : 0;
    const activeThisMonth = mockUsers.filter(u => {
      const lastDonation = new Date(u.lastDonation);
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return lastDonation >= monthAgo;
    }).length;

    setStats({
      totalUsers,
      totalDonors,
      totalDonations,
      avgDonation,
      activeThisMonth
    });
    
    setLoading(false);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (roleFilter === 'all') return matchesSearch;
    if (roleFilter === 'active') return matchesSearch && user.isActive;
    if (roleFilter === 'inactive') return matchesSearch && !user.isActive;
    if (roleFilter === 'donors') return matchesSearch && user.totalDonations > 0;
    return matchesSearch;
  });

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'City', 'Total Donations', 'Total Amount', 'Last Donation', 'Joined Date', 'Status'];
    const csvData = users.map(user => [
      user.name,
      user.email,
      user.phone,
      user.city,
      user.totalDonations,
      user.totalAmount,
      user.lastDonation,
      user.joinedDate,
      user.isActive ? 'Active' : 'Inactive'
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Users & Donors</h1>
              <p className="text-gray-600">Manage and view all registered users and their donation history</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Total Users</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalUsers}</div>
            <div className="text-sm text-gray-500 mt-1">Registered users</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Active Donors</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalDonors}</div>
            <div className="text-sm text-gray-500 mt-1">Made donations</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Total Raised</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalDonations)}</div>
            <div className="text-sm text-gray-500 mt-1">From all donors</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Avg Donation</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(stats.avgDonation)}</div>
            <div className="text-sm text-gray-500 mt-1">Per donor</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-50 rounded-lg">
                <Calendar className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Active This Month</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.activeThisMonth}</div>
            <div className="text-sm text-gray-500 mt-1">Recent donors</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Search className="w-5 h-5 text-gray-500" />
                <h3 className="font-semibold text-gray-900">Search Users</h3>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, email, or city..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>

            {/* Filter */}
            <div className="lg:w-80">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-gray-500" />
                <h3 className="font-semibold text-gray-900">Filter by Status</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Users' },
                  { id: 'donors', label: 'Donors Only' },
                  { id: 'active', label: 'Active' },
                  { id: 'inactive', label: 'Inactive' }
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setRoleFilter(filter.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${roleFilter === filter.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-gray-700" />
                <h2 className="text-xl font-bold text-gray-900">User List</h2>
              </div>
              <div className="text-sm text-gray-500">
                Showing {filteredUsers.length} of {users.length} users
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donation History</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Donation</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <Calendar className="w-3 h-3" />
                            Joined {formatDate(user.joinedDate)}
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">{user.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">{user.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">{user.city}</span>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                              <IndianRupee className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">{formatCurrency(user.totalAmount)}</div>
                              <div className="text-xs text-gray-500">{user.totalDonations} donations</div>
                            </div>
                          </div>
                          {user.campaignsSupported.length > 0 && (
                            <div className="text-xs text-gray-600">
                              Supported: {user.campaignsSupported.slice(0, 2).join(', ')}
                              {user.campaignsSupported.length > 2 && ` +${user.campaignsSupported.length - 2} more`}
                            </div>
                          )}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">
                          {formatDate(user.lastDonation)}
                        </div>
                        <div className="text-xs text-gray-400">
                          {user.totalDonations > 0 ? `${user.totalDonations} total donations` : 'No donations yet'}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${user.isActive
                          ? 'bg-green-50 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                        }`}>
                          {user.isActive ? (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              Active
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4" />
                              Inactive
                            </>
                          )}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                          <Eye className="w-4 h-4" />
                          View Details
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="text-gray-400 mb-2">No users found</div>
                      <div className="text-sm text-gray-500">Try adjusting your search or filters</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          {filteredUsers.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-medium">{filteredUsers.length}</span> users
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                    ← Previous
                  </button>
                  <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                    Next →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}