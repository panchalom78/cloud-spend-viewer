import { loadJsonFile } from "../utils/jsonLoader.js";

/**
 * Get cloud spending data with filtering, sorting, pagination, and chart data
 * @param {Object} queryParams - Query parameters
 * @returns {Promise<Object>} - Formatted response with data, meta, and summary
 */
export const getCloudSpendData = async (queryParams) => {
    // Load appropriate dataset
    const dataset = await loadDataset(queryParams.cloud_provider);

    // Apply filters
    const filteredData = applyFilters(dataset, queryParams);

    // Apply sorting
    const sortedData = applySorting(
        filteredData,
        queryParams.sortBy,
        queryParams.sortOrder
    );

    // Calculate summary
    const summary = calculateSummary(sortedData);

    // Calculate chart data
    const chartData = calculateChartData(sortedData, summary.byCloud);

    // Apply pagination
    const { paginatedData, paginationMeta } = applyPagination(
        sortedData,
        queryParams.page,
        queryParams.limit
    );

    // Build response
    return {
        meta: {
            ...paginationMeta,
            appliedFilters: {
                cloud_provider: queryParams.cloud_provider,
                team: queryParams.team,
                env: queryParams.env,
                month: queryParams.month || null,
            },
            sorting: queryParams.sortBy
                ? {
                      sortBy: queryParams.sortBy,
                      sortOrder: queryParams.sortOrder,
                  }
                : null,
        },
        summary: {
            total: Number(summary.total.toFixed(2)),
            byCloud: Object.fromEntries(
                Object.entries(summary.byCloud).map(([k, v]) => [
                    k,
                    Number(v.toFixed(2)),
                ])
            ),
            topServices: summary.topServices,
            charts: chartData,
        },
        data: paginatedData,
    };
};

/**
 * Load dataset based on cloud provider filter
 */
const loadDataset = async (cloudProvider) => {
    const cloudFilter = String(cloudProvider).trim().toLowerCase();

    if (cloudFilter === "aws") {
        return await loadJsonFile("./src/data/aws_data.json");
    } else if (cloudFilter === "gcp") {
        return await loadJsonFile("./src/data/gcp_data.json");
    } else {
        return await loadJsonFile("./src/data/all_cloud_data.json");
    }
};

/**
 * Apply filters to dataset
 */
const applyFilters = (data, filters) => {
    return data.filter((item) => {
        // Team filter
        if (filters.team !== "All") {
            const teamFilter = String(filters.team).trim().toLowerCase();
            const itemTeam = item.team ? String(item.team).toLowerCase() : "";
            if (!itemTeam || itemTeam !== teamFilter) return false;
        }

        // Environment filter
        if (filters.env !== "All") {
            const envFilter = String(filters.env).trim().toLowerCase();
            const itemEnv = item.env ? String(item.env).toLowerCase() : "";
            if (!itemEnv || itemEnv !== envFilter) return false;
        }

        // Month filter
        if (filters.month && item.date) {
            const date = new Date(item.date);
            if (isNaN(date)) return false;

            const itemMonth = date.getMonth() + 1;
            if (itemMonth !== filters.month) return false;
        }

        return true;
    });
};

/**
 * Apply sorting to dataset
 */
const applySorting = (data, sortBy, sortOrder = "desc") => {
    if (!sortBy) return [...data];

    return [...data].sort((a, b) => {
        if (sortBy === "cost") {
            const A = Number(a.cost_usd) || 0;
            const B = Number(b.cost_usd) || 0;
            return sortOrder === "asc" ? A - B : B - A;
        }

        if (sortBy === "date") {
            const A = new Date(a.date);
            const B = new Date(b.date);
            if (isNaN(A) && isNaN(B)) return 0;
            if (isNaN(A)) return 1;
            if (isNaN(B)) return -1;
            return sortOrder === "asc" ? A - B : B - A;
        }

        return 0;
    });
};

/**
 * Calculate summary from dataset
 */
const calculateSummary = (data) => {
    const summary = data.reduce(
        (acc, item) => {
            const cost = Number(item.cost_usd) || 0;
            acc.total += cost;

            const cloudProvider = item.cloud_provider || "Unknown";
            acc.byCloud[cloudProvider] =
                (acc.byCloud[cloudProvider] || 0) + cost;

            if (item.service) {
                acc.byService[item.service] =
                    (acc.byService[item.service] || 0) + cost;
            }

            return acc;
        },
        { total: 0, byCloud: {}, byService: {} }
    );

    // Calculate top services
    const topServices = Object.entries(summary.byService)
        .map(([service, cost]) => ({ service, cost }))
        .sort((a, b) => b.cost - a.cost)
        .slice(0, 5)
        .map((s) => ({
            service: s.service,
            cost: Number(s.cost.toFixed(2)),
        }));

    return {
        ...summary,
        topServices,
    };
};

/**
 * Calculate chart data
 */
const calculateChartData = (data, byCloudSummary) => {
    // Monthly breakdown
    const monthlyBreakdown = {};
    data.forEach((item) => {
        if (item.date) {
            try {
                const date = new Date(item.date);
                if (!isNaN(date)) {
                    const yearMonth = `${date.getFullYear()}-${String(
                        date.getMonth() + 1
                    ).padStart(2, "0")}`;
                    const monthName = date.toLocaleString("default", {
                        month: "short",
                    });
                    const monthKey = `${monthName} ${date.getFullYear()}`;

                    if (!monthlyBreakdown[yearMonth]) {
                        monthlyBreakdown[yearMonth] = {
                            month: monthKey,
                            date: yearMonth,
                            total: 0,
                            count: 0,
                        };
                    }
                    monthlyBreakdown[yearMonth].total +=
                        Number(item.cost_usd) || 0;
                    monthlyBreakdown[yearMonth].count += 1;
                }
            } catch (e) {
                // Skip invalid dates
            }
        }
    });

    const monthlyChartData = Object.values(monthlyBreakdown)
        .sort((a, b) => a.date.localeCompare(b.date))
        .map((item) => ({
            month: item.month,
            total: Number(item.total.toFixed(2)),
            count: item.count,
        }));

    // Team breakdown
    const teamBreakdown = {};
    data.forEach((item) => {
        const team = item.team || "Unknown";
        if (!teamBreakdown[team]) {
            teamBreakdown[team] = {
                team: team,
                total: 0,
                count: 0,
            };
        }
        teamBreakdown[team].total += Number(item.cost_usd) || 0;
        teamBreakdown[team].count += 1;
    });

    const teamChartData = Object.values(teamBreakdown)
        .sort((a, b) => b.total - a.total)
        .map((item) => ({
            team: item.team,
            total: Number(item.total.toFixed(2)),
            count: item.count,
        }));

    // Cloud provider breakdown
    const cloudChartData = Object.entries(byCloudSummary)
        .map(([cloud, cost]) => ({
            cloud,
            total: Number(cost.toFixed(2)),
        }))
        .sort((a, b) => b.total - a.total);

    return {
        monthly: monthlyChartData,
        byTeam: teamChartData,
        byCloud: cloudChartData,
    };
};

/**
 * Apply pagination to dataset
 */
const applyPagination = (data, pageStr, limitStr) => {
    const page = Math.max(parseInt(pageStr, 10), 1);
    const limit = Math.max(parseInt(limitStr, 10), 1);

    const total = data.length;
    const totalPages = Math.max(Math.ceil(total / limit), 1);
    const currentPage = Math.min(page, totalPages);
    const startIndex = (currentPage - 1) * limit;

    const paginatedData = data.slice(startIndex, startIndex + limit);

    return {
        paginatedData,
        paginationMeta: {
            page: currentPage,
            limit,
            total,
            totalPages,
            hasNext: currentPage < totalPages,
            hasPrev: currentPage > 1,
        },
    };
};
