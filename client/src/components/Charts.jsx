// components/Charts.jsx - Updated to only show line charts for monthly data
import React, { useState, useMemo } from "react";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import Spinner from "./Spinner";

function ChartSelector({ chartType, setChartType, groupBy, setGroupBy }) {
    const isTimeBased = groupBy === "month";

    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Group By
                </label>
                <select
                    className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={groupBy}
                    onChange={(e) => {
                        setGroupBy(e.target.value);
                        // Auto-switch to bar chart if selecting non-time-based data
                        if (
                            e.target.value !== "month" &&
                            chartType === "line"
                        ) {
                            setChartType("bar");
                        }
                    }}
                >
                    <option value="month">Month</option>
                    <option value="team">Team</option>
                    <option value="cloud">Cloud Provider</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Chart Type
                </label>
                <select
                    className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={chartType}
                    onChange={(e) => setChartType(e.target.value)}
                >
                    <option value="bar">Bar Chart</option>
                    {isTimeBased && <option value="line">Line Chart</option>}
                    <option value="pie">Pie Chart</option>
                </select>
            </div>
        </div>
    );
}

function BarChartComponent({ data, groupBy }) {
    if (!data || data.length === 0) {
        return (
            <div className="h-64 flex items-center justify-center text-gray-500">
                No chart data available
            </div>
        );
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
                    <p className="font-medium text-gray-900">{label}</p>
                    <p className="text-sm text-gray-600">
                        $
                        {payload[0].value.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </p>
                    {payload[0].payload.count && (
                        <p className="text-xs text-gray-500">
                            {payload[0].payload.count} records
                        </p>
                    )}
                </div>
            );
        }
        return null;
    };

    const formatYAxis = (value) => {
        if (value >= 1000000) {
            return `$${(value / 1000000).toFixed(1)}M`;
        } else if (value >= 1000) {
            return `$${(value / 1000).toFixed(1)}K`;
        }
        return `$${value}`;
    };

    // Get appropriate label key based on groupBy
    const labelKey =
        groupBy === "month" ? "month" : groupBy === "team" ? "team" : "cloud";

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: groupBy === "month" ? 40 : 70,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                    dataKey={labelKey}
                    angle={groupBy === "month" ? 0 : -45}
                    textAnchor={groupBy === "month" ? "middle" : "end"}
                    height={groupBy === "month" ? 40 : 70}
                    tick={{ fontSize: 12 }}
                    interval={0}
                />
                <YAxis tickFormatter={formatYAxis} tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                    dataKey="total"
                    name="Total Spend"
                    fill={
                        groupBy === "month"
                            ? "#3B82F6"
                            : groupBy === "team"
                            ? "#10B981"
                            : "#F59E0B"
                    }
                    radius={[4, 4, 0, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}

function LineChartComponent({ data }) {
    if (!data || data.length === 0) {
        return (
            <div className="h-64 flex items-center justify-center text-gray-500">
                No monthly data available
            </div>
        );
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
                    <p className="font-medium text-gray-900">{label}</p>
                    <p className="text-sm text-gray-600">
                        $
                        {payload[0].value.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </p>
                    {payload[0].payload.count && (
                        <p className="text-xs text-gray-500">
                            {payload[0].payload.count} records
                        </p>
                    )}
                </div>
            );
        }
        return null;
    };

    const formatYAxis = (value) => {
        if (value >= 1000000) {
            return `$${(value / 1000000).toFixed(1)}M`;
        } else if (value >= 1000) {
            return `$${(value / 1000).toFixed(1)}K`;
        }
        return `$${value}`;
    };

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={formatYAxis} tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="total"
                    name="Monthly Spend"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

function PieChartComponent({ data, groupBy }) {
    if (!data || data.length === 0) {
        return (
            <div className="h-64 flex items-center justify-center text-gray-500">
                No chart data available
            </div>
        );
    }

    const COLORS = [
        "#3B82F6",
        "#10B981",
        "#EF4444",
        "#F59E0B",
        "#8B5CF6",
        "#EC4899",
        "#14B8A6",
        "#F97316",
    ];

    const labelKey =
        groupBy === "month" ? "month" : groupBy === "team" ? "team" : "cloud";

    const displayData = data.length > 8 ? data.slice(0, 8) : data;
    const total = displayData.reduce((sum, item) => sum + item.total, 0);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            const percentage =
                total > 0 ? ((data.total / total) * 100).toFixed(1) : 0;

            return (
                <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
                    <p className="font-medium text-gray-900">
                        {data[labelKey]}
                    </p>
                    <p className="text-sm text-gray-600">
                        $
                        {data.total.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </p>
                    <p className="text-xs text-gray-500">
                        {percentage}% of total
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="flex flex-col lg:flex-row items-center">
            <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                    <Pie
                        data={displayData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ [labelKey]: name, total }) =>
                            `${name}: $${total.toLocaleString("en-US", {
                                maximumFractionDigits: 0,
                            })}`
                        }
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="total"
                    >
                        {displayData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                </PieChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="mt-4 lg:mt-0 lg:ml-8">
                <div className="text-sm font-medium text-gray-700 mb-2">
                    Breakdown
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                    {displayData.map((item, index) => {
                        const percentage =
                            total > 0
                                ? ((item.total / total) * 100).toFixed(1)
                                : 0;
                        return (
                            <div
                                key={index}
                                className="flex items-center justify-between text-sm"
                            >
                                <div className="flex items-center">
                                    <div
                                        className="w-3 h-3 rounded-sm mr-2"
                                        style={{
                                            backgroundColor:
                                                COLORS[index % COLORS.length],
                                        }}
                                    />
                                    <span className="text-gray-700 truncate max-w-[120px]">
                                        {item[labelKey]}
                                    </span>
                                </div>
                                <div className="text-gray-900 font-medium">
                                    $
                                    {item.total.toLocaleString("en-US", {
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    })}
                                    <span className="text-gray-500 text-xs ml-1">
                                        ({percentage}%)
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-700 font-medium">
                            Total:
                        </span>
                        <span className="text-gray-900 font-bold">
                            $
                            {total.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SpendingCharts({ summary, loading }) {
    const [chartType, setChartType] = useState("bar");
    const [groupBy, setGroupBy] = useState("month");

    // Auto-switch chart type when groupBy changes
    React.useEffect(() => {
        if (groupBy !== "month" && chartType === "line") {
            setChartType("bar");
        }
    }, [groupBy, chartType]);

    if (loading) {
        return (
            <div className="h-64 flex items-center justify-center">
                <Spinner size="lg" />
                <span className="ml-3 text-gray-600">
                    Loading chart data...
                </span>
            </div>
        );
    }

    if (!summary || !summary.charts) {
        return (
            <div className="h-64 flex flex-col items-center justify-center text-gray-500">
                <svg
                    className="w-16 h-16 mb-4 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                </svg>
                <p className="text-lg font-medium">No chart data available</p>
                <p className="mt-1">Apply filters to see spending trends</p>
            </div>
        );
    }

    // Get chart data based on groupBy selection
    const getChartData = () => {
        switch (groupBy) {
            case "month":
                return summary.charts.monthly || [];
            case "team":
                return summary.charts.byTeam || [];
            case "cloud":
                return summary.charts.byCloud || [];
            default:
                return [];
        }
    };

    const chartData = getChartData();
    const isTimeBased = groupBy === "month";

    // Get appropriate chart title
    const chartTitles = {
        month: "Monthly Spending Trend",
        team: "Spending by Team",
        cloud: "Spending by Cloud Provider",
    };

    return (
        <div>
            <ChartSelector
                chartType={chartType}
                setChartType={setChartType}
                groupBy={groupBy}
                setGroupBy={setGroupBy}
            />

            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                    {chartTitles[groupBy]}
                </h3>
                <p className="text-sm text-gray-600">
                    Total: $
                    {summary.total.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </p>
            </div>

            {chartData.length === 0 ? (
                <div className="h-64 flex items-center justify-center text-gray-500">
                    No data available for {groupBy} grouping
                </div>
            ) : (
                <>
                    {chartType === "bar" && (
                        <BarChartComponent data={chartData} groupBy={groupBy} />
                    )}

                    {chartType === "line" && isTimeBased && (
                        <LineChartComponent data={chartData} />
                    )}

                    {chartType === "pie" && (
                        <PieChartComponent data={chartData} groupBy={groupBy} />
                    )}

                    <div className="mt-4 text-xs text-gray-500 text-center">
                        Showing {chartData.length}{" "}
                        {groupBy === "month"
                            ? "months"
                            : groupBy === "team"
                            ? "teams"
                            : "cloud providers"}{" "}
                    </div>
                </>
            )}
        </div>
    );
}

export default SpendingCharts;
