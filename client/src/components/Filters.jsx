/**
 * Filters Component
 *
 * Filter controls for cloud spending data with sorting options.
 * Includes dropdowns for cloud provider, team, environment, month,
 * and sorting controls with visual feedback.
 *
 * @component
 * @requires ./FilterBadge - Badge component for active filters
 * @example
 * // Full filter controls
 * <Filters
 *   cloudProvider="AWS"
 *   setCloudProvider={setCloudProvider}
 *   team="Core"
 *   setTeam={setTeam}
 *   env="prod"
 *   setEnv={setEnv}
 *   month="3"
 *   setMonth={setMonth}
 *   sortBy="cost"
 *   sortOrder="desc"
 *   handleSortToggle={handleSortToggle}
 *   loading={false}
 *   clearAllFilters={clearAllFilters}
 *   activeFilters={activeFilters}
 *   clearFilter={clearFilter}
 * />
 */

import FilterBadge from "./FilterBadge";

/**
 * Filter controls component for cloud spending data.
 *
 * @component
 * @param {Object} props
 * @param {string} props.cloudProvider - Selected cloud provider filter
 * @param {Function} props.setCloudProvider - Cloud provider setter
 * @param {string} props.team - Selected team filter
 * @param {Function} props.setTeam - Team setter
 * @param {string} props.env - Selected environment filter
 * @param {Function} props.setEnv - Environment setter
 * @param {string} props.month - Selected month filter (1-12 or empty)
 * @param {Function} props.setMonth - Month setter
 * @param {string} props.sortBy - Current sort field ('cost' or 'date')
 * @param {string} props.sortOrder - Current sort order ('asc' or 'desc')
 * @param {Function} props.handleSortToggle - Sort toggle handler
 * @param {boolean} props.loading - Loading state to disable controls
 * @param {Function} props.clearAllFilters - Clear all filters handler
 * @param {Array} props.activeFilters - Array of active filter objects
 * @param {Function} props.clearFilter - Single filter removal handler
 *
 * @example
 * // Basic filter setup
 * <Filters
 *   cloudProvider={filters.cloud}
 *   setCloudProvider={(value) => setFilters({...filters, cloud: value})}
 *   team={filters.team}
 *   setTeam={(value) => setFilters({...filters, team: value})}
 *   // ... other props
 * />
 */
function Filters({
    cloudProvider,
    setCloudProvider,
    team,
    setTeam,
    env,
    setEnv,
    month,
    setMonth,
    sortBy,
    sortOrder,
    handleSortToggle,
    loading,
    clearAllFilters,
    activeFilters,
    clearFilter,
}) {
    // Available filter options
    const teams = ["All", "Core", "Web", "Data"];
    const envs = ["All", "prod", "staging", "dev"];
    const cloudOptions = ["All", "AWS", "GCP"];

    // Month options with labels
    const months = [
        { value: "", label: "All Months" },
        { value: "1", label: "January" },
        { value: "2", label: "February" },
        { value: "3", label: "March" },
        { value: "4", label: "April" },
        { value: "5", label: "May" },
        { value: "6", label: "June" },
        { value: "7", label: "July" },
        { value: "8", label: "August" },
        { value: "9", label: "September" },
        { value: "10", label: "October" },
        { value: "11", label: "November" },
        { value: "12", label: "December" },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Filters
            </h2>

            <div className="space-y-4">
                {/* Cloud Provider Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cloud Provider
                    </label>
                    <select
                        disabled={loading}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                        value={cloudProvider}
                        onChange={(e) => {
                            setCloudProvider(e.target.value);
                        }}
                        aria-label="Select cloud provider"
                    >
                        {cloudOptions.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Team Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Team
                    </label>
                    <select
                        disabled={loading}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                        value={team}
                        onChange={(e) => {
                            setTeam(e.target.value);
                        }}
                        aria-label="Select team"
                    >
                        {teams.map((t) => (
                            <option key={t} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Environment Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Environment
                    </label>
                    <select
                        disabled={loading}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                        value={env}
                        onChange={(e) => {
                            setEnv(e.target.value);
                        }}
                        aria-label="Select environment"
                    >
                        {envs.map((e) => (
                            <option key={e} value={e}>
                                {e}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Month Filter */}
                <div className="grid gap-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Month
                        </label>
                        <select
                            disabled={loading}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                            value={month}
                            onChange={(e) => {
                                setMonth(e.target.value);
                            }}
                            aria-label="Select month"
                        >
                            {months.map((m) => (
                                <option key={m.value} value={m.value}>
                                    {m.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Sorting Controls */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sorting
                    </label>
                    <div className="flex gap-2">
                        <button
                            disabled={loading}
                            className={`flex-1 px-3 py-2 border rounded-lg transition-colors ${
                                sortBy === "cost"
                                    ? "bg-blue-50 border-blue-500 text-blue-700"
                                    : "border-gray-300 hover:bg-gray-50"
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                            onClick={() => handleSortToggle("cost")}
                            aria-label={`Sort by cost ${
                                sortBy === "cost" ? `(${sortOrder})` : ""
                            }`}
                        >
                            <div className="flex items-center justify-center gap-1">
                                <span>Cost</span>
                                {sortBy === "cost" && (
                                    <span
                                        className="text-xs"
                                        aria-hidden="true"
                                    >
                                        {sortOrder === "asc" ? "↑" : "↓"}
                                    </span>
                                )}
                            </div>
                        </button>
                        <button
                            disabled={loading}
                            className={`flex-1 px-3 py-2 border rounded-lg transition-colors ${
                                sortBy === "date"
                                    ? "bg-blue-50 border-blue-500 text-blue-700"
                                    : "border-gray-300 hover:bg-gray-50"
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                            onClick={() => handleSortToggle("date")}
                            aria-label={`Sort by date ${
                                sortBy === "date" ? `(${sortOrder})` : ""
                            }`}
                        >
                            <div className="flex items-center justify-center gap-1">
                                <span>Date</span>
                                {sortBy === "date" && (
                                    <span
                                        className="text-xs"
                                        aria-hidden="true"
                                    >
                                        {sortOrder === "asc" ? "↑" : "↓"}
                                    </span>
                                )}
                            </div>
                        </button>
                    </div>
                </div>

                {/* Reset All Filters Button */}
                <div className="pt-2">
                    <button
                        onClick={clearAllFilters}
                        disabled={loading || activeFilters.length === 0}
                        className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        aria-label="Reset all filters"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                        Reset All Filters
                    </button>
                </div>
            </div>

            {/* Active Filters Display */}
            {activeFilters.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                        Active Filters
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {activeFilters.map((f) => (
                            <FilterBadge
                                key={`${f.key}-${f.value}`}
                                label={f.label}
                                value={f.value}
                                onRemove={() => clearFilter(f.key)}
                                disabled={loading}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Filters;
