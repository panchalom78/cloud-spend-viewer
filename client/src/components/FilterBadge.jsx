import React from "react";

function FilterBadge({ label, value, onRemove, disabled }) {
    return (
        <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1.5 rounded-full text-sm">
            <span className="font-medium">{label}:</span>
            <span>{value}</span>
            <button
                onClick={onRemove}
                disabled={disabled}
                className="ml-1 text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded-full p-0.5 transition-colors disabled:opacity-50"
                aria-label={`Remove ${label} filter`}
            >
                <svg
                    className="w-3.5 h-3.5"
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
    );
}

export default FilterBadge;
