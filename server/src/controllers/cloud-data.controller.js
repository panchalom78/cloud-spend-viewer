import * as cloudDataService from "../services/cloud-data.service.js";

/**
 * @desc Get cloud spending data
 * @route GET /api/data
 * @access Public
 */
export const getCloudData = async (req, res) => {
    try {
        // Extract query parameters
        const queryParams = {
            page: req.query.page || "1",
            limit: req.query.limit || "10",
            sortBy: req.query.sortBy,
            sortOrder: req.query.sortOrder || "desc",
            cloud_provider: req.query.cloud_provider || "All",
            team: req.query.team || "All",
            env: req.query.env || "All",
            month: req.query.month ? parseInt(req.query.month) : null,
        };

        // Validate query parameters
        const validationResult = validateQueryParams(queryParams);
        if (!validationResult.isValid) {
            return res.status(400).json({
                error: "Bad Request",
                message: validationResult.message,
            });
        }

        // Get data from service
        const result = await cloudDataService.getCloudSpendData(queryParams);

        // Send response
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in getCloudData controller:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: error.message,
        });
    }
};

/**
 * Validate query parameters
 */
const validateQueryParams = (params) => {
    // Validate page
    const page = parseInt(params.page);
    if (isNaN(page) || page < 1) {
        return { isValid: false, message: "Page must be a positive integer" };
    }

    // Validate limit
    const limit = parseInt(params.limit);
    if (isNaN(limit) || limit < 1 || limit > 100) {
        return { isValid: false, message: "Limit must be between 1 and 100" };
    }

    // Validate sortBy
    if (params.sortBy && !["cost", "date"].includes(params.sortBy)) {
        return { isValid: false, message: "sortBy must be 'cost' or 'date'" };
    }

    // Validate sortOrder
    if (params.sortOrder && !["asc", "desc"].includes(params.sortOrder)) {
        return { isValid: false, message: "sortOrder must be 'asc' or 'desc'" };
    }

    // Validate cloud_provider
    if (
        params.cloud_provider &&
        !["All", "AWS", "GCP"].includes(params.cloud_provider)
    ) {
        return {
            isValid: false,
            message: "cloud_provider must be 'All', 'AWS', or 'GCP'",
        };
    }

    // Validate month
    if (params.month !== null && (params.month < 1 || params.month > 12)) {
        return { isValid: false, message: "month must be between 1 and 12" };
    }

    return { isValid: true };
};
