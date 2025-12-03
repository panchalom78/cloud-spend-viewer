import React from "react";
import DetailModal from "./DetailModal";

function TableSkeleton({ rows = 5 }) {
    return (
        <tbody>
            {Array.from({ length: rows }).map((_, i) => (
                <tr key={i} className="border-t border-gray-200 animate-pulse">
                    <td className="px-5 py-4">
                        <div className="h-4 bg-gray-200 rounded w-28" />
                    </td>
                    <td className="px-5 py-4">
                        <div className="h-4 bg-gray-200 rounded w-16" />
                    </td>
                    <td className="px-5 py-4">
                        <div className="h-4 bg-gray-200 rounded w-40" />
                    </td>
                    <td className="px-5 py-4">
                        <div className="h-4 bg-gray-200 rounded w-24" />
                    </td>
                    <td className="px-5 py-4">
                        <div className="h-4 bg-gray-200 rounded w-20" />
                    </td>
                    <td className="px-5 py-4 text-right">
                        <div className="h-4 bg-gray-200 rounded w-24 ml-auto" />
                    </td>
                </tr>
            ))}
        </tbody>
    );
}

function SpendTable({ rows, loading, limit, onRowClick }) {
    const [selectedRow, setSelectedRow] = React.useState(null);

    const handleRowClick = (row) => {
        setSelectedRow(row);
        if (onRowClick) onRowClick(row);
    };

    const handleCloseModal = () => {
        setSelectedRow(null);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    };

    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Cloud
                            </th>
                            <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Service
                            </th>
                            <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Team
                            </th>
                            <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Environment
                            </th>
                            <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Cost (USD)
                            </th>
                        </tr>
                    </thead>

                    {loading ? (
                        <TableSkeleton rows={limit} />
                    ) : rows.length === 0 ? (
                        <tbody>
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-5 py-12 text-center"
                                >
                                    <div className="text-gray-500">
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.5"
                                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <p className="mt-2 text-lg font-medium">
                                            No data found
                                        </p>
                                        <p className="mt-1">
                                            Try adjusting your filters
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody className="bg-white divide-y divide-gray-200">
                            {rows.map((r, idx) => (
                                <tr
                                    key={`${r.date}-${r.service}-${idx}`}
                                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                                    onClick={() => handleRowClick(r)}
                                >
                                    <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {r.date}
                                    </td>
                                    <td className="px-5 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                r.cloud_provider === "AWS"
                                                    ? "bg-orange-100 text-orange-800"
                                                    : r.cloud_provider === "GCP"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : "bg-gray-100 text-gray-800"
                                            }`}
                                        >
                                            {r.cloud_provider}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-sm text-gray-900">
                                        {r.service}
                                    </td>
                                    <td className="px-5 py-4 whitespace-nowrap">
                                        <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded">
                                            {r.team}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 py-1 text-xs font-medium rounded ${
                                                r.env === "prod"
                                                    ? "bg-red-100 text-red-800"
                                                    : r.env === "staging"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-green-100 text-green-800"
                                            }`}
                                        >
                                            {r.env}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                                        {formatCurrency(r.cost_usd)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>

            <DetailModal
                isOpen={selectedRow !== null}
                onClose={handleCloseModal}
                data={selectedRow}
            />
        </>
    );
}

export default SpendTable;
