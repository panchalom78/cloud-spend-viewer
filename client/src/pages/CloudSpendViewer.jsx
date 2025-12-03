// K&Co. Cloud Spend Viewer - Main Component
import { useEffect, useState } from "react";
import Filters from "../components/Filters";
import SummaryCard from "../components/SummaryCard";
import SpendTable from "../components/SpendTable";
import Pagination from "../components/Pagination";
import SpendingCharts from "../components/Charts";

const API_BASE = "http://localhost:3000/api";

export default function CloudSpendViewer() {
    // UI state
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [cloudProvider, setCloudProvider] = useState("All");
    const [team, setTeam] = useState("All");
    const [env, setEnv] = useState("All");
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState("desc");

    // Data
    const [rows, setRows] = useState([]);
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState({
        total: 0,
        byCloud: {},
        topServices: [],
    });
    const [error, setError] = useState(null);

    // helper to build query string
    const buildQuery = (extra = {}) => {
        const params = new URLSearchParams();
        params.set("page", extra.page ?? page);
        params.set("limit", extra.limit ?? limit);
        if (sortBy) params.set("sortBy", sortBy);
        if (sortOrder) params.set("sortOrder", sortOrder);
        if (cloudProvider && cloudProvider !== "All")
            params.set("cloud_provider", cloudProvider);
        if (team && team !== "All") params.set("team", team);
        if (env && env !== "All") params.set("env", env);
        if (year) params.set("year", year);
        if (month) params.set("month", month);
        return params.toString();
    };

    // fetch paginated data + summary together
    useEffect(() => {
        let controller = new AbortController();
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const qs = buildQuery();
                const res = await fetch(`${API_BASE}/data?${qs}`, {
                    signal: controller.signal,
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(
                        `HTTP ${res.status}: ${text || "Failed to fetch data"}`
                    );
                }

                const json = await res.json();
                setRows(json.data || []);
                setMeta(json.meta || null);
                setSummary(
                    json.summary || { total: 0, byCloud: {}, topServices: [] }
                );
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error("Failed to fetch data:", err);
                    setError(err.message || "Failed to fetch data from server");
                    setRows([]);
                    setMeta(null);
                    setSummary({ total: 0, byCloud: {}, topServices: [] });
                }
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(fetchData, 300);
        return () => {
            controller.abort();
            clearTimeout(timeoutId);
        };
    }, [page, limit, cloudProvider, team, env, year, month, sortBy, sortOrder]);

    const handleSortToggle = (key) => {
        if (sortBy === key) {
            setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
        } else {
            setSortBy(key);
            setSortOrder("desc");
        }
        setPage(1);
    };

    // Active filters helper
    const getActiveFilters = () => {
        const list = [];
        if (cloudProvider && cloudProvider !== "All")
            list.push({
                key: "cloud_provider",
                label: "Cloud",
                value: cloudProvider,
            });
        if (team && team !== "All")
            list.push({ key: "team", label: "Team", value: team });
        if (env && env !== "All")
            list.push({ key: "env", label: "Env", value: env });
        if (year)
            list.push({ key: "year", label: "Year", value: String(year) });
        if (month) {
            const monthName =
                month === "1"
                    ? "January"
                    : month === "2"
                    ? "February"
                    : month === "3"
                    ? "March"
                    : month === "4"
                    ? "April"
                    : month === "5"
                    ? "May"
                    : month === "6"
                    ? "June"
                    : month === "7"
                    ? "July"
                    : month === "8"
                    ? "August"
                    : month === "9"
                    ? "September"
                    : month === "10"
                    ? "October"
                    : month === "11"
                    ? "November"
                    : month === "12"
                    ? "December"
                    : `Month ${month}`;
            list.push({ key: "month", label: "Month", value: monthName });
        }
        if (sortBy)
            list.push({
                key: "sort",
                label: "Sort",
                value: `${sortBy} (${sortOrder})`,
            });
        return list;
    };

    const activeFilters = getActiveFilters();

    const clearFilter = (key) => {
        if (key === "cloud_provider") setCloudProvider("All");
        if (key === "team") setTeam("All");
        if (key === "env") setEnv("All");
        if (key === "year") setYear("");
        if (key === "month") setMonth("");
        if (key === "sort") {
            setSortBy(null);
            setSortOrder("desc");
        }
        setPage(1);
    };

    const clearAllFilters = () => {
        setCloudProvider("All");
        setTeam("All");
        setEnv("All");
        setYear("");
        setMonth("");
        setSortBy(null);
        setSortOrder("desc");
        setPage(1);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        K&Co. Cloud Spend Viewer
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Monitor and analyze cloud spending across teams and
                        services
                    </p>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center">
                            <svg
                                className="w-5 h-5 text-red-500 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span className="text-red-700 font-medium">
                                Error: {error}
                            </span>
                        </div>
                        <button
                            onClick={() => setError(null)}
                            className="mt-2 text-sm text-red-600 hover:text-red-800"
                        >
                            Dismiss
                        </button>
                    </div>
                )}

                {/* Filters + Summary Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Filters Card */}
                    <div className="lg:col-span-1">
                        <Filters
                            cloudProvider={cloudProvider}
                            setCloudProvider={setCloudProvider}
                            team={team}
                            setTeam={setTeam}
                            env={env}
                            setEnv={setEnv}
                            year={year}
                            setYear={setYear}
                            month={month}
                            setMonth={setMonth}
                            sortBy={sortBy}
                            sortOrder={sortOrder}
                            handleSortToggle={handleSortToggle}
                            loading={loading}
                            clearAllFilters={clearAllFilters}
                            activeFilters={activeFilters}
                            clearFilter={clearFilter}
                        />
                    </div>

                    {/* Summary Card */}
                    <div className="lg:col-span-2">
                        <SummaryCard
                            summary={summary}
                            loading={loading}
                            error={error}
                        />
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                    <div className="px-5 py-4 border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Detailed Spending
                                {meta && (
                                    <span className="ml-2 text-sm font-normal text-gray-500">
                                        ({meta.total || 0} records found)
                                    </span>
                                )}
                            </h2>

                            {/* Rows per page */}
                            <div className="flex items-center gap-2">
                                <label className="text-sm text-gray-600">
                                    Rows per page:
                                </label>
                                <select
                                    disabled={loading}
                                    className="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                                    value={limit}
                                    onChange={(e) => {
                                        setLimit(Number(e.target.value));
                                        setPage(1);
                                    }}
                                >
                                    {[5, 10, 20, 50].map((n) => (
                                        <option key={n} value={n}>
                                            {n}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <SpendTable
                        rows={rows}
                        loading={loading}
                        limit={limit}
                        onRowClick={(row) => {
                            console.log("Row clicked:", row);
                            // You can add additional logic here if needed
                        }}
                    />

                    <Pagination
                        page={page}
                        setPage={setPage}
                        limit={limit}
                        setLimit={setLimit}
                        meta={meta}
                        loading={loading}
                    />
                </div>

                {/* Charts Section */}
                <div className="mb-8">
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Spending Trends & Analysis
                            </h2>
                        </div>
                        <div className="p-5">
                            <SpendingCharts
                                summary={summary}
                                loading={loading}
                            />
                        </div>
                    </div>
                </div>

                {/* Help Text */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-3">
                        <svg
                            className="w-5 h-5 text-blue-500 mt-0.5 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <div>
                            <p className="text-sm text-blue-800">
                                <span className="font-semibold">Tip:</span>{" "}
                                Click on any row to view detailed information.
                                Use the charts above to analyze spending trends
                                by different dimensions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
