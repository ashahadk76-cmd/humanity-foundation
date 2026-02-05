"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
    Trash2,
    Edit,
    Eye,
    TrendingUp,
    Target,
    Users,
    Calendar,
    AlertCircle,
    ChevronRight,
    Search,
    Filter
} from 'lucide-react'

const Page = () => {
    const [campaigns, setCampaigns] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const router = useRouter();

    useEffect(() => {
        fetch('/api/campaign/getcampaign')
            .then((res) => res.json())
            .then((data) => {
                setCampaigns(data?.campaigns || [])
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            });
    }, [])

    const handleDelete = async (id) => {
        if (!id) {
            alert("Invalid campaign id");
            return;
        }

        if (!window.confirm("Are you sure you want to delete this campaign? This action cannot be undone.")) {
            return;
        }

        try {
            const response = await fetch(`/api/campaign/${id}`, {
                method: "DELETE",
            });

            const result = await response.json();

            if (result.success) {
                // Remove campaign from state
                setCampaigns(prev => prev.filter(campaign => campaign._id !== id));
                alert("Campaign deleted successfully");
            } else {
                alert(result.message || "Failed to delete campaign");
            }
        } catch (error) {
            console.error(error);
            alert("Error deleting campaign");
        }
    };

    const handleEdit = (id) => {
        router.push(`/admin/campaigning/create?id=${id}`);
    }

    const handleView = (id) => {
        router.push(`/campaign-details?id=${id}`);
    }

    // Filter campaigns based on search and status
    const filteredCampaigns = campaigns.filter(campaign => {
        const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            campaign.description.toLowerCase().includes(searchTerm.toLowerCase());

        if (statusFilter === "all") return matchesSearch;
        if (statusFilter === "active") return matchesSearch && campaign.raisedAmount < campaign.targetAmount;
        if (statusFilter === "completed") return matchesSearch && campaign.raisedAmount >= campaign.targetAmount;

        return matchesSearch;
    });

    // Calculate statistics
    const totalCampaigns = campaigns.length;
    const totalRaised = campaigns.reduce((sum, c) => sum + (c.raisedAmount || 0), 0);
    const activeCampaigns = campaigns.filter(c => c.raisedAmount < c.targetAmount).length;
    const completedCampaigns = campaigns.filter(c => c.raisedAmount >= c.targetAmount).length;
    const avgDonation = totalRaised / campaigns.length || 0;

    // Format currency
    const formatCurrency = (amount) => {
        if (!amount) return "₹0";
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    // Calculate progress percentage
    const calculateProgress = (raised, target) => {
        if (!raised || !target) return 0;
        return Math.min((raised / target) * 100, 100);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading campaigns...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Campaign Management</h1>
                    <p className="text-gray-600">Manage and monitor all fundraising campaigns</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <Target className="w-6 h-6 text-blue-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-500">Total Campaigns</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{totalCampaigns}</div>
                        <div className="text-sm text-gray-500 mt-1">Active: {activeCampaigns}</div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-green-50 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-green-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-500">Total Raised</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{formatCurrency(totalRaised)}</div>
                        <div className="text-sm text-gray-500 mt-1">All time donations</div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <Users className="w-6 h-6 text-purple-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-500">Completed</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{completedCampaigns}</div>
                        <div className="text-sm text-gray-500 mt-1">Goals achieved</div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-orange-50 rounded-lg">
                                <Target className="w-6 h-6 text-orange-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-500">Avg. Progress</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                            {campaigns.length > 0
                                ? `${Math.round(campaigns.reduce((sum, c) => sum + calculateProgress(c.raisedAmount, c.targetAmount), 0) / campaigns.length)}%`
                                : "0%"
                            }
                        </div>
                        <div className="text-sm text-gray-500 mt-1">Average campaign progress</div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Search */}
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-4">
                                <Search className="w-5 h-5 text-gray-500" />
                                <h3 className="font-semibold text-gray-900">Search Campaigns</h3>
                            </div>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search by title or description..."
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                />
                            </div>
                        </div>

                        {/* Status Filter */}
                        <div className="lg:w-80">
                            <div className="flex items-center gap-2 mb-4">
                                <Filter className="w-5 h-5 text-gray-500" />
                                <h3 className="font-semibold text-gray-900">Filter by Status</h3>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setStatusFilter("all")}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${statusFilter === "all"
                                        ? 'bg-gray-800 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    All ({totalCampaigns})
                                </button>
                                <button
                                    onClick={() => setStatusFilter("active")}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${statusFilter === "active"
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                        }`}
                                >
                                    Active ({activeCampaigns})
                                </button>
                                <button
                                    onClick={() => setStatusFilter("completed")}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${statusFilter === "completed"
                                        ? 'bg-green-600 text-white'
                                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                                        }`}
                                >
                                    Completed ({completedCampaigns})
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Campaigns Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredCampaigns.length > 0 ? (
                        filteredCampaigns.map((campaign) => {
                            const progress = calculateProgress(campaign.raisedAmount, campaign.targetAmount);
                            const isCompleted = progress >= 100;

                            return (
                                <div key={campaign._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                                    {/* Campaign Header */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={campaign.media?.[0]?.url || "/placeholder.jpg"}
                                            alt={campaign.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute top-4 left-4">
                                            {isCompleted ? (
                                                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                                                    <Target className="w-4 h-4" />
                                                    Completed
                                                </div>
                                            ) : (
                                                <div className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-sm">
                                                    <Target className="w-4 h-4" />
                                                    Active
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Campaign Content */}
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                                                    {campaign.title}
                                                </h3>
                                                <p className="text-gray-600 text-sm line-clamp-2">
                                                    {campaign.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="mb-6">
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="font-bold text-gray-800">
                                                    {formatCurrency(campaign.raisedAmount || 0)}
                                                </span>
                                                <span className="text-gray-500">
                                                    Goal: {formatCurrency(campaign.targetAmount)}
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-blue-500'}`}
                                                    style={{ width: `${progress}%` }}
                                                />
                                            </div>
                                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                                <span>{Math.round(progress)}% funded</span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(campaign.createdAt).toLocaleDateString('en-IN')}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleView(campaign._id)}
                                                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center justify-center gap-2"
                                            >
                                                <Eye className="w-4 h-4" />
                                                View
                                            </button>
                                            <button
                                                onClick={() => handleEdit(campaign._id)}
                                                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center gap-2"
                                            >
                                                <Edit className="w-4 h-4" />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(campaign._id)}
                                                className="px-4 py-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium flex items-center justify-center gap-2"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-2">
                            <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
                                <div className="text-gray-400 mb-4">
                                    <AlertCircle className="w-16 h-16 mx-auto" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">No campaigns found</h3>
                                <p className="text-gray-500 max-w-md mx-auto">
                                    {searchTerm || statusFilter !== "all"
                                        ? "Try adjusting your search or filter criteria"
                                        : "No campaigns have been created yet"}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Page