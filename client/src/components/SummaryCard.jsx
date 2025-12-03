import React from "react";
import Spinner from "./Spinner";

function SummarySkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
                <div
                    key={i}
                    className="p-4 bg-gray-50 rounded-lg animate-pulse"
                >
                    <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
                    <div className="h-8 bg-gray-200 rounded w-full"></div>
                </div>
            ))}
        </div>
    );
}

function SummaryCard({ summary, loading, error }) {
    const totalFormatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(summary.total);

    const byCloudItems = Object.entries(summary.byCloud || {}).map(
        ([k, v]) => ({
            cloud: k,
            cost: v,
        })
    );

    return (
        <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm p-5 h-full">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                    Spending Summary
                </h2>
                {loading && <Spinner size="sm" />}
            </div>

            {loading ? (
                <SummarySkeleton />
            ) : error ? (
                <div className="text-red-600 bg-red-50 p-4 rounded-lg">
                    Failed to load summary
                </div>
            ) : (
                <>
                    {/* Total Spend */}
                    <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
                        <div className="text-sm text-gray-500 mb-1">
                            Total Spend
                        </div>
                        <div className="text-3xl md:text-4xl font-bold text-gray-900">
                            {totalFormatted}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                            Across all teams and services
                        </div>
                    </div>

                    {/* Cloud Breakdown */}
                    <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">
                            By Cloud Provider
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {byCloudItems.length === 0 ? (
                                <div className="col-span-full text-center py-4 text-gray-500">
                                    No cloud data available
                                </div>
                            ) : (
                                byCloudItems.map((it) => (
                                    <div
                                        key={it.cloud}
                                        className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-700">
                                                {it.cloud}
                                            </span>
                                            <div
                                                className={`px-2 py-1 rounded text-xs font-medium ${
                                                    it.cloud === "AWS"
                                                        ? "bg-orange-100 text-orange-800"
                                                        : it.cloud === "GCP"
                                                        ? "bg-blue-100 text-blue-800"
                                                        : "bg-gray-100 text-gray-800"
                                                }`}
                                            >
                                                {it.cloud}
                                            </div>
                                        </div>
                                        <div className="text-lg font-semibold text-gray-900">
                                            {new Intl.NumberFormat("en-US", {
                                                style: "currency",
                                                currency: "USD",
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            }).format(it.cost)}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Top Services */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-3">
                            Top Services
                        </h3>
                        {summary.topServices &&
                        summary.topServices.length > 0 ? (
                            <div className="bg-white rounded-lg shadow-sm p-4">
                                <div className="space-y-3">
                                    {summary.topServices.map((s, index) => (
                                        <div
                                            key={`${s.service}-${index}`}
                                            className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-700 rounded text-sm font-medium">
                                                    {index + 1}
                                                </div>
                                                <span className="text-sm font-medium text-gray-700">
                                                    {s.service}
                                                </span>
                                            </div>
                                            <span className="text-sm font-semibold text-gray-900">
                                                {new Intl.NumberFormat(
                                                    "en-US",
                                                    {
                                                        style: "currency",
                                                        currency: "USD",
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    }
                                                ).format(s.cost)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-6 text-gray-500 bg-white rounded-lg">
                                No service data available
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default SummaryCard;
