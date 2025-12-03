import { readFile, writeFile } from "fs/promises";

/**
 * Loads and parses a JSON file from the filesystem.
 *
 * @async
 * @function loadJsonFile
 * @param {string} filePath - Path to the JSON file (relative or absolute)
 * @returns {Promise<Object|Array>} Parsed JSON data
 * @throws {Error} If file cannot be read or contains invalid JSON
 *
 */
export async function loadJsonFile(filePath) {
    try {
        const data = await readFile(filePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error loading JSON from ${filePath}:`, error.message);
        throw error;
    }
}

/**
 * Saves data as a JSON file with pretty formatting.
 *
 * @async
 * @function saveJsonFile
 * @param {string} filePath - Destination path for the JSON file
 * @param {any} data - JavaScript object or array to serialize
 * @returns {Promise<void>}
 *
 */
export async function saveJsonFile(filePath, data) {
    try {
        const jsonData = JSON.stringify(data, null, 4); // pretty print
        await writeFile(filePath, jsonData, "utf-8");
        console.log("JSON saved successfully!");
    } catch (error) {
        console.error("Error saving JSON:", error);
    }
}
