import express from "express";
import { getCloudData } from "../controllers/cloud-data.controller.js";

const router = express.Router();

/**
 * @route GET /api/cloud-data
 * @desc Get cloud spending data with filtering, sorting, pagination
 * @access Public
 * @query {number} [page=1] - Page number
 * @query {number} [limit=10] - Items per page
 * @query {string} [sortBy] - Sort field (cost|date)
 * @query {string} [sortOrder=desc] - Sort order (asc|desc)
 * @query {string} [cloud_provider=All] - Cloud provider filter (AWS|GCP|All)
 * @query {string} [team=All] - Team filter (Core|Web|Data|All)
 * @query {string} [env=All] - Environment filter (prod|staging|dev|All)
 * @query {number} [month] - Month filter (1-12)
 */
router.get("/data", getCloudData);

export default router;
