import React, { useEffect } from "react";

function DetailModal({ isOpen, onClose, data }) {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!isOpen || !data) return null;

    // Generate description based on data
    const getDescription = (record) => {
        return `This is ${record.cloud_provider} ${record.service} spend from the ${record.team} team in ${record.env} environment.`;
    };

    // Format currency consistently
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/70 bg-opacity-50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Spending Details
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-500 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                                aria-label="Close"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-4">
                        {/* Description */}
                        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                            <p className="text-blue-800">
                                {getDescription(data)}
                            </p>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <DetailRow label="Date" value={data.date} />
                            <DetailRow
                                label="Cloud Provider"
                                value={data.cloud_provider}
                                badge
                                badgeColor={
                                    data.cloud_provider === "AWS"
                                        ? "orange"
                                        : data.cloud_provider === "GCP"
                                        ? "blue"
                                        : "gray"
                                }
                            />
                            <DetailRow label="Service" value={data.service} />
                            <DetailRow
                                label="Cost"
                                value={formatCurrency(data.cost_usd)}
                                highlight
                            />
                            <DetailRow
                                label="Team"
                                value={data.team}
                                badge
                                badgeColor="purple"
                            />
                            <DetailRow
                                label="Environment"
                                value={data.env}
                                badge
                                badgeColor={
                                    data.env === "prod"
                                        ? "red"
                                        : data.env === "staging"
                                        ? "yellow"
                                        : "green"
                                }
                            />
                            <DetailRow
                                label={
                                    data.cloud_provider === "AWS"
                                        ? "Account ID"
                                        : "Project ID"
                                }
                                value={
                                    (data.cloud_provider === "AWS"
                                        ? data.account_id
                                        : data.project_id) || "N/A"
                                }
                            />
                        </div>

                        {/* Additional metadata if available */}
                        {(data.tags || data.description) && (
                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <h4 className="text-sm font-medium text-gray-700 mb-3">
                                    Additional Information
                                </h4>
                                {data.tags && (
                                    <div className="mb-3">
                                        <span className="text-sm text-gray-600">
                                            Tags:
                                        </span>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {Object.entries(data.tags).map(
                                                ([key, value]) => (
                                                    <span
                                                        key={key}
                                                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                                                    >
                                                        {key}: {value}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}
                                {data.description && (
                                    <div>
                                        <span className="text-sm text-gray-600">
                                            Description:
                                        </span>
                                        <p className="mt-1 text-sm text-gray-700">
                                            {data.description}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DetailRow({
    label,
    value,
    badge = false,
    badgeColor = "gray",
    highlight = false,
}) {
    const badgeClasses = {
        orange: "bg-orange-100 text-orange-800",
        blue: "bg-blue-100 text-blue-800",
        purple: "bg-purple-100 text-purple-800",
        red: "bg-red-100 text-red-800",
        yellow: "bg-yellow-100 text-yellow-800",
        green: "bg-green-100 text-green-800",
        gray: "bg-gray-100 text-gray-800",
    };

    return (
        <div className="space-y-1">
            <div className="text-sm text-gray-500">{label}</div>
            {badge ? (
                <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${badgeClasses[badgeColor]}`}
                >
                    {value}
                </span>
            ) : (
                <div
                    className={`text-base font-medium ${
                        highlight ? "text-blue-600" : "text-gray-900"
                    }`}
                >
                    {value}
                </div>
            )}
        </div>
    );
}

export default DetailModal;
