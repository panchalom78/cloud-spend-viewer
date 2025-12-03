/**
 * Filter Badge Component
 *
 * Visual indicator for active filters with remove functionality.
 * Used in filter controls to show applied filters and allow removal.
 *
 * @component
 * @example
 * // Basic usage
 * <FilterBadge
 *   label="Team"
 *   value="Core"
 *   onRemove={() => removeTeamFilter()}
 *   disabled={false}
 * />
 */

/**
 * Badge component representing an active filter.
 *
 * @component
 * @param {Object} props
 * @param {string} props.label - Filter category name (e.g., "Team", "Cloud")
 * @param {string} props.value - Filter value (e.g., "Core", "AWS")
 * @param {Function} props.onRemove - Callback when remove button is clicked
 * @param {boolean} props.disabled - Disable remove button state
 *
 * @example
 * // Interactive filter badge
 * <FilterBadge
 *   label="Environment"
 *   value="production"
 *   onRemove={() => setEnvFilter('All')}
 *   disabled={isLoading}
 * />
 */
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
