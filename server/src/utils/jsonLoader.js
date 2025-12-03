import { readFile, writeFile } from "fs/promises";

export async function loadJsonFile(filePath) {
    try {
        const data = await readFile(filePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error loading JSON from ${filePath}:`, error.message);
        throw error;
    }
}

export async function saveJsonFile(filePath, data) {
    try {
        const jsonData = JSON.stringify(data, null, 4); // pretty print
        await writeFile(filePath, jsonData, "utf-8");
        console.log("JSON saved successfully!");
    } catch (error) {
        console.error("Error saving JSON:", error);
    }
}
